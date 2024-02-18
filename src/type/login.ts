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

export enum CookieRefreshRespCode {
    SUCCESS = 0,
    NOT_LOGIN = -101,
    CSRF_VERIFICATION_FAILED = -111,
    REFRESH_CSRF_ERROR_OR_MISMATCH_WITH_COOKIE = 86095
}

export interface CookieRefreshResp {
    code: CookieRefreshRespCode,
    message: string,
    ttl: number,
    data: {
        status: number,
        message: string,
        refresh_token: string
    }
}

export enum ConfirmRefreshRespCode {
    SUCCESS = 0,
    NOT_LOGIN = -101,
    CSRF_VERIFICATION_FAILED = -111,
    REQUEST_ERROR = -400
}

export interface ConfirmRefreshResp {
    code: ConfirmRefreshRespCode,
    message: string,
    ttl: number
}