// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod command;

use cocoa::set_up_func;
use command::*;

#[tokio::main]
async fn main() {
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
}
