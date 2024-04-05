import React from "react"
// Component
import Image from "../image"
import CssImg from "../css_img"
import { Button } from "../ui/button"
import InfiniteScroll from 'react-infinite-scroll-component';
// Types
import { AdditionalType, DrawItem, DynamicItem, DynamicModules, DynamicType, LiveRCMDContent, ModuleAuthor, ModuleDynamicAdditional, ModuleDynamicDesc, ModuleInteraction, RichTextNodeType, VipStatus } from "@/type/dynamic"
// Icons
import { ChevronRight, Gift, Link, ShoppingBag } from "lucide-react"
import TopicIcon from "../icon/topic"
import PlayIcon from "../icon/play"
import Danmaku from "../icon/danmaku"
import ForwardIcon from "../icon/forward"
import CommentIcon from "../icon/comment"
import LikeIcon from "../icon/like"
// Utils
import { cn } from "@/lib/utils";

type DynamicListProps = {
    dynamicList: DynamicItem[]
} & React.HTMLAttributes<HTMLDivElement>

const DynamicList: React.FC<DynamicListProps> = ({
    dynamicList
}) => {
    return (
        <InfiniteScroll
            dataLength={dynamicList.length}
            hasMore={true}
            next={() => console.log('Loading')}
            loader={<h4>Loading...</h4>}
            endMessage={
                <p style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b>
                </p>
            }
        >
            {dynamicList.map((item, index) => (
                <div key={index}>
                    {dynamicParser(item)}
                </div>
            ))}
        </InfiniteScroll>
    )
}

const interactionParser = (interaction: ModuleInteraction) => {
    const item = interaction.items[0].desc
    return (
        <div className="flex space-x-3 items-center text-gray-400 border-l-2 border-bili_grey">
            {/* Icon */}
            <div className="ml-3">
                {item.rich_text_nodes[item.rich_text_nodes.length - 1].orig_text.includes('赞了') ?
                    <LikeIcon /> :
                    <CommentIcon />
                }
            </div>
            {/* Content */}
            <div className="text-gray-400 text-xs">
                {item.rich_text_nodes.map((v, i) => {
                    if (i === item.rich_text_nodes.length - 1) {
                        if (v.orig_text.includes('赞了')) return <span key={i}>&nbsp;{v.orig_text}</span>
                        else return <span key={i}>{v.orig_text}</span>
                    }
                    if (v.type === RichTextNodeType.AT) return <span key={i} className=" text-gray-500">{v.orig_text}</span>
                })}
            </div>
        </div>
    )
}

const statCountParser = (count: number) => {
    if (count >= 10000) {
        return `${(count / 10000).toFixed(1)}万`
    }
    return `${count}`
}

