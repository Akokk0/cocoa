export enum DynamicTypes {
    All = 'all',
    Video = 'video',
    PGC = 'pgc',
    Article = 'article'
}

export enum DynamicBasicCommentType {
    DYNAMIC_TYPE_AV = 1,
    DYNAMIC_TYPE_PGC = 1,
    DYNAMIC_TYPE_UGC_SEASON = 1,
    DYNAMIC_TYPE_DRAW = 11,
    DYNAMIC_TYPE_ARTICLE = 12,
    DYNAMIC_TYPE_LIVE_RCMD = 17,
    DYNAMIC_TYPE_FORWARD = 17,
    DYNAMIC_TYPE_WORD = 17,
    DYNAMIC_TYPE_COMMON_SQUARE = 17,
    DYNAMIC_TYPE_MEDIALIST = 19
}

export interface DynamicBasicLikeIcon {
    action_url: string; // 空串
    end_url: string; // 空串
    id: number; // 0
    start_url: string; // 空串
}

export interface DynamicBasic {
    comment_id_str: string; // 根据不同类型，代表视频AV号、剧集分集AV号、动态本身id、相簿id、专栏cv号或收藏夹ml号
    comment_type: DynamicBasicCommentType; // 不同数字代表不同的动态类型
    like_icon: DynamicBasicLikeIcon; // 空对象，具体结构未指定
    rid_str: string; // 类似于comment_id_str，但在某些类型下代表不同的id，如live_id或直播间id
}

export interface ModuleAuthorOfficialVerify {
    desc: string,
    type: number
}

export interface ModuleAuthorPendant {
    expire: number; // 过期时间，此接口返回恒为0
    image: string; // 头像框图片url
    image_enhance: string; // 头像框图片url
    image_enhance_frame: string; // 头像框图片逐帧序列url
    name: string; // 头像框名称
    pid: number; // 头像框id
}

export enum VipAvatarSubscript {
    Hidden = 0, // 不显示
    Show = 1, // 显示
}

export enum VipStatus {
    None = 0, // 无
    Active = 1, // 有
    Unknown = 2, // ？
}

export enum VipType {
    None = 0, // 无
    MonthlyMember = 1, // 月大会员
    AnnualMember = 2, // 年度及以上大会员
}

export enum VipLabelTheme {
    Vip = "vip",
    AnnualVip = "annual_vip",
    TenAnnualVip = "ten_annual_vip",
    HundredAnnualVip = "hundred_annual_vip",
    FoolsDayHundredAnnualVip = "fools_day_hundred_annual_vip",
}

export interface VipLabel {
    bg_color: string; // 会员标签背景颜色
    bg_style: number;
    border_color: string; // 空串
    img_label_uri_hans: string; // 大会员牌子图片 动态版 简体版
    img_label_uri_hans_static: string; // 大会员牌子图片 静态版 简体版
    img_label_uri_hant: string; // 大会员牌子图片 动态版 繁体版
    img_label_uri_hant_static: string; // 大会员牌子图片 静态版 繁体版
    label_theme: VipLabelTheme; // 会员标签
    path: string; // 空串
    text: string; // 会员类型文案
    text_color: string; // 用户名文字颜色
    use_img_label: boolean; // true
}

export interface ModuleAuthorVip {
    avatar_subscript: VipAvatarSubscript; // 是否显示角标，0：不显示，1：显示
    avatar_subscript_url: string; // 空串
    due_date: number; // 大会员过期时间戳，单位：秒
    label: VipLabel; // 大会员标签
    nickname_color: string; // 名字显示颜色，大会员：#FB7299
    status: VipStatus; // 大会员状态，0：无，1：有，2：？
    theme_type: number; // 0
    type: VipType; // 大会员类型，0：无，1：月大会员，2：年度及以上大会员
}

export interface DecorateFan {
    color: string; // 编号颜色
    is_fan: boolean; // 是否是粉丝装扮
    num_str: string; // 装扮编号
    number: number; // 装扮编号
}

