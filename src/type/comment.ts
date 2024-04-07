export enum CommentRespCode {
    Success = 0,
    BadRequest = -400,
    NotFound = -404,
    CommentClosed = 12002,
    InvalidCommentType = 12009,
}

export interface CommentCursor {
    // Define cursor properties here
    all_count: number; // 全部评论条数
    is_begin: boolean; // 是否为第一页
    prev: number; // 上页页码
    next: number; // 下页页码
    is_end: boolean; // 是否为最后一页
    mode: number; // 排序方式
    show_type: number; // 不明确的显示类型
    support_mode: number[]; // 支持的排序方式数组
    name: string; // 评论区类型名
}

export interface CommentNotice {
    // Define notice properties here
    content: string; // 公告正文
    id: number; // 公告 id
    link: string; // 公告页面链接 URL
    title: string; // 公告标题
}

export interface LevelInfo {
    // Structure for sender's level
    current_level: number; // 用户等级
    current_min: number; // 当前最小经验值，始终为0
    current_exp: number; // 当前经验值
    next_exp: number; // 下一级所需经验值
}

export interface Pendant {
    // Structure for sender's avatar frame information
    pid: number; // 头像框 id
    name: string; // 头像框名称
    image: string; // 头像框图片 url
    expire: number; // 过期时间，0表示永久
    image_enhance: string; // 加强版头像框图片 url
    image_enhance_frame: string; // 可能表示特殊动画或效果的头像框图片 url，用法未明确
}

export interface Nameplate {
    // Structure for sender's badge information
    nid: number; // 勋章id
    name: string; // 勋章名称
    image: string; // 挂件图片URL（正常大小）
    image_small: string; // 勋章图片URL（小尺寸）
    level: string; // 勋章等级
    condition: string; // 获得勋章的条件
}

export interface OfficialVerify {
    // Structure for sender's verification information
    type: number; // 是否认证：-1为无，0为个人认证，1为机构认证
    desc: string; // 认证信息，没有则为空
}

export interface VipLabelInfo {
    path: string; // 用途未明确
    text: string; // 会员类型文案
    label_theme: 'vip' | 'annual_vip' | 'ten_annual_vip' | 'hundred_annual_vip'; // 会员类型
    text_color: string; // 文字颜色
    bg_style: number; // 背景样式，具体含义未明确
    bg_color: string; // 背景颜色
    border_color: string; // 描边颜色
}

export interface VipInfo {
    // Structure for sender's VIP information
    vipType: number; // 大会员类型：0为无，1为月会员，2为年以上会员
    vipDueDate: number; // 大会员到期时间，毫秒时间戳
    dueRemark: string; // 未明确的到期备注
    accessStatus: number; // 访问状态，具体含义未明确
    vipStatus: number; // 大会员状态：0为无，1为有
    vipStatusWarn: string; // 大会员状态警告，具体含义未明确
    theme_type: number; // 会员样式ID
    label: VipLabelInfo; // 会员铭牌样式
    avatar_subscript: number; // 头像下标，具体含义未明确
    avatar_subscript_url: string; // 头像下标URL，具体含义未明确
    nickname_color: string; // 昵称颜色
}

export interface FanDetail {
    // Structure for sender's fan label
    uid: number; // 用户 mid
    medal_id: number; // 粉丝标签 id
    medal_name: string; // 粉丝标签名
    score: number; // 分数，用途未明确
    level: number; // 当前标签等级
    intimacy: number; // 亲密度，具体含义未明确
    master_status: number; // 主播状态，具体含义未明确
    is_receive: number; // 是否接收，具体含义未明确
}

export interface UserSailingPendant {
    id: number; // 头像框 id
    name: string; // 头像框名称
    image: string; // 头像框图片 url
    jump_url: string; // 跳转url，此处为空
    type: 'suit' | 'vip_suit'; // 装扮类型，一般装扮或vip装扮
    image_enhance: string; // 加强版图片url，用途未明确
    image_enhance_frame: string; // 图片加强帧url，用途未明确
}

export interface CardbgFan {
    is_fan: number; // 是否为粉丝专属装扮，0为否，1为是
    number: number; // 粉丝专属编号
    color: string; // 数字颜色，颜色码
    name: string; // 装扮名称
    num_desc: string; // 粉丝专属编号，字符串格式
}

