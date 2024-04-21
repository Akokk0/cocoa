import { openPlayer } from "@/lib/biliUtils"
import Image from "../../image"
import { List } from "@/type/home"

type RankingListProps = {
    list: List
} & React.HTMLAttributes<HTMLDivElement>

export default function RankingList({
    list
}: RankingListProps) {
    return (
        <div className="rounded-xl w-full h-[12rem] mt-3">
            {/* Info */}
            <div className="grid grid-cols-4 gap-y-6 gap-x-5">
                {list.map((item, i) => (
                    <div key={i} className="relative hover:cursor-pointer" onClick={() => openPlayer(item.bvid, item.cid)}>
                        <div className="cover-scale">
                            <Image className="w-28 h-[4.5rem] object-cover object-center rounded-lg" url={item.pic} alt="封面" />
                        </div>
                        <div className="absolute -left-3 -top-2 w-6 h-6 rounded-full bg-[#149fd6] text-white flex items-center justify-center">{i + 4}</div>
                        <div className="absolute z-0 left-[5.5rem] top-2 w-32 h-[4.5rem] flex flex-col justify-between rounded-lg pl-8 py-1 shadow-md">
                            <div className="w-[6rem] line-clamp-2 text-xs hover:text-bili_blue transition">{item.title}</div>
                            <div className="w-[6rem] line-clamp-2 text-xs hover:text-bili_blue transition">
                                UP&nbsp;{item.owner.name}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}