import { Link, Outlet, useLocation } from "react-router-dom";
// CSS
import './Layout.css'
// Icons
import { Home, History, Settings, Radar, ListRestart, Star } from "lucide-react";
// Utils
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { useBiliStore } from "@/store/biliStore";
import { getLatestUpdatesDynamicUpInfo, getPersonalInfo } from "@/api/biliApi";
import { PersonalInfoResp, PersonalInfoRespCode } from "@/type/user";
import { LatestUpdatesDynamicUpInfoResp, LatestUpdatesDynamicUpInfoRespCode } from "@/type/dynamic";

export default function Layout() {
    // Store
    const setPersonal = useBiliStore(state => state.setPersonal)
    const setLatestUpdatesData = useBiliStore(state => state.setLatestUpdatesData)
    // Func
    const getPersonalInfoResp = async () => {
        // Send request to get popular content
        const personalInfo = JSON.parse(await getPersonalInfo() as string) as PersonalInfoResp
        // Check if request is error
        if (personalInfo.code !== PersonalInfoRespCode.SUCCESS) return
        // Set resp to state
        setPersonal(personalInfo.data)
    }

    const getLatestUpdatesDynamicUpInfoResp = async () => {
        // Send request to get popular content
        const latestUpdatesDynamicUpInfoResp = JSON.parse(await getLatestUpdatesDynamicUpInfo() as string) as LatestUpdatesDynamicUpInfoResp
        // Check if request is error
        if (latestUpdatesDynamicUpInfoResp.code != LatestUpdatesDynamicUpInfoRespCode.SUCCESS) return
        // Set resp to state
        setLatestUpdatesData(latestUpdatesDynamicUpInfoResp.data)
    }
    // Effect
    useEffect(() => {
        getPersonalInfoResp()
        getLatestUpdatesDynamicUpInfoResp()
    }, [])
    // Object
    const location = useLocation()
    // Component
    const NavLink = (
        { href, Icon, children, ...props }:
            { href: string, Icon?: React.ComponentType<any>, children?: React.ReactNode }
    ) => {
        const isActive = href === location.pathname

        return (
            <Link to={href} {...props}>
                <div className={cn("flex space-x-2 items-center py-1 px-2 hover:underline", isActive ? 'active' : '')}>
                    {Icon && <Icon className="inline-block w-5"></Icon>}
                    {children}
                </div>
            </Link>
        )
    }

    const Title = (
        { children, ...props }:
            { children: React.ReactNode }
    ) => <div className="text-3xl mt-4 ml-1" {...props}>{children}</div>

    const SubTitle = (
        { children, ...props }:
            { children: React.ReactNode }
    ) => <div className="text-xl mt-4 ml-1" {...props}>{children}</div>

    return (
        <>
            <div className="flex h-screen">
                {/* 侧边栏 */}
                <aside className="bg-primary px-3 py-2 text-white">
                    <div className="flex flex-col space-y-2 w-52 text-xs">
                        <Title>Cocoa</Title>
                        <NavLink href="/main" Icon={Home}>
                            <span>首页</span>
                        </NavLink>
                        <NavLink href="/main/dynamic" Icon={Radar}>
                            <span>动态</span>
                        </NavLink>
                        <SubTitle>我的</SubTitle>
                        <NavLink href="/main/favorite" Icon={Star}>
                            <span>我的收藏</span>
                        </NavLink>
                        <NavLink href="/main/history" Icon={History}>
                            <span>历史记录</span>
                        </NavLink>
                        <NavLink href="/main/toview" Icon={ListRestart}>
                            <span>稍后再看</span>
                        </NavLink>
                        <SubTitle>设置</SubTitle>
                        <NavLink href="/main/settings" Icon={Settings}>
                            <span>设置</span>
                        </NavLink>
                    </div>
                </aside>
                {/* 主要内容区域 */}
                <main className="flex-1">
                    <Outlet />
                </main>
            </div>
        </>
    )
}