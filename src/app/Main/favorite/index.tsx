import { getAllFavorite } from "@/api/biliApi"
import { useBiliStore } from "@/store/biliStore"
import { AllFavoriteInfoData, AllFavoriteInfoResp } from "@/type/favorite"
import { useEffect, useState } from "react"

export default function Favorite() {
    // Store
    const personal = useBiliStore(state => state.personal)
    // State
    const [allFavoriteInfo, setAllFavoriteInfo] = useState<AllFavoriteInfoData | null>(null)
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
        getAllFavoriteResp()
    }, [personal])

    useEffect(() => {
        console.log(allFavoriteInfo);
    }, [allFavoriteInfo])

    return (
        <div className="flex h-full w-full">
            {/* Tab */}
            <div className="flex flex-col w-52 h-full p-3 pr-2">
                <div className="w-full h-full border border-bili_grey rounded-lg overflow-auto">
                    <div className="flex items-center p-3 border-b border-bili_grey mb-5">
                        <h3 className="text-sm text-gray-400 line-clamp-1">我的创建</h3>
                    </div>
                    {allFavoriteInfo && allFavoriteInfo.list.map(item => (
                        <div className="flex items-center rounded-lg p-3 hover:text-primary hover:bg-bili_grey hover:cursor-pointer">
                            <h3 className="text-sm line-clamp-1">{item.title}</h3>
                        </div>
                    ))}
                </div>
            </div>
            {/* Content */}
            <div className="flex-1 p-3 pl-2">
                <div className="w-full h-full bg-orange-200 rounded-lg"></div>
            </div>
        </div>
    )
}