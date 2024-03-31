import { AdditionalType, DrawItem, DynamicItem, DynamicType, ModuleDynamicAdditional, ModuleDynamicDesc, RichTextNodeType, VipStatus } from "@/type/dynamic"
import Image from "../image"
import React from "react"
import CssImg from "../css_img"
import { ChevronRight, Gift, ShoppingBag } from "lucide-react"
import { Button } from "../ui/button"
import TopicIcon from "../icon/topic"
import PlayIcon from "../icon/play"
import Danmaku from "../icon/danmaku"
import ForwardIcon from "../icon/forward"
import CommentIcon from "../icon/comment"
import LikeIcon from "../icon/like"

type DynamicListProps = {
    dynamicList: DynamicItem[]
} & React.HTMLAttributes<HTMLDivElement>

const DynamicList: React.FC<DynamicListProps> = ({
    dynamicList
}) => {
    return (
        <div className="h-[47rem]">
            {dynamicList.map((item, index) => (
                <div key={index} className="flex space-x-5 mb-2 bg-white p-5 rounded-lg">
                    {/* Avatar Area */}
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                        <Image url={item.modules.module_author.face} alt="Avatar" />
                    </div>
                    {/* Dynamic main */}
                    <div className="flex flex-col flex-1 space-y-2">
                        <div className="flex flex-col space-y-1">
                            <div className={item.modules.module_author.vip?.status === VipStatus.Active ? 'text-primary' : ''}>{item.modules.module_author.name}</div>
                            <span className="text-sm text-gray-400">{item.modules.module_author.pub_time}</span>
                        </div>
                        {/* Dynamic Main Area */}
                        {dynamicParser(item)}
                        {/* Stat Area */}
                        <div className="flex space-x-44 text-sm text-gray-500">
                            <div className="flex space-x-1 items-center">
                                <ForwardIcon />
                                <span>{item.modules.module_stat.forward.count === 0 ? '转发' : item.modules.module_stat.forward.count}</span>
                            </div>
                            <div className="flex space-x-1 items-center">
                                <CommentIcon />
                                <span>{item.modules.module_stat.comment.count === 0 ? '评论' : item.modules.module_stat.comment.count}</span>
                            </div>
                            <div className="flex space-x-1 items-center">
                                <LikeIcon />
                                <span>{item.modules.module_stat.like.count === 0 ? '点赞' : item.modules.module_stat.like.count}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

const dynamicTextParser = (desc: ModuleDynamicDesc) => {
    return (
        <>
            {desc.rich_text_nodes.map((node, index) => {
                if (node.type === RichTextNodeType.TEXT) {
                    const textParts = node.orig_text.split('\n');
                    return (
                        <span key={index}>
                            {textParts.map((part, index) => (
                                <React.Fragment key={index}>
                                    {part}
                                    {index < textParts.length - 1 && <br />}
                                </React.Fragment>
                            ))}
                        </span>
                    );
                }
                if (node.type === RichTextNodeType.TOPIC) return <span key={index} className="text-bili_blue hover:cursor-pointer">{node.orig_text}</span>
                if (node.type === RichTextNodeType.EMOJI) return <span key={index} className="inline-block"><Image className="w-7 h-7" url={node.emoji?.icon_url!} alt="emoji" /></span>
                if (node.type === RichTextNodeType.NONE) return
                return <span key={index} className="text-bili_blue hover:cursor-pointer">{node.orig_text}</span>
            })}
        </>
    )
}

const dynamicPicRender = (pics: DrawItem[]) => {
    // pics num
    const picItemsLength = pics.length
    // Adjust the style according to the number of images
    if (picItemsLength === 1) return <Image className="w-96 rounded-lg" url={pics[0].src} alt="Cover" />
    if (picItemsLength > 1 && picItemsLength <= 3) return (
        <div className="flex space-x-1">
            {pics.map((pic, index) => (
                <CssImg key={index} className="h-40 w-36 rounded-lg bg-center bg-no-repeat bg-cover" url={pic.src} />
            ))}
        </div>
    )
    if (picItemsLength === 4) return (
        <div className="flex flex-wrap w-80">
            {pics.map((pic, index) => (
                <CssImg key={index} className="h-40 w-36 mr-1 mb-1 rounded-lg bg-center bg-no-repeat bg-cover" url={pic.src} />
            ))}
        </div>
    )
    if (picItemsLength > 4) return (
        <div className="flex flex-wrap">
            {pics.map((pic, index) => (
                <CssImg key={index} className="h-40 w-36 mr-1 mb-1 rounded-lg bg-center bg-no-repeat bg-cover" url={pic.src} />
            ))}
        </div>
    )
}

const additionalParser = (additional: ModuleDynamicAdditional) => {
    // Determine the type of Additional
    switch (additional.type) {
        case AdditionalType.COMMON: return
        case AdditionalType.RESERVE: return
        case AdditionalType.GOODS: {
            const item = additional.goods!.items[0]
            // Check if goods num is gt one
            if (additional.goods!.items.length > 1) {
                return (
                    <div className="flex flex-col">
                        {/* Icon and text */}
                        <div className="flex space-x-1 items-center text-gray-400">
                            <ShoppingBag className="w-3 h-3" />
                            <span className="text-xs">{additional.goods?.head_text}</span>
                        </div>
                        {/* Main */}
                        <div className="w-full p-2 mt-1 flex justify-between items-center bg-bili_grey bg-opacity-30 rounded-md">
                            {/* Info */}
                            <div className="flex space-x-2">
                                {/* Img */}
                                {additional.goods!.items.map((pic, index) => (
                                    <div key={index} className="w-20 h-20 bg-gray-300 rounded-lg bg-opacity-30">
                                        <CssImg className="w-20 h-20 bg-no-repeat bg-center bg-cover" url={pic.cover} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )
            }
            // Else
            return (
                <div className="flex flex-col">
                    {/* Icon and text */}
                    <div className="flex space-x-1 items-center text-gray-400">
                        <ShoppingBag className="w-3 h-3" />
                        <span className="text-xs">{additional.goods?.head_text}</span>
                    </div>
                    {/* Main */}
                    <div className="w-full p-2 mt-1 flex justify-between items-center bg-bili_grey bg-opacity-30 rounded-md">
                        {/* Info */}
                        <div className="flex space-x-2">
                            {/* Img */}
                            <div className="w-20 h-20 bg-gray-300 rounded-lg bg-opacity-30">
                                <CssImg className="w-20 h-20 bg-no-repeat bg-center bg-cover" url={item.cover} />
                            </div>
                            {/* <CssImg className="w-16 h-16 bg-no-repeat bg-cover bg-center" url={additional.goods?.items[0].cover!} /> */}
                            <div className="flex flex-col justify-around text-sm">
                                {/* Goods name */}
                                <span className="line-clamp-1">{item.name}</span>
                                <div className="flex flex-col text-xs text-gray-400">
                                    {/* desc */}
                                    <span>{item.brief}</span>
                                    {/* Price */}
                                    <div className="mt-1">
                                        <span className="text-bili_blue">{item.price}</span> <span className="text-gray-400">起</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Button */}
                        <Button className="text-white">{additional.goods?.items[0].jump_desc}</Button>
                    </div>
                </div>
            )
        }
        case AdditionalType.LOTTERY: {
            const item = additional.upower_lottery
            return (
                <div className="flex flex-col">
                    {/* Main */}
                    <div className="w-full p-2 mt-1 flex justify-between items-center bg-bili_grey bg-opacity-30 rounded-md">
                        {/* Info */}
                        <div className="flex space-x-2">
                            {/* <CssImg className="w-16 h-16 bg-no-repeat bg-cover bg-center" url={additional.goods?.items[0].cover!} /> */}
                            <div className="flex flex-col justify-around text-sm">
                                {/* Lottery title */}
                                <span className="line-clamp-1">{item.title}</span>
                                <div className="flex flex-col text-xs mt-1 space-y-1 text-gray-400">
                                    {/* Lucky Draw Conditions  */}
                                    <span>{item.hint.text}</span>
                                    {/* Prize */}
                                    <a className="flex items-center text-bili_blue text-xs" href={item.jump_url}>
                                        <Gift className="w-4 h-4" />
                                        <span>{item.desc.text}</span>
                                        <ChevronRight className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* Button */}
                        <Button className="text-white">{item.button.jump_style.text}</Button>
                    </div>
                </div>
            )
        }
        case AdditionalType.VOTE:
        case AdditionalType.UGC:
        case AdditionalType.NONE:
        default: break
    }
}

const dynamicParser = (item: DynamicItem) => {
    console.log(item);
    switch (item.type) {
        case DynamicType.DRAW:
        case DynamicType.WORD: {
            return (
                <div>
                    {/* Topic Area */}
                    {item.modules.module_dynamic.topic &&
                        <div className="flex space-x-1 items-center text-sm text-bili_blue mt-2">
                            <TopicIcon />
                            <span>{item.modules.module_dynamic.topic.name}</span>
                        </div>
                    }
                    {/* Text Area */}
                    <div className="mt-1">
                        {item.modules.module_dynamic.desc && <div className="leading-6 text-sm">{dynamicTextParser(item.modules.module_dynamic.desc)}</div>}
                    </div>
                    {/* Pic Area */}
                    <div className="mt-2">
                        {item.modules.module_dynamic.major?.draw?.items && dynamicPicRender(item.modules.module_dynamic.major?.draw?.items)}
                    </div>
                    {/* Additional Area */}
                    <div className="mt-2">
                        {item.modules.module_dynamic.additional && additionalParser(item.modules.module_dynamic.additional)}
                    </div>
                </div>
            )
        }
        case DynamicType.FORWARD: {
            return (
                <div>
                    {/* Text Area */}
                    <div>
                        {item.modules.module_dynamic.desc && <div className="leading-6 text-sm">{dynamicTextParser(item.modules.module_dynamic.desc)}</div>}
                    </div>
                    {/* Forward Area */}
                    <div className="w-full mt-2 rounded-lg bg-opacity-50 bg-bili_grey p-5">
                        {/* User Area */}
                        <div className="flex space-x-2">
                            <Image className="w-5 h-5 rounded-full" url={item.orig?.modules.module_author.face!} alt="Avatar" />
                            <span className="text-sm text-gray-500">{item.orig?.modules.module_author.name}</span>
                        </div>
                        {/* Main Area */}
                        <div>{dynamicParser(item.orig!)}</div>
                    </div>
                </div>
            )
        }
        case DynamicType.AV: {
            const video = item.modules.module_dynamic.major?.archive
            return (
                <div>
                    {/* Text Area */}
                    {item.modules.module_dynamic.desc && dynamicTextParser(item.modules.module_dynamic.desc)}
                    {/* Video Area */}
                    <div className="w-full h-28 flex rounded-lg overflow-hidden">
                        {/* Cover */}
                        <div className="relative">
                            <Image className="w-52 h-full" url={video?.cover!} alt="Cover" />
                            <div className="absolute left-0 top-0 w-52 h-full" style={{ backgroundImage: 'linear-gradient(180deg, transparent 70%, black 100%)' }}></div>
                            <span className="absolute right-2 bottom-2 text-white text-sm opacity-80">{video?.duration_text}</span>
                        </div>
                        {/* Info */}
                        <div className="flex-1 flex flex-col justify-between border border-l-0 rounded-lg p-3">
                            <div className="flex flex-col space-y-1">
                                {/* Title */}
                                <span className="text-sm line-clamp-2">{video?.title}</span>
                                {/* Desc */}
                                <span className="text-xs line-clamp-1 text-gray-500">{video?.desc}</span>
                            </div>
                            {/* Stat */}
                            <div className="ml-2 flex space-x-9 text-gray-500 text-xs items-center">
                                {/* Play */}
                                <div className="flex space-x-1 items-center"><PlayIcon /> <span>{video?.stat.play}</span></div>
                                {/* Danmaku */}
                                <div className="flex space-x-1 items-center"><Danmaku /> <span>{video?.stat.danmaku}</span></div>
                            </div>
                        </div>
                    </div >
                </div>
            )
        }
    }
}

export default DynamicList
