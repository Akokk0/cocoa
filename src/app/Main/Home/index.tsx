import { getMustDo, getPopular } from "@/api/biliApi"
import { MustDoResp, MustDoRespCode } from "@/type/home"
import { useEffect, useState } from "react"
// UI
import AutoPlayCarousel from "@/components/autoplay-carousel"
import VideoList from "@/components/videolist"

export default function Home() {
    const [mustDoList, setMustDoList] = useState<MustDoResp>()
    const [popular, setPopular] = useState<MustDoResp>()

    useEffect(() => {
        const initial = async () => {
            // Send request to get must-do content
            const mustDoResp = JSON.parse(await getMustDo() as string) as MustDoResp
            // Check if request is error
            if (mustDoResp.code !== MustDoRespCode.SUCCESS) return
            // Set resp to state
            setMustDoList(mustDoResp)
            // Send request to get popular content
            const popularResp = JSON.parse(await getPopular() as string) as MustDoResp
            // Check if request is error
            if (popularResp.code != MustDoRespCode.SUCCESS) return
            //Set resp to state
            setPopular(popularResp)
        }
        initial()
    }, [])

    return (
        <div>
            <div className="flex">
                {mustDoList && <AutoPlayCarousel list={mustDoList.data.list} />}
                {popular && <VideoList list={popular.data.list} className="ml-20"/>}
            </div>
        </div>
    )
}