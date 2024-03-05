import Autoplay from "embla-carousel-autoplay"
// UI
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import Image from "./image"
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
                            <div className="p-1">
                                <Card className="overflow-hidden">
                                    <Image url={v.pic} alt="封面"className="w-full h-48" />
                                    <CardContent className="flex flex-col justify-start space-y-2">
                                        <span className="mt-2 text-sm line-clamp-2 h-10">{v.title}</span>
                                        <div className="h-6 inline-flex w-fit items-center space-x-1 rounded-xl border border-border_color pr-2">
                                            <Image url={v.owner.face} alt="头像" className="rounded-full w-6" />
                                            <span className="inline-block text-xs">{v.owner.name}</span>
                                        </div>
                                        <VideoInfo stat={v.stat} />
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    )
}
