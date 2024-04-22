import { getWbiSign } from "@/lib/biliUtils"
import { VideoZone } from "@/type/bili"
import { DynamicTypes } from "@/type/dynamic"
import { HistoryType } from "@/type/history"
import { TimelineTypes } from "@/type/home"
import { VideoQuality } from "@/type/video"
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
const RANKING = `${API_URL}x/web-interface/ranking/v2`
const TIMELINE = `${API_URL}pgc/web/timeline`
const PGCRANKING = `${API_URL}pgc/season/rank/web/list`

// User
const PERSONAL_INFO = `${API_URL}x/space/myinfo`
// const USER_FOLLOWINGS = `${API_URL}x/relation/followings`

// Dynamic
const DYNAMIC_LIST = `${API_URL}x/polymer/web-dynamic/v1/feed/all`
const PERSONAL_DYNAMIC_LIST = `${API_URL}x/polymer/web-dynamic/v1/feed/space`
const RECENT_UPDATED = `${API_URL}x/polymer/web-dynamic/v1/portal`

// Comment
const COMMENT = `${API_URL}x/v2/reply/wbi/main`

// Wbi
const WBI_KEYS = `${API_URL}x/web-interface/nav`

// History
const HISTORY = `${API_URL}x/web-interface/history/cursor`
const DEL_HISTORY = `${API_URL}x/v2/history/delete`

// ToView
const TO_VIEW = `${API_URL}x/v2/history/toview`
const DEL_TO_VIEW = `${API_URL}x/v2/history/toview/del`
const CLEAR_ALL_TO_VIEW = `${API_URL}x/v2/history/toview/clear`

// Favorite
const ALL_FAVORITE = `${API_URL}x/v3/fav/folder/created/list-all`
const FAVORITE = `${API_URL}x/v3/fav/resource/list`

// BlockList
const BLOCK_LIST = `${API_URL}x/credit/blocked/list`

// Video Stream
const VIDEO_STREAM = `${API_URL}x/player/wbi/playurl`
const VIDEO_PAGELIST = `${API_URL}x/player/pagelist`
const GET_VIDEO_INFO = `${API_URL}x/web-interface/view`

// PGC Stream
const PGC_STREAM = `${API_URL}pgc/player/web/playurl`
const GET_PGC_SESSION_INFO = `${API_URL}pgc/view/web/season`

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

export async function getRanking(rid: VideoZone = VideoZone.douga, type: string = 'all') {
    let attempts = 3
    for (let i = attempts; i > 0; i--) {
        try {
            return await invoke('request', {
                url: `${RANKING}?rid=${rid}&type=${type}`,
                reqType: 'GET',
            })
        } catch (e) {
            if (i === 1) {
                throw new Error('network error')
            }
        }
    }
}

export async function getPersonalInfo() {
    let attempts = 3
    for (let i = attempts; i > 0; i--) {
        try {
            return await invoke('request', {
                url: PERSONAL_INFO,
                reqType: 'GET',
            })
        } catch (e) {
            if (i === 1) {
                throw new Error('network error')
            }
        }
    }
}

export async function getTimeLine(types: TimelineTypes = TimelineTypes.Anime, before: number = 7, after: number = 7) {
    let attempts = 3
    for (let i = attempts; i > 0; i--) {
        try {
            return await invoke('request', {
                url: `${TIMELINE}?types=${types}&before=${before}&after=${after}`,
                reqType: 'GET',
            })
        } catch (e) {
            if (i === 1) {
                throw new Error('network error')
            }
        }
    }
}

export async function getPGCRanking(season_type: TimelineTypes = TimelineTypes.Anime, day: number = 3) {
    let attempts = 3
    for (let i = attempts; i > 0; i--) {
        try {
            return await invoke('request', {
                url: `${PGCRANKING}?season_type=${season_type}&day=${day}`,
                reqType: 'GET',
            })
        } catch (e) {
            if (i === 1) {
                throw new Error('network error')
            }
        }
    }
}

export async function getDynamicList(
    { type = DynamicTypes.All, offset, update_baseline, page, timezone_offset = '-408' }:
        {
            type: DynamicTypes,
            offset?: number,
            update_baseline?: string,
            page?: number,
            timezone_offset?: string
        }
) {
    let url = `${DYNAMIC_LIST}?type=${type}`
    offset && (url += `&offset=${offset}`)
    update_baseline && (url += `&update_baseline=${update_baseline}`)
    page && (url += `&page=${page}`)
    timezone_offset && (url += `&timezone_offset=${timezone_offset}`)

    let attempts = 3
    for (let i = attempts; i > 0; i--) {
        try {
            return await invoke('request', {
                url,
                reqType: 'GET',
            })
        } catch (e) {
            if (i === 1) {
                throw new Error('network error')
            }
        }
    }
}

