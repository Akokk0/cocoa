import { getRegionNew } from "@/api/biliApi"
import { VideoZone } from "@/type/bili"
import { List, RegionNewResp, VideoListRespCode } from "@/type/home"
import { useEffect, useState } from "react"
// UI
import Image from "./image"
import { ArrowLeft, ArrowRight, Clock, Play, RotateCw } from "lucide-react"

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
        return (
            value === currentTab &&
            <div className="flex flex-col h-full" {...props}>
                <div className="h-[50%] bg-pink-100 overflow-x-hidden overflow-y-hidden">
                    <div className="flex w-full">
                        {list.map((v, i) => (
                            <div key={i} className="flex-shrink-0 p-2">
                                <Image className="w-40 h-24 rounded-md" url={v.pic} alt="封面" />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex-1 flex bg-blue-100">
                    <div className="bg-green-200 w-[30rem] flex flex-col p-2">
                        <div className="flex-1 relative">
                            <div className="absolute right-0 top-0 flex flex-col">
                                <div className="flex"><Play /> <Clock /></div>
                                <div>UserInfo</div>
                            </div>
                        </div>
                        <div>Title</div>
                    </div>
                    <div className="flex-1 bg-orange-200 p-2">
                        Description
                    </div>
                    <div className="bg-red-200 w-40 relative">
                        <button className="absolute right-[7.1rem] bottom-4 rounded-full border flex items-center justify-center p-1 w-8 h-8">
                            <RotateCw width="1.2rem" height="1.2rem" />
                        </button>
                        <button className="absolute right-[4.5rem] bottom-4 rounded-full border flex items-center justify-center p-1 w-8 h-8">
                            <ArrowLeft />
                        </button>
                        <button className="absolute right-4 bottom-4 flex items-center justify-center rounded-full border p-1 w-12 h-12">
                            <ArrowRight width="2.8rem" height="2.8rem" />
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
                <div className="w-[60%] h-56 border border-bili_grey rounded-xl overflow-hidden shadow-sm">
                    {list && <TabContent value={VideoZone.douga} list={list} />}
                </div>
                <div className="flex space-x-2 mt-3">
                    <span className="flex h-3 w-3 translate-y-1 rounded-full bg-bili_blue" />
                    <span className="text-sm">最新发布</span>
                </div>
                <div className="w-[60%] h-56 mt-3 border border-bili_grey rounded-xl overflow-hidden shadow-sm">
                    {/* todo! */}
                </div>
            </div>
        </div>
    )
}

export default AreaTabs
