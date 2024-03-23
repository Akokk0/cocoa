export interface DynamicListResp {
    code: number,
    message: string,
    ttl: number,
    data: {
        has_more: boolean,
        items: [],
        offset: string,
        update_baseline: string,
        update_num: number
    }
}