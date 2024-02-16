import { invoke } from "@tauri-apps/api"

// Login
const LOGIN_BASE_URL = 'https://passport.bilibili.com/'
const GET_LOGIN_QRCODE = `${LOGIN_BASE_URL}x/passport-login/web/qrcode/generate`
const GET_LOGIN_STATUS = `${LOGIN_BASE_URL}x/passport-login/web/qrcode/poll`
const CHECK_COOKIES_NEEDS_REFRESH = `${LOGIN_BASE_URL}x/passport-login/web/cookie/info`

// Main
const MAIN_BASE_URL = 'https://www.bilibili.com/'
const GET_REFRESH_CSRF = `${MAIN_BASE_URL}correspond/1`

export async function getLoginQRCodeURL() {
    // try three times
    let attempts = 3
    for (let i = attempts; i > 0; i--) {
        try {
            return await invoke('request', {
                url: GET_LOGIN_QRCODE,
                reqType: 'GET'
            })
        } catch (e) {
            if (i === 1) { // tried three times but still no sucsess
                throw new Error('network error')
            }
        }
    }
}

export async function getLoginStatus(qrcodeKey: string) {
    // try three times
    let attempts = 3
    for (let i = attempts; i > 0; i--) {
        try {
            return await invoke('request', {
                url: `${GET_LOGIN_STATUS}?qrcode_key=${qrcodeKey}`,
                reqType: 'GET'
            })
        } catch (e) {
            if (i === 1) { // tried three times but still no sucsess
                throw new Error('network error')
            }
        }
    }
}

export async function checkIfCookiesNeedsRefresh() {
    let attempts = 3
    for(let i = attempts; i > 0; i--) {
        try {
            return await invoke('request', {
                url: CHECK_COOKIES_NEEDS_REFRESH,
                reqType: 'GET'
            })
        } catch (e) {
            if (i === 1) {
                throw new Error('network error')
            }
        }
    }
}

export async function getRefreshCSRF(correspondPath: string) {
    let attempts = 3
    for(let i = attempts; i > 0; i--) {
        try {
            return await invoke('html_request', {
                url: `${GET_REFRESH_CSRF}/${correspondPath}`,
                reqType: 'GET'
            })
        } catch (e) {
            if (i === 1) {
                throw new Error('network error')
            }
        }
    }
}