export interface ModuleAuthorDecorate {
    card_url: string; // 动态卡片小图标图片URL
    fan: DecorateFan; // 粉丝装扮信息
    id: number; // 装扮ID
    jump_url: string; // 跳转URL
    name: string; // 装扮名称
    type: number; // 1, 2, 3中的一个
}

export interface NFTAvatarBadge {
    region_icon: string; // NFT头像角标URL，类型1和类型2的示例URL已提供
    region_type: number; // NFT头像角标类型，1或2
    show_status: number; // 固定值1
}

export interface ModuleAuthor {
    face: string; // 头像
    face_nft: boolean; // 是否为NFT头像
    following: boolean | null; // 是否关注此UP主，自己的动态为null
    jump_url: string; // 跳转链接
    label: string; // 名称前标签，可能是"合集"、"电视剧"、"番剧"等
    mid: number; // UP主UID或剧集SeasonId
    name: string; // UP主名称、剧集名称或合集名称
    official_verify: ModuleAuthorOfficialVerify; // UP主认证信息
    pendant: ModuleAuthorPendant; // UP主头像框
    pub_action: string; // 更新动作描述，如"投稿了视频"、"直播了"等
    pub_location_text: string; // 空串
    pub_time: string; // 更新时间，如"x分钟前"、"x小时前"、"昨天"
    pub_ts: number; // 更新时间戳，单位：秒
    type: string; // 作者类型
    vip: ModuleAuthorVip; // UP主大会员信息
    decorate: ModuleAuthorDecorate; // 装扮信息
    nft_info: NFTAvatarBadge; // NFT头像信息
}

export interface UpowerLotteryButton {
    jump_style: ButtonJumpStyle,
    jump_url: string,
    type: number
}

export interface UpowerLotteryDesc {
    jump_url: string,
    style: number,
    text: string
}

export interface UpowerLotteryHint {
    style: number,
    text: string
}

export interface AdditionalUpowerLottery {
    button: UpowerLotteryButton,
    desc: UpowerLotteryDesc,
    hint: UpowerLotteryHint,
    jump_url: string,
    rid: number,
    state: number,
    title: string,
    up_mid: number,
    upower_action_state: number,
    upower_level: number
}

export enum ContentType {
    GameAndDecoration = 1,
    Ogv = 2,
}

export interface ButtonJumpStyle {
    // 跳转类型，game和decoration类型特有
    icon_url: string,
    text: string // game 进入 decoration 去看看
}

export interface Check {
    // ogv类型特有
    icon_url: string,
    text: string // ogv: 已追剧 uncheck ogv: 追剧
}

export interface AdditionalButton {
    jump_style: ButtonJumpStyle | null; // 跳转类型，仅game和decoration类型特有
    jump_url: string; // 跳转URL
    type: ContentType; // 类型
    check: Check | null; // ogv类型特有
    status: 1; // 状态
    uncheck: Check | null; // ogv类型特有
}

export interface AdditionalCommon {
    button: AdditionalButton; // 按钮内容
    cover: string; // 左侧封面图
    desc1: string; // 描述1
    desc2: string; // 描述2
    head_text: string; // 卡片头文本
    id_str: string; // 相关id
    jump_url: string; // 跳转URL
    style: number; // 样式编号
    sub_type: 'game' | 'decoration' | 'ogv'; // 子类型
    title: string; // 卡片标题
}

export enum ReservationStatus {
    /* 
        1：未预约，使用uncheck
        2：已预约，使用check 
    */
    Unreserved = 1, // 未预约
    Reserved = 2, // 已预约
}

export enum ReservationType {
    /* 
        1：视频预约，使用jump_style
        2：直播预约，使用check和uncheck
    */
    Video = 1, // 视频预约
    Live = 2, // 直播预约
}

export interface ButtonCheck {
    icon_url: string, // 空串
    text: string // 按钮显示文案
}

