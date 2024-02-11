// UI
import { Button } from "@/components/ui/button";
import { BellIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
// import utils
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api";
import { CocoaSettings } from "@/type/settings";

function App() {
  const [loginStatus, setLoginStatus] = useState<boolean>()
  const [autoLogin, setAutoLogin] = useState<boolean>(false)

  useEffect(() => {
    // Define function for getting login status
    const getAllStatus = async () => {
      const loginFlag = await invoke('is_login') as boolean
      setLoginStatus(loginFlag)
      const config = await invoke('get_config') as CocoaSettings
      setAutoLogin(config.auto_login)
    }
    getAllStatus()
  }, [])

  return (
    
    <div className="flex justify-center items-center h-screen">
      <Card className={cn("w-[380px]")}>
        <CardHeader>
          <CardTitle>欢迎使用Cocoa</CardTitle>
          <CardDescription>在开始使用之前，请先登录</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className=" flex items-center space-x-4 rounded-md border p-4">
            <BellIcon />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                登录设置
              </p>
              <p className="text-sm text-muted-foreground">
                是否开启自动登录
              </p>
            </div>
            <Switch checked={autoLogin} onCheckedChange={async () => {
              // Set auto login
              setAutoLogin(!autoLogin)
              // Change settings
              await invoke('change_settings', {
                settings: {
                  auto_login: true,
                }
              })
            }} />
          </div>
          <div>
            <div
              className="mb-4 grid grid-cols-[25px_4fr_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className={`flex h-2 w-2 translate-y-1 rounded-full ${loginStatus ? 'bg-blue-500' : 'bg-red-500'}`} />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  检查是否已登录
                </p>
                <p className="text-sm text-muted-foreground">
                  {loginStatus ? '已登录' : '您尚未登录'}
                </p>
              </div>
              {
                !loginStatus &&
                <Button asChild>
                  <Link to='/login'>去登录</Link>
                </Button>
              }
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button disabled={!loginStatus} className="w-full">
            <Link to='/main' className="w-full">欢迎使用</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
export default App
