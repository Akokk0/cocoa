import { getRegionNew } from "@/api/biliApi"
import { VideoZone } from "@/type/bili"
import { List, RegionNewResp, VideoListRespCode } from "@/type/home"
import { useEffect, useState } from "react"

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
            console.log(regionNewResp.data.archives);
        }
        initial()
    }, [])

    type TabProps = {
        value: VideoZone, children?: React.ReactNode
    } & React.HTMLAttributes<HTMLLIElement>

    type TabContentProps = {
        value: VideoZone, children?: React.ReactNode
    } & React.HTMLAttributes<HTMLDivElement>

    const Tab = ({
        value, children, ...props
    }: TabProps) => {
        return (
            <li
                onClick={() => setCurrentTab(value)}
                className="hover:cursor-pointer"
                style={currentTab === value ? { fontWeight: 'bold' } : undefined}
                {...props}
            >{children}</li>
        )
    }

    const TabContent = ({
        value, children, ...props
    }: TabContentProps) => {
        return (
            value === currentTab &&
            <div {...props}>
                {children}
            </div>
        )
    }

    return (
        <div {...props}>
            <div className="flex items-center space-x-7">
                <h3 className="text-2xl font-bold">分区</h3>
                <ul className="flex space-x-2 text-[#7f7f7f] text-sm">
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
            <div className="w-[60%] h-[20%] bg-pink-200">
                <TabContent value={VideoZone.douga}>
                </TabContent>
                <TabContent value={VideoZone.anime}>
                </TabContent>
                <TabContent value={VideoZone.guochuang}>
                </TabContent>
                <TabContent value={VideoZone.music}>
                </TabContent>
            </div>
        </div>
    )
}

export default AreaTabs