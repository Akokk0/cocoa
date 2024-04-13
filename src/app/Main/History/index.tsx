import { getHistory, deleteHistory } from "@/api/biliApi"
import { Button } from "@/components/ui/button"
import { HistoryItem, HistoryListItem, HistoryResp, HistoryRespCode, HistoryType } from "@/type/history"
import { AlarmClock, Chrome, Rocket, Smartphone, Tablet, TabletSmartphone, Trash2, Tv } from "lucide-react"
import React, { useEffect, useRef, useState } from "react"
import Image from "@/components/image"
import { DateTime } from "luxon"
import InfiniteScroll from "react-infinite-scroll-component"
import './index.css'
import { invoke } from "@tauri-apps/api"
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
import autoAnimate from "@formkit/auto-animate"

export default function History() {
    // State
    const [history, setHistory] = useState<HistoryItem | undefined>(undefined)
    const [historyList, setHistoryList] = useState<HistoryListItem[]>([])
    const [shouldShowBadgeIndex, setShouldShowBadgeIndex] = useState<number[]>([])
    const hasShownBadge: { [key: string]: boolean } = {
        today: false,
        yesterday: false,
        thisWeek: false,
        aWeekAgo: false,
        aMonthAgo: false,
    }
    // Func
    const getHistoryResp = async (
        params:
            { ps?: number, type?: HistoryType, max?: number, business?: HistoryType, view_at?: number }
    ) => {
        // Send request to get popular content
        const historyResp = JSON.parse(await getHistory(params) as string) as HistoryResp
        // Check if request is error
        if (historyResp.code != HistoryRespCode.Success) return
        // Set resp to state
        setHistory(historyResp.data)
        // Concat list
        setHistoryList(prevHistoryList => prevHistoryList.concat(historyResp.data.list))
    }

    const execDeleteHistory = async (index: number, id: number, business: string) => {
        // Show toast
        toast("删除历史记录", {
            description: '正在删除历史记录'
        })
        // Get csrf from cookies
        const csrf = await invoke('get_csrf') as string
        // Send request to delete history
        const resp = JSON.parse(
            await deleteHistory(`${business}_${id}`, csrf) as string
        ) as { code: number, message: string, ttl: number }
        // Check if request is success
        if (resp.code === 0) {
            // Show toast
            toast("成功", {
                description: '已删除历史记录'
            })
            // Delete item from list
            setHistoryList(historyList.filter((_, i) => i !== index))
        } else {
            toast("失败", {
                description: resp.message
            })
        }
    }
    // Refs
    const refs = useRef<{ [key: number]: HTMLDivElement | null }>({})
    const infiniteScrollRef = useRef<HTMLDivElement | null>(null)
    const parent = useRef<HTMLDivElement | null>(null)
    // Effect
    useEffect(() => {
        getHistoryResp({})

        const observerAnimate = new MutationObserver(() => {
            if (parent.current) {
                autoAnimate(parent.current);
                observerAnimate.disconnect();
            }
        })

        observerAnimate.observe(document, { childList: true, subtree: true });

        return () => observerAnimate.disconnect()
    }, [])

    useEffect(() => {
        const newShouldShowBadgeIndex = historyList.map((item, index) => {
            // Get diff in days
            const diffInDays = getDiffInDays(item.view_at, DateTime.local().startOf('day'))
            // Get date label
            let dateLabel: string;
            if (diffInDays < 1) {
                dateLabel = 'today';
            } else if (diffInDays < 2) {
                dateLabel = 'yesterday';
            } else if (diffInDays < 7) {
                dateLabel = 'thisWeek';
            } else if (diffInDays < 30) {
                dateLabel = 'aWeekAgo';
            } else {
                dateLabel = 'aMonthAgo';
            }
            // Check if should show badge
            const shouldShowBadge = !hasShownBadge[dateLabel];
            // If should show badge, set badge to true
            if (shouldShowBadge) {
                // Set badge to true
                hasShownBadge[dateLabel] = true
                // Push should show index to refs
                return index
            }
        }).filter((index) => index !== undefined) as number[]
        // Set should show badge index
        setShouldShowBadgeIndex(newShouldShowBadgeIndex)
    }, [historyList])

    return (
        <div className="flex justify-center w-full">
            <div className="flex flex-col items-center w-[70rem] p-5">
                {/* Top */}
                <div className="flex justify-between w-full text-bili_blue">
                    {/* Left */}
                    <div className="flex items-center space-x-3">
                        <AlarmClock className="w-9 h-9" />
                        <h1 className="text-xl">历史记录</h1>
                    </div>
                    {/* Right */}
                    <div className="flex space-x-7">
                        <Button variant="outline">暂停记录历史</Button>
                        <Button variant="outline">清空历史</Button>
                    </div>
                </div>
                {history && historyList &&
                    <div id="scroll-parent" ref={infiniteScrollRef} className="flex justify-center mt-7 pb-9 w-[70rem] h-[56rem] overflow-y-auto scrollbar-hide relative">
                        <InfiniteScroll
                            className="w-[60rem] border-l border-bili_grey space-y-5 scrollbar-hide"
                            scrollableTarget="scroll-parent"
                            dataLength={historyList.length}
                            next={() => getHistoryResp({ ps: 20, type: HistoryType.Archive, max: history.cursor.max, view_at: history.cursor.view_at })}
                            hasMore={true}
                            loader={<h4 className="text-center text-lg">加载中...</h4>}
                            endMessage={
                                <div className="history-end">
                                    <div className="w-64 h-60"></div>
                                </div>
                            }
                        >
                            <div ref={parent} className="space-y-5">
                                {historyList.map((item, index) => (
                                    <HistoryContentItem
                                        key={item.kid}
                                        index={index}
                                        refs={refs}
                                        item={item}
                                        execDeleteHistory={execDeleteHistory}
                                    />
                                ))}
                            </div>
                        </InfiniteScroll>
                        {/* Time Badge */}
                        {shouldShowBadgeIndex.length >= 1 && refs.current[shouldShowBadgeIndex[0]] &&
                            <TimeBadge top={refs.current[shouldShowBadgeIndex[0]]!.offsetTop!} left={20}>
                                今天
                            </TimeBadge>
                        }
                        {shouldShowBadgeIndex.length >= 2 && refs.current[shouldShowBadgeIndex[1]] &&
                            <TimeBadge top={refs.current[shouldShowBadgeIndex[1]]!.offsetTop} left={20}>
                                昨天
                            </TimeBadge>
                        }
                        {shouldShowBadgeIndex.length >= 3 && refs.current[shouldShowBadgeIndex[2]] &&
                            <TimeBadge top={refs.current[shouldShowBadgeIndex[2]]!.offsetTop} left={5}>
                                一周内
                            </TimeBadge>
                        }
                        {shouldShowBadgeIndex.length >= 4 && refs.current[shouldShowBadgeIndex[3]] &&
                            <TimeBadge top={refs.current[shouldShowBadgeIndex[3]]!.offsetTop} left={5}>
                                一周前
                            </TimeBadge>
                        }
                        {shouldShowBadgeIndex.length >= 5 && refs.current[shouldShowBadgeIndex[4]] &&
                            <TimeBadge top={refs.current[shouldShowBadgeIndex[4]]!.offsetTop} left={0}>
                                一个月前
                            </TimeBadge>
                        }
                        {/* Rocket */}
                        {infiniteScrollRef && infiniteScrollRef.current &&
                            <div
                                className="fixed bottom-7 right-12 flex justify-center items-center w-16 h-16 text-white bg-primary rounded-full z-50 transition hover:scale-110 hover:cursor-pointer"
                                onClick={() => infiniteScrollRef.current!.scrollTo({ top: 0, behavior: 'smooth' })}
                            >
                                <Rocket className="w-7 h-7" />
                            </div>
                        }
                        {/* Toaster */}
                        <Toaster />
                    </div>
                }
            </div>
        </div >
    )
}

