export interface BlockListItem {
    id: number; // 封禁公示 id
    uname: string; // 对象用户名
    face: string; // 对象用户头像 URL
    uid: number; // 对象用户 mid
    originTitle: string; // 来源标题
    blockedRemark: string; // 封禁备注
    originUrl: string; // 来源 URL
    originContentModify: string; // 裁决正文
    originType: number; // 来源类型，参见表2
    originTypeName: string; // 来源名
    punishTitle: string; // 公示标题
    punishTime: number; // 处罚时间，时间戳
    punishType: 2 | 3; // 处理手段类型，2：封禁，3：永久封禁
    punishTypeName: string; // 处理手段名
    moralNum: number; // 节操值，被封禁用户节操值均为 0
    blockedDays: number; // 封禁天数，永封为 0
    publishStatus: number; // 1，作用尚不明确
    blockedType: 0 | 1; // 处理来源，0：系统封禁，1：风纪仲裁
    blockedForever: 0 | 1; // 是否永封，0：非永封，1：永封
    reasonType: number; // 封禁原因类型，参见表1
    reasonTypeName: string; // 封禁原因类型名称
    operatorName: string; // 空，作用尚不明确
    caseId: number; // 仲裁信息 id，系统封禁时固定为 0
    ctime: number; // 创建时间，时间戳
    commentSum: number; // 该条目评论数
}

export enum BlockListRespCode {
    Success = 0,
    Error = -400
}

export interface BlockListResp {
    code: number,
    message: string,
    ttl: number,
    data: BlockListItem[]
}