use std::error::Error;
use std::fs::{self, File};
use std::io::{BufReader, BufWriter, Read, Write};
use std::path::Path;
use std::sync::{Arc, Mutex};

use reqwest::header::{HeaderMap, HeaderValue, ORIGIN, REFERER, USER_AGENT};
use reqwest::Client;
use reqwest_cookie_store::{CookieStore, CookieStoreMutex};
use tauri::Manager;

mod object;
mod proxy;

pub use object::*;
pub use proxy::run_proxy_server;

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
fn load_cookies(app_data_path: &String) -> Arc<CookieStoreMutex> {
    // Define cookies file path
    let cookies_file_path = format!("{}/auth/cookies.json", app_data_path);
    // Define Path of cookies file 
    let path_cookie_file = std::path::Path::new(&cookies_file_path);
    // Load cookies from file
    let cookie_store = 
        // Check if path is a file
        if path_cookie_file.is_file() {
            // Path is a file, reading file content and load cookies
            let cookie_file_reader = fs::File::open(path_cookie_file)
                .map(std::io::BufReader::new)
                .unwrap();
            // Load cookie store
            let cookie_store = match CookieStore::load_json(cookie_file_reader) {
                Ok(cs) => cs,
                Err(_) => { // File has been tampered with
                    // remove cookies file
                    fs::remove_file(path_cookie_file).unwrap();
                    // Create new cookie_store
                    CookieStore::default()
                },
            }; 
            // Print successful loading information
            println!("loaded cookies");
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
    // Define config_file_path
    let config_file_path = format!("{}/config.toml", app_config_path);
    // Define path
    let config_path = Path::new(&config_file_path);

    // function
    let create_default_config_and_save = || -> CocoaConfig {
        // Create default config
        let config = CocoaConfig::default();
        // Build config_writer
        let mut config_file_writer = fs::File::create(config_path)
            .map(BufWriter::new)
            .unwrap();
        // Convert config to toml string
        let toml_string = toml::to_string(&config).unwrap();
        // Write config to file
        config_file_writer.write_all(toml_string.as_bytes()).unwrap();
        // Return config
        config
    };

    // Check if file is exist
    let config: CocoaConfig = if config_path.is_file() && !is_file_empty(&config_file_path).unwrap() {
        // Load config file
        // Build config file reader
        let mut config_file_reader = File::open(config_path)
            .map(BufReader::new)
            .unwrap();
        // Define string buffer
        let mut config_str = String::default();
        // Read to string from file
        if let Err(_) = config_file_reader.read_to_string(&mut config_str) { // The file is corrupted
            let config = create_default_config_and_save();
            // Return config
            return Arc::new(Mutex::new(config));
        }
        // Convert string to CococaConfig
        match toml::from_str(&config_str) {
            Ok(config) => config,
            Err(_) => { // File has been tampered with
                // Create default config
                let config = create_default_config_and_save();
                // Return config
                config
            }
        }
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
    if !std::path::Path::new(path).is_file() { return Ok(true); }
    // Check if file is empty
    let metadata = fs::metadata(path)?;
    // Return result
    Ok(metadata.len() == 0)
}

// Tauri setup function(manage state object)
pub fn set_up_func(app: &mut tauri::App) -> Result<(), Box<dyn Error>> {
    // Get app data Path
    let app_data_path = get_app_path(AppPath::DATA, &app.config()).unwrap();
    // Check if app data folder is exist
    if !std::path::Path::new(&app_data_path).is_dir() { // Path is a folder
        // Create auth folder
        if let Err(_) = fs::create_dir_all(&app_data_path) {
            println!("Create auth folder failed")
        }
    }
    // Load cookies
    let cookie_store = load_cookies(&app_data_path);
    let cookie_store_move = Arc::clone(&cookie_store);
    println!("Before start proxy server");
    // Start proxy server
    tokio::spawn(async move {
        println!("Starting proxy server");
        run_proxy_server(cookie_store_move).await;
    });
    println!("After start proxy server");
    // Get app config path
    let app_config_path = get_app_path(AppPath::CONFIG, &app.config()).unwrap();
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
        !is_file_empty(format!("{}/auth/cookies.json", &app_data_path).as_str()).unwrap();
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

// Check if auth folder is exist
pub fn checking_auth_folder_is_exist(app_data_path: &String) -> Result<(), String> {
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
