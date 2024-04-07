export enum HistoryRespCode {
    Success = 0,
    NotLogin = -101,
    Error = -400
}

export interface HistodyCursor {
    max: number; // 最后一项目标 id，对应请求参数
    view_at: number; // 最后一项时间节点，为时间戳
    business: string; // 最后一项业务类型，对应请求参数
    ps: number; // 每页项数
}

export interface HistoryTabItem {
    type: string,
    name: string
}

interface HistoryDetails {
    // 根据需要在这里定义条目详细信息的结构
    oid: number; // 目标id
    epid?: number; // 剧集epid，仅用于剧集
    bvid?: string; // 稿件bvid，仅用于稿件视频
    page?: number; // 观看到的视频分P数，仅用于稿件视频
    cid: number; // 观看到的对象id
    part?: string; // 观看到的视频分P标题，仅用于稿件视频
    business: 'archive' | 'pgc' | 'live' | 'article' | 'article-list'; // 业务类型
    dt: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 33; // 记录查看的平台代码
}

export interface HistoryListItem {
    title: string;
    long_title: string;
    cover: string;
    covers: string[] | null;
    uri?: string;
    history: HistoryDetails;
    videos?: number;
    author_name: string;
    author_face: string;
    author_mid: number;
    view_at: number;
    progress?: number;
    badge?: string;
    show_title?: string;
    duration?: number;
    current?: string;
    total?: number;
    new_desc?: string;
    is_finish?: 0 | 1;
    is_fav: 0 | 1;
    kid: number;
    tag_name?: string;
    live_status?: 0 | 1;
}

export interface HistoryItem {
    cursor: HistodyCursor,
    tab: HistoryTabItem[],
    list: HistoryListItem[]
}

export interface HistoryResp {
    code: HistoryRespCode
    message: string
    ttl: number
    data: HistoryItem
}

export enum HistoryType {
    All = 'all',
    Archive = 'archive',
    Pgc = 'pgc',
    Live = 'live',
    Article = 'article',
    ArticleList = 'article-list'
}