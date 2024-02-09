import { Link, Outlet } from "react-router-dom";
// UI
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Layout() {
    const menuList = [
        {
            title: '首页',
            link: '/main',
            icon: <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 mb-1"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                ></path>
            </svg>
        }, {
            title: '历史记录',
            link: '/main/history',
            icon: <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 mb-1"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                ></path>
            </svg>
        }, {
            title: '设置',
            link: '/main/settings',
            icon: <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 mb-1"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                ></path>
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                ></path>
            </svg>
        }
    ]

    return (
        <>
            <div className="flex h-screen">
                {/* 侧边栏 */}
                <aside
                    className="flex items-center w-22 shadow-2x bg-primary"
                // style={{ backgroundColor: '#FFAFC9' }}
                >
                    {/* 导航链接 */}
                    <ul
                        className="flex flex-col items-center rounded-2xl text-xs text-white p-1"
                    >
                        {menuList.map((item) => <Link to={item.link} className="rounded-2xl p-3 hover:bg-primary-foreground w-full">
                            <li>
                                <div className="flex flex-col items-center">
                                    {item.icon}
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
                        <Link to="/">
                            <li className="rounded-2xl p-3 hover:bg-rose-400 w-full">
                                <div className="flex flex-col items-center">
                                    <span>Logout</span>
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