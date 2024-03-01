export enum MustDoRespCode {
    SUCCESS = 0,
    REQUEST_ERROR = -400
}

export interface MustDoResp {
    code: MustDoRespCode,
    message: string,
    ttl: number,
    data: {
        title: string,
        media_id: number,
        explain: string,
        list: [
            {
                aid: number,
                videos: number,
                tid: number,
                tname: string,
                copyright: number,
                pic: string,
                title: string,
                pubdate: number,
                ctime: number,
                desc: string,
                duration: number,
                owner: {
                    mid: number,
                    name: string,
                    face: string
                },
                stat: {
                    aid: number,
                    view: number,
                    danmaku: number,
                    reply: number,
                    favorite: number,
                    coin: number,
                    share: number,
                    now_rank: number,
                    his_rank: number,
                    like: number,
                    dislike: number,
                    vt: number,
                    vv: number
                },
                dynamic: string,
                cid: number,
                dimension: {
                    width: number,
                    height: number,
                    rotate: number
                },
                short_link_v2: string,
                first_frame: string,
                pub_location: string,
                bvid: string,
                achievement: string
            }
        ]
    }
}