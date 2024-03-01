import { getMustDo } from "@/api/biliApi"
import { AutoPlayCarousel } from "@/components/autoplay-carousel"
import { MustDoResp, MustDoRespCode } from "@/type/home"
import { useEffect, useState } from "react"

export default function Home() {
    const [mustDoList, setMustDoList] = useState<MustDoResp>()

    useEffect(() => {
        const initial = async () => {
            // Send request to get must-do content
            const mustDoResp = JSON.parse(await getMustDo(1, 10) as string) as MustDoResp
            // Check if request is error
            if (mustDoResp.code !== MustDoRespCode.SUCCESS) return
            // Set resp to state
            setMustDoList(mustDoResp)
        }
        initial()
    }, [])

    return (
        <div>
            <div className="flex">
                {mustDoList && <AutoPlayCarousel list={mustDoList} />}
            </div>
        </div>
    )
}