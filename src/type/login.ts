export interface GQRCodeResp {
    code: number,
    message: string,
    ttl: number,
    data: {
        url: string,
        qrcode_key: string
    }
}

export enum LoginStatusRespCode {
    LOGIN_SUCCESS = 0,
    QRCODE_INVALID = 86038,
    QRCODE_SCANNED_NOT_CONFIRMED = 86090,
    QRCODE_NOT_SCANNED = 86101
}

export interface LoginStatusResp {
    code: number,
    message: string,
    data: {
        url: string,
        refresh_token: string,
        timestamp: number,
        code: LoginStatusRespCode
        message: string
    }    
}

export enum WebCookiesRefreshRespCode {
    SUCCESS = 0,
    ACCOUNT_NOT_LOGIN = -101
}

export interface WebCookiesRefreshResp {
    code: WebCookiesRefreshRespCode,
    message: string,
    ttl: number,
    data: {
        refresh: boolean,
        timestamp: number
    }
}

export interface CookieRefreshResp {
    code: number,
    message: string,
    ttl: number,
    data: {
        status: number,
        message: string,
        refresh_token: string
    }
}