export interface ButtonUnCheck {
    icon_url: string, // 显示图标URL
    text: string, // 按钮显示文案
    toast: string, // 预约成功显示提示文案	
    disable: number // 是否不可预约 1：是
}

export interface ReserveButton {
    check: ButtonCheck; // 已预约状态显示内容
    status: ReservationStatus; // 预约状态
    type: ReservationType; // 类型
    uncheck: ButtonUnCheck; // 未预约状态显示内容
    jump_style: ButtonJumpStyle; // 跳转按钮
    jump_url: string; // 跳转URL
}

export interface ReserveDesc1 {
    style: number // 0：视频预约 11-05 20:00 直播 预计今天 17:05发布 1：直播中
    text: string // 显示文案
}

export interface ReserveDesc2 {
    style: number,
    /* 
        显示文案
        2人预约
        743观看
        1.0万人看过
        2151人气
    */
    text: string,
    visible: boolean // true：显示文案 false：显示已结束
}

export interface ReserveDesc3 {
    jump_url: string, // 开奖信息跳转URL
    style: number,
    text: string // 奖品信息显示文案
}

export interface AdditionalReserve {
    button: ReserveButton; // 按钮信息
    desc1: ReserveDesc1; // 预约时间
    desc2: ReserveDesc2; // 预约观看量
    jump_url: string; // 跳转URL
    reserve_total: number; // 预约人数
    rid: number; // 资源ID
    state: number; // 状态，0表示未开始
    stype: number; // 子类型，1或2
    title: string; // 预约标题
    up_mid: number; // 预约发起人UID
    desc3?: ReserveDesc3; // 预约有奖信息，可选字段
}

export interface GoodsItem {
    brief: string; // 商品副标题
    cover: string; // 商品封面
    id: string; // 商品ID
    jump_desc: string; // 跳转按钮显示文案
    jump_url: string; // 跳转URL
    name: string; // 商品名称
    price: string; // 商品价格
}

export interface AdditionalGoods {
    head_icon: string; // 空串
    head_text: string; // 卡片头显示文案
    items: GoodsItem[]; // 商品信息列表
    jump_url: string; // 空串
}

export interface AdditionalVote {
    choice_cnt: number; // 选项数量
    default_share: number; // 是否默认勾选同时分享至动态，1：勾选
    desc: string; // 投票标题
    end_time: number; // 剩余时间，单位：秒
    join_num: number; // 已参与人数
    status: number; // 状态
    type: null; // 类型，此处为null
    uid: number; // 发起人UID
    vote_id: number; // 投票ID
}

export interface AdditionalUGC {
    cover: string; // 封面
    desc_second: string; // 播放量与弹幕数
    duration: string; // 视频长度
    head_text: string; // 空串
    id_str: string; // 视频AV号
    jump_url: string; // 视频跳转URL
    multi_line: boolean; // true
    title: string; // 视频标题
}

export enum AdditionalType {
    NONE = "ADDITIONAL_TYPE_NONE",
    PGC = "ADDITIONAL_TYPE_PGC",
    GOODS = "ADDITIONAL_TYPE_GOODS", // 商品信息
    VOTE = "ADDITIONAL_TYPE_VOTE", // 投票
    COMMON = "ADDITIONAL_TYPE_COMMON", // 一般类型，如游戏
    MATCH = "ADDITIONAL_TYPE_MATCH",
    UP_RCMD = "ADDITIONAL_TYPE_UP_RCMD",
    UGC = "ADDITIONAL_TYPE_UGC", // 视频跳转
    RESERVE = "ADDITIONAL_TYPE_RESERVE", // 直播预约
    LOTTERY = "ADDITIONAL_TYPE_UPOWER_LOTTERY" // 充电抽奖
}

