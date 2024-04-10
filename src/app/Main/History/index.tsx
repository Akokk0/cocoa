import { getHistory } from "@/api/biliApi"
import { Button } from "@/components/ui/button"
import { HistoryItem, HistoryListItem, HistoryResp, HistoryRespCode, HistoryType } from "@/type/history"
import { AlarmClock, Chrome, Smartphone, Tablet, TabletSmartphone, Trash2, Tv } from "lucide-react"
import React, { useEffect, useRef, useState } from "react"
import Image from "@/components/image"
import { DateTime } from "luxon"
import InfiniteScroll from "react-infinite-scroll-component"
import './index.css'

export default function History() {
    // State
    const [timeNow, _] = useState<DateTime>(DateTime.local())
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
    // Refs
    const refs = useRef<{[key: number]: HTMLDivElement | null}>({})
    // Effect
    useEffect(() => {
        getHistoryResp({})
    }, [])

    useEffect(() => {
        const newShouldShowBadgeIndex = historyList.map((item, index) => {
            // Get item date
            const itemDate = DateTime.fromSeconds(item.view_at);
            const diffInDays = timeNow.diff(itemDate, 'days').days;
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
        console.log(refs.current);
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
                    <div id="scroll-parent" className="flex justify-center mt-7 pb-9 w-[70rem] h-[56rem] overflow-y-auto relative">
                        <InfiniteScroll
                            // className="mt-7 pb-9 w-[60rem] h-[56rem] border-l border-bili_grey space-y-5"
                            className="space-y-5 w-[60rem] border-l border-bili_grey"
                            scrollableTarget="scroll-parent"
                            dataLength={historyList.length}
                            next={() => getHistoryResp({ ps: 20, type: HistoryType.Archive, max: history.cursor.max, view_at: history.cursor.view_at })}
                            hasMore={true}
                            loader={<>加载中...</>}
                            endMessage={
                                <div className="history-end">
                                    <div className="w-64 h-60"></div>
                                </div>
                            }
                        >
                            {historyList.map((item, index) => (
                                <HistoryContentItem
                                    index={index}
                                    refs={refs}
                                    key={index}
                                    item={item}
                                />
                            ))}
                        </InfiniteScroll>
                        {/* Time Badge */}
                        {shouldShowBadgeIndex.length >= 1 && refs.current[shouldShowBadgeIndex[0]]! &&
                            <div
                                className="absolute p-2 left-5 rounded-lg text-white bg-primary z-0"
                                style={{
                                    top: `${refs.current[shouldShowBadgeIndex[0]]!.getBoundingClientRect().top! - 80}px`,
                                    // left: `${refs.current[shouldShowBadgeIndex[0]]!.getBoundingClientRect().left!}px`
                                }}
                            >
                                今天
                            </div>
                        }
                        {/* {shouldShowBadgeIndex.length >= 2 && refs[shouldShowBadgeIndex[1]] &&
                            <div
                                className="absolute -left-16 p-2 rounded-lg text-white bg-primary z-10"
                                style={{ top: `${refs[shouldShowBadgeIndex[1]].current?.offsetTop}px` }}
                            >
                                昨天
                            </div>
                        }
                        {shouldShowBadgeIndex.length >= 3 && refs[shouldShowBadgeIndex[2]] &&
                            <div
                                className="absolute -left-20 p-2 rounded-lg text-white bg-primary z-20"
                                style={{ top: `${refs[shouldShowBadgeIndex[2]].current?.offsetTop}px` }}
                            >
                                一周内
                            </div>
                        }
                        {shouldShowBadgeIndex.length >= 4 && refs[shouldShowBadgeIndex[3]] &&
                            <div
                                className="absolute -left-20 p-2 rounded-lg text-white bg-primary z-30"
                                style={{ top: `${refs[shouldShowBadgeIndex[3]].current?.offsetTop}px` }}
                            >
                                一周前
                            </div>
                        }
                        {shouldShowBadgeIndex.length >= 5 && refs[shouldShowBadgeIndex[4]] &&
                            <div
                                className="absolute -left-24 p-2 rounded-lg text-white bg-primary z-40"
                                style={{ top: `${refs[shouldShowBadgeIndex[4]].current?.offsetTop}px` }}
                            >
                                一个月前
                            </div>
                        } */}
                        {/* Rocket */}
                        {/* {infiniteScrollRef.current &&
                <div
                    className="absolute bottom-7 -right-12 w-16 h-16 bg-primary rounded-full z-50"
                    onClick={() => infiniteScrollRef.current.scrollTop = 0}
                >
                </div>
            } */}
                    </div>
                }
            </div>
        </div >
    )
}

type HistoryContentItemProps = {
    index: number,
    item: HistoryListItem,
    refs: React.MutableRefObject<{[key: number]: HTMLDivElement | null}>
} & React.HTMLAttributes<HTMLDivElement>

const HistoryContentItem: React.FC<HistoryContentItemProps> = ({ index, item, refs }) => {
    return (
        <div ref={el => refs.current[index] = el} className="grid grid-cols-[3rem_1.5fr_4fr_0.5fr] items-center relative">
            {/* Timeline */}
            <div className="absolute top-11 left-0 w-0 h-0 border-solid border-l-4 border-t-4 border-b-4 border-r-0 border-transparent border-t-transparent border-l-current border-l-bili_gray"></div>
            {/* Time */}
            <span className="text-sm ml-5 text-gray-400">{DateTime.fromSeconds(item.view_at).toFormat('HH:mm')}</span>
            {/* Cover */}
            <div className="w-40 h-24 ml-20 rounded-lg overflow-hidden relative">
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
            <Button variant="outline" size="icon">
                <Trash2 className="w-5 h-5 text-gray-400" />
            </Button>
        </div>
    )
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