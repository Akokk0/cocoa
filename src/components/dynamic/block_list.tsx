import { getBlockList } from "@/api/biliApi"
import { BlockListItem, BlockListResp, BlockListRespCode } from "@/type/block_list"
import { useEffect, useState } from "react"
import Image from "../image"

const BlockList: React.FC = () => {
    const [blockList, setBlockList] = useState<BlockListItem[]>()

    const getBlockListResp = async () => {
        // Send request to get popular content
        const blockListResp = JSON.parse(await getBlockList() as string) as BlockListResp
        // Check if request is error
        if (blockListResp.code !== BlockListRespCode.Success) return
        //Set resp to state
        setBlockList(blockListResp.data)
    }

    useEffect(() => {
        getBlockListResp()
    }, [])

    useEffect(() => {
        console.log(blockList);
    }, [blockList])

    return (
        <div className="flex flex-col space-y-1 p-3">
            {blockList && blockList.slice(0, 5).map((item, index) => (
                <div key={index} className="grid grid-cols-[1.5rem_2.5fr_4fr_0.5fr] gap-x-2 items-center text-sm">
                    {/* Avatar */}
                    <Image className="w-6 h-6 object-cover object-center rounded-full" url={item.face} alt="Avatar" />
                    {/* Up Name */}
                    <span className="line-clamp-1 h-5">{item.uname}</span>
                    {/* Block Reason */}
                    <span>{item.reasonTypeName}</span>
                    {/* Block date */}
                    <span>{item.blockedDays === 0 ? '永' : item.blockedDays}</span>
                </div>
            ))}
        </div>
    )
}

export default BlockList