export interface UserSailingCardbg {
    id: number; // 评论条目装扮id
    name: string; // 评论条目装扮名称
    image: string; // 评论条目装扮图片url
    jump_url: string; // 评论条目装扮商城页面url
    fan: CardbgFan; // 粉丝专属信息
    type: 'suit' | 'vip_suit'; // 装扮类型
}

export interface UserSailing {
    // Structure for sender's comment entry decoration information
    pendant: object | null; // 头像框信息
    cardbg: object | null; // 评论卡片装扮信息
    cardbg_with_focus: null; // 具体用途未明确
}

export interface CommenterInfo {
    mid: string;
    uname: string;
    sex: '男' | '女' | '保密';
    sign: string;
    avatar: string;
    rank: string;
    DisplayRank: string;
    level_info: LevelInfo;
    pendant: Pendant;
    nameplate: Nameplate;
    official_verify: OfficialVerify;
    vip: VipInfo;
    fans_detail: FanDetail | null;
    following: number;
    is_followed: number;
    user_sailing: UserSailing;
    is_contractor: boolean;
    contract_desc: string;
}

export interface EmoticonEscapeCharacterMeta {
    // Define properties of meta object here
    size: number // 1小 2大
    alias: string // 简写名
}

export interface EmoticonEscapeCharacter {
    id: number;
    package_id: number;
    state: number;
    type: 1 | 2 | 3 | 4;
    attr?: number; // Optional as its purpose is unclear
    text: string;
    url: string;
    meta: EmoticonEscapeCharacterMeta;
    mtime: number;
    jump_title: string;
}

// Define emote properties here, possibly including id, text, url, etc.
export interface Emote {
    // [key: EmoticonEscapeCharacter]: object
    [key: string]: EmoticonEscapeCharacter
}

export interface JumpUrl {
    // Define properties for highlighted hyperlinks
}

export interface Picture {
    // Define picture properties here, such as src, width, height, etc.
    img_src: string; // 图片地址
    img_width: number; // 图片宽度
    img_height: number; // 图片高度
    img_size: number; // 图片大小，单位KB
}

export interface CommentContent {
    message: string;
    plat: 1 | 2 | 3 | 4;
    device: string;
    members: CommenterInfo[];
    emote: Emote;
    jump_url: JumpUrl;
    max_line: number;
    pictures: Picture[];
}

export interface CommentItem {
    // Define reply properties here
    rpid: number;
    oid: number;
    type: number;
    mid: number;
    root: number;
    parent: number;
    dialog: number;
    count: number;
    rcount: number;
    floor: number;
    state: number;
    fansgrade: number;
    attr: number;
    ctime: number;
    rpid_str: string;
    root_str: string;
    parent_str: string;
    like: number;
    action: number;
    member: CommenterInfo; // Consider defining a more detailed structure for member info
    content: CommentContent; // Consider defining a more detailed structure for content
    replies: CommentItem[] | null;
    assist: number;
    folder: CommentFolder;
    up_action: CommentUpAction;
    show_follow: boolean;
    invisible: boolean;
    card_label: CommentCardLabel; // Consider defining a more detailed structure for card_label
    reply_control: CommentReplyControl; // Consider defining a more detailed structure for reply_control
}

export interface CommentFolder {
    // Define folder properties here
    has_folded: boolean; // Indicates if there are folded secondary comments
    is_folded: boolean; // Indicates if the comment itself is folded
    rule: string; // URL to the page with related rules
}

export interface CommentUpAction {
    like: boolean; // Indicates if the UP主 appreciates the comment
    reply: boolean; // Indicates if the UP主 has replied to the comment
}

export interface CommentCardLabel {
    rpid: number; // 评论 rpid
    text_content: string; // 标签文本，如"妙评"
    text_color_day: string; // 日间文本颜色
    text_color_night: string; // 夜间文本颜色
    label_color_day: string; // 日间标签颜色
    label_color_night: string; // 夜间标签颜色
    image: string; // 图片的作用不明
    type: string; // 类型作用不明
    background: string; // 背景图片url
    background_width: number; // 背景图片宽度
    background_height: number; // 背景图片高度
    jump_url: string; // 跳转链接
    effect: number; // 效果作用不明
    effect_start_time: number; // 效果开始时间
}

