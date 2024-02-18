use std::{fs, io::{BufReader, BufWriter, Read, Write}};

use cocoa::{create_headers, AppState, CocoaConfig, RequestType};
use flate2::read::GzDecoder;
use serde_json::Value;
use tauri::State;

// Result<(), String>
// Save cookies to disk
#[tauri::command]
pub fn save_cookies(app_state: State<AppState>) -> Result<(), String> {
    // Check if auth folder is exist
    checking_auth_folder_is_exist(&app_state.app_data_path).map_err(|e| e.to_string())?;
    // Define the cookies_file_path to save cookies
    let cookies_file_path = format!("{}/auth/cookies.json", app_state.app_data_path);
    // Update cookies file
    let mut writer = std::fs::File::create(&cookies_file_path)
        .map(std::io::BufWriter::new)
        .map_err(|e| e.to_string())?;
    // Get the lock of cookie_store
    let store = app_state.cookie_store
        .lock()
        .map_err(|e| e.to_string())?;
    // Write cookies to disk
    store
        .save_json(&mut writer)
        .map_err(|e| e.to_string())?;
    // Change app_state's is_login value to true
    let mut is_login_lock = app_state.is_login
        .lock()
        .map_err(|e| e.to_string())?;
    *is_login_lock = true;
    // Return success information
    Ok(())
}

#[tauri::command]
pub fn save_refresh_token(refresh_token: String, app_state: State<AppState>) -> Result<(), String> {
    // Check if auth folder is exist
    checking_auth_folder_is_exist(&app_state.app_data_path).map_err(|e| e.to_string())?;
    // Define refresh_token_file_path
    let refresh_token_path = format!("{}/auth/refresh_token", app_state.app_data_path);
    // Create refresh_token.txt to save refresh_token on disk
    std::fs::File::create(&refresh_token_path)
        .map(std::io::BufWriter::new)
        .map_err(|e| e.to_string())?
        .write_all(refresh_token.as_bytes())
        .map_err(|e| e.to_string())?;
    // Return ok
    Ok(())
}

fn checking_auth_folder_is_exist(app_data_path: &String) -> Result<(), String> {
    // Define auth_folder_path
    let auth_folder_path = format!("{}/auth/", app_data_path);
    // Build auth folder Path
    let path_auth_folder = std::path::Path::new(&auth_folder_path);
    // Check if auth folder is exist
    if !path_auth_folder.is_dir() {
        // Creat auth folder
        std::fs::create_dir(&auth_folder_path)
            .map_err(|e| e.to_string())?;
    }
    // Return ok
    Ok(())
}

#[tauri::command]
pub fn change_settings(settings: CocoaConfig, app_state: State<AppState>) -> Result<(), String> {
    // Get config string
    let toml_string = match toml::to_string(&settings) {
        Ok(str) => str,
        Err(_) => {
            println!("Convert toml failed");
            return Err(String::from("Save config failed"));
        }
    };
    // Get config file path
    let config_file_path = format!("{}/config.toml", app_state.app_config_path);
    // Get file
    let mut config_file = std::fs::File::create(config_file_path)
        .map(BufWriter::new)
        .map_err(|e| e.to_string())?;
    // Write config to file
    config_file
        .write_all(toml_string.as_bytes())
        .map_err(|e| e.to_string())?;
    // Change config in app_state
    let mut config_lock = app_state.config
        .lock()
        .map_err(|e| e.to_string())?;
    *config_lock = settings;
    // Return ok
    Ok(())
}

// Common request function
#[tauri::command]
pub async fn request(
    url: String,
    req_type: RequestType,
    app_state: State<'_, AppState>,
) -> Result<String, String> {
    // Clone client from app_state
    let client_guard = app_state.client
        .lock()
        .map_err(|e| e.to_string())?
        .clone();
    // Get request
    let req = match req_type {
        RequestType::GET => client_guard.get(url),
        RequestType::POST => client_guard.post(url),
    };
    // Send request and get content
    let content = match req.send().await {
        Ok(resp) => resp.text().await.map_err(|e| e.to_string())?,
        Err(_) => return Err(String::from("Request failed to send!")),
    };
    // Return content
    Ok(content)
}

#[tauri::command]
pub async fn html_request(
    url: String,
    req_type: RequestType,
    app_state: State<'_, AppState>,
) -> Result<String, String> {
    // Get client from app_state
    let client_guard = app_state.client
        .lock()
        .map_err(|e| e.to_string())?
        .clone();
    // Get request
    let req = match req_type {
        RequestType::GET => client_guard.get(url),
        RequestType::POST => client_guard.post(url),
    };
    // Send request and get bytes
    let content = match req.send().await {
        Ok(resp) => resp
            .bytes()
            .await
            .map_err(|e| e.to_string())?,
        Err(_) => return Err(String::from("Request failed to send!")),
    };
    // Decode gzip bytes
    let mut d = GzDecoder::new(&content[..]);
    let mut s = String::new();
    d.read_to_string(&mut s).map_err(|e| e.to_string())?;
    // Return html
    Ok(s)
}

