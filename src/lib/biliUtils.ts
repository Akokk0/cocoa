import { getVideoInfo, getWbiKey } from "@/api/biliApi";
import { WbiResp } from "@/type/authentication";
import { VideoInfoResp, VideoInfoRespCode } from "@/type/video";
import { WebviewWindow, appWindow } from "@tauri-apps/api/window";
import md5 from "md5";

// generate CorrespondPath
export async function generateCorrespondPath(timestamp: number) {
    const publicKey = await crypto.subtle.importKey(
        "jwk",
        {
            kty: "RSA",
            n: "y4HdjgJHBlbaBN04VERG4qNBIFHP6a3GozCl75AihQloSWCXC5HDNgyinEnhaQ_4-gaMud_GF50elYXLlCToR9se9Z8z433U3KjM-3Yx7ptKkmQNAMggQwAVKgq3zYAoidNEWuxpkY_mAitTSRLnsJW-NCTa0bqBFF6Wm1MxgfE",
            e: "AQAB",
        },
        { name: "RSA-OAEP", hash: "SHA-256" },
        true,
        ["encrypt"],
    )

    const data = new TextEncoder().encode(`refresh_${timestamp}`);
    const encrypted = new Uint8Array(await crypto.subtle.encrypt({ name: "RSA-OAEP" }, publicKey, data))
    return encrypted.reduce((str, c) => str + c.toString(16).padStart(2, "0"), "")
}

// html parse
export function parseCSRFromHTML(html: string) {
    // New domparser
    let parser = new DOMParser()
    // Parse html from string
    let doc = parser.parseFromString(html, 'text/html')
    // Get the element with ID 1-name
    let element = doc.getElementById('1-name')
    // Check if element is null
    if (!element) throw new Error('element is not exist')
    // Return csrf
    return element.textContent!
}

// 获取最新的 img_key 和 sub_key
export async function getWbiKeys() {
    const { data: { wbi_img: { img_url, sub_url } } } = JSON.parse(await getWbiKey() as string) as WbiResp

    return {
        img_key: img_url.slice(
            img_url.lastIndexOf('/') + 1,
            img_url.lastIndexOf('.')
        ),
        sub_key: sub_url.slice(
            sub_url.lastIndexOf('/') + 1,
            sub_url.lastIndexOf('.')
        )
    }
}

export async function getWbiSign(params: { [key: string]: any }) {
    const mixinKeyEncTab = [
        46, 47, 18, 2, 53, 8, 23, 32, 15, 50, 10, 31, 58, 3, 45, 35, 27, 43, 5, 49,
        33, 9, 42, 19, 29, 28, 14, 39, 12, 38, 41, 13, 37, 48, 7, 16, 24, 55, 40,
        61, 26, 17, 0, 1, 60, 51, 30, 4, 22, 25, 54, 21, 56, 59, 6, 63, 57, 62, 11,
        36, 20, 34, 44, 52
    ]

    // 对 imgKey 和 subKey 进行字符顺序打乱编码
    const getMixinKey = (orig: string) => mixinKeyEncTab.map(n => orig[n]).join('').slice(0, 32)

    // 为请求参数进行 wbi 签名
    function encWbi(params: { [key: string]: any }, img_key: string, sub_key: string) {
        const mixin_key = getMixinKey(img_key + sub_key),
            curr_time = Math.round(Date.now() / 1000),
            chr_filter = /[!'()*]/g

        Object.assign(params, { wts: curr_time }) // 添加 wts 字段
        // 按照 key 重排参数
        const query = Object
            .keys(params)
            .sort()
            .map((key) => {
                // 过滤 value 中的 "!'()*" 字符
                const value = params[key].toString().replace(chr_filter, '')
                return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
            })
            .join('&')
        const wbi_sign = md5(query + mixin_key) // 计算 w_rid
        return query + '&w_rid=' + wbi_sign
    }

    const web_keys = await getWbiKeys()
    const img_key = web_keys.img_key,
        sub_key = web_keys.sub_key
    return encWbi(params, img_key, sub_key)
}

export async function openPlayer(bvid: string, cid?: number, title: string = 'Cocoa', scale: number = 1) {
    if (!cid) {
        // Send request to get popular content
        const videoInfoResp = JSON.parse(await getVideoInfo(bvid) as string) as VideoInfoResp
        // Check if request is error
        if (videoInfoResp.code != VideoInfoRespCode.Success) return
        // Set cid
        cid = videoInfoResp.data.cid
    }
    const webview_root = appWindow
    // 优化视频窗口的位置
    const rootPos = await webview_root.outerPosition()
    const titleHeight = (await webview_root.outerSize()).height - (await webview_root.innerSize()).height

    const webview = new WebviewWindow('VideoPlayer', {
        title,
        url: `/#/player/${bvid}/${cid}`,
        width: 1280,
        height: 745,
        minWidth: 1280,
        minHeight: 745,
        x: rootPos.x / scale + 100,
        y: (rootPos.y + titleHeight) / scale
    })
    await webview.once('tauri://error', function (e) {
        console.log(e)
    })
}

export async function openPgcPlayer(ep_id: number, title: string = 'Cocoa', scale: number = 1) {
    const webview_root = appWindow
    // 优化视频窗口的位置
    const rootPos = await webview_root.outerPosition()
    const titleHeight = (await webview_root.outerSize()).height - (await webview_root.innerSize()).height

    const webview = new WebviewWindow('VideoPlayer', {
        title,
        url: `/#/pgcplayer/${ep_id}`,
        width: 1280,
        height: 745,
        minWidth: 1280,
        minHeight: 745,
        x: rootPos.x / scale + 100,
        y: (rootPos.y + titleHeight) / scale
    })
    await webview.once('tauri://error', function (e) {
        console.log(e)
    })
}