import { getRegionNew } from "@/api/biliApi"
import { VideoZone } from "@/type/bili"
import { List, RegionNewResp, VideoListRespCode } from "@/type/home"
import { useEffect, useState } from "react"
// UI
import Image from "./image"
import { ArrowLeft, ArrowRight, Clock, Play, RotateCw } from "lucide-react"
import UPInfo from "./upinfo"
// CSS
import './areatabs.css'

type AreaTabsProps = React.HTMLAttributes<HTMLDivElement>

const AreaTabs: React.FC<AreaTabsProps> = ({ ...props }) => {
    const [currentTab, setCurrentTab] = useState<VideoZone>(VideoZone.douga)
    const [list, setList] = useState<List>()

    useEffect(() => {
        const initial = async () => {
            // Send request to get must-do content
            const regionNewResp = JSON.parse(await getRegionNew() as string) as RegionNewResp
            // Check if request is error
            if (regionNewResp.code !== VideoListRespCode.SUCCESS) return
            // Set resp to state
            setList(regionNewResp.data.archives)
        }
        initial()
    }, [])

    type TabProps = {
        value: VideoZone, children?: React.ReactNode
    } & React.HTMLAttributes<HTMLLIElement>

    type TabContentProps = {
        value: VideoZone, list: List
    } & React.HTMLAttributes<HTMLDivElement>

    const Tab = ({
        value, children, ...props
    }: TabProps) => {
        return (
            <li
                onClick={() => setCurrentTab(value)}
                className="hover:cursor-pointer"
                style={value === currentTab ? {
                    fontWeight: 700,
                    color: 'black',
                    scale: '115%',
                    borderBottom: '2px solid black'
                } : undefined}
                {...props}
            >{children}</li>
        )
    }

    const TabContent = ({
        value, list, ...props
    }: TabContentProps) => {
        const [currentVideo, setCurrentVideo] = useState<number>(0)

        const arrowLeft = () => {
            if ((currentVideo - 1) <= -1) {
                setCurrentVideo(list.length - 1)
            } else {
                setCurrentVideo(currentVideo - 1)
            }
        }

        const arrorRight = () => {
            if ((currentVideo + 1) >= list.length) {
                setCurrentVideo(0)
            } else {
                setCurrentVideo(currentVideo + 1)
            }
        }

        type VideoPicProps = {
            index: number
        } & React.HTMLAttributes<HTMLDivElement>

        const VideoPic = ({
            index
        }: VideoPicProps) => {
            if(index === currentVideo) {
                return (
                    <div className="flex-shrink-0 p-2 w-60 h-32 rounded-md overflow-hidden" key={index}>
                        <Image className="w-60 h-32 rounded-md overflow-hidden" url={list[index].pic} alt="封面" />
                    </div>
                )
            } else {
                return (
                    <div className="flex-shrink-0 p-2 w-40 h-25 rounded-md z-10 overflow-hidden" key={index}>
                        <Image className="w-40 h-24 rounded-md overflow-hidden" url={list[index].pic} alt="封面" />
                    </div>
                )
            }
        }

        return (
            value === currentTab &&
            <div className="flex flex-col h-full" {...props}>
                <div className="h-[50%] overflow-x-hidden overflow-y-hidden">
                    <div className="flex w-full">
                        {list.map((_, i) => (
                            <VideoPic index={i} />
                        ))}
                    </div>
                </div>
                <div className="h-[50%] flex">
                    <div className="w-[30rem] flex flex-col p-2">
                        <div className="flex-1 relative">
                            <div className="absolute right-0 top-0 flex flex-col">
                                <div className="flex space-x-2 mb-1">
                                    <div className="flex items-center justify-center space-x-2 text-white bg-bili_blue rounded-full w-32 h-8 text-sm">
                                        <Play width="1rem" height="1rem" /> <span>播放</span>
                                    </div>
                                    <div className="border border-bili_grey p-1 rounded-full text-gray-800">
                                        <Clock />
                                    </div>
                                </div>
                                <div>
                                    <UPInfo up={list[currentVideo].owner} />
                                </div>
                            </div>
                        </div>
                        <span className="line-clamp-1">{list[currentVideo].title}</span>
                    </div>
                    <div className="flex-1 p-2 text-sm overflow-y-auto">
                        {list[currentVideo].desc}
                    </div>
                    <div className="w-40 relative">
                        <button className="absolute right-[7.1rem] bottom-4 rounded-full border flex items-center justify-center p-1 w-8 h-8 transition
                            rotatingF hover:border-bili_blue">
                            <RotateCw className="rotatingElement" width="1.2rem" height="1.2rem" />
                        </button>
                        <button className="absolute right-[4.5rem] bottom-4 rounded-full border flex items-center justify-center p-1 w-8 h-8 transition
                            popLeftArrow hover:border-bili_blue" onClick={arrowLeft}>
                            <ArrowLeft className="arrow-left" />
                        </button>
                        <button className="absolute right-4 bottom-4 flex items-center justify-center rounded-full border p-1 w-12 h-12 transition
                            popRightArrow hover:border-bili_blue" onClick={arrorRight} >
                            <ArrowRight className="arrow-right" width="2.8rem" height="2.8rem" />
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div {...props}>
            <div className="flex items-center space-x-7">
                <h3 className="text-2xl font-bold">分区</h3>
                <ul className="flex space-x-4 text-[#7f7f7f] text-sm">
                    <Tab value={VideoZone.douga}>动画</Tab>
                    <Tab value={VideoZone.anime}>番剧</Tab>
                    <Tab value={VideoZone.guochuang}>国创</Tab>
                    <Tab value={VideoZone.music}>音乐</Tab>
                    <Tab value={VideoZone.dance}>舞蹈</Tab>
                    <Tab value={VideoZone.game}>游戏</Tab>
                    <Tab value={VideoZone.knowledge}>知识</Tab>
                    <Tab value={VideoZone.tech}>科技</Tab>
                    <Tab value={VideoZone.sports}>运动</Tab>
                    <Tab value={VideoZone.car}>汽车</Tab>
                    <Tab value={VideoZone.life}>生活</Tab>
                    <Tab value={VideoZone.food}>美食</Tab>
                    <Tab value={VideoZone.animal}>动物圈</Tab>
                    <Tab value={VideoZone.kichiku}>鬼畜</Tab>
                    <Tab value={VideoZone.fashion}>时尚</Tab>
                    <Tab value={VideoZone.information}>资讯</Tab>
                    <Tab value={VideoZone.ent}>娱乐</Tab>
                    <Tab value={VideoZone.cinephile}>影视</Tab>
                    <Tab value={VideoZone.documentary}>纪录片</Tab>
                    <Tab value={VideoZone.movie}>电影</Tab>
                    <Tab value={VideoZone.tv}>电视剧</Tab>
                </ul>
            </div>
            <div className="mt-2">
                <div className="flex space-x-2 mb-2">
                    <span className="flex h-3 w-3 translate-y-1 rounded-full bg-bili_blue" />
                    <span className="text-sm">最新发布</span>
                </div>
                <div className="w-[50%] h-56 border border-bili_grey rounded-xl overflow-hidden shadow-sm">
                    {list && <TabContent value={VideoZone.douga} list={list} />}
                </div>
                <div className="flex space-x-2 mt-3">
                    <span className="flex h-3 w-3 translate-y-1 rounded-full bg-bili_blue" />
                    <span className="text-sm">最新发布</span>
                </div>
                <div className="w-[50%] h-56 mt-3 border border-bili_grey rounded-xl overflow-hidden shadow-sm">
                    {/* todo! */}
                </div>
            </div>
        </div>
    )
}

export default AreaTabs
