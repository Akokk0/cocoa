use std::error::Error;
use std::fs::{self, File};
use std::io::{BufReader, BufWriter, Write};
use std::path::Path;
use std::sync::{Arc, Mutex};

use reqwest::header::{HeaderMap, HeaderValue, ORIGIN, REFERER, USER_AGENT};
use reqwest::Client;
use reqwest_cookie_store::{CookieStore, CookieStoreMutex};
use tauri::Manager;

mod object;
pub use object::*;

// Creates default request header
pub fn create_headers() -> HeaderMap {
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

// Load cookies
fn load_cookies(data_path: &String) -> Arc<CookieStoreMutex> {
    // Define cookies file path
    let cookies_file_path = format!("{}/cookies.json", data_path);
    // Load cookies from file
    let cookie_store = 
        // Check if path is a file
        if std::path::Path::new(&cookies_file_path).is_file() {
            // Path is a file, reading file content and load cookies
            let file = fs::File::open(&cookies_file_path)
            .map(std::io::BufReader::new)
            .unwrap();
            // Load cookie store
            let cookie_store = CookieStore::load_json(file).unwrap();
            // Print successful loading information
            println!("load cookies");
            // Return the loaded cookie_store
            cookie_store
        } else {
            // Path is not a file, returned a default cookie_store
            CookieStore::default()
        };
    // Wrap cookie_store as Arc<CookieStoreMutex<CookieStore>>
    let cookie_store = CookieStoreMutex::new(cookie_store);
    let cookie_store = Arc::new(cookie_store);
    // Return the wrapped CookieStore
    cookie_store
}

// Load config
fn load_config(app_config_path: &String) -> Arc<Mutex<CocoaConfig>> {
    let config_file_path = format!("{}/config.toml", app_config_path);
    // Define path
    let config_path = Path::new(&config_file_path);
    // Check if file is exist
    let config: CocoaConfig = if config_path.is_dir() && !is_file_empty(&config_file_path).unwrap() {
        // Load config file
        // Build config file reader
        let config_file_reader = File::open(config_path)
            .map(BufReader::new)
            .unwrap();
        // Get config from config file
        let config: CocoaConfig = serde_json::from_reader(config_file_reader).unwrap();
        // Convert SerializableCocoaConfig to CocoaConfig
        config.into()
    } else {
        // Default config
        let config = CocoaConfig::default();
        // Get config toml string
        let toml_string = toml::to_string(&config).unwrap();
        // Create config file
        let mut config_file = File::create(config_path).map(BufWriter::new).unwrap();
        // Write string to file
        if let Err(_) = config_file.write_all(toml_string.as_bytes()) {
            println!("Write config failed")
        }
        // Return config
        config
    };
    // Wrap config as Arc<Mutex<CocoaConfig>>
    let config = Mutex::new(config);
    let config = Arc::new(config);
    // Return config
    config
}

// Get app path
fn get_app_path(path_type: AppPath, config: &tauri::Config) -> Option<String> {
    // Get the corresponding path based on the path type
    let path = match path_type {
        AppPath::CONFIG => tauri::api::path::app_config_dir(config).unwrap(),
        AppPath::DATA => tauri::api::path::app_data_dir(config).unwrap(),
    };
    // Return folder path
    Some(path.to_string_lossy().to_string())
}

// Check if file is empty
fn is_file_empty(path: &str) -> std::io::Result<bool> {
    // Check if path is a file
    if !std::path::Path::new(&path).is_file() { return Ok(true); }
    // Check if file is empty
    let metadata = fs::metadata(path)?;
    // Return result
    Ok(metadata.len() == 0)
}

// Tauri setup function(manage state object)
pub fn set_up_func(app: &mut tauri::App) -> Result<(), Box<dyn Error>> {
    // Get app data Path
    let app_data_path = format!("{}/auth",
        get_app_path(AppPath::DATA, &app.config()).unwrap()
    );
    // Check if app data folder exist
    let data_path = std::path::Path::new(&app_data_path);
    // Get CookieStore
    let cookie_store = if data_path.is_dir() { // Path is a folder
        // Load cookies
        load_cookies(&app_data_path)
    } else {
        // Create auth folder
        if let Err(_) = fs::create_dir_all(data_path) {
            println!("Create auth folder failed")
        }
        let cookie_store = CookieStore::default();
        let cookie_store = CookieStoreMutex::new(cookie_store);
        Arc::new(cookie_store)
    };
    // Get app config path
    let app_config_path = format!("{}/config",
        get_app_path(AppPath::CONFIG, &app.config()).unwrap()
    );
    // Check if app config folder exist
    let config_path = std::path::Path::new(&app_config_path);
    // Check if folder is empty
    let config = if config_path.is_dir() {
        // Load config file
        load_config(&app_config_path)
    } else {
        // Create config folder
        if let Err(_) = fs::create_dir_all(config_path) {
            println!("Create config folder failed");
        }
        // Create new config
        Arc::new(Mutex::new(CocoaConfig::default()))
    };
    // Create reqwest Client
    let client = Client::builder()
        .cookie_provider(Arc::clone(&cookie_store))
        .default_headers(create_headers())
        .build()
        .unwrap();
    // Wrap client as Arc<Mutex<Client>>
    let client = Mutex::new(client);
    let client = Arc::new(client);
    // Get login status and wrap it as Arc<Mutex<bool>>
    let is_login =
        !is_file_empty(format!("{}/cookies.json", &app_data_path).as_str()).unwrap();
    let is_login = Mutex::new(is_login);
    let is_login = Arc::new(is_login);
    // Manage state object
    app.manage(AppState {
        // Manage request client、CookieStore、config file path
        client,
        config,
        cookie_store,
        is_login,
        app_data_path,
        app_config_path
    });
    // Return success
    Ok(())
}
