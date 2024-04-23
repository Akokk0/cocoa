import { getAllFavorite, getFavorite } from "@/api/biliApi"
import { cn } from "@/lib/utils"
import { useBiliStore } from "@/store/biliStore"
import { AllFavoriteInfoData, AllFavoriteInfoResp, FavoriteInfoData, FavoriteInfoResp } from "@/type/favorite"
import { useEffect, useState } from "react"
import Image from "@/components/image"
import { ChevronDown } from "lucide-react"
import { DateTime } from "luxon"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { openPlayer } from "@/lib/biliUtils"

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
    const [today] = useState(DateTime.local().startOf('day'))
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [jumpPage, setJumpPage] = useState<number | undefined>(undefined)
    // Func
    const getFavoriteDetail = async (pn: number = 1) => {
        // Set loading
        setIsLoading(true)
        // Send request to get popular content
        const favoriteInfoResp = JSON.parse(await getFavorite(fid, pn) as string) as FavoriteInfoResp
        // Check if request is error
        if (favoriteInfoResp.code !== 0) return
        // Set to view data
        setFavoriteDetail(favoriteInfoResp.data)
        // Set loading
        setIsLoading(false)
    }

    const formatTimestamp = (timestamp: number) => {
        const date = DateTime.fromSeconds(timestamp);

        if (date.hasSame(today, 'day')) {
            return date.toFormat('HH:mm')
        } else if (date.hasSame(today.minus({ days: 1 }), 'day')) {
            return '昨天'
        } else {
            return date.toFormat('yyyy-MM-dd')
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setJumpPage(parseInt(event.target.value));
    };
    // Effect
    useEffect(() => {
        fid && getFavoriteDetail(currentPage)
    }, [fid, currentPage])

    useEffect(() => {
        setCurrentPage(1)
    }, [fid])

    useEffect(() => {
        console.log(favoriteDetail);
    }, [favoriteDetail])

    return (
        <div className="flex-1 p-3 pl-2">
            {/* Info */}
            {favoriteDetail &&
                <div className="flex space-x-5 border-b border-bili_grey pb-3">
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
                            <span>{favoriteDetail.info.media_count}个内容{favoriteDetail.info.attr !== 1 && (favoriteDetail.info.attr !== 23 ? ' · 公开' : ' · 私密')}</span>
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
            {isLoading ? <div className="text-center">Loading...</div> :
                <div className="w-full h-full grid grid-cols-5 grid-rows-4  rounded-lg mt-5">
                    {favoriteDetail?.medias && favoriteDetail.medias.map((item, index) => (
                        <div key={index} className="w-44 h-40 hover:cursor-pointer" onClick={() => openPlayer(item.bvid!)}>
                            {/* Cover */}
                            <Image className="w-44 h-24 object-cover object-center rounded-lg" url={item.cover} alt="Cover" />
                            {/* Info */}
                            <div className="flex flex-col text-sm">
                                <h3 className="line-clamp-2 h-10">{item.title}</h3>
                                <span className="text-gray-400">收藏于：{formatTimestamp(item.fav_time)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            }
            {/* Pagination */}
            <Pagination className="mt-7">
                {favoriteDetail &&
                    <PaginationContent>
                        {currentPage > 1 &&
                            <PaginationItem>
                                <PaginationLink href="#" onClick={e => {
                                    e.preventDefault()
                                    setCurrentPage(currentPage - 1)
                                }}>上一页</PaginationLink>
                            </PaginationItem>
                        }
                        {currentPage !== 1 &&
                            <PaginationItem>
                                <PaginationLink href="#" onClick={e => {
                                    e.preventDefault()
                                    setCurrentPage(currentPage - 1)
                                }}>{currentPage - 1}</PaginationLink>
                            </PaginationItem>
                        }
                        {currentPage < Math.ceil(favoriteDetail?.info.media_count! / 20) &&
                            <PaginationItem>
                                <PaginationLink href="#" onClick={e => {
                                    e.preventDefault()
                                    setCurrentPage(currentPage)
                                }}>{currentPage}</PaginationLink>
                            </PaginationItem>
                        }
                        {currentPage < Math.ceil(favoriteDetail?.info.media_count! / 20) - 1 &&
                            <PaginationItem>
                                <PaginationLink href="#" onClick={e => {
                                    e.preventDefault()
                                    setCurrentPage(currentPage + 1)
                                }}>{currentPage + 1}</PaginationLink>
                            </PaginationItem>
                        }
                        {currentPage < Math.ceil(favoriteDetail?.info.media_count! / 20) - 2 &&
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        }
                        <PaginationItem>
                            <PaginationLink href="#" onClick={e => {
                                e.preventDefault()
                                setCurrentPage(Math.ceil(favoriteDetail?.info.media_count / 20))
                            }}
                            >
                                {Math.ceil(favoriteDetail?.info.media_count / 20)}
                            </PaginationLink>
                        </PaginationItem>
                        {currentPage < Math.ceil(favoriteDetail?.info.media_count! / 20) &&
                            <PaginationItem>
                                <PaginationLink href="#" onClick={e => {
                                    e.preventDefault()
                                    setCurrentPage(currentPage + 1)
                                }}>下一页</PaginationLink>
                            </PaginationItem>
                        }
                        <PaginationItem className="ml-3">
                            <div className="flex w-36 items-center space-x-2">
                                <Input type="number" placeholder="页码" value={jumpPage} onChange={handleChange} />
                                <Button type="submit" className="text-white" onClick={() => jumpPage && setCurrentPage(jumpPage)}>跳转</Button>
                            </div>
                        </PaginationItem>
                    </PaginationContent>
                }
            </Pagination>
        </div>
    )
}