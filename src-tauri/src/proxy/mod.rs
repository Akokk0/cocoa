use reqwest::{
    header::{HeaderMap, HeaderValue, ORIGIN, REFERER, USER_AGENT},
    Client,
};
use reqwest_cookie_store::CookieStoreMutex;
use urlencoding::decode;
use warp::Filter;

use std::{error::Error, fmt, sync::Arc};

use futures_util::StreamExt;

// 创建一个新的错误类型
#[derive(Debug)]
struct StreamError;

impl fmt::Display for StreamError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "Stream Error")
    }
}

impl Error for StreamError {}

// Creates default request header
fn create_proxy_headers() -> HeaderMap {
    let mut headers = HeaderMap::new();
    headers.insert(
        USER_AGENT,
        HeaderValue::from_static("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (HTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36"));
    headers.insert(
        ORIGIN,
        HeaderValue::from_static("https://space.bilibili.com"),
    );
    headers.insert(
        REFERER,
        HeaderValue::from_static("https://www.bilibili.com"),
    );
    headers
}

// Tauri setup function(manage state object)
fn proxy_set_up_func(
    cookie_store: Arc<CookieStoreMutex>,
) -> Result<Arc<reqwest::Client>, Box<dyn Error>> {
    // Create reqwest Client
    let client = Client::builder()
        .cookie_provider(Arc::clone(&cookie_store))
        .default_headers(create_proxy_headers())
        .build()?;
    // Wrap client as Arc<Mutex<Client>>
    // let client = Mutex::new(client);
    let client = Arc::new(client);
    // Return success
    Ok(client)
}

pub async fn run_proxy_server(cookie_store: Arc<CookieStoreMutex>) {
    // Create a new client
    let client = proxy_set_up_func(cookie_store).unwrap();
    // Create a new route
    let proxy_route = warp::path!("proxy" / String)
        .and(warp::get())
        .and_then(move |url: String| {
            let client = Arc::clone(&client);
            async move {
                // 解码 URL
                let decoded_url = match decode(&url) {
                    Ok(decoded_url) => decoded_url,
                    Err(_) => return Err(warp::reject::not_found()),
                };
                println!("Proxying: {}", decoded_url.to_string());
                // Send request to URL
                let req = client.get(decoded_url.to_string()).build().unwrap();
                println!("{:#?}", req);
                let resp = client.execute(req).await;
                match resp {
                    Ok(resp) => {
                        // Create a new response
                        let mut reply = warp::http::Response::builder();
                        // Get response headers
                        let headers = reply.headers_mut().unwrap();
                        // Copy headers from response to reply
                        for (key, value) in resp.headers().clone() {
                            match key {
                                Some(v) => headers.insert(v, value.clone()),
                                None => continue,
                            };
                        }
                        // let body = resp.bytes().await.unwrap();
                        // Convert response body to stream
                        let body = resp.bytes_stream();
                        // Wrap stream in warp::hyper::Body
                        let body = warp::hyper::Body::wrap_stream(
                            body.map(|b| b.map_err(|_| StreamError)),
                        );
                        // Set response body
                        let reply = reply.body(body).unwrap();
                        println!("{:#?}", reply);
                        // Return response
                        Ok::<_, warp::Rejection>(reply)
                    }
                    Err(_) => Err(warp::reject::not_found()),
                }
            }
        })
        .with(
            warp::cors()
                .allow_any_origin()
                .allow_headers(vec!["Content-Type"]) // 允许Content-Type头部
                .allow_methods(vec!["GET", "POST", "DELETE", "PUT", "OPTIONS"]) // 允许GET和OPTIONS方法
        );
    // 启动服务器
    warp::serve(proxy_route).run(([127, 0, 0, 1], 3030)).await;
}