export type ModuleDynamicAdditional = {
    upower_lottery: AdditionalUpowerLottery // 充电抽奖，ADDITIONAL_TYPE_UPOWER_LOTTERY类型独有
    common?: AdditionalCommon; // 一般类型，ADDITIONAL_TYPE_COMMON类型独有
    reserve?: AdditionalReserve; // 预约信息，ADDITIONAL_TYPE_RESERVE类型独有
    goods?: AdditionalGoods; // 商品内容，ADDITIONAL_TYPE_GOODS类型独有
    vote?: AdditionalVote; // 投票信息，ADDITIONAL_TYPE_VOTE类型独有
    ugc?: AdditionalUGC; // 视频信息，ADDITIONAL_TYPE_UGC类型独有
    type: AdditionalType; // 卡片类型，相关内容卡片类型
}

export interface RichTextNodeEmoji {
    icon_url: string; // 表情图片URL
    size: number; // 表情尺寸，1或2
    text: string; // 表情的文字代码
    type: number; // 表情类型，1、2或3
}

export interface RichTextNodeGoods {
    jump_url: string,
    type: number
}

export enum RichTextNodeType {
    NONE = "RICH_TEXT_NODE_TYPE_NONE",
    TEXT = "RICH_TEXT_NODE_TYPE_TEXT",
    AT = "RICH_TEXT_NODE_TYPE_AT",
    LOTTERY = "RICH_TEXT_NODE_TYPE_LOTTERY",
    VOTE = "RICH_TEXT_NODE_TYPE_VOTE",
    TOPIC = "RICH_TEXT_NODE_TYPE_TOPIC",
    GOODS = "RICH_TEXT_NODE_TYPE_GOODS",
    BV = "RICH_TEXT_NODE_TYPE_BV",
    AV = "RICH_TEXT_NODE_TYPE_AV",
    EMOJI = "RICH_TEXT_NODE_TYPE_EMOJI",
    USER = "RICH_TEXT_NODE_TYPE_USER",
    CV = "RICH_TEXT_NODE_TYPE_CV",
    VC = "RICH_TEXT_NODE_TYPE_VC",
    WEB = "RICH_TEXT_NODE_TYPE_WEB",
    TAOBAO = "RICH_TEXT_NODE_TYPE_TAOBAO",
    MAIL = "RICH_TEXT_NODE_TYPE_MAIL",
    OGV_SEASON = "RICH_TEXT_NODE_TYPE_OGV_SEASON",
    OGV_EP = "RICH_TEXT_NODE_TYPE_OGV_EP",
    SEARCH_WORD = "RICH_TEXT_NODE_TYPE_SEARCH_WORD"
}

export interface RichTextNode {
    orig_text: string; // 原始文本
    text: string; // 替换后的文本
    type: RichTextNodeType; // 节点类型，富文本节点类型
    emoji?: RichTextNodeEmoji; // 表情信息，可选字段
    jump_url?: string; // 跳转URL，可选字段
    rid?: string; // 关联id，可选字段
    goods?: RichTextNodeGoods; // 商品信息，可选字段
    icon_name?: string; // 图标名称，如淘宝图标，可选字段
}

export interface ModuleDynamicDesc {
    rich_text_nodes: RichTextNode[],
    text: string
}

export enum MajorType {
    NONE = "DYNAMIC_TYPE_NONE",
    FORWARD = "DYNAMIC_TYPE_FORWARD",
    AV = "DYNAMIC_TYPE_AV",
    PGC = "DYNAMIC_TYPE_PGC",
    COURSES = "DYNAMIC_TYPE_COURSES",
    WORD = "DYNAMIC_TYPE_WORD",
    DRAW = "DYNAMIC_TYPE_DRAW",
    ARTICLE = "DYNAMIC_TYPE_ARTICLE",
    MUSIC = "DYNAMIC_TYPE_MUSIC",
    COMMON_SQUARE = "DYNAMIC_TYPE_COMMON_SQUARE",
    COMMON_VERTICAL = "DYNAMIC_TYPE_COMMON_VERTICAL",
    LIVE = "DYNAMIC_TYPE_LIVE",
    MEDIALIST = "DYNAMIC_TYPE_MEDIALIST",
    COURSES_SEASON = "DYNAMIC_TYPE_COURSES_SEASON",
    COURSES_BATCH = "DYNAMIC_TYPE_COURSES_BATCH",
    AD = "DYNAMIC_TYPE_AD",
    APPLET = "DYNAMIC_TYPE_APPLET",
    SUBSCRIPTION = "DYNAMIC_TYPE_SUBSCRIPTION",
    LIVE_RCMD = "DYNAMIC_TYPE_LIVE_RCMD",
    BANNER = "DYNAMIC_TYPE_BANNER",
    UGC_SEASON = "DYNAMIC_TYPE_UGC_SEASON",
    SUBSCRIPTION_NEW = "DYNAMIC_TYPE_SUBSCRIPTION_NEW"
}