// Components
type TimeBadgeProps = {
    top: number,
    left: number,
} & React.HTMLAttributes<HTMLDivElement>

const TimeBadge: React.FC<TimeBadgeProps> = ({ top, left, children }) => {
    return (
        <div
            className="absolute p-2 rounded-lg text-white bg-primary z-1"
            style={{ top: `${top}px`, left: `${left}px` }}
        >
            {children}
        </div>
    )
}

type HistoryContentItemProps = {
    index: number,
    item: HistoryListItem,
    refs: React.MutableRefObject<{ [key: number]: HTMLDivElement | null }>
    execDeleteHistory: (index: number, id: number, business: string) => void
} & React.HTMLAttributes<HTMLDivElement>

const HistoryContentItem: React.FC<HistoryContentItemProps> = ({ index, item, refs, execDeleteHistory }) => {
    return (
        <div ref={el => refs.current[index] = el} className="grid grid-cols-[7rem_1.5fr_4fr_0.5fr] items-center relative">
            {/* Timeline */}
            <div className="absolute top-11 left-0 w-0 h-0 border-solid border-l-4 border-t-4 border-b-4 border-r-0 border-transparent border-t-transparent border-l-current border-l-bili_gray"></div>
            {/* Time */}
            <span className="text-sm ml-5 text-gray-400">{watchInTimeFormater(item.view_at, DateTime.local().startOf('day'))}</span>
            {/* Cover */}
            <div className="w-40 h-24 ml-10 rounded-lg overflow-hidden relative">
                <Image className="w-40 h-24 object-center object-cover" url={item.cover} alt="Cover" />
                {/* Progress */}
                <div className="absolute left-0 bottom-0 h-2 bg-primary rounded-full" style={{ width: `${(item.progress! / item.duration!) * 100}%` }}></div>
            </div>
            {/* Info */}
            <div className="flex flex-col flex-1 justify-between ml-7 h-full py-2 border-b border-bili_grey">
                {/* Title */}
                <h1 className="text-sm font-bold">{item.title}</h1>
                {/* Bottom Info */}
                <div className="grid grid-cols-2 grid-rows-1">
                    {/* Device */}
                    <div className="flex space-x-2 items-center text-xs text-gray-500">
                        {deviceParser(item.history.dt)}
                        <span>{item.progress! === -1 ? '已看完' : `看到 ${timeFormater(item.progress!)}`}</span>
                    </div>
                    {/* UP Info */}
                    <div className="flex items-center space-x-3 text-xs">
                        {/* Avatar */}
                        <Image className="w-6 h-6 object-cover object-center rounded-full" url={item.author_face} alt="Avatar" />
                        {/* UP Name */}
                        <span>{item.author_name}</span>
                        <span className="text-gray-500">|</span>
                        <span className="text-gray-500">{item.tag_name}</span>
                    </div>
                </div>
            </div>
            {/* Delete Action */}
            <Button variant="outline" size="icon" onClick={() => execDeleteHistory(index, item.kid, item.history.business)}>
                <Trash2 className="w-5 h-5 text-gray-400" />
            </Button>
        </div>
    )
}

