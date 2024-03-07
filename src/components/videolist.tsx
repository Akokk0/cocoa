import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import VideoInfo from "./videoinfo"
import Image from "./image"

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

type VideoListProps = {
    list: List
} & React.HTMLAttributes<HTMLDivElement>

const VideoList: React.FC<VideoListProps> = ({ list, ...props }) => {
    return (
        <div {...props}>
            <Carousel
                opts={{
                    align: "start",
                }}
                className="w-full max-w-4xl"
            >
                <CarouselContent>
                    {list.map((v, i) => (
                        <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
                            <VideoInfo item={v} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default VideoList