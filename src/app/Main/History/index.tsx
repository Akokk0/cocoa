import { getHistory } from "@/api/biliApi"
import { Button } from "@/components/ui/button"
import { HistoryItem, HistoryListItem, HistoryResp, HistoryRespCode, HistoryType } from "@/type/history"
import { AlarmClock, Chrome, Smartphone, Tablet, TabletSmartphone, Trash2, Tv } from "lucide-react"
import { useEffect, useState } from "react"
import Image from "@/components/image"
import { DateTime } from "luxon"
import InfiniteScroll from "react-infinite-scroll-component"

export default function History() {
    // State
    const [history, setHistory] = useState<HistoryItem | undefined>(undefined)
    const [historyList, setHistoryList] = useState<HistoryListItem[]>([])
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
    // Effect
    useEffect(() => {
        getHistoryResp({})
    }, [])

    useEffect(() => {
        console.log(historyList);
    }, [historyList])

    useEffect(() => {
        console.log(history);
    }, [history])

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
                    <InfiniteScroll
                        height="56rem"
                        className="flex flex-col space-y-5 w-[60rem] mt-7 border-l border-bili_grey pb-9 scrollbar-hide"
                        dataLength={historyList.length}
                        next={() => getHistoryResp({ ps: 20, type: HistoryType.Archive, max: history.cursor.max, view_at: history.cursor.view_at })}
                        hasMore={true}
                        loader={<>Loading</>}
                        endMessage={
                            <p style={{ textAlign: 'center' }}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                    >
                        {historyList.map((item, index) => (
                            <HistoryContentItem key={index} item={item} />
                        ))}
                    </InfiniteScroll>
                }
            </div>
        </div>
    )
}

const HistoryContentItem = ({ item }: { item: HistoryListItem }) => (
    <div className="flex items-center relative">
        {/* Timeline */}
        <div className="absolute top-11 left-0 w-0 h-0 border-solid border-l-4 border-t-4 border-b-4 border-r-0 border-transparent border-t-transparent border-l-current border-l-bili_gray"></div>
        {/* Time */}
        <span className="text-sm ml-5 text-gray-400">{DateTime.fromSeconds(item.view_at).toFormat('HH:mm')}</span>
        {/* Cover */}
        <Image className="w-40 h-24 ml-20 object-center object-cover rounded-lg" url={item.cover} alt="Cover" />
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