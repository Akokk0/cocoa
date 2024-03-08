import { VideoZone } from "@/type/bili"
import { invoke } from "@tauri-apps/api"

// Login
const LOGIN_BASE_URL = 'https://passport.bilibili.com/'
const GET_LOGIN_QRCODE = `${LOGIN_BASE_URL}x/passport-login/web/qrcode/generate`
const GET_LOGIN_STATUS = `${LOGIN_BASE_URL}x/passport-login/web/qrcode/poll`
const CHECK_COOKIES_NEEDS_REFRESH = `${LOGIN_BASE_URL}x/passport-login/web/cookie/info`
const REFRESH_COOKIES = `${LOGIN_BASE_URL}x/passport-login/web/cookie/refresh`
const CONFIRM_REFRESH = `${LOGIN_BASE_URL}x/passport-login/web/confirm/refresh`

// Main
const MAIN_BASE_URL = 'https://www.bilibili.com/'
const GET_REFRESH_CSRF = `${MAIN_BASE_URL}correspond/1`

// API
const API_URL = 'https://api.bilibili.com/'
const MUST_DO = `${API_URL}x/web-interface/popular/precious`
const POPULAR = `${API_URL}x/web-interface/popular`
const REGION_NEW = `${API_URL}x/web-interface/dynamic/region`

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
    for (let i = attempts; i > 0; i--) {
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
    for (let i = attempts; i > 0; i--) {
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

export async function refreshCookie(
    csrf: string, refresh_csrf: string, refresh_token: string, source: string = 'main_web'
) {
    let attempts = 3
    for (let i = attempts; i > 0; i--) {
        try {
            return await invoke('form_request', {
                url: REFRESH_COOKIES,
                reqType: 'POST',
                form: {
                    csrf,
                    refresh_csrf,
                    source,
                    refresh_token,
                }
            })
        } catch (e) {
            if (i === 1) {
                throw new Error('network error')
            }
        }
    }
}

export async function confirmRefresh(csrf: string, refresh_token: string) {
    let attempts = 3
    for (let i = attempts; i > 0; i--) {
        try {
            return await invoke('form_request', {
                url: CONFIRM_REFRESH,
                reqType: 'POST',
                form: {
                    csrf,
                    refresh_token,
                }
            })
        } catch (e) {
            if (i === 1) {
                throw new Error('network error')
            }
        }
    }
}

export async function getMustDo(page: number = 1, page_size: number = 85) {
    let attempts = 3
    for (let i = attempts; i > 0; i--) {
        try {
            return await invoke('request', {
                url: `${MUST_DO}?page=${page}&page_size=${page_size}`,
                reqType: 'GET',
            })
        } catch (e) {
            if (i === 1) {
                throw new Error('network error')
            }
        }
    }
}

export async function getPopular(pn: number = 1, ps: number = 20) {
    let attempts = 3
    for (let i = attempts; i > 0; i--) {
        try {
            return await invoke('request', {
                url: `${POPULAR}?pn=${pn}&ps=${ps}`,
                reqType: 'GET',
            })
        } catch (e) {
            if (i === 1) {
                throw new Error('network error')
            }
        }
    }
}

export async function getRegionNew(rid: VideoZone = VideoZone.douga, pn: number = 1, ps: number = 10) {
    let attempts = 3
    for (let i = attempts; i > 0; i--) {
        try {
            return await invoke('request', {
                url: `${REGION_NEW}?pn=${pn}&ps=${ps}&rid=${rid}`,
                reqType: 'GET',
            })
        } catch (e) {
            if (i === 1) {
                throw new Error('network error')
            }
        }
    }
}