export enum PGCRespCode {
    SUCCESS = 0,
    ERROR = -400,
    NO_VIDEO = -404,
    NOT_ALLOW_AT_YOUR_REGION = -10403
}
export interface SupportFormatsItem {
    quality: number;
    format: string;
    new_description?: string;
    description?: string;
    display_desc?: string;
    superscript?: string;
    codecs: string[];
    need_login: boolean;
    need_vip: boolean;
}

export interface Durl {
    order: number;
    length: number; // 毫秒
    size: number; // 字节
    vhead?: string;
    url: string; // 存在转义符
    valid_time: number; // 有效时间，单位分钟
    backup_url?: string[]; // 备用视频流
}

export interface RecordInfo {
    record_icon: string,
    record: string
}

export interface PGCResult {
    code: number; // 作用尚不明确
    is_preview: number; // 作用尚不明确
    fnver: number; // 请求时提供的 fnver
    fnval: number; // 请求时提供的 fnval
    video_project: boolean; // 是否视频项目
    type: string; // 视频流类型（DASH、FLV、MP4）
    bp: number; // 是否可以承包
    vip_type: number; // 当前用户大会员类型
    vip_status: number; // 当前用户大会员状态
    is_drm: boolean; // 是否 DRM
    no_rexcode: number; // 0
    has_paid: boolean; // 是否已付费
    status: number; // 状态
    from: string; // local，作用尚不明确
    result: string; // suee，作用尚不明确
    message: string; // 空，作用尚不明确
    quality: number; // 当前的视频分辨率代码，值含义见上表
    format: string; // 视频格式
    timelength: number; // 视频长度，单位为毫秒，不同分辨率/格式可能有略微差异
    accept_format: string; // 视频支持的全部格式，每项用,分隔
    accept_description: string[]; // 视频支持的分辨率列表
    accept_quality: number[]; // 视频支持的分辨率代码列表，值含义见上表
    video_codecid: number; // 默认选择视频流的编码id，见视频编码代码
    seek_param: string; // 固定值：start，作用尚不明确
    seek_type: string; // offset（dash、flv），second（mp4），作用尚不明确
    durl?: Durl[]; // 视频分段，注：仅flv/mp4存在此项
    dash?: any; // dash音视频流信息，注：仅dash存在此项
    support_formats: SupportFormatsItem[]; // 支持格式的详细信息
    clip_info_list?: any[]; // 空，待补充
    record_info?: RecordInfo; // 备案登记信息
}

export interface PGCResp {
    code: PGCRespCode
    message: string
    result: PGCResult
}

export enum PGCInfoRespCode {
    SUCCESS = 0,
    ERROR = -404,
}

interface Activity {
    head_bg_url: string,
    id: number,
    title: string
}

interface Dimension {
}

interface BadgeInfo {
}

interface Episode {
    aid: number;
    badge: string;
    badge_info?: BadgeInfo;
    badge_type?: number;
    bvid: string;
    cid: number;
    cover: string;
    dimension: Dimension;
    from?: string;
    id: number;
    link: string;
    long_title: string;
    pub_time: number; // 发布时间的时间戳
    pv?: number;
    release_date?: string;
    rights?: Rights;
    share_copy: string;
    share_url: string;
    short_link: string;
    status?: number;
    subtitle: string;
    title: string;
    vid: string;
}

interface NewEpisode {
    desc: string; // 更新备注
    id: number; // 最新一话epid
    is_new: number; // 是否最新发布，0：否，1：是
    title: string; // 最新一话标题
}

interface PayType {
    // 根据实际情况定义支付相关的结构
    allow_discount: number; // 启用折扣，0：否，1：是
    allow_pack: number;
    allow_ticket: number; // 启用票券
    allow_time_limit: number; // 启用时间限制
    allow_vip_discount: number; // 启用大会员折扣
    forbid_bb: number; // 禁止使用B币券
}

interface Payment {
    discount: number; // 折扣，100为原价
    pay_type: PayType;
    price: string; // 售价
    promotion: string; // 推广信息
    vip_discount: number; // 大会员折扣
    vip_first_promotion?: string;
    vip_price: string; // 大会员售价
    vip_promotion: string; // 大会员推广信息
}

interface Positive {
    id: number,
    title: string
}

interface Publish {
    is_finish: number; // 完结状态，0：未完结，1：已完结
    is_started: number; // 是否发布，0：未发布，1：已发布
    pub_time: string; // 发布时间，格式为YYYY-MM-DDD hh:mm:ss
    pub_time_show: string; // 发布时间文字介绍
    unknow_pub_date: number; // 作用尚不明确
    weekday: number; // 作用尚不明确
}

interface Rating {
    count: number,
    score: number
}

interface Rights {
    allow_bp: number;
    allow_bp_rank: number;
    allow_download: number;
    allow_review: number;
    area_limit: number;
    ban_area_show: number;
    can_watch: number;
    copyright: string;
    dujia: string;
    forbid_pre: number;
    is_cover_show: number;
    is_preview: number;
    only_vip_download: number;
    resource: string;
    watch_platform: number;
}

interface SeasonItem {
    badge: string
    badge_info: object
    badge_type: number
    cover: string
    media_id: string
    new_ep: number
    season_id: object
    season_title: number
    season_type: string
    stat: object
}

interface Series {
    series_id: number
    series_title: string
}

interface Show {
    wide_screen: number
}

interface Stat {
    coins: number; // 投币数
    danmakus: number; // 弹幕数
    favorites: number; // 收藏数
    likes: number; // 点赞数
    reply: number; // 评论数
    share: number; // 分享数
    views: number; // 播放数
}

interface UpInfo {
    avatar: string; // 头像图片url
    follower: number; // 粉丝数
    is_follow: number; // 是否关注，0表示未关注
    mid: number; // UP主mid
    pendant?: object;
    theme_type: number;
    uname: string; // UP主昵称
    verify_type: number;
    vip_status: number;
    vip_type: number;
}

interface SectionItem {
    episode_id: number
    episodes: Episode[]
    id: number
    title: string
    type: number
}

export interface PGCInfoResult {
    activity?: Activity;
    alias?: string;
    bkg_cover?: string;
    cover: string;
    episodes?: Episode[];
    evaluate?: string;
    jp_title?: string;
    link?: string;
    media_id: number;
    mode?: number;
    new_ep?: NewEpisode;
    payment?: Payment;
    positive?: Positive;
    publish?: Publish;
    rating?: Rating;
    record?: string;
    rights?: Rights;
    season_id: number;
    season_title: string;
    seasons?: SeasonItem[]; // 这里应该根据实际情况定义同系列所有季信息对象的结构
    section?: SectionItem[];
    series?: Series;
    share_copy?: string;
    share_sub_title?: string;
    share_url?: string;
    show?: Show;
    square_cover?: string;
    stat?: Stat;
    status?: number;
    subtitle?: string;
    title: string;
    total: number;
    type: number;
    up_info?: UpInfo;
}

export interface PGCInfoResp {
    code: PGCInfoRespCode
    message: string
    ttl: number,
    result: PGCInfoResult
}