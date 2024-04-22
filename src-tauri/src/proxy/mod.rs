use reqwest::Client;
use urlencoding::decode;
use warp::Filter;
use std::{error::Error, fmt, sync::{Arc, Mutex}};

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

pub async fn run_proxy_server(client: Arc<Mutex<Client>>) {
    // Create a new route
    let proxy_route = warp::path!("proxy" / String)
        .and(warp::get())
        .and_then(move |url: String| {
            let client = client
                .lock()
                .unwrap()
                .clone();
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
                .allow_any_origin() // 允许任何源
                .allow_headers(vec!["Content-Type", "Authorization", "X-Requested-With"])
                .allow_methods(vec!["GET", "POST", "DELETE", "PUT", "OPTIONS"])
        );
    // 启动服务器
    warp::serve(proxy_route).run(([127, 0, 0, 1], 3030)).await;
}
