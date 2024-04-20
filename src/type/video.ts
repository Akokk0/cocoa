export enum VideoQuality {
    "240P_Extreme" = 6, // 240P 极速，仅 MP4 格式支持，仅 platform=html5 时有效
    "360P_Smooth" = 16, // 360P 流畅
    "480P_Crisp" = 32, // 480P 清晰
    "720P_HD" = 64, // 720P 高清，WEB 端默认值，B站前端需要登录才能选择，但是直接发送请求可以不登录就拿到 720P 的取流地址，无 720P 时则为 720P60
    "720P60_HighFrameRate" = 74, // 720P60 高帧率，登录认证
    "1080P_HD" = 80, // 1080P 高清，TV 端与 APP 端默认值，登录认证
    "1080P_HighBitrate" = 112, // 1080P+ 高码率，大会员认证
    "1080P60_HighFrameRate" = 116, // 1080P60 高帧率，大会员认证
    "4K_UltraHD" = 120, // 4K 超清，需要 fnval&128=128 且 fourk=1，大会员认证
    "HDR_TrueColor" = 125, // HDR 真彩色，仅支持 DASH 格式，需要 fnval&64=64，大会员认证
    "DolbyVision" = 126, // 杜比视界，仅支持 DASH 格式，需要 fnval&512=512，大会员认证
    "8K_UltraHighDefinition" = 127 // 8K 超高清，仅支持 DASH 格式，需要 fnval&1024=1024，大会员认证
}

export enum VideoFormat {
    "FLV" = 0, // FLV 格式，已下线，仅 H.264 编码，部分老视频存在分段现象，与 MP4、DASH 格式互斥
    "MP4" = 1, // MP4 格式，仅 H.264 编码，与 FLV、DASH 格式互斥
    "DASH" = 16, // DASH 格式，与 MP4、FLV 格式互斥
    "Require_HDR_Video" = 64, // 是否需求 HDR 视频，需求 DASH 格式，仅 H.265 编码，需要 qn=125，大会员认证
    "Require_4K_Resolution" = 128, // 是否需求 4K 分辨率，该值与 fourk 字段协同作用，需要 qn=120，大会员认证
    "Require_Dolby_Audio" = 256, // 是否需求杜比音频，需求 DASH 格式，大会员认证
    "Require_Dolby_Vision" = 512, // 是否需求杜比视界，需求 DASH 格式，大会员认证
    "Require_8K_Resolution" = 1024, // 是否需求 8K 分辨率，需求 DASH 格式，需要 qn=127，大会员认证
    "Require_AV1_Encoding" = 2048 // 是否需求 AV1 编码，需求 DASH 格式
}

export enum VideoEncode {
    "AVC" = 7, // AVC 编码 8K 视频不支持该格式
    "HEVC" = 12, // HEVC 编码
    "AV1" = 13 // AV1 编码
}

export enum AudioQuality {
    "64K" = 30216, // 64K
    "132K" = 30232, // 132K
    "192K" = 30280, // 192K
    "Dolby_Atmos" = 30250, // 杜比全景声
    "Hi_Res_Lossless" = 30251 // Hi-Res无损
}

export enum VideoStreamRespCode {
    Success = 0,
    Error = -400,
    NoVideo = -404,
}

export interface SupportFormats {
    // 视频分段流信息的具体字段定义
    quality: number; // 视频清晰度代码，含义见上表
    format: string; // 视频格式
    new_description: string; // 格式描述
    display_desc: string; // 格式描述
    superscript: string; // (?)
    codecs: string[]; // 可用编码格式列表
}

export interface Durl {
    order: number; // 视频分段序号，某些视频会分为多个片段（从1顺序增长）
    length: number; // 视频长度，单位为毫秒
    size: number; // 视频大小，单位为 Byte
    ahead: string; // (?)
    vhead: string; // (?)
    url: string; // 默认流 URL，注意 unicode 转义符，有效时间为 120 分钟
    backup_url: string[]; // 备用视频流
}