export interface UgcSeasonBadge {
    bg_color: string,
    color: string,
    text: string
}

export interface UgcSeasonStat {
    danmaku: string,
    play: string
}

export interface MajorUgcSeason {
    aid: number; // 视频AV号
    badge: UgcSeasonBadge; // 角标信息
    cover: string; // 视频封面
    desc: string; // 视频简介
    disable_preview: number; // 0
    duration_text: string; // 时长
    jump_url: string; // 跳转URL
    stat: UgcSeasonStat; // 统计信息
    title: string; // 视频标题
}

export interface MajorArticle {
    covers: string[]; // 封面图数组，最多三张
    desc: string; // 文章摘要
    id: number; // 文章CV号
    jump_url: string; // 文章跳转地址
    label: string; // 文章阅读量
    title: string; // 文章标题
}

export interface DrawItem {
    height: number; // 图片高度
    size: number; // 图片大小，单位KB
    src: string; // 图片URL
    tags: string[]; // 图片标签数组
    width: number; // 图片宽度
}

export interface MajorDraw {
    id: number, // 对应相簿id
    items: DrawItem[] // 图片信息列表
}

export interface ArchiveBadge {
    bg_color: string,
    color: string,
    text: string
}

export interface ArchiveStat {
    danmaku: string,
    play: string
}

export interface MajorArchive {
    aid: string; // 视频AV号
    badge: ArchiveBadge; // 角标信息
    bvid: string; // 视频BVID
    cover: string; // 视频封面
    desc: string; // 视频简介
    disable_preview: number; // 0
    duration_text: string; // 视频长度
    jump_url: string; // 跳转URL
    stat: ArchiveStat; // 统计信息
    title: string; // 视频标题
    type: number; // 类型
}

export interface LiveRCMDContent {
    live_play_info: {
        area_id: number,
        area_name: string,
        cover: string,
        link: string,
        live_id: string,
        live_screen_type: number,
        live_start_time: number,
        live_status: number,
        online: number,
        parent_area_id: number,
        parent_area_name: string,
        pendants: {
            list: null
        },
        play_type: number,
        room_id: number,
        room_paid_type: number,
        room_type: number,
        title: string,
        uid: number,
        watched_show: {
            icon: string,
            icon_location: string,
            icon_web: string,
            num: number,
            switch: boolean,
            text_large: string,
            text_small: string
        }
    }
    live_record_info: null,
    type: number
}

export interface MajorLiveRCMD {
    content: string, // 直播间内容JSON
    reserve_type: number // 0
}

export interface CommonBadge {
    bg_color: string; // 背景颜色，此处为空串
    color: string; // 文本颜色，此处为空串
    text: string; // 文本内容，此处为空串
}

export enum SeriesType {
    Anime = 1, // 番剧
    Movie = 2, // 电影
    Documentary = 3, // 纪录片
    DomesticAnimation = 4, // 国创
    TVShow = 5, // 电视剧
    Manga = 6, // 漫画
    VarietyShow = 7, // 综艺
}

export interface MajorCommon {
    badge: CommonBadge; // 角标信息
    biz_type: number; // 0
    cover: string; // 左侧图片封面
    desc: string; // 右侧描述信息
    id: string; // 唯一标识符
    jump_url: string; // 跳转地址
    label: string; // 标签，此处为空串
    sketch_id: string; // 草图ID
    style: number; // 样式编号，1
    title: string; // 右侧标题
}

