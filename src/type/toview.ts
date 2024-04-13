export enum ToViewRespCode {
    SUCCESS = 0,
    NOT_LOGIN = -101,
    REQUEST_ERROR = -400
}

interface VideoRights {
    // 省略具体字段，根据实际需求定义
    bp: number; // 是否允许承包
    elec: number; // 是否支持充电
    download: number; // 是否允许下载
    movie: number; // 是否电影
    pay: number; // 是否PGC付费
    hd5: number; // 是否有高码率
    no_reprint: number; // 是否显示“禁止转载”标志
    autoplay: number; // 是否自动播放
    ugc_pay: number; // 是否UGC付费
    is_cooperation: number; // 是否为联合投稿
    ugc_pay_preview: 0; // 作用尚不明确
    no_background: 0; // 作用尚不明确
    clean_mode: 0; // 作用尚不明确
    is_stein_gate: number; // 是否为互动视频
    is_360: number; // 是否为全景视频
    no_share: 0; // 作用尚不明确
    arc_pay: 0; // 作用尚不明确
    free_watch: 0; // 作用尚不明确
}

interface VideoOwner {
    // 省略具体字段，根据实际需求定义
    mid: number; // UP主uid
    name: string; // UP主昵称
    face: string; // UP主头像url
}

interface VideoStat {
    // 省略具体字段，根据实际需求定义
    aid: number; // 稿件avid
    view: number; // 播放数
    danmaku: number; // 弹幕数
    reply: number; // 评论数
    favorite: number; // 收藏数
    coin: number; // 投币数
    share: number; // 分享数
    now_rank: number; // 当前排名
    his_rank: number; // 历史最高排行
    like: number; // 获赞数
    dislike: number; // 点踩数，恒为0
    evaluation: string; // 视频评分
    vt: 0; // 作用尚不明确，恒为0
}

interface VideoDimension {
    // 省略具体字段，根据实际需求定义
    width: number; // 分辨率宽度
    height: number; // 分辨率高度
    rotate: number; // 是否将宽高对换 0：否，1：是
}

export interface ToViewListItem {
    aid: number; // 稿件avid
    videos: number; // 稿件分P总数，默认为1
    tid: number; // 分区tid
    tname: string; // 子分区名称
    copyright: 1 | 2; // 是否转载，1：原创，2：转载
    pic: string; // 稿件封面图片url
    title: string; // 稿件标题
    pubdate: number; // 稿件发布时间，时间戳
    ctime: number; // 用户提交稿件的时间，时间戳
    desc: string; // 视频简介
    state: number; // 视频状态
    duration: number; // 稿件总时长（所有分P），单位为秒
    rights: VideoRights; // 稿件属性标志
    owner: VideoOwner; // 稿件UP主信息
    stat: VideoStat; // 稿件状态数
    dynamic: string; // 视频同步发布的的动态的文字内容，为空无
    dimension: VideoDimension; // 稿件1P分辨率
    count?: number; // 稿件分P数，非投稿视频无此项
    cid: number; // 视频cid
    progress: number; // 观看进度时间，单位为秒
    add_at: number; // 添加时间，时间戳
    bvid: string; // 稿件bvid
}

export interface ToViewData {
    count: number,
    list: ToViewListItem[]
}

export interface ToViewResp {
    code: ToViewRespCode,
    message: string,
    ttl: number,
    data: ToViewData
}