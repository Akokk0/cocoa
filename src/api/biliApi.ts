import { invoke } from "@tauri-apps/api"

// Login
const LOGIN_BASE_URL = 'https://passport.bilibili.com/'
const GET_LOGIN_QRCODE = `${LOGIN_BASE_URL}x/passport-login/web/qrcode/generate`
const GET_LOGIN_STATUS = `${LOGIN_BASE_URL}x/passport-login/web/qrcode/poll`

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