export async function getPerosnalDynamicList(
    host_mid: string, { offset, features, update_baseline, page, timezone_offset = '-408' }:
        {
            offset?: number,
            update_baseline?: string,
            features?: string,
            page?: number,
            timezone_offset?: string
        }
) {
    let url = `${PERSONAL_DYNAMIC_LIST}?host_mid=${host_mid}`
    offset && (url += `&offset=${offset}`)
    timezone_offset && (url += `&timezone_offset=${timezone_offset}`)
    features && (url += `&features=${features}`)
    update_baseline && (url += `&update_baseline=${update_baseline}`)
    page && (url += `&page=${page}`)

    let attempts = 3
    for (let i = attempts; i > 0; i--) {
        try {
            return await invoke('request', {
                url,
                reqType: 'GET',
            })
        } catch (e) {
            if (i === 1) {
                throw new Error('network error')
            }
        }
    }
}

export async function getLatestUpdatesDynamicUpInfo() {
    let attempts = 3
    for (let i = attempts; i > 0; i--) {
        try {
            return await invoke('request', {
                url: RECENT_UPDATED,
                reqType: 'GET',
            })
        } catch (e) {
            if (i === 1) {
                throw new Error('network error')
            }
        }
    }
}

export async function getComment(params: object) {
    // Get wbi sign
    const wbiSign = await getWbiSign(params)
    // Send request
    let attempts = 3
    for (let i = attempts; i > 0; i--) {
        try {
            return await invoke('request', {
                url: `${COMMENT}?${wbiSign}`,
                reqType: 'GET',
            })
        } catch (e) {
            if (i === 1) {
                throw new Error('network error')
            }
        }
    }
}

export async function getWbiKey() {
    let attempts = 3
    for (let i = attempts; i > 0; i--) {
        try {
            return await invoke('request', {
                url: WBI_KEYS,
                reqType: 'GET',
            })
        } catch (e) {
            if (i === 1) {
                throw new Error('network error')
            }
        }
    }
}

export async function getHistory(
    { ps, type, max, business, view_at }:
        { ps?: number, type?: HistoryType, max?: number, business?: HistoryType, view_at?: number }
) {
    // Construct url
    let params = [];
    ps && params.push(`ps=${ps}`);
    type && params.push(`type=${type}`);
    max && params.push(`max=${max}`);
    business && params.push(`business=${business}`);
    view_at && params.push(`view_at=${view_at}`);

    let url = `${HISTORY}?${params.join('&')}`;
    // Send request
    let attempts = 3
    for (let i = attempts; i > 0; i--) {
        try {
            return await invoke('request', {
                url,
                reqType: 'GET',
            })
        } catch (e) {
            if (i === 1) {
                throw new Error('network error')
            }
        }
    }
}

export async function deleteHistory(kid: string, csrf: string) {
    // Send request
    let attempts = 3
    for (let i = attempts; i > 0; i--) {
        try {
            return await invoke('form_request', {
                url: DEL_HISTORY,
                reqType: 'POST',
                form: {
                    kid,
                    csrf,
                }
            })
        } catch (e) {
            if (i === 1) {
                throw new Error('network error')
            }
        }
    }
}

export async function getToView() {
    // Send request
    let attempts = 3
    for (let i = attempts; i > 0; i--) {
        try {
            return await invoke('request', {
                url: TO_VIEW,
                reqType: 'GET',
            })
        } catch (e) {
            if (i === 1) {
                throw new Error('network error')
            }
        }
    }
}

export async function deleteToView(
    { csrf, aid, viewed }:
        { csrf: string, aid?: number, viewed?: boolean }
) {
    const form = {
        csrf,
        ...(aid && { aid }),
        ...(viewed && { viewed }),
    }
    // Send request
    let attempts = 3
    for (let i = attempts; i > 0; i--) {
        try {
            return await invoke('form_request', {
                url: DEL_TO_VIEW,
                reqType: 'POST',
                form
            })
        } catch (e) {
            if (i === 1) {
                throw new Error('network error')
            }
        }
    }
}

export async function clearAllToView(csrf: string) {
    const form = {
        csrf
    }
    // Send request
    let attempts = 3
    for (let i = attempts; i > 0; i--) {
        try {
            return await invoke('form_request', {
                url: CLEAR_ALL_TO_VIEW,
                reqType: 'POST',
                form
            })
        } catch (e) {
            if (i === 1) {
                throw new Error('network error')
            }
        }
    }
}