#[tauri::command]
pub async fn form_request(
    url: String,
    req_type: RequestType,
    form: Value,
    app_state: State<'_, AppState>,
) -> Result<String, String> {
    // Clone client from app_state
    let client_guard = app_state.client
        .lock()
        .map_err(|e| e.to_string())?
        .clone();
    // Get request
    let req = match req_type {
        RequestType::GET => client_guard.get(url),
        RequestType::POST => client_guard.post(url).form(&form)
    };
    // Send request and get content
    let content = match req.send().await {
        Ok(resp) => resp.text().await.map_err(|e| e.to_string())?,
        Err(_) => return Err(String::from("Request failed to send!")),
    };
    // Return content
    Ok(content)
}

#[tauri::command]
pub fn get_csrf(app_state: State<AppState>) -> Result<String, String> {
    // Get cookie_store from app_state
    let cookie_store = app_state.cookie_store
        .lock()
        .map_err(|e| e.to_string())?;
    // Traverse cookie_store
    for cookie in cookie_store.iter_any() {
        // Look for the cookie with cookie name bili_jct
        if cookie.name() == "bili_jct" {
            // Return cookie value with cookie name bili_jct
            return Ok(cookie.value().to_string());
        }
    }
    // Return not found
    Err(String::from("csrf is not exist"))
}

#[tauri::command]
pub fn get_refresh_token(app_state: State<AppState>) -> Result<String, String> {
    // Get refresh_token file path
    let refresh_token_file_path = format!("{}/auth/refresh_token", app_state.app_data_path);
    // Build Path of refresh_token file
    let path_refresh_token = std::path::Path::new(&refresh_token_file_path);
    // Check if refresh token is exist
    if !path_refresh_token.is_file() {
        return Err(String::from("unknown error occurced"))
    }
    // Build file
    let mut refresh_token_file = fs::File::open(path_refresh_token)
        .map(BufReader::new)
        .map_err(|e| e.to_string())?;
    // Define buffer using string
    let mut buffer = String::new();
    // Get refresh token
    refresh_token_file.read_to_string(&mut buffer).map_err(|e| e.to_string())?;
    // Return refresh_token
    Ok(buffer)
}

// Check if user is login
#[tauri::command]
pub fn is_login(app_state: State<AppState>) -> Result<bool, String> {
    // Get the lock of is_login
    let login_status_guard = app_state.is_login
        .lock()
        .map_err(|e| e.to_string())?;
    // Return if the user is logged in
    Ok(*login_status_guard)
}

#[tauri::command]
pub fn logout(app_state: State<AppState>) -> Result<(), String> {
    // Define cookies file path
    let cookies_file_path = format!("{}/auth/cookies.json", &app_state.app_data_path);
    // Define refresh_token file path
    let refresh_token_file_path = format!("{}/auth/refresh_token", &app_state.app_data_path);
    // Clear cookie file
    if std::path::Path::new(&cookies_file_path).exists() {
        // Check if file exist and remove it
        std::fs::remove_file(cookies_file_path).map_err(|e| e.to_string())?;
    }
    // Clear refresh_token file
    if std::path::Path::new(&refresh_token_file_path).exists() {
        // Check if file exist and remove it
        std::fs::remove_file(&refresh_token_file_path).map_err(|e| e.to_string())?;
    }
    // Build new cookie_store
    let new_cookie_store = reqwest_cookie_store::CookieStore::default();
    // Get lock of cookie_store
    let mut cookie_store_guard = app_state.cookie_store
        .lock()
        .map_err(|e| e.to_string())?;
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
    // Return ok
    Ok(())
}

#[tauri::command]
pub fn check_cookies_status(app_state: State<AppState>) -> Result<(), String> {
    let cookie_store_guard = app_state.cookie_store
        .lock()
        .map_err(|e| e.to_string())?;
    println!("Prepare to print cookies!");
    for cookie in cookie_store_guard.iter_any() {
        println!("{:?}", cookie);
    }
    Ok(())
}

#[tauri::command]
pub fn get_config(app_state: State<AppState>) -> Result<CocoaConfig, String> {
    let config = app_state.config
        .lock()
        .map_err(|e| e.to_string())?;
    Ok(config.clone())
}