export interface DashStreamInfo {
    duration: number; // 视频长度，单位为秒
    minBufferTime: number; // 最小缓冲时间
    min_buffer_time: number; // 最小缓冲时间
    video: DashVideoAndAudioStreamInfo[]; // 视频流信息
    audio: DashVideoAndAudioStreamInfo[] | null; // 伴音流信息，当视频没有音轨时，此项为 null
    dolby: DolbyStreamInfo | null; // 杜比全景声伴音信息
    flac: FlacStreamInfo | null; // 无损音轨伴音信息，当视频没有无损音轨时，此项为 null
}

export interface SegmentBaseInfo {
    initialization: string,
    index_range: string
}

export interface DashVideoAndAudioStreamInfo {
    // 视频流信息的具体字段定义
    id: number; // 音视频清晰度代码，参考上表
    qn: number; // 视频清晰度标识
    // 视频伴音音质代码，如果有的话
    baseUrl: string; // 默认流 URL，注意 unicode 转义符，有效时间为 120min
    base_url: string; // 同上
    backupUrl: string[]; // 备用流 URL
    backup_url: string[]; // 同上
    bandwidth: number; // 所需最低带宽，单位为 Byte
    mimeType: string; // 格式 mimetype 类型
    mime_type: string; // 同上
    codecs: string; // 编码/音频类型，eg：avc1.640032
    width?: number; // 视频宽度，单位为像素，仅视频流存在该字段
    height?: number; // 视频高度，单位为像素，仅视频流存在该字段
    frameRate?: string; // 视频帧率，仅视频流存在该字段
    frame_rate?: string; // 同上
    sar?: string; // Sample Aspect Ratio（单个像素的宽高比），音频流该值恒为空
    startWithSap?: number; // Stream Access Point（流媒体访问位点），音频流该值恒为空
    start_with_sap?: number; // 同上
    SegmentBase?: SegmentBaseInfo; // 见下表，url 对应 m4s 文件中，头部的位置，音频流该值恒为空
    segment_base?: SegmentBaseInfo; // 同上
    codecid: number; // 码流编码标识代码，含义见 上表，音频流该值恒为0
}

export interface AudioItem {
    display: boolean, // 是否在播放器显示切换Hi-Res无损音轨按钮
    audio: DashVideoAndAudioStreamInfo // 音频流信息
}

export interface DolbyStreamInfo {
    // 杜比全景声伴音信息的具体字段定义
    type: number; // 杜比全景声类型代码 1：普通杜比音效 2：全景杜比音效
    audio: AudioItem[]
}

export interface FlacStreamInfo {
    // 无损音轨伴音信息的具体字段定义
}

export interface VideoStreamData {
    from: string; // 来源
    result: string; // 操作结果
    message: string; // 消息
    quality: number; // 清晰度标识，含义见上表
    format: string; // 视频格式
    timelength: number; // 视频长度，单位为毫秒
    accept_format: string; // 支持的全部格式，每项用逗号分隔
    accept_description: string[]; // 支持的清晰度列表（文字说明）
    accept_quality: number[]; // 支持的清晰度列表（代码），含义见上表
    video_codecid: number; // 默认选择视频流的编码 id，含义见上表
    seek_param: string; // seek 参数，start？
    seek_type: "offset" | "second"; // seek 类型，offset（DASH / FLV）？second（MP4）？
    durl?: Durl[]; // 视频分段流信息，仅在 FLV / MP4 格式存在此字段
    dash?: DashStreamInfo; // DASH 流信息，仅在 DASH 格式存在此字段
    support_formats: SupportFormats[]; // 支持格式的详细信息
    high_format?: null; // 高清格式（？）
    last_play_time: number; // 上次播放进度，毫秒值
    last_play_cid: number; // 上次播放分P的 cid
}

export interface VideoStreamResp {
    code: VideoStreamRespCode
    data: VideoStreamData
    message: string
    ttl: number
}

export enum VideoPageListRespCode {
    Success = 0,
    Error = -400,
    NoVideo = -404,
}

export interface VideoPageListDataItem {
    
}

export interface VideoPageListResp {
    code: VideoPageListRespCode
    message: string
    ttl: number
    data: VideoPageListDataItem[]
}