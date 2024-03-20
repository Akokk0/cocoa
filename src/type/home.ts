export type ListItem = {
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

export type List = Array<ListItem>

export enum VideoListRespCode {
    SUCCESS = 0,
    REQUEST_ERROR = -400
}

export interface VideoListResp {
    code: VideoListRespCode,
    message: string,
    ttl: number,
    data: {
        title: string,
        media_id: number,
        explain: string,
        list: List
    }
}

export interface RegionNewResp {
    code: VideoListRespCode,
    message: string,
    ttl: number,
    data: {
        page: {
            num: number,
            size: number,
            count: number
        }
        archives: List
    }
}

export enum RankingRespCode {
    SUCCESS = 0,
    ERROR = -400
}

export interface RankingResp {
    code: RankingRespCode,
    message: string,
    ttl: number,
    data: {
        note: string,
        list: List
    }
}

export enum TimelineTypes {
    Anime = 1,
    Movie = 3,
    Guochuang = 4
}

export type Episode = {
    cover: string,
    delay: number,
    delay_id: number,
    delay_index: string,
    delay_reason: string,
    ep_cover: string,
    episode_id: number,
    pub_index: string,
    pub_time: string,
    pub_ts: number,
    published: number,
    follows: string,
    plays: string,
    season_id: number,
    square_cover: string,
    title: string
}

export type Result = {
    date: string,
    date_ts: number,
    day_of_week: number,
    is_today: number
    episodes: Array<Episode>,
}

export enum TimelineRespCode {
    SUCCESS = 0,
    REQUEST_ERROR = -400,
    ERROR = -404
}

export interface TimelineResp {
    code: TimelineRespCode,
    message: string,
    result: Array<Result>
}

export enum PGCRankingRespCode {
    SUCCESS = 0,
    REQUEST_ERROR = -400,
    ERROR = -404
}

export interface PGCRankingResp {
    code: PGCRankingRespCode;
    data: {
        list: PGCRankingItem[];
        note: string;
        season_type: number;
    }
    message: string;
}

export interface PGCRankingItem {
    badge: string;
    badge_info: {
        bg_color: string;
        bg_color_night: string;
        text: string;
    }
    badge_type: number;
    cover: string;
    desc: string;
    enable_vt: boolean;
    icon_font: {
        name: string;
        text: string;
    }
    new_ep: {
        cover: string;
        index_show: string;
    };
    rank: number;
    rating: string;
    season_id: number;
    ss_horizontal_cover: string;
    stat: {
        danmaku: number;
        follow: number;
        series_follow: number;
        view: number;
    };
    title: string;
    url: string;
}