export async function getAllFavorite(up_mid: number) {
    // Send request
    let attempts = 3
    for (let i = attempts; i > 0; i--) {
        try {
            return await invoke('request', {
                url: `${ALL_FAVORITE}?up_mid=${up_mid}`,
                reqType: 'GET',
            })
        } catch (e) {
            if (i === 1) {
                throw new Error('network error')
            }
        }
    }
}

export async function getFavorite(media_id: number, pn: number = 1, ps: number = 20) {
    // Send request
    let attempts = 3
    for (let i = attempts; i > 0; i--) {
        try {
            return await invoke('request', {
                url: `${FAVORITE}?media_id=${media_id}&ps=${ps}&pn=${pn}`,
                reqType: 'GET',
            })
        } catch (e) {
            if (i === 1) {
                throw new Error('network error')
            }
        }
    }
}

export async function getBlockList() {
    // Send request
    let attempts = 3
    for (let i = attempts; i > 0; i--) {
        try {
            return await invoke('request', {
                url: BLOCK_LIST,
                reqType: 'GET',
            })
        } catch (e) {
            if (i === 1) {
                throw new Error('network error')
            }
        }
    }
}

export async function getVideoStream(params: string) {
    // Send request
    let attempts = 3
    for (let i = attempts; i > 0; i--) {
        try {
            return await invoke('request', {
                // url: `http://127.0.0.1:3030/proxy/${encodeURIComponent(VIDEO_STREAM + '?' + params)}`,
                url: `${VIDEO_STREAM}?${params}`,
                reqType: 'GET',
            })
        } catch (e) {
            if (i === 1) {
                throw new Error('network error')
            }
        }
    }
}

export async function getVideoPageList(bvid: string) {
    // Send request
    let attempts = 3
    for (let i = attempts; i > 0; i--) {
        try {
            return await invoke('request', {
                url: `${VIDEO_PAGELIST}?bvid=${bvid}`,
                reqType: 'GET',
            })
        } catch (e) {
            if (i === 1) {
                throw new Error('network error')
            }
        }
    }
}

export async function getPgcStream(
    { avid, bvid, ep_id, cid, qn, fnval, fnver, fourk, session, from_client, drm_tech_type }:
        { avid?: number, bvid?: string, ep_id?: number, cid?: number, qn?: VideoQuality, fnval?: number, fnver?: number, fourk?: number, session?: string, from_client?: string, drm_tech_type?: number }
) {
    // Construct url
    let url = `${PGC_STREAM}?ep_id=${ep_id}`
    avid && (url += `&avid=${avid}`)
    bvid && (url += `&bvid=${bvid}`)
    cid && (url += `&cid=${cid}`)
    qn && (url += `&qn=${qn}`)
    fnval && (url += `&fnval=${fnval}`)
    fnver && (url += `&fnver=${fnver}`)
    fourk && (url += `&fourk=${fourk}`)
    session && (url += `&session=${session}`)
    from_client && (url += `&from_client=${from_client}`)
    drm_tech_type && (url += `&drm_tech_type=${drm_tech_type}`)
    console.log(url);
    
    // Send request
    let attempts = 3
    for (let i = attempts; i > 0; i--) {
        try {
            return await invoke('request', {
                url,
                reqType: 'GET',
            })
        } catch (e) {
            if (i === 1) {
                throw new Error('network error')
            }
        }
    }
}

export async function getSessionInfo(
    { season_id, ep_id }:
        { season_id?: number, ep_id?: number }
) {
    // Construct url
    let url = GET_PGC_SESSION_INFO
    season_id && (url += `?season_id=${season_id}`)
    ep_id && (url += `&ep_id=${ep_id}`)
    // Send request
    let attempts = 3
    for (let i = attempts; i > 0; i--) {
        try {
            return await invoke('request', {
                url,
                reqType: 'GET',
            })
        } catch (e) {
            if (i === 1) {
                throw new Error('network error')
            }
        }
    }
}

export async function getVideoInfo(bvid: string) {
    // Send request
    let attempts = 3
    for (let i = attempts; i > 0; i--) {
        try {
            return await invoke('request', {
                url: `${GET_VIDEO_INFO}?bvid=${bvid}`,
                reqType: 'GET',
            })
        } catch (e) {
            if (i === 1) {
                throw new Error('network error')
            }
        }
    }
}