export interface CommentReplyControl {
    sub_reply_entry_text: string; // 提示共有多少条回复
    sub_reply_title_text: string; // 提示相关回复的总数
    time_desc: string; // 显示评论发布时间
    location: string; // 显示评论者的IP属地，需登录后可见
}

export interface CommentConfig {
    // Define config properties here
    showadmin: number; // 是否显示管理置顶
    showentry: number; // 未详细说明的功能
    showfloor: number; // 是否显示楼层号
    showtopic: number; // 是否显示话题
    show_up_flag: boolean; // 是否显示“UP 觉得很赞”标志
    read_only: boolean; // 评论区是否只读
    show_del_log: boolean; // 是否显示删除记录
}

export interface UpMasterInfo {
    // Refer to previously defined UpMasterInfo
    mid: number
}

export interface DataControl {
    input_disable: boolean; // The purpose of this field is unclear
    root_input_text: string; // Text for the main comment input box
    child_input_text: string; // Text for the reply input box
    bg_text: string; // Text displayed in an empty comment section
    web_selection: boolean; // Indicates if comments are visible after selection/filtering
    answer_guide_text: string; // Text for the link to the answer page
    answer_guide_icon_url: string; // URL for the icon of the answer page
    answer_guide_ios_url: string; // URL for the iOS version of the answer page
    answer_guide_android_url: string; // URL for the Android version of the answer page
}

export interface DataTop {
    admin: CommentItem | null
    upper: CommentItem | null
    vote: CommentItem | null
}

export interface DataUpSelection {
    pending_count: number,
    ignore_count: number
}

export interface CommentData {
    cursor: CommentCursor;
    hots: CommentItem[] | null;
    notice: CommentNotice | null;
    replies: CommentItem[] | null;
    top: DataTop; // Use a specific export interface if you have details for top info
    top_replies: CommentItem[]; // Detailed structure as per table
    lottery_card: null; // Specify if there's a structure for non-null values
    folder: CommentFolder;
    up_selection: DataUpSelection; // Define structure if known
    cm: object; // Advertising info, define further if needed
    cm_info: object; // Advertising control info
    effects: object; // Effects info, define further if needed
    assist: number;
    blacklist: number;
    vote: number;
    lottery: number;
    config: CommentConfig;
    upper: UpMasterInfo;
    show_bvid: boolean;
    control: DataControl; // Comment area input properties, define further if needed
}

export interface CommentResp {
    code: CommentRespCode; // 响应码，表示结果状态
    message: string; // 错误信息，默认为"0"表示请求成功
    ttl: number; // 通常设置为1
    data: CommentData; // 数据主体，成功时为对象，错误时为null
}

