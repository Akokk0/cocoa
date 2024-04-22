import { getComment } from "@/api/biliApi"
import { useBiliStore } from "@/store/biliStore"
import { CommentContent, CommentData, CommentResp, CommentRespCode } from "@/type/comment"
import { useEffect, useState } from "react"
import Image from "./image"
import { Input } from "./ui/input"
import { cn } from "@/lib/utils"
import LikeIcon from "./icon/like"
import LevelParser from "./level_selector"

type CommentProps = {
    type: number, oid: string, count: number
} & React.HTMLAttributes<HTMLDivElement>

const Comment: React.FC<CommentProps> = ({
    type, oid, count, ...props
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
        getCommentResp(type, oid)
    }, [])

    return (
        !commentList ? <div className="mt-5 text-center">正在加载评论...</div> :
            <div {...props}>
                {/* Title and selector */}
                <div className="flex items-center space-x-9">
                    <div className="flex items-center space-x-2">
                        <h1 className="text-xl font-bold">评论</h1>
                        <span className="text-xs text-gray-400">{count}</span>
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
                <div className="mt-7 ml-4 space-y-5">
                    {commentList.replies?.map(item => (
                        <div key={item.rpid_str} className="flex space-x-5">
                            {/* Avatar */}
                            <Image className="w-14 h-14 object-cover object-center rounded-full" url={item.member.avatar} alt="Avatar" />
                            {/* Main Area */}
                            <div className="flex-1">
                                {/* Up Info */}
                                <div className="mt-1 flex items-center space-x-1">
                                    {/* Up Name */}
                                    <span className={cn('text-xs', item.member.vip.vipStatus !== 0 ? 'text-primary' : '')}>{item.member.uname}</span>
                                    {/* Lv Badge */}
                                    <LevelParser level={item.member.level_info.current_level} width={24} height={24} />
                                </div>
                                {/* Comment Content */}
                                <div className="mt-4 text-sm">
                                    {commentParser(item.content)}
                                </div>
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
                                {/* Replies */}
                                <div className="mt-5 space-y-5">
                                    {item.replies?.map((reply, index) => (
                                        <div key={index}>
                                            <div className="flex space-x-3 items-start">
                                                {/* Avatar */}
                                                <Image className="w-6 h-6 object-cover object-center rounded-full" url={reply.member.avatar} alt="Avatar" />
                                                <div className="space-x-1">
                                                    {/* Up Name */}
                                                    <span className={cn('text-xs', reply.member.vip.vipStatus !== 0 ? 'text-primary' : '')}>{reply.member.uname}</span>
                                                    {/* Lv Badge */}
                                                    <LevelParser level={reply.member.level_info.current_level} width={17} height={17} className="inline-block" />
                                                    {/* Comment Content */}
                                                    <span className="text-sm">{commentParser(reply.content)}</span>
                                                </div>
                                            </div>
                                            {/* Action Area */}
                                            <div className="flex space-x-5 mt-3 ml-9 text-xs text-gray-400">
                                                {/* Pub Time */}
                                                <span>{reply.reply_control.time_desc}</span>
                                                {/* Pub Loaction */}
                                                <span>{reply.reply_control.location}</span>
                                                {/* Like */}
                                                <div className="flex space-x-1">
                                                    <LikeIcon />
                                                    <span>{reply.like}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {/* Reply tips */}
                                    {item.reply_control.sub_reply_entry_text &&
                                        <div className="text-xs text-gray-400">{item.reply_control.sub_reply_entry_text}</div>
                                    }
                                </div>
                                {/* Split Line */}
                                <div className="mt-5 h-[1px] w-full bg-bili_grey"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
    )
}

const commentParser = (content: CommentContent) => {
    const reg = /(\[[^\]]+\])/
    const str = content.message!
    const parts = str.split(reg);

    return (
        <span>
            {parts.map((item, index) => {
                if (reg.test(item)) {
                    return <Image key={index} className="w-5 h-5 object-cover object-center inline-block" url={content.emote[item].url} alt="emoji" />
                }
                return <span key={index}>{item}</span>
            })}
        </span>
    )
}

export default Comment