export interface PGCBadge {
    bg_color: string; // 背景颜色
    color: string; // 字体颜色
    text: string; // 角标文案
}

export interface PGCStat {
    danmaku: string,
    play: string
}

export interface MajorPGC {
    badge: PGCBadge; // 角标信息
    cover: string; // 视频封面
    epid: number; // 分集EpId
    jump_url: string; // 跳转URL
    season_id: number; // 剧集SeasonId
    stat: PGCStat; // 统计信息
    sub_type: SeriesType; // 剧集类型
    title: string; // 视频标题
    type: number; // 类型编号，固定为2
}

export interface CoursesBadge {
    bg_color: string; // 背景颜色
    color: string; // 字体颜色
    text: string; // 角标文案
}

export interface MajorCourses {
    badge: CoursesBadge; // 角标信息
    cover: string; // 封面图URL
    desc: string; // 更新状态描述
    id: number; // 课程id
    jump_url: string; // 跳转URL
    sub_title: string; // 课程副标题
    title: string; // 课程标题
}

export interface MajorMusic {
    cover: string; // 音频封面
    id: number; // 音频AUID
    jump_url: string; // 跳转URL
    label: string; // 音频分类
    title: string; // 音频标题
}

export interface OpusSummary {
    rich_text_nodes: RichTextNode[],
    text: string
}

export interface MajorOpus {
    fold_action: Array<any>; // 展开收起操作数组
    jump_url: string; // 跳转URL
    pics: Array<any>; // 图片信息数组
    summary: OpusSummary; // 动态内容摘要
    title: string | null; // 动态标题，没有标题时为null
}

export interface LiveBadge {
    bg_color: string; // 背景颜色
    color: string; // 字体颜色
    text: string; // 角标文案
}

export interface MajorLive {
    badge: LiveBadge; // 角标信息
    cover: string; // 直播封面
    desc_first: string; // 直播主分区名称
    desc_second: string; // 观看人数
    id: number; // 直播间id
    jump_url: string; // 直播间跳转URL
    live_state: 0 | 1; // 直播状态，0：直播结束，1：正在直播
    reserve_type: 0; // 预留类型字段，当前为0
    title: string; // 直播间标题
}

export interface MajorNone {
    tips: string // 动态失效显示文案 deprecated?
}

export interface ModuleDynamicMajor {
    type: MajorType;
    ugc_season?: MajorUgcSeason; // 合集信息
    article?: MajorArticle; // 专栏类型
    draw?: MajorDraw; // 带图动态
    archive?: MajorArchive; // 视频信息
    live_rcmd?: MajorLiveRCMD; // 直播状态
    common?: MajorCommon; // 一般类型
    pgc?: MajorPGC; // 剧集信息
    courses?: MajorCourses; // 课程信息
    music?: MajorMusic; // 音频信息
    opus?: MajorOpus; // 图文动态
    live?: MajorLive;
    none?: MajorNone; // 动态失效
}

export interface ModuleDynamicTopic {
    id: number; // 话题id
    jump_url: string; // 跳转URL
    name: string; // 话题名称
}

export interface ModuleDynamic {
    additional: ModuleDynamicAdditional; // 相关内容卡片信息
    desc: ModuleDynamicDesc | null; // 动态文字内容，其他动态时为null
    major: ModuleDynamicMajor | null; // 动态主体对象，转发动态时为null
    topic: ModuleDynamicTopic; // 话题信息
}

export interface ThreePointItemModal {
    cancel: string; // 取消按钮文本，例如"我点错了"
    confirm: string; // 确认按钮文本，例如"删除"
    content: string; // 提示内容，例如"确定要删除此条动态吗？"
    title: string; // 标题，例如"删除动态"
}

export interface ThreePointItemParams {
    dynamic_id: string; // 当前动态ID，可能已弃用
    status: boolean; // 当前动态是否处于置顶状态，可能已弃用
}

