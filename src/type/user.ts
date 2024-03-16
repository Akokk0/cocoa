type FansMedal = {
    show: boolean,
    wear: boolean,
    medal: {
        uid: number,
        target_id: number,
        medal_id: number,
        level: number,
        medal_name: string,
        medal_color: number,
        intimacy: number,
        next_intimacy: number,
        day_limit: number,
        today_feed: number,
        medal_color_start: number,
        medal_color_end: number,
        medal_color_border: number,
        is_lighted: number,
        light_status: number,
        wearing_status: number,
        score: number
    }
}

type Official = {
    role: number,
    title: string,
    desc: string,
    type: number
}

type Vip = {
    type: number, // 0无 1月 2年及以上
    status: number, // 0无 1有
    due_date: number,
    vip_pay_type: number,
    theme_type: number,
    label: {
        text: string,
        label_theme: string,
        text_color: string,
        bg_style: number,
        bg_color: string,
        border_color: string,
        use_img_label: boolean,
        img_label_uri_hans: string,
        img_label_uri_hant: string,
        img_label_uri_hans_static: string,
        img_label_uri_hant_static: string
    },
    avatar_subscript: number,
    nickname_color: string,
    role: number, // 1月 3年 7十年 15百年
    avatar_subscript_url: string,
    tv_vip_status: number,
    tv_vip_pay_type: number
}

type Pendant = {
    pid: number,
    name: string,
    image: string,
    expire: number,
    image_enhance: string,
    image_enhance_frame: string
}

type Nameplate = {
    nid: number,
    name: string,
    image: string,
    image_small: string,
    level: string,
    condition: string
}

type UserHonourInfo = {
    mid: number,
    colour: string,
    tags: []
}

type SysNotice = {
    id: number,
    content: string,
    url: string,
    notice_type: number,
    icon: string,
    text_color: string,
    bg_color: string
}

type LiveRoom = {
    roomStatus: number,
    liveStatus: number,
    url: string,
    title: string,
    cover: string,
    watched_show: {
        switch: boolean,
        num: number,
        text_small: string,
        text_large: string,
        icon: string,
        icon_location: string,
        icon_web: string
    },
    roomid: number,
    roundStatus: number,
    broadcast_type: number
}

type School = {
    name: string
}

type Profession = {
    name: string,
    department: string,
    title: string,
    is_show: number
}

type Series = {
    user_upgrade_status: number,
    show_upgrade_window: boolean
}

type Elec = {
    show_info: {
        show: boolean,
        state: number,
        title: string,
        icon: string,
        jump_url: string
    }
}

type Contract = {
    is_display: boolean,
    is_follow_display: boolean
}

type LevelExp = {
    current_level: number,
    current_min: number,
    current_exp: number,
    next_exp: number
}

export interface PersonalInfo {
    mid: number,
    name: string,
    sex: string, // 男/女/保密
    face: string,
    sign: string,
    rank: number,
    level: number,
    jointime: number,
    moral: number,
    silence: number,
    email_status: number,
    tel_status: number,
    identification: number,
    vip: Vip,
    birthday: number,
    is_tourist: number,
    is_fake_account: number,
    pin_prompting: number,
    is_deleted: number,
    coins: number,
    following: number,
    follower: number,
    pendant: Pendant,
    nameplate: Nameplate,
    official: Official,
    level_exp: LevelExp
}

export interface UserInfo {
    mid: number,
    name: string,
    sex: string, // 男/女/保密
    face: string,
    face_nft: 0 | 1, // 0不是 1是
    face_nft_type: number,
    sign: string,
    rank: number,
    level: number,
    jointime: number,
    moral: number,
    silence: number,
    coins: number,
    fans_badge: boolean,
    fans_medal: FansMedal,
    official: Official,
    vip: Vip,
    pendant: Pendant,
    nameplate: Nameplate,
    user_honour_info: UserHonourInfo,
    is_followed :boolean,
    top_photo: string,
    theme: {},
    sys_notice: SysNotice,
    live_room: LiveRoom,
    birthday: string,
    school: School,
    profession: Profession,
    tags: null,
    series: Series,
    is_senior_member: number,
    mcn_info: null,
    gaia_res_type: number,
    gaia_data: null,
    is_risk: boolean,
    elec: Elec,
    contract: Contract
}