/* export interface CommentResp {
    code: CommentRespCode;
    message: string;
    ttl: number;
    data: CommentData;
}

export interface CommentData {
    cursor: Cursor;
    replies: Reply[];
    top: Top;
    top_replies: any[];
    up_selection: UpSelection;
    effects: Effects;
    assist: number;
    blacklist: number;
    vote: number;
    config: Config;
    upper: Upper;
    control: Control;
    note: number;
    callbacks: null;
    esports_grade_card: null;
    context_feature: string;
}

export interface Cursor {
    is_begin: boolean;
    prev: number;
    next: number;
    is_end: boolean;
    mode: number;
    mode_text: string;
    all_count: number;
    support_mode: number[];
    name: string;
    pagination_reply: PaginationReply;
    session_id: string;
}

export interface PaginationReply {
    next_offset: string;
}

export interface Reply {
    rpid: number;
    oid: number;
    type: number;
    mid: number;
    root: number;
    parent: number;
    dialog: number;
    count: number;
    rcount: number;
    state: number;
    fansgrade: number;
    attr: number;
    ctime: number;
    mid_str: string;
    oid_str: string;
    rpid_str: string;
    root_str: string;
    parent_str: string;
    dialog_str: string;
    like: number;
    action: number;
    member: Member;
    content: Content;
    replies: any[];
    assist: number;
    up_action: UpAction;
    invisible: boolean;
    reply_control: ReplyControl;
    folder: Folder;
    dynamic_id_str: string;
    note_cvid_str: string;
    track_info: string;
}

export interface Member {
    mid: string;
    uname: string;
    sex: string;
    sign: string;
    avatar: string;
    rank: string;
    face_nft_new: number;
    is_senior_member: number;
    senior: Senior;
    level_info: LevelInfo;
    pendant: Pendant;
    nameplate: Nameplate;
    official_verify: OfficialVerify;
    vip: Vip;
    fans_detail: null;
    user_sailing: null;
    is_contractor: boolean;
    contract_desc: string;
    nft_interaction: null;
    avatar_item: AvatarItem;
}

export interface Senior {
    status: number;
}

export interface LevelInfo {
    current_level: number;
    current_min: number;
    current_exp: number;
    next_exp: number;
}

export interface Pendant {
    pid: number;
    name: string;
    image: string;
    expire: number;
    image_enhance: string;
    image_enhance_frame: string;
    n_pid: number;
}

export interface Nameplate {
    nid: number;
    name: string;
    image: string;
    image_small: string;
    level: string;
    condition: string;
}

export interface OfficialVerify {
    type: number;
    desc: string;
}

export interface Vip {
    vipType: number;
    vipDueDate: number;
    dueRemark: string;
    accessStatus: number;
    vipStatus: number;
    vipStatusWarn: string;
    themeType: number;
    label: VipLabel;
    avatar_subscript: number;
    nickname_color: string;
}

export interface VipLabel {
    path: string;
    text: string;
    label_theme: string;
    text_color: string;
    bg_style: number;
    bg_color: string;
    border_color: string;
    use_img_label: boolean;
    img_label_uri_hans: string;
    img_label_uri_hant: string;
    img_label_uri_hans_static: string;
    img_label_uri_hant_static: string;
}

export interface AvatarItem {
    container_size: ContainerSize;
    fallback_layers: FallbackLayers;
    mid: string;
}

export interface ContainerSize {
    width: number;
    height: number;
}

export interface FallbackLayers {
    layers: Layer[];
    is_critical_group: boolean;
}

export interface Layer {
    visible: boolean;
    general_spec: GeneralSpec;
    layer_config: LayerConfig;
    resource: Resource;
}

export interface GeneralSpec {
    pos_spec: PosSpec;
    size_spec: SizeSpec;
    render_spec: RenderSpec;
}

export interface PosSpec {
    coordinate_pos: number;
    axis_x: number;
    axis_y: number;
}

export interface SizeSpec {
    width: number;
    height: number;
}

export interface RenderSpec {
    opacity: number;
}

export interface LayerConfig {
    tags: Tags;
    is_critical: boolean;
    layer_mask: LayerMask;
}

export interface Tags {
    AVATAR_LAYER: {};
}

export interface LayerMask {
    general_spec: GeneralSpec;
    mask_src: MaskSrc;
}

export interface MaskSrc {
    src_type: number;
    draw: Draw;
}

export interface Draw {
    draw_type: number;
    fill_mode: number;
    color_config: ColorConfig;
}

export interface ColorConfig {
    day: Day;
}

export interface Day {
    argb: string;
}

export interface Resource {
    res_type: number;
    res_image: ResImage;
}

export interface ResImage {
    image_src: ImageSrc;
}

export interface ImageSrc {
    src_type: number;
    placeholder: number;
    remote: Remote;
}

export interface Remote {
    url: string;
    bfs_style: string;
}

export interface Content {
    message: string;
    members: any[];
    jump_url: {};
    max_line: number;
}

export interface UpAction {
    like: boolean;
    reply: boolean;
}

export interface ReplyControl {
    max_line: number;
    time_desc: string;
    location: string;
}

export interface Folder {
    has_folded: boolean;
    is_folded: boolean;
    rule: string;
}

export interface Top {
    admin: null;
    upper: null;
    vote: null;
}

export interface UpSelection {
    pending_count: number;
    ignore_count: number;
}

export interface Effects {
    preloading: string;
}

export interface Config {
    showtopic: number;
    show_up_flag: boolean;
    read_only: boolean;
}

export interface Upper {
    mid: number;
}

export interface Control {
    input_disable: boolean;
    root_input_text: string;
    child_input_text: string;
    giveup_input_text: string;
    screenshot_icon_state: number;
    upload_picture_icon_state: number;
    answer_guide_text: string;
    answer_guide_icon_url: string;
    answer_guide_ios_url: string;
    answer_guide_android_url: string;
    bg_text: string;
    empty_page: null;
    show_type: number;
    show_text: string;
    web_selection: boolean;
    disable_jump_emote: boolean;
    enable_charged: boolean;
    enable_cm_biz_helper: boolean;
    preload_resources: null;
} */