const pubTimeParser = (author: ModuleAuthor) => {
    if (author.pub_time) {
        return (
            <div className="flex text-xs text-gray-400">
                <span>{author.pub_time}</span> &nbsp;
                <span>{author.pub_action ? ` · ${author.pub_action}` : ''}</span>
            </div>
        )
    } else {
        return (
            <div className="text-xs text-gray-400">
                <span>{author.pub_action}</span>
            </div>
        )
    }
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
                if (node.type === RichTextNodeType.WEB) return <span key={index} className="text-bili_blue hover:cursor-pointer"><Link className="w-5 h-5 inline-block" /> {node.text}</span>
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

const additionalParser = (additional: ModuleDynamicAdditional, forward?: boolean) => {
    // Determine the type of Additional
    switch (additional.type) {
        case AdditionalType.COMMON: {
            const item = additional.common
            return (
                <div>
                    {/* Head Text */}
                    <span className="text-xs text-gray-500">{item?.head_text}</span>
                    {/* Main */}
                    <div className={cn('w-full p-2 mt-1 flex justify-between items-center rounded-md', forward ? 'bg-white' : 'bg-bili_grey bg-opacity-30')}>
                        {/* Info */}
                        <div className="flex space-x-2">
                            {/* Img */}
                            <div className="w-20 h-20 bg-gray-300 rounded-lg bg-opacity-30">
                                <CssImg className="w-20 h-20 bg-no-repeat bg-center bg-cover rounded-lg overflow-hidden" url={item?.cover!} />
                            </div>
                            <div className="flex flex-col justify-around text-sm">
                                {/* Game name */}
                                <span className="line-clamp-1">{item?.title}</span>
                                {/* Desc1*/}
                                <span className="text-xs text-gray-400">{item?.desc1}</span>
                                {/* Desc2 */}
                                <span className="text-xs text-gray-400">{item?.desc2}</span>
                            </div>
                        </div>
                        {/* Button */}
                        <Button className="text-white">{item?.button.jump_style?.text}</Button>
                    </div>
                </div>
            )
        }
        case AdditionalType.RESERVE: {
            const item = additional.reserve!
            return (
                <div className={cn('flex flex-col rounded-md p-1', forward ? 'bg-white' : 'bg-bili_grey bg-opacity-30')}>
                    {/* Main */}
                    <div className="w-full p-2 mt-1 flex justify-between items-center">
                        {/* Info */}
                        <div className="flex space-x-3">
                            {/* <CssImg className="w-16 h-16 bg-no-repeat bg-cover bg-center" url={additional.goods?.items[0].cover!} /> */}
                            <div className="flex flex-col justify-around space-y-1 text-sm">
                                {/* Reserve title */}
                                <span className="line-clamp-1">{item.title}</span>
                                {/* Info  */}
                                <div className="text-gray-400 text-xs space-x-5">
                                    <span>{item.desc1.text}</span>
                                    <span>{item.desc2.text}</span>
                                </div>
                                {/* Prize */}
                                {item.desc3 &&
                                    <a className="flex items-center text-bili_blue text-xs" href={item.jump_url}>
                                        <Gift className="w-4 h-4" />
                                        <span>&nbsp;{item.desc3.text}</span>
                                        <ChevronRight className="w-4 h-4" />
                                    </a>
                                }
                            </div>
                        </div>
                        {/* Button */}
                        <Button className="text-white">{item.button.status === 1 ? item.button.uncheck.text : item.button.check.text}</Button>
                    </div>
                </div>
            )
        }
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
                        <div className={cn('w-full p-2 mt-1 flex justify-between items-center rounded-md', forward ? 'bg-white' : 'bg-bili_grey bg-opacity-30')}>
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
                    <div className={cn('w-full p-2 mt-1 flex justify-between items-center bg-bili_grey bg-opacity-30 rounded-md', forward ? 'bg-white' : 'bg-bili_grey bg-opacity-30')}>
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
                        <Button className="text-white ml-5">{additional.goods?.items[0].jump_desc}</Button>
                    </div>
                </div>
            )
        }
        case AdditionalType.LOTTERY: {
            const item = additional.upower_lottery!
            return (
                <div className="flex flex-col">
                    {/* Main */}
                    <div className={cn('w-full p-2 mt-1 flex justify-between items-center bg-bili_grey bg-opacity-30 rounded-md', forward ? 'bg-white' : 'bg-bili_grey bg-opacity-30')}>
                        {/* Info */}
                        <div className="flex space-x-2">
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
                        <Button disabled={item.button.status !== 1} className="text-white">{item.button.status === 1 ? item.button.jump_style.text : item.button.check.text}</Button>
                    </div>
                </div>
            )
        }
        case AdditionalType.MATCH: {
            const item = additional.match
            const match_info = item?.match_info
            return (
                <div className="flex flex-col">
                    {/* Head Text */}
                    <div className="flex space-x-1 items-center text-gray-400">
                        <span className="text-xs">{additional.match?.head_text}</span>
                    </div>
                    {/* Main */}
                    <div className={cn('w-full p-2 mt-1 flex justify-between items-center bg-bili_grey bg-opacity-30 rounded-md', forward ? 'bg-white' : 'bg-bili_grey bg-opacity-30')}>
                        {/* Info */}
                        <div className="flex-1 flex space-x-2">
                            {/* Img */}
                            <div className="w-[4.5rem] h-[4.5rem] flex justify-center items-center text-gray-500 text-xs border-r border-bili_grey">
                                {match_info?.title}
                            </div>
                            <div className="flex-1 flex justify-around text-sm">
                                {/* Left Team */}
                                <div className="flex flex-col items-center">
                                    {/* Team Logo */}
                                    <Image className="w-11 h-11 object-cover object-center" url={match_info?.left_team.pic!} alt="logo" />
                                    {/* Team Name */}
                                    <span className="text-xs">{match_info?.left_team.name}</span>
                                </div>
                                {/* Match Info */}
                                <div className="flex flex-col items-center space-y-2">
                                    {/* Score */}
                                    <div className="flex space-x-4 text-3xl font-bold">
                                        {/* Left Team Score */}
                                        <span>{match_info?.center_top[0]}</span>
                                        <span>{match_info?.center_top[1]}</span>
                                        <span>{match_info?.center_top[2]}</span>
                                    </div>
                                    {/* Match status */}
                                    <span className={cn('text-xs', match_info?.center_bottom === '进行中' ? 'text-bili_blue' : 'text-gray-500')}>{match_info?.center_bottom}</span>
                                </div>
                                {/* Right Team */}
                                <div className="flex flex-col items-center">
                                    {/* Team Logo */}
                                    <Image className="w-11 h-11 object-cover object-center" url={match_info?.right_team.pic!} alt="logo" />
                                    {/* Team Name */}
                                    <span className="text-xs">{match_info?.right_team.name}</span>
                                </div>
                            </div>
                        </div>
                        {/* Button */}
                        <Button className="text-white ml-5">{item?.button.jump_style.text}</Button>
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

    // Generic
    return (
        <div className="flex space-x-5 mb-2 bg-white p-5 rounded-lg">
            {/* Avatar Area */}
            <div className="w-12 h-12 rounded-full overflow-hidden">
                <Image url={item.modules.module_author.face} alt="Avatar" />
            </div>
            {/* Dynamic main */}
            <div className="flex flex-col flex-1 space-y-3">
                <div className="flex flex-col space-y-1">
                    <div className={item.modules.module_author.vip?.status === VipStatus.Active ? 'text-primary' : ''}>{item.modules.module_author.name}</div>
                    {/* Pub time */}
                    {pubTimeParser(item.modules.module_author)}
                </div>
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
                {/* Main Area */}
                {dynamicMainContentParser(item.modules, item.type, false, item.orig)}
                {/* Additional Area */}
                <div className="mt-2">
                    {item.modules.module_dynamic.additional && additionalParser(item.modules.module_dynamic.additional)}
                </div>
                {/* Hot comment or Friends like Area */}
                {item.modules.module_interaction && interactionParser(item.modules.module_interaction)}
                {/* Stat Area */}
                <div className="grid grid-cols-3 text-sm text-gray-500">
                    <div className="flex space-x-1 items-center">
                        <ForwardIcon />
                        <span>{item.modules.module_stat.forward.count === 0 ? '转发' : statCountParser(item.modules.module_stat.forward.count)}</span>
                    </div>
                    <div className="flex space-x-1 items-center">
                        <CommentIcon />
                        <span>{item.modules.module_stat.comment.count === 0 ? '评论' : statCountParser(item.modules.module_stat.comment.count)}</span>
                    </div>
                    <div className="flex space-x-1 items-center">
                        <LikeIcon />
                        <span>{item.modules.module_stat.like.count === 0 ? '点赞' : statCountParser(item.modules.module_stat.like.count)}</span>
                    </div>
                </div>
            </div>
        </div >
    )
}

const dynamicMainContentParser = (modules: DynamicModules, type: DynamicType, forward: boolean, orig?: DynamicItem) => {
    switch (type) {
        case DynamicType.DRAW:
        case DynamicType.WORD: {
            return (
                <div className="mt-2"> {/* Pic Area */}
                    {modules.module_dynamic.major?.draw?.items && dynamicPicRender(modules.module_dynamic.major?.draw?.items)}
                </div>
            )
        }
        case DynamicType.FORWARD: {
            return (
                <div className="w-full mt-2 rounded-lg bg-opacity-50 bg-bili_grey p-5"> {/* Forward Area */}
                    {/* User Area */}
                    <div className="flex space-x-2">
                        <Image className="w-5 h-5 rounded-full" url={modules.module_author.face!} alt="Avatar" />
                        <span className="text-sm text-gray-500">{modules.module_author.name}</span>
                    </div>
                    {/* Main Area */}
                    <div>{dynamicMainContentParser(orig?.modules!, orig?.type!, true)}</div>
                    {/* Additional Area */}
                    <div className="mt-2">
                        {modules.module_dynamic.additional && additionalParser(modules.module_dynamic.additional)}
                    </div>
                </div>
            )
        }
        case DynamicType.AV: {
            const video = modules.module_dynamic.major?.archive
            return (
                <div>
                    {/* Video Area */}
                    <div className={cn('w-full h-28 flex rounded-lg overflow-hidden mt-2', forward ? 'bg-white' : '')}>
                        {/* Cover */}
                        <div className="relative">
                            <CssImg className="w-52 h-full bg-center bg-no-repeat bg-cover" url={video?.cover!} />
                            {/* <Image  url={video?.cover!} alt="Cover" /> */}
                            <div className="absolute left-0 top-0 w-52 h-full" style={{ backgroundImage: 'linear-gradient(180deg, transparent 70%, black 100%)' }}></div>
                            <span className="absolute right-2 bottom-2 text-white text-sm opacity-80">{video?.duration_text}</span>
                        </div>
                        {/* Info */}
                        <div className={cn('flex-1 flex flex-col justify-between rounded-r-lg p-3', forward ? '' : 'border border-l-0')}>
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
        case DynamicType.ARTICLE: {
            const article = modules.module_dynamic.major?.article
            return (
                <div className="space-y-2">
                    {/* Title */}
                    <span className="font-bold">{article?.title}</span>
                    {/* Desc */}
                    <div>
                        {article?.desc} <br />
                    </div>
                    {/* Pic */}
                    <div>
                        {article?.covers.map((pic, index) => (
                            <Image key={index} className="w-[30rem] h-60 rounded-lg overflow-hidden object-cover object-center" url={pic} alt="Cover" />
                        ))}
                    </div>
                </div>
            )
        }
        case DynamicType.LIVE: {
            const live = modules.module_dynamic.major?.live!
            return (
                <div>
                    {/* Live Area */}
                    <div className="w-full h-28 flex rounded-lg overflow-hidden mt-2">
                        {/* Cover */}
                        <CssImg className="w-52 h-full bg-center bg-no-repeat bg-cover" url={live.cover} />
                        {/* Info */}
                        <div className="flex-1 flex flex-col justify-between border border-l-0 rounded-r-lg p-3">
                            <div className="flex flex-col space-y-1">
                                {/* Title */}
                                <span className="text-balance line-clamp-2">{live?.title}</span>
                            </div>
                            {/* Info */}
                            <div className="text-gray-500 text-xs items-center">
                                <span>{live.desc_first} · {live.desc_second}</span>
                            </div>
                        </div>
                    </div >
                </div>
            )
        }
        case DynamicType.LIVE_RCMD: {
            const live_play_info = (JSON.parse(modules.module_dynamic.major?.live_rcmd?.content!) as LiveRCMDContent).live_play_info
            return (
                <div className="w-full h-28 flex rounded-lg overflow-hidden mt-2"> {/* Live Area */}
                    {/* Cover */}
                    <CssImg className="w-52 h-full bg-center bg-no-repeat bg-cover" url={live_play_info.cover} />
                    {/* Info */}
                    <div className="flex-1 flex flex-col justify-between border border-l-0 rounded-r-lg p-3">
                        <div className="flex flex-col space-y-1">
                            {/* Title */}
                            <span className="text-balance line-clamp-2">{live_play_info?.title}</span>
                        </div>
                        {/* Info */}
                        <div className="text-gray-500 text-xs items-center">
                            <span>{live_play_info.area_name} · {live_play_info.watched_show.text_large}</span>
                        </div>
                    </div>
                </div >
            )
        }
        case DynamicType.COURSES_SEASON: {
            const courses = modules.module_dynamic.major?.courses
            return (
                <div>
                    {/* Courses Area */}
                    <div className="w-full h-28 flex rounded-lg overflow-hidden mt-2">
                        {/* Cover */}
                        <div className="relative">
                            <CssImg className="w-52 h-full bg-center bg-no-repeat bg-cover" url={courses?.cover!} />
                            <div className="absolute top-1 right-1">{courses?.badge.text}</div>
                        </div>
                        {/* Info */}
                        <div className="flex-1 flex flex-col justify-between rounded-r-lg border border-l-0 p-3 bg-white">
                            <div className="flex flex-col space-y-1">
                                {/* Title */}
                                <span className="text-sm line-clamp-2">{courses?.title}</span>
                                {/* Desc */}
                                <span className="text-xs line-clamp-1 text-gray-500">{courses?.sub_title}</span>
                            </div>
                            {/* Stat */}
                            <div className="flex space-x-9 text-gray-500 text-xs items-center">
                                {courses?.desc}
                            </div>
                        </div>
                    </div >
                </div>
            )
        }
    }
}

export default DynamicList
