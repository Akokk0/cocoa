import { getComment } from "@/api/biliApi"
import { useBiliStore } from "@/store/biliStore"
import { CommentData, CommentResp, CommentRespCode } from "@/type/comment"
import { useEffect, useState } from "react"
import Image from "./image"
import { Input } from "./ui/input"
import { cn } from "@/lib/utils"
import levelParser from "./level_selector"
import LikeIcon from "./icon/like"

type CommentProps = {
    type: number, oid: string, mode?: number, next?: number, ps?: number
} & React.HTMLAttributes<HTMLDivElement>

const Comment: React.FC<CommentProps> = ({
    type, oid, mode, next, ps, ...props
}) => {
    // Store
    const personal = useBiliStore(state => state.personal)
    // State
    const [commentList, setCommentList] = useState<CommentData | undefined>(undefined)
    // Func
    const getCommentResp = async (type: number, oid: string, mode?: number, next?: number, ps?: number) => {
        // Construct params
        const params = {
            type,
            oid,
            ...(mode !== null && mode !== undefined && { mode }),
            ...(next !== null && next !== undefined && { next }),
            ...(ps !== null && ps !== undefined && { ps }),
        }
        // Send request to get popular content
        const commentResp = JSON.parse(await getComment(params) as string) as CommentResp
        // Check if request is error
        if (commentResp.code != CommentRespCode.Success) return
        // Set resp to state
        setCommentList(commentResp.data)
    }
    // Effect
    useEffect(() => {
        getCommentResp(type, oid, mode, next, ps)
    }, [])
    useEffect(() => {
        console.log(commentList);
    }, [commentList])

    return (
        commentList &&
        <div {...props}>
            {/* Title and selector */}
            <div className="flex items-center space-x-9">
                <div className="flex items-center space-x-2">
                    <h1 className="text-xl font-bold">评论</h1>
                    <span className="text-xs text-gray-400">{commentList.replies?.length}</span>
                </div>
                <div className="flex space-x-3 text-xs text-gray-400">
                    <span>最热</span>
                    <span>|</span>
                    <span>最新</span>
                </div>
            </div>
            {/* Avatar and my comment area */}
            <div className="flex mt-5 ml-3">
                {/* Avatar */}
                <Image className="w-12 h-12 object-cover object-center rounded-full" url={personal?.face!} alt="Avatar" />
                {/* Input */}
                <Input className="ml-5 h-12" type="text" placeholder={commentList.control.child_input_text} />
            </div>
            {/* Comment Area */}
            <div className="mt-7 ml-2 space-y-5">
                {commentList.replies?.map(item => (
                    <div key={item.rpid_str} className="flex space-x-5">
                        {/* Avatar */}
                        <Image className="w-14 h-14 object-cover object-center rounded-full" url={item.member.avatar} alt="Avatar" />
                        {/* Main Area */}
                        <div>
                            {/* Up Info */}
                            <div className="mt-1 flex items-center space-x-1">
                                {/* Up Name */}
                                <span className={cn('text-xs', item.member.vip.vipStatus !== 0 ? 'text-primary' : '')}>{item.member.uname}</span>
                                {/* Lv Badge */}
                                {levelParser(item.member.level_info.current_level)}
                            </div>
                            {/* Comment Content */}
                            <div className="mt-4 text-sm">{item.content.message}</div>
                            {/* Action Area */}
                            <div className="flex space-x-5 mt-3 text-xs text-gray-400">
                                {/* Pub Time */}
                                <span>{item.reply_control.time_desc}</span>
                                {/* Pub Loaction */}
                                <span>{item.reply_control.location}</span>
                                {/* Like */}
                                <div className="flex space-x-1">
                                    <LikeIcon />
                                    <span>{item.like}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Comment