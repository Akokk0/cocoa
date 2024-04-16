export interface AllFavoriteInfoListitem {
    id: number,
    fid: number,
    mid: number,
    attr: number,
    title: string,
    fav_state: number,
    media_count: number
}

export interface AllFavoriteInfoData {
    count: number,
    list: AllFavoriteInfoListitem[],
    season: null
}

export interface AllFavoriteInfoResp {
    code: number,
    message: string,
    data: AllFavoriteInfoData | null
}

export enum FavoriteInfoRespCode {
    Success = 0,
    Error = -400,
    AccessDenied = -403
}

export interface UpperInfo {
    mid: number; // 创建者 mid
    name: string; // 创建者昵称
    face: string; // 创建者头像 url
    followed: boolean; // 是否已关注创建者
    vip_type: 0 | 1 | 2; // 会员类别，0：无，1：月大会员，2：年度及以上大会员
    vip_status: 0 | 1; // 会员开通状态，0：无，1：有
}

export interface CNTInfo {
    collect: number,
    play: number,
    thumb_up: number,
    share: number
}

export interface FavoriteInfoDataInfo {
    id: number; // 收藏夹 mlid（完整 id）
    fid: number; // 收藏夹原始 id
    mid: number; // 创建者 mid
    attr: number; // 属性，0：正常，1：失效
    title: string; // 收藏夹标题
    cover: string; // 收藏夹封面图片 url
    upper: UpperInfo; // 创建者信息
    cover_type: number; // 封面图类别
    cnt_info: CNTInfo; // 收藏夹状态数
    type: number; // 类型，一般是 11
    intro: string; // 备注
    ctime: number; // 创建时间，时间戳
    mtime: number; // 收藏时间，时间戳
    state: number; // 状态，一般为 0
    fav_state: 0 | 1; // 收藏夹收藏状态，已收藏收藏夹：1，未收藏收藏夹：0，需要登录
    like_state: 0 | 1; // 点赞状态，已点赞：1，未点赞：0，需要登录
    media_count: number; // 收藏夹内容数量
}

export interface MediasUpperInfo {
    mid: number; // UP主 mid
    name: string; // UP主昵称
    face: string; // UP主头像 URL
}

export interface MediasCNTInfo {
    collect: number; // 收藏数
    play: number; // 播放数
    danmaku: number; // 弹幕数
}

export interface MediasItem {
    id: number; // 内容 id，视频稿件：视频稿件 avid，音频：音频 auid，视频合集：视频合集 id
    type: 2 | 12 | 21; // 内容类型，2：视频稿件，12：音频，21：视频合集
    title: string; // 标题
    cover: string; // 封面 URL
    intro: string; // 简介
    page?: number; // 视频分P数，仅在内容类型为视频稿件时存在
    duration: number; // 音频/视频时长
    upper: MediasUpperInfo; // UP主信息
    attr: 0 | 1 | 9; // 失效，0: 正常；9: UP 自己删除；1: 其他原因删除
    cnt_info: MediasCNTInfo; // 状态数
    link: string; // 跳转 URI
    ctime: number; // 投稿时间，时间戳
    pubtime: number; // 发布时间，时间戳
    fav_time: number; // 收藏时间，时间戳
    bv_id?: string; // 视频稿件 bvid，仅在内容类型为视频稿件时存在
    bvid?: string; // 视频稿件 bvid，仅在内容类型为视频稿件时存在
    season?: null; // 未提供关于季度的信息
}

export interface FavoriteInfoData {
    info: FavoriteInfoDataInfo; // 收藏夹元数据
    medias: MediasItem[]; // 收藏夹内容
    has_more: boolean; // 收藏夹是否有下一页
    ttl: number; // 接口返回时间，时间戳
}

export interface FavoriteInfoResp {
    code: FavoriteInfoRespCode,
    message: string,
    data: FavoriteInfoData | null
}