export interface GQRCode {
    code: number,
    message: string,
    ttl: number,
    data: {
        url: string,
        qrcode_key: string
    }
}

export enum LoginStatusCode {
    LOGIN_SUCCESS = 0,
    QRCODE_INVALID = 86038,
    QRCODE_SCANNED_NOT_CONFIRMED = 86090,
    QRCODE_NOT_SCANNED = 86101
}

export interface LoginStatus {
    code: number,
    message: string,
    data: {
        url: string,
        refresh_token: string,
        timestamp: number,
        code: LoginStatusCode
        message: string
    }    
}