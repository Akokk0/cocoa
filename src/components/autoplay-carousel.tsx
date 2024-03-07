import Autoplay from "embla-carousel-autoplay"
// UI
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
// React
import { useRef } from "react"
import VideoInfo from "./videoinfo"

type List = [
    {
        aid: number,
        videos: number,
        tid: number,
        tname: string,
        copyright: number,
        pic: string,
        title: string,
        pubdate: number,
        ctime: number,
        desc: string,
        duration: number,
        owner: {
            mid: number,
            name: string,
            face: string
        },
        stat: {
            aid: number,
            view: number,
            danmaku: number,
            reply: number,
            favorite: number,
            coin: number,
            share: number,
            now_rank: number,
            his_rank: number,
            like: number,
            dislike: number,
            vt: number,
            vv: number
        },
        dynamic: string,
        cid: number,
        dimension: {
            width: number,
            height: number,
            rotate: number
        },
        short_link_v2: string,
        first_frame: string,
        pub_location: string,
        bvid: string,
        achievement: string
    }
]

export default function AutoPlayCarousel({ list }: { list: List }) {
    const plugin = useRef(
        Autoplay({ delay: 5000, stopOnInteraction: true })
    )

    return (
        <div>
            <Carousel
                plugins={[plugin.current]}
                className="w-full max-w-xs"
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent>
                    {list.map((v, i) => (
                        <CarouselItem key={i}>
                            <VideoInfo item={v} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    )
}
