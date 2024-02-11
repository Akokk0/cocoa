use std::sync::{Arc, Mutex};

use reqwest::Client;
use reqwest_cookie_store::CookieStoreMutex;
use serde::{Deserialize, Serialize};

#[derive(serde::Deserialize)]
pub enum RequestType {
    GET,
    POST,
}

#[derive(PartialEq)]
pub enum AppPath {
    CONFIG,
    DATA,
}

// 管理Tauri状态对象
#[derive(Clone)]
pub struct AppState {
    pub client: Arc<Mutex<Client>>,
    pub config: Arc<Mutex<CocoaConfig>>,
    pub cookie_store: Arc<CookieStoreMutex>,
    pub is_login: Arc<Mutex<bool>>,
    pub app_data_path: String,
    pub app_config_path: String,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct CocoaConfig {
    pub auto_login: Option<bool>,
}

impl Default for CocoaConfig {
    fn default() -> Self {
        Self {
            auto_login: Default::default(),
        }
    }
}

/* impl From<SerializableCocoaConfig> for CocoaConfig {
    fn from(value: SerializableCocoaConfig) -> Self {
        CocoaConfig {
            auto_login: Arc::new(Mutex::new(value.auto_login))
        }
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct SerializableCocoaConfig {
    pub auto_login: bool
}

impl From<CocoaConfig> for SerializableCocoaConfig {
    fn from(value: CocoaConfig) -> Self {
        SerializableCocoaConfig {
            auto_login: *value.auto_login.lock().unwrap()
        }
    }

}

impl Default for SerializableCocoaConfig {
    fn default() -> Self {
        Self { auto_login: Default::default() }
    }
} */
