import { openPlayer } from "@/lib/biliUtils";
import Danmaku from "./icon/danmaku";
import Like from "./icon/like";
import PlayIcon from "./icon/play";
import Image from "./image";
import { Card, CardContent } from "./ui/card";

type Item = {
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

type VideoInfoProps = {
    item: Item
} & React.HTMLAttributes<HTMLDivElement>

const StatDiv = ({ children }: { children: React.ReactNode }) => (
    <div className="flex space-x-1">
        {children}
    </div>
)

export default function VideoInfo({
    item, ...props
}: VideoInfoProps) {
    const stat = item.stat

    return (
        <Card className="overflow-hidden hover:cursor-pointer" {...props} onClick={() => openPlayer(item.bvid, item.cid)}>
            <Image url={item.pic} alt="封面" className="w-full h-48 object-cover object-center" />
            <CardContent className="flex flex-col justify-start space-y-2">
                <span className="mt-2 text-sm line-clamp-2 h-10 hover:text-bili_blue transition">{item.title}</span>
                <div className="h-6 inline-flex w-fit items-center space-x-1 rounded-xl border border-border_color pr-2 hover:bg-bili_grey hover:text-bili_blue transition">
                    <Image url={item.owner.face} alt="头像" className="rounded-full w-7" />
                    <span className="inline-block text-xs">{item.owner.name}</span>
                </div>
                <div className="flex space-x-3 text-xs">
                    <StatDiv >
                        <PlayIcon />
                        <span>{stat.view > 10000 ? `${(stat.view / 10000).toFixed(1)}万` : stat.view}</span>
                    </StatDiv>
                    <StatDiv>
                        <Danmaku />
                        <span>{stat.danmaku > 10000 ? `${(stat.danmaku / 10000).toFixed(1)}万` : stat.danmaku}</span>
                    </StatDiv>
                    <StatDiv>
                        <Like />
                        <span>{stat.like > 10000 ? `${(stat.like / 10000).toFixed(1)}万` : stat.like}</span>
                    </StatDiv>
                </div>
            </CardContent>
        </Card>
    )
}