export interface ThreePointItem {
    label: string; // 显示文本
    type: string; // 类型
    modal?: ThreePointItemModal; // 弹出框信息，删除动态时弹出，可选字段
    params?: ThreePointItemParams; // 参数，置顶/取消置顶时使用，可选字段
}

export interface ModuleMore {
    three_point_items: ThreePointItem[]
}

export interface ModuleStatComment {
    count: number; // 评论数
    forbidden: boolean; // 是否禁止评论，此处固定为false
    hidden: boolean; // 是否隐藏评论功能，直播类型动态可能会隐藏
}

export interface ModuleStatForward {
    count: number; // 转发数
    forbidden: boolean; // 是否禁止转发，此处固定为false
}

export interface ModuleStatLike {
    count: number; // 点赞数
    forbidden: boolean; // 是否禁止点赞，此处固定为false
    status: boolean; // 当前用户是否点赞
}

export interface ModuleStat {
    comment: ModuleStatComment; // 评论数据
    forward: ModuleStatForward; // 转发数据
    like: ModuleStatLike; // 点赞数据
}

export interface InteractionItemRichTextNode {
    orig_text: string; // 原始文本
    rid: string; // 关联ID，通常是用户UID
    text: string; // 替换后的文本
    type: RichTextNodeType; // 富文本节点类型
    emoji?: RichTextNodeEmoji; // 可选的表情信息
}

export interface InteractionItemDesc {
    rich_text_nodes: InteractionItemRichTextNode[],
    text: string
}

export interface InteractionItem {
    desc: InteractionItemDesc; // 点赞/评论信息
    type: number; // 类型，0：点赞信息，1：评论信息
}

export interface ModuleInteraction {
    items: InteractionItem[]
}

export interface ModuleFold {
    ids: any[]; // 被折叠的动态id列表
    statement: string; // 显示文案，例如“展开x条相关动态”
    type: number; // 类型标识，此处为1
    users: any[]; // 空数组，表示相关用户信息（此场景下未使用）
}

export interface ModuleDispute {
    desc: string; // 描述文本
    jump_url: string; // 跳转链接
    title: string; // 提醒文案，例如：“视频内含有危险行为，请勿模仿”
}

export interface ModuleTag {
    text?: string // 置顶，置顶动态出现这个对象，否则没有
}

export interface DynamicModules {
    module_author: ModuleAuthor; // UP主信息
    module_dynamic: ModuleDynamic; // 动态内容信息
    module_more: ModuleMore; // 动态右上角三点菜单
    module_stat: ModuleStat; // 动态统计数据
    module_interaction: ModuleInteraction; // 热度评论
    module_fold: ModuleFold; // 动态折叠信息
    module_dispute: ModuleDispute; // 争议小黄条
    module_tag: ModuleTag; // 置顶信息
}

export enum DynamicType {
    NONE = "DYNAMIC_TYPE_NONE",
    FORWARD = "DYNAMIC_TYPE_FORWARD",
    AV = "DYNAMIC_TYPE_AV",
    PGC = "DYNAMIC_TYPE_PGC",
    COURSES = "DYNAMIC_TYPE_COURSES",
    WORD = "DYNAMIC_TYPE_WORD",
    DRAW = "DYNAMIC_TYPE_DRAW",
    ARTICLE = "DYNAMIC_TYPE_ARTICLE",
    MUSIC = "DYNAMIC_TYPE_MUSIC",
    COMMON_SQUARE = "DYNAMIC_TYPE_COMMON_SQUARE",
    COMMON_VERTICAL = "DYNAMIC_TYPE_COMMON_VERTICAL",
    LIVE = "DYNAMIC_TYPE_LIVE",
    MEDIALIST = "DYNAMIC_TYPE_MEDIALIST",
    COURSES_SEASON = "DYNAMIC_TYPE_COURSES_SEASON",
    COURSES_BATCH = "DYNAMIC_TYPE_COURSES_BATCH",
    AD = "DYNAMIC_TYPE_AD",
    APPLET = "DYNAMIC_TYPE_APPLET",
    SUBSCRIPTION = "DYNAMIC_TYPE_SUBSCRIPTION",
    LIVE_RCMD = "DYNAMIC_TYPE_LIVE_RCMD",
    BANNER = "DYNAMIC_TYPE_BANNER",
    UGC_SEASON = "DYNAMIC_TYPE_UGC_SEASON",
    SUBSCRIPTION_NEW = "DYNAMIC_TYPE_SUBSCRIPTION_NEW"
}

