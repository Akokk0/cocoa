// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod command;
use std::thread;

use cocoa::{set_up_func, main as proxy_main};
use command::*;

async fn start_proxy() {
    println!("Starting proxy server");
    thread::spawn(|| {
        proxy_main();
    });
}

fn main() {
    tauri::Builder::default()
        .setup(set_up_func)
        .invoke_handler(tauri::generate_handler![
            save_cookies,
            request,
            html_request,
            form_request,
            img_request,
            is_login,
            sign_out,
            // logout,
            check_cookies_status,
            save_refresh_token,
            change_settings,
            get_config,
            get_csrf,
            get_refresh_token
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
    // Start proxy server
    tokio::runtime::Runtime::new().unwrap().block_on(start_proxy());
}
