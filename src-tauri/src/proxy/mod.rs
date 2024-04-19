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
    let client = proxy_set_up_func(cookie_store).unwrap();
    // 创建一个代理路由
    let proxy_route =
        warp::path!("proxy" / String)
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
                    // 使用 client 发送 GET 请求到视频流服务器
                    let resp = client.get(decoded_url.to_string()).send().await;
                    println!("resp received");
                    println!("{:#?}", resp);
                    match resp {
                        Ok(resp) => {
                            /* for key in &["content-type", "access-control-allow-origin"] {
                                resp.headers_mut().remove(*key);
                            } */
                            // let body = resp.bytes().await.unwrap();
                            let body = resp.bytes_stream();
                            let body = warp::hyper::Body::wrap_stream(body.map(|b| b.map_err(|_| StreamError)));
                            // 将 Body 转换为 `impl warp::Reply`
                            let reply = warp::http::Response::builder()
                                .header("content-type", "video/mp4")
                                .header("access-control-allow-origin", "*")
                                .body(body)
                                .unwrap();
                            // let reply = convert_response(resp).await.unwrap();
                            Ok::<_, warp::Rejection>(reply)
                        }
                        Err(_) => Err(warp::reject::not_found()),
                    }
                }
            });
    // 启动服务器
    warp::serve(proxy_route).run(([127, 0, 0, 1], 3030)).await;
}
