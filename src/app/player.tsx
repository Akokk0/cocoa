import { getVideoStream } from "@/api/biliApi"
import { getWbiSign } from "@/lib/biliUtils"
import { VideoFormat, VideoQuality, VideoStreamData, VideoStreamResp, VideoStreamRespCode } from "@/type/video_stream"
import DPlayer from "dplayer"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const Player: React.FC = () => {
    // Params
    const { bvid, cid } = useParams()
    // State
    const [videoStreamInfo, setVideoStreamInfo] = useState<VideoStreamData>()
    // Func
    const getVideoStreamResp = async (
        params:
            {
                avid?: number, // avid 与 bvid 任选一个
                bvid?: string, // avid 与 bvid 任选一个
                cid: number, // 视频 cid
                qn?: VideoQuality, // 视频清晰度选择 未登录默认 32（480P），登录后默认 64（720P）DASH 格式时无效
                fnval?: number, // 视频流格式标识 默认值为1（MP4 格式）
                fnver?: number, // 0
                fourk?: number, // 是否允许 4K 视频 画质最高 1080P：0（默认） 画质最高 4K：1
                session?: string, // 从视频播放页的 HTML 中获取
                otype?: string, // 固定为json
                type?: string, // 目前为空
                platform?: string, // pc：web播放（默认值，视频流存在 referer鉴权）html5：移动端 HTML5 播放（仅支持 MP4 格式，无 referer 鉴权可以直接使用video标签播放）
                high_quality?: number // platform=html5时，此值为1可使画质为1080p
            }
    ) => {
        // Get wbi sign
        const wbi = await getWbiSign(params)
        // Send request to get popular content
        const videoStreamResp = JSON.parse(await getVideoStream(wbi) as string) as VideoStreamResp
        console.log(videoStreamResp);
        // Check if request is error
        if (videoStreamResp.code != VideoStreamRespCode.Success) return
        //Set resp to state
        setVideoStreamInfo(videoStreamResp.data)
    }

    const initPlayer = () => {
        if (!videoStreamInfo) return
        /* const quality = videoStreamInfo?.accept_description.map((item, index) => {
            return {
                name: item,
                url: videoStreamInfo.durl![index].url
            }
        }) */
        new DPlayer({
            container: document.getElementById('dplayer'),
            live: false,
            autoplay: true,
            loop: true,
            lang: 'zh-cn',
            screenshot: false,
            hotkey: true,
            airplay: true,
            video: {
                url: `http://127.0.0.1:3030/proxy/${encodeURIComponent(videoStreamInfo.durl![0].url!)}`,
                // url: `http://127.0.0.1:3030/proxy/${encodeURIComponent(videoStreamInfo.dash?.video[0].baseUrl!)}`,
                // url: videoStreamInfo.dash?.video[0].baseUrl!
            },
        });
}
// Effect
useEffect(() => {
    // Check if bvid and cid is valid
    if (!bvid || !cid) return
    // Get video stream info
    getVideoStreamResp({
        bvid,
        cid: parseInt(cid),
        qn: VideoQuality["1080P_HD"],
        fnval: VideoFormat.MP4,
        fnver: 0,
        fourk: 0,
        platform: "html5",
    })
}, [])

useEffect(() => {
    console.log(videoStreamInfo);
    if (!videoStreamInfo) return
    // console.log(videoStreamInfo?.durl![0].url);
    // console.log(`http://127.0.0.1:3030/proxy/${encodeURIComponent(videoStreamInfo.dash?.video[0].baseUrl!)}`);
    console.log(`http://127.0.0.1:3030/proxy/${encodeURIComponent(videoStreamInfo.durl![0].url!)}`);
    // Init player
    initPlayer()
}, [videoStreamInfo])

return (
    <div>
        <div id="dplayer"></div>
        {/* {videoStreamInfo && <video src={`http://127.0.0.1:3030/proxy/${encodeURIComponent(videoStreamInfo.dash?.video[0].baseUrl!)}`}></video>} */}
    </div>
)
}

export default Player