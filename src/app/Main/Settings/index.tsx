import { Button } from "@/components/ui/button"
import { Close } from "@radix-ui/react-popover"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"
import { invoke } from "@tauri-apps/api"
import { Settings as SettingsIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function Settings() {
    // Get navigate function
    const nav = useNavigate()
    // Func
    const signOut = async () => {
        try {
            // Delete login info and create new client
            await invoke('sign_out')
            // Redirect to login page
            nav('/')
        } catch (e) {
            toast({
                title: "退出登录失败！",
                description: "错误原因：" + e
            })
        }
    }

    return (
        <div className="w-full h-full flex justify-center">
            <div className="flex flex-col items-center w-[70rem] py-5">
                {/* Title */}
                <div className="flex items-center space-x-3 w-full text-bili_blue">
                    <SettingsIcon className="w-8 h-8" />
                    <h1 className="text-xl font-bold">设置</h1>
                </div>
                {/* Settings */}
                <div className="w-[65rem] mt-5 pb-5 space-y-5">
                    {/* Login settings */}
                    <SettingTitle>登录设置</SettingTitle>
                    {/* Sign out */}
                    <SettingItem title="Sign Out" desc="退出登录当前账户">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button className="text-white">退出登录</Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                                <div className="grid gap-4">
                                    <div className="space-y-2">
                                        <h4 className="font-medium leading-none">是否确认登出账号</h4>
                                        <div className="flex justify-between text-white">
                                            <Button onClick={signOut}>确认</Button>
                                            <Close className="py-1 px-4 rounded-md bg-primary text-sm font-bold">
                                                取消
                                            </Close>
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </SettingItem>
                </div>
            </div>
        </div>
    )
}

// Components
const SettingTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <h2 className="text-2xl pb-5 border-b border-gray-300">{children}</h2>
    )
}

const SettingItem: React.FC<{ title: string, desc: string, children: React.ReactNode }> = ({ title, desc, children }) => {
    return (
        <div className="flex justify-between items-center pb-5 border-b border-gray-300">
            <div>
                {/* Title */}
                <h3 className="text-xl font-bold">{title}</h3>
                {/* Desc */}
                <span className="text-sm">{desc}</span>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}