import { Link, Outlet } from "react-router-dom";
// UI
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Home, History, Settings, LogOut } from "lucide-react";

export default function Layout() {
    const menuList = [
        {
            title: '首页',
            link: '/main',
            icon: <Home />
        }, {
            title: '历史记录',
            link: '/main/history',
            icon: <History />
        }, {
            title: '设置',
            link: '/main/settings',
            icon: <Settings />
        }
    ]

    return (
        <>
            <div className="flex h-screen">
                {/* 侧边栏 */}
                <aside
                    className="flex items-center w-22 shadow-2x bg-primary"
                >
                    {/* 导航链接 */}
                    <ul
                        className="flex flex-col items-center rounded-2xl text-xs text-white p-1"
                    >
                        {menuList.map((item) => <Link to={item.link} className="rounded-2xl p-3 hover:hover:bg-rose-400 w-full">
                            <li>
                                <div className="flex flex-col items-center">
                                    <span>{item.icon}</span>
                                    <span>{item.title}</span>
                                </div>
                            </li>
                        </Link>)}
                        <Link to="/main/personal" className="rounded-2xl p-3 hover:bg-rose-400 w-full">
                            <li className="flex justify-center">
                                <Avatar>
                                    <AvatarImage
                                        src="https://github.com/shadcn.png"
                                        alt="@shadcn"
                                    />
                                    <AvatarFallback>Avatar</AvatarFallback>
                                </Avatar>
                            </li>
                        </Link>
                        <Link to="/" className="rounded-2xl p-3 hover:bg-rose-400 w-full">
                            <li>
                                <div className="flex flex-col items-center">
                                    <LogOut />
                                </div>
                            </li>
                        </Link>
                    </ul>
                </aside>
                {/* 主要内容区域 */}
                <main className="flex-1 p-8">
                    <h1 className="text-3xl font-bold mb-4">主要内容</h1>
                    <p>这里是主要内容的示例。</p>
                    <Outlet />
                </main>
            </div>
        </>
    )
}