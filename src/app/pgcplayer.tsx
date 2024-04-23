import { getPgcStream } from "@/api/biliApi"
import { PGCResp, PGCRespCode, PGCResult } from "@/type/pgc"
import { VideoQuality } from "@/type/video"
import DPlayer from "dplayer"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"

const PGCPlayer: React.FC = () => {
    // Params
    const { ep_id } = useParams()

    console.log(ep_id);
    // State
    const [pgcStreamInfo, setPgcStreamInfo] = useState<PGCResult>()
    // Func
    const getPgcStreamResp = async (
        params:
            {
                avid?: number, // 稿件avid 非必要	
                bvid?: string, // 稿件bvid 非必要
                ep_id?: number, // 稿件epid 必要（可选）
                cid?: number, // 视频cid 必要（可选）
                qn?: VideoQuality, // 视频清晰度选择 非必要
                fnval?: number, // 视频获取方式选择 非必要
                fnver?: number, // 0 非必要 固定为0
                fourk?: number, // 是否允许4K视频 非必要 默认为0 画质最高1080P：0 画质最高4K：1
                session?: string, // 非必要 从视频播放页的网页源码中获取
                from_client?: string, // BROWSER 非必要
                drm_tech_type?: number // 2 非必要
            }
    ) => {
        // Send request to get popular content
        const pgcStreamResp = JSON.parse(await getPgcStream(params) as string) as PGCResp

        console.log(pgcStreamResp);
        // Check if request is error
        if (pgcStreamResp.code != PGCRespCode.SUCCESS) {
            if (pgcStreamResp.code === PGCRespCode.NOT_ALLOW_AT_YOUR_REGION) {
                toast(pgcStreamResp.message, {
                    description: "错误码:" + pgcStreamResp.code,
                })
                return
            }
            if (pgcStreamResp.code === PGCRespCode.NO_VIDEO) {
                toast(pgcStreamResp.message, {
                    description: "错误码:" + pgcStreamResp.code,
                })
                return
            }
        }
        //Set resp to state
        setPgcStreamInfo(pgcStreamResp.result)
    }

    const initPlayer = async () => {
        if (!pgcStreamInfo) return
        new DPlayer({
            container: document.getElementById('player'),
            live: false,
            autoplay: true,
            loop: true,
            lang: 'zh-cn',
            screenshot: false,
            hotkey: true,
            airplay: true,
            video: {
                url: `http://127.0.0.1:3030/proxy/${encodeURIComponent(pgcStreamInfo.durl![0].url!)}`,
                // url: `http://127.0.0.1:3030/proxy/${encodeURIComponent(videoStreamInfo.dash?.video[0].baseUrl!)}`,
            },
            danmaku: {
                id: `${ep_id}`,
                api: 'http://127.0.0.1:3031/',
                addition: [`http://127.0.0.1:3031/v3/bilibili?cid=${ep_id}`],
                user: 'cocoa',//弹幕作者
                bottom: "10%",
                unlimited: true,
                // @ts-ignore
                maximum: 1000
            }
        });
    }
    // Effect
    useEffect(() => {
        // Check if bvid and cid is valid
        if (!ep_id) return
        // Get video stream info
        getPgcStreamResp({
            ep_id: parseInt(ep_id),
            qn: VideoQuality["8K_UltraHighDefinition"],
            fnval: 1,
            fnver: 0,
            fourk: 1,
        })
    }, [])

    useEffect(() => {
        if (!pgcStreamInfo) return
        // Init player
        initPlayer()
    }, [pgcStreamInfo])

    return (
        <div className="w-sreen h-screen bg-pink-100">
            <div id="player"></div>
            <Toaster />
        </div>
    )
}

export default PGCPlayer