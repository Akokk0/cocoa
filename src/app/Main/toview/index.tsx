import { clearAllToView, deleteToView, getToView } from "@/api/biliApi"
import { Button } from "@/components/ui/button"
import { ToViewListItem, ToViewResp, ToViewRespCode } from "@/type/toview"
import { ListVideo, Trash2 } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import Image from "@/components/image"
import { invoke } from "@tauri-apps/api"
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
import autoAnimate from "@formkit/auto-animate"

export default function ToView() {
    // State
    const [toViewList, setToViewList] = useState<ToViewListItem[] | null>(null)
    // Func
    const getToViewResp = async () => {
        // Send request to get popular content
        const toViewResp = JSON.parse(await getToView() as string) as ToViewResp
        // Check if request is error
        if (toViewResp.code != ToViewRespCode.SUCCESS) return
        // Set to view data
        setToViewList(toViewResp.data.list)
    }

    const delToView = async (params?: { aid?: number, viewed?: boolean }) => {
        // Show toast
        toast("删除稍后再看", {
            description: '正在删除稍后再看'
        })
        // Get csrf from cookies
        const csrf = await invoke('get_csrf') as string
        // Form data
        const form = {
            csrf: csrf,
            ...(params && params)
        }
        // Send request to delete to view
        const delResp = JSON.parse(await deleteToView(form) as string) as { code: number, message: string, ttl: number }
        console.log(delResp);
        // Check if request is success
        if (delResp.code === 0) {
            // Update list
            await getToViewResp()
            // Show toast
            toast("成功", {
                description: '已删除稍后再看'
            })
        } else {
            toast("失败", {
                description: delResp.message
            })
        }
    }

    const clsAllToView = async () => {
        // Show toast
        toast("清空稍后再看", {
            description: '正在清空稍后再看'
        })
        // Get csrf from cookies
        const csrf = await invoke('get_csrf') as string
        // Send request to delete to view
        const delResp = JSON.parse(await clearAllToView(csrf) as string) as { code: number, message: string, ttl: number }
        // Check if request is success
        if (delResp.code === 0) {
            // Show toast
            toast("成功", {
                description: '已清空稍后再看'
            })
            // Update list
            toViewList && setToViewList([])
        } else {
            toast("失败", {
                description: delResp.message
            })
        }
    }
    // Effect
    useEffect(() => {
        // Get to view data
        getToViewResp()
    }, [])
    // Refs
    const parent = useRef<HTMLDivElement>(null)

    useEffect(() => {
        parent.current && autoAnimate(parent.current)
    }, [parent])

    return (
        <div className="flex justify-center w-full">
            <div className="flex flex-col items-center w-[70rem] p-5">
                {/* Top */}
                <div className="flex justify-between w-full text-bili_blue">
                    {/* Left */}
                    <div className="flex items-center space-x-3">
                        <ListVideo className="w-9 h-9" />
                        <h1 className="text-xl">稍后再看({toViewList ? toViewList.length : '0'})</h1>
                    </div>
                    {/* Right */}
                    <div className="flex space-x-7">
                        <Button variant="outline" onClick={clsAllToView}>一键清空</Button>
                        <Button variant="outline" onClick={() => delToView({ viewed: true })}>移除已观看视频</Button>
                    </div>
                </div>
                <div ref={parent} className="flex flex-col items-center mt-7 w-[60rem] h-[55rem] space-y-5 overflow-y-auto scrollbar-hide relative">
                    {toViewList && toViewList.map((item, index) => (
                        <ToViewContentItem key={item.aid} index={index} item={item} delToView={delToView} />
                    ))}
                </div>
            </div>
            {/* Toaster */}
            <Toaster />
        </div >
    )
}

type ToViewContentItemProps = {
    index: number
    item: ToViewListItem,
    delToView: (params?: { aid?: number, viewed?: boolean }) => void
} & React.HTMLAttributes<HTMLDivElement>

const ToViewContentItem: React.FC<ToViewContentItemProps> = ({ index, item, delToView }) => {
    return (
        <div className="grid grid-cols-[2rem_1fr_5fr_3rem] items-center relative">
            {/* Timeline */}
            <div className="absolute top-11 left-0 w-0 h-0 border-solid border-l-4 border-t-4 border-b-4 border-r-0 border-transparent border-t-transparent border-l-current border-l-bili_gray"></div>
            {/* Count */}
            <span className="text-2xl ml-5">{index + 1}</span>
            {/* Cover */}
            <div className="w-40 h-24 ml-10 rounded-lg overflow-hidden relative">
                <Image className="w-40 h-24 object-center object-cover" url={item.pic} alt="Cover" />
            </div>
            {/* Info */}
            <div className="flex flex-col flex-1 justify-between ml-7 h-full py-2 border-b border-bili_grey">
                {/* Title */}
                <h1 className="text-sm font-bold">{item.title}</h1>
                {/* Bottom Info */}
                <div className="grid grid-cols-2 grid-rows-1">
                    {/* UP Info */}
                    <div className="flex items-center space-x-3 text-xs">
                        {/* Avatar */}
                        <Image className="w-6 h-6 object-cover object-center rounded-full" url={item.owner.face} alt="Avatar" />
                        {/* UP Name */}
                        <span>{item.owner.name}</span>
                    </div>
                </div>
            </div>
            {/* Delete Action */}
            <Button variant="outline" size="icon" onClick={() => delToView({ aid: item.aid })}>
                <Trash2 className="w-5 h-5 text-gray-400" />
            </Button>
        </div>
    )
}