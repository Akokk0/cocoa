use reqwest::{
    header::{HeaderMap, HeaderValue, HOST, ORIGIN, REFERER, USER_AGENT},
    Client,
};
use reqwest_cookie_store::CookieStoreMutex;
use tauri::Url;
use warp::Filter;

use std::{
    error::Error,
    sync::Arc,
};

// Creates default request header
fn create_proxy_headers() -> HeaderMap {
    let mut headers = HeaderMap::new();
    headers.insert(
        USER_AGENT,
        HeaderValue::from_static("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (HTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36"));
    headers.insert(
        HOST,
        HeaderValue::from_static("upos-sz-mirrorcoso1.bilivideo.com"),
    );
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
    println!("Proxy server starting");
    let client = proxy_set_up_func(cookie_store).unwrap();
    // 创建一个代理路由
    let proxy_route =
        warp::path!("proxy" / String)
            .and(warp::get())
            .and_then(move |url: String| {
                let client = Arc::clone(&client);
                async move {
                    // println!("Proxying: {}", &url);
                    let url = "https://upos-hz-mirrorakam.akamaized.net/upgcxcode/44/90/1510469044/1510469044-1-16.mp4?e=ig8euxZM2rNcNbRVhwdVhwdlhWdVhwdVhoNvNC8BqJIzNbfq9rVEuxTEnE8L5F6VnEsSTx0vkX8fqJeYTj_lta53NCM=&uipk=5&nbs=1&deadline=1713459780&gen=playurlv2&os=akam&oi=1558149421&trid=e5aa7d46f8254939bbdcd40e4e959e6bh&mid=22916310&platform=html5&upsig=dc8ad14fcce1e920990507fb1c38c495&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform&hdnts=exp=1713459780~hmac=4af4fb3ea6f4936274239ab87ef0c26db3f703ec70966c3aca16af5791543008&bvc=vod&nettype=0&f=h_0_0&bw=46911&logo=80000000";
                    // 解码 URL
                    let decoded_url = match Url::parse(&url) {
                        Ok(url) => url,
                        Err(_) => return Err(warp::reject::not_found()),
                    };
                    // 使用 client 发送 GET 请求到视频流服务器
                    let resp = client.get(decoded_url.as_str()).send().await;
                    println!("resp received");
                    match resp {
                        Ok(mut resp) => {
                            /* let mut body = Vec::new();
                            while let Some(chunk) = resp.chunk().await.unwrap() {
                                body.extend_from_slice(&chunk);
                            } */
                            let body = resp.bytes().await.unwrap();
                            // 将 Body 转换为 `impl warp::Reply`
                            let reply = warp::http::Response::builder()
                                .header("content-type", "video/mp4")
                                .body(body)
                                .unwrap();
                            Ok::<_, warp::Rejection>(reply)
                        }
                        Err(_) => Err(warp::reject::not_found()),
                    }
                }
            });
    println!("Proxy route created");
    // 启动服务器
    warp::serve(proxy_route).run(([127, 0, 0, 1], 3030)).await;
    println!("Proxy server started at");
}