export interface DynamicItem {
    basic: DynamicBasic; // 动态的基本信息，具体结构依据实际数据定义
    id_str: string; // 动态id
    modules: DynamicModules; // 动态信息，具体结构依据实际数据定义
    type: DynamicType; // 动态类型
    visible: boolean; // 是否显示，true表示正常显示，false表示折叠动态
    orig?: DynamicItem; // 原动态信息，仅动态类型为DYNAMIC_TYPE_FORWARD的情况下存在，可选字段
}

export enum DynamicListRespCode {
    SUCCESS = 0,
    NOT_LOGIN = -101
}

export interface DynamicListResp {
    code: DynamicListRespCode,
    message: string,
    ttl: number,
    data: {
        has_more: boolean,
        items: DynamicItem[],
        offset: string,
        update_baseline: string,
        update_num: number
    }
}

export enum RecentUpdatedDynamicUpInfoRespCode {
    SUCCESS = 0,
    NOT_LOGIN = -101
}

export interface LevelInfo {
    current_level: number; // 当前等级，范围0-6级
    current_min: number; // 当前最小经验值，始终为0
    current_exp: number; // 当前经验值
    next_exp: number; // 升级所需的下一级经验值
}

export interface MyInfoOfficial {
    role: number; // 认证类型，根据用户认证类型一览确定
    title: string; // 认证信息，如果没有则为空
    desc: string; // 认证备注，如果没有则为空
    type: number; // 是否认证，-1为无，0为已认证
}

export interface MyInfoVip {
    type: number; // 会员类型：0为无，1为月大会员，2为年度及以上大会员
    status: number; // 会员状态：0为无，1为有
    due_date: number; // 会员过期时间，Unix时间戳（毫秒）
    vip_pay_type: number; // 支付类型：0为未支付，1为已支付
    theme_type: number; // 主题类型，作用尚不明确，固定为0
    label: VipLabel; // 会员标签
    avatar_subscript: number; // 是否显示会员图标：0为不显示，1为显示
    nickname_color: string; // 会员昵称颜色，例如#FB7299
    role: number; // 大角色类型：1月度大会员，3年度大会员，7十年大会员，15百年大会员
    avatar_subscript_url: string; // 大会员角标地址
    tv_vip_status: number; // 电视大会员状态：0为未开通
    tv_vip_pay_type: number; // 电视大会员支付类型
}

export interface RecentUpdatedMyInfo {
    dyns: number; // 个人动态数量
    face: string; // 头像URL
    face_nft: number; // 不明，可能表示是否为NFT头像
    follower: number; // 粉丝数量
    following: number; // 关注数量
    level_info: LevelInfo; // 用户等级信息
    mid: number; // 账户mid
    name: string; // 账户名称
    offcial: MyInfoOfficial; // 认证信息
    space_bg: string; // 个人中心背景横幅URL
    vip: MyInfoVip; // VIP信息
}

export interface RecentUpdatedUpListItem {
    face: string; // UP主头像
    has_update: boolean; // 最近是否有更新
    is_reserve_recall: boolean; // 作用不明
    mid: number; // UP主mid
    uname: string; // UP主昵称
}

export interface RecentUpdatedDynamicUpInfoResp {
    code: RecentUpdatedDynamicUpInfoRespCode,
    data: {
        live_users: null,
        my_info: RecentUpdatedMyInfo,
        up_list: RecentUpdatedUpListItem[]
    },
    message: string,
    ttl: number
}