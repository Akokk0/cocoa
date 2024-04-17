use warp::Filter;

#[tokio::main]
pub async fn main() {
    // 创建一个代理路由
    let proxy_route = warp::path!("proxy" / String)
        .and(warp::get())
        .and_then(|url: String| async move {
            // 发送 GET 请求到视频流服务器
            let resp = reqwest::get(&url).await;

            match resp {
                Ok(resp) => {
                    // 获取响应的字节流
                    let bytes = resp.bytes().await.unwrap();

                    // 将字节流转换为 `impl warp::Reply`
                    let reply = warp::http::Response::builder()
                        .header("content-type", "video/mp4")
                        .body(bytes)
                        .unwrap();

                    Ok::<_, warp::Rejection>(reply)
                }
                Err(_) => Err(warp::reject::not_found()),
            }
        });

    // 启动服务器
    warp::serve(proxy_route).run(([127, 0, 0, 1], 3030)).await;
}