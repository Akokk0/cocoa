import { getHistory } from "@/api/biliApi"
import { Button } from "@/components/ui/button"
import { HistoryItem, HistoryResp, HistoryRespCode, HistoryType } from "@/type/history"
import { AlarmClock } from "lucide-react"
import { useEffect, useState } from "react"
import Image from "@/components/image"

export default function History() {
    // State
    const [history, setHistory] = useState<HistoryItem | undefined>(undefined)
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
    }
    // Effect
    useEffect(() => {
        getHistoryResp({})
    }, [])

    useEffect(() => {
        console.log(history);
    }, [history])

    return (
        <div className="flex justify-center w-full">
            <div className="flex flex-col w-[60rem] p-5">
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
                {/* History */}
                <div className="flex flex-col space-y-5 mt-7">
                    {history?.list.map((item, index) => (
                        <div>
                            <Image className="w-40 h-24 object-center object-cover rounded-lg" url={item.cover} alt="Cover" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}