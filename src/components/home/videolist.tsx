import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import VideoInfo from "../videoinfo"
import { useEffect, useState } from "react"
import { getPopular } from "@/api/biliApi"
import { List, VideoListResp, VideoListRespCode } from "@/type/home"

type VideoListProps = React.HTMLAttributes<HTMLDivElement>

const VideoList: React.FC<VideoListProps> = ({ ...props }) => {
    const [list, setList] = useState<List>()

    useEffect(() => {
        const initial = async () => {
            // Send request to get popular content
            const popularResp = JSON.parse(await getPopular() as string) as VideoListResp
            // Check if request is error
            if (popularResp.code != VideoListRespCode.SUCCESS) return
            //Set resp to state
            setList(popularResp.data.list)
        }
        initial()
    }, [])

    return (
        list && <div {...props}>
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