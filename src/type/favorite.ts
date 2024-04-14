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