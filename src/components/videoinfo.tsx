import Danmaku from "./icon/danmaku";
import Like from "./icon/like";
import PlayIcon from "./icon/play";

type Stat = {
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
}

type VideoInfoProps = {
    stat: Stat
} & React.HTMLProps<HTMLDivElement>

const StatDiv = ({children}: {children: React.ReactNode}) => (
    <div className="flex space-x-1">
        {children}
    </div>
)

export default function VideoInfo({
    stat, ...props
}: VideoInfoProps) {
    return (
        <div className="flex space-x-3 text-xs" {...props}>
            <StatDiv >
                <PlayIcon />
                <span>{stat.view > 10000 ? `${(stat.view / 10000).toFixed(1)}万` : stat.view}</span>
            </StatDiv>
            <StatDiv>
                <Danmaku />
                <span>{stat.danmaku > 10000 ? `${(stat.danmaku / 10000).toFixed(1)}万` : stat.view}</span>
            </StatDiv>
            <StatDiv>
                <Like />
                <span>{stat.danmaku > 10000 ? `${(stat.like / 10000).toFixed(1)}万` : stat.view}</span>
            </StatDiv>
        </div>
    )
}