import Autoplay from "embla-carousel-autoplay"
// UI
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
// React
import { useEffect, useRef, useState } from "react"
import VideoInfo from "./videoinfo"
import { List, VideoListResp, VideoListRespCode } from "@/type/home"
import { getMustDo } from "@/api/biliApi"

export default function AutoPlayCarousel() {
    const [list, setList] = useState<List>()

    useEffect(() => {
        const initial = async () => {
            // Send request to get must-do content
            const mustDoResp = JSON.parse(await getMustDo() as string) as VideoListResp
            // Check if request is error
            if (mustDoResp.code !== VideoListRespCode.SUCCESS) return
            // Set resp to state
            setList(mustDoResp.data.list)
        }
        initial()
    }, [])

    const plugin = useRef(
        Autoplay({ delay: 5000, stopOnInteraction: true })
    )

    return (
        <div className="w-full max-w-xs h-[20.2rem]">
            <Carousel
                plugins={[plugin.current]}
                className="w-full max-w-xs"
                onMouseLeave={plugin.current.reset}
            >
                {list && <CarouselContent>
                    {list.map((v, i) => (
                        <CarouselItem key={i}>
                            <VideoInfo item={v} />
                        </CarouselItem>
                    ))}
                </CarouselContent>}
            </Carousel>
        </div>
    )
}
