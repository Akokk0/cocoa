import { getAllFavorite, getFavorite } from "@/api/biliApi"
import { cn } from "@/lib/utils"
import { useBiliStore } from "@/store/biliStore"
import { AllFavoriteInfoData, AllFavoriteInfoResp, FavoriteInfoData, FavoriteInfoResp } from "@/type/favorite"
import { useEffect, useState } from "react"
import Image from "@/components/image"
import { ChevronDown } from "lucide-react"

export default function Favorite() {
    // Store
    const personal = useBiliStore(state => state.personal)
    // State
    const [allFavoriteInfo, setAllFavoriteInfo] = useState<AllFavoriteInfoData | null>(null)
    const [tab, setTab] = useState<number | null>(null)
    // Func
    const getAllFavoriteResp = async () => {
        // Send request to get popular content
        const allFavoriteInfoResp = JSON.parse(await getAllFavorite(personal?.mid!) as string) as AllFavoriteInfoResp
        // Check if request is error
        if (allFavoriteInfoResp.code !== 0) return
        // Set to view data
        setAllFavoriteInfo(allFavoriteInfoResp.data)
    }
    // Effect
    useEffect(() => {
        personal && getAllFavoriteResp()
    }, [personal])

    useEffect(() => {
        setTab(allFavoriteInfo?.list[0].id!)
    }, [allFavoriteInfo])

    return (
        <div className="flex h-full w-full">
            {/* Tab */}
            <div className="flex flex-col w-52 h-full p-3 pr-2">
                <div className="w-full h-full border border-bili_grey rounded-lg overflow-auto">
                    <div className="flex items-center p-3 border-b border-bili_grey mb-5">
                        <h3 className="text-sm text-gray-400 line-clamp-1">我的创建</h3>
                    </div>
                    {allFavoriteInfo && tab && allFavoriteInfo.list.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => setTab(item.id)}
                            className={cn('flex items-center rounded-lg p-3 hover:cursor-pointer', tab === item.id ? 'bg-bili_green text-white' : 'hover:text-primary hover:bg-bili_grey')}
                        >
                            <h3 className="text-sm line-clamp-1">{item.title}</h3>
                        </div>
                    ))}
                </div>
            </div>
            {/* Content */}
            <div className="flex-1">
                {tab && <FavoriteDetail fid={tab} />}
            </div>
        </div>
    )
}

type FavoriteDetailProps = {
    fid: number
} & React.HTMLAttributes<HTMLDivElement>

const FavoriteDetail: React.FC<FavoriteDetailProps> = ({
    fid
}) => {
    // State
    const [favoriteDetail, setFavoriteDetail] = useState<FavoriteInfoData | null>(null)
    // Func
    const getFavoriteDetail = async (fid: number) => {
        // Send request to get popular content
        const favoriteInfoResp = JSON.parse(await getFavorite(fid) as string) as FavoriteInfoResp
        // Check if request is error
        if (favoriteInfoResp.code !== 0) return
        // Set to view data
        setFavoriteDetail(favoriteInfoResp.data)
    }
    // Effect
    useEffect(() => {
        fid && getFavoriteDetail(fid)
    }, [fid])

    useEffect(() => {
        console.log(favoriteDetail);
    }, [favoriteDetail])

    return (
        <div className="flex-1 p-3 pl-2">
            {/* Info */}
            {favoriteDetail &&
                <div className="flex space-x-5">
                    {/* Favorite Cover */}
                    <Image className="w-52 h-32 object-cover object-center rounded-lg" url={favoriteDetail.info.cover} alt="Cover" />
                    {/* Content */}
                    <div className="flex flex-col justify-around">
                        {/* Title */}
                        <h2 className="text-sm">{favoriteDetail.info.title}</h2>
                        {/* Content Info */}
                        <div className="flex flex-col text-sm text-gray-400">
                            {/* Up Info */}
                            <span>创建者：{favoriteDetail.info.upper.name}</span>
                            {/* Favorite Info */}
                            <span>{favoriteDetail.info.media_count}个内容 · </span>
                        </div>
                    </div>
                </div>
            }
            {/* Action Area */}
            <div className="flex flex-row-reverse mt-9 text-sm space-x-reverse space-x-7">
                <div className="flex items-center space-x-1">
                    {/* Info */}
                    <span>最近收藏</span>
                    {/* Icon */}
                    <ChevronDown />
                </div>
                <div className="flex items-center space-x-1">
                    {/* Info */}
                    <span>全部分区</span>
                    {/* Icon */}
                    <ChevronDown />
                </div>
                <div className="flex items-center space-x-1">
                    {/* Info */}
                    <span>批量操作</span>
                </div>
            </div>
            {/* Content */}
            <div className="w-full h-full grid grid-cols-5 grid-rows-4 gap-x-16 gap-y-7  bg-orange-200 rounded-lg mt-5">
                {favoriteDetail && favoriteDetail.medias.map((item, index) => (
                    <div key={index} className="w-44 h-40 bg-pink-300">
                        {/* Cover */}
                        <Image className="w-44 h-24 object-cover object-center rounded-lg" url={item.cover} alt="Cover" />
                    </div>
                ))}
            </div>
        </div>
    )
}