const getDiffInDays = (view_at: number, timeToday: DateTime) => {
    const itemDate = DateTime.fromSeconds(view_at).startOf('day');
    const diffInDays = timeToday.diff(itemDate, 'days').days;
    return diffInDays
}

const watchInTimeFormater = (view_at: number, timeToday: DateTime) => {
    // Get diff in days
    const diffInDays = getDiffInDays(view_at, timeToday)
    // Get format by diff in days
    let format;
    if (diffInDays < 1) {
        // Today
        format = 'HH:mm';
    } else if (diffInDays < 2) {
        // Yesterday
        format = 'HH:mm';
    } else {
        // More than two days ago
        format = 'yyyy-MM-dd';
    }
    return DateTime.fromSeconds(view_at).toFormat(format);
}

const timeFormater = (seconds: number) => {
    const dt = DateTime.fromSeconds(seconds, { zone: 'utc' });
    if (dt.hour === 0) {
        return dt.toFormat('mm:ss');
    } else {
        return dt.toFormat('HH:mm:ss');
    }
};

const deviceParser = (device: number) => {
    switch (device) {
        case 1:
        case 3:
        case 5:
        case 7:
            return <Smartphone className="w-5 h-5" />
        case 2:
            return <Chrome className="w-5 h-5" />
        case 4:
        case 6:
            return <Tablet className="w-5 h-5" />
        case 33:
            return <Tv className="w-5 h-5" />
        case 0:
            return <TabletSmartphone className="w-5 h-5" />
        default:
            return "Unknown"
    }
}