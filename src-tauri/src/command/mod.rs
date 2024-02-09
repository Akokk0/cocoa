use std::io::Write;

use cocoa::{create_headers, AppState, RequestType};
use tauri::State;

// Save cookies to disk
#[tauri::command]
pub fn save_cookies(app_state: State<AppState>) -> Result<String, String> {
    // Define auth_folder_path
    let auth_folder_path = format!("{}/auth/", app_state.app_data_path);
    // Define the cookies_file_path to save cookies
    let cookies_file_path = format!("{}/auth/cookies.json", app_state.app_data_path);
    // Check if auth folder is exist
    if !std::path::Path::new(&auth_folder_path).is_dir() {
        // folder is not exist, so create folder
        std::fs::create_dir(&auth_folder_path).unwrap();
    }
    // Check if cookies.json is exist
    let mut writer = std::fs::File::create(&cookies_file_path)
        .map(std::io::BufWriter::new)
        .unwrap();
    // Get the lock of cookie_store
    let store = app_state.cookie_store.lock().unwrap();
    // Write cookies to disk
    store.save_json(&mut writer).unwrap();
    // Change app_state's is_login value to true
    let mut is_login_lock = app_state.is_login.lock().unwrap();
    *is_login_lock = true;
    // Return success information
    Ok(String::from("Success!"))
}

// Common request function todo!
#[tauri::command]
pub async fn request(
    url: String,
    req_type: RequestType,
    app_state: State<'_, AppState>,
) -> Result<String, String> {
    let client_guard = app_state.client.lock().unwrap().clone();

    let req = match req_type {
        RequestType::GET => client_guard.get(url),
        RequestType::POST => client_guard.post(url),
    };

    let content = match req.send().await {
        Ok(resp) => resp.text().await.map_err(|err| println!("{}", err)),
        Err(_) => return Err(String::from("Request failed to send!")),
    };

    Ok(content.unwrap())
}

// Check if user is login
#[tauri::command]
pub fn is_login(app_state: State<AppState>) -> Result<bool, String> {
    // Get the lock of is_login
    let login_status_guard = app_state.is_login.lock().unwrap();
    // Return if the user is logged in 
    return Ok(*login_status_guard);
}

#[tauri::command]
pub fn logout(app_state: State<AppState>) {
    // Define cookies file path
    let cookies_file_path = format!("{}/auth/cookies.json", &app_state.app_data_path);
    // Define refresh_token file path
    let refresh_token_file_path = format!("{}/auth/refresh_token", &app_state.app_data_path);
    // Clear cookie file
    if std::path::Path::new(&cookies_file_path).exists() {
        // Check if file exist and remove it
        std::fs::remove_file(cookies_file_path).unwrap()
    }
    // Clear refresh_token file
    if std::path::Path::new(&refresh_token_file_path).exists() {
        // Check if file exist and remove it
        std::fs::remove_file(&refresh_token_file_path).unwrap();
    }
    // Build new cookie_store
    let new_cookie_store = reqwest_cookie_store::CookieStore::default();
    // Get lock of cookie_store
    let mut cookie_store_guard = app_state.cookie_store.lock().unwrap();
    // Replace with new cookie_store
    *cookie_store_guard = new_cookie_store;
    // Build new client
    let new_client = reqwest::Client::builder()
        .cookie_provider(std::sync::Arc::clone(&app_state.cookie_store))
        .default_headers(create_headers())
        .build()
        .unwrap();
    // Get lock of client
    let mut client_guard = app_state.client.lock().unwrap();
    // Replace with new client
    *client_guard = new_client;
    // Get lock of is_login
    let mut is_login_guard = app_state.is_login.lock().unwrap();
    // Change login status
    *is_login_guard = false;
}

#[tauri::command]
pub fn check_cookies_status(app_state: State<AppState>) {
    let cookie_store_guard = app_state.cookie_store.lock().unwrap();
    println!("Prepare to print cookies!");
    for cookie in cookie_store_guard.iter_any() {
        println!("{:?}", cookie);
    }
}

#[tauri::command]
pub fn save_refresh_token(refresh_token: String, app_state: State<AppState>) {
    // Define refresh_token_file_path
    let refresh_token_path = format!("{}/auth/refresh_token", app_state.app_data_path);
    // Create refresh_token.txt to save refresh_token on disk
    std::fs::File::create(&refresh_token_path)
        .map(std::io::BufWriter::new)
        .unwrap()
        .write_all(refresh_token.as_bytes())
        .unwrap();
}