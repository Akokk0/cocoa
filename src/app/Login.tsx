// Basic
import { useEffect, useState } from "react"
import QRCode from "qrcode"
import { useNavigate } from "react-router-dom"
import { invoke } from "@tauri-apps/api"
// API
import { getLoginQRCodeURL, getLoginStatus } from "@/api/biliApi"
// Types
import { GQRCode, LoginStatus, LoginStatusCode } from "@/type/login"
import { CocoaConfig } from "@/type/settings";
// UI
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
// Icons
import { KeyRound } from "lucide-react"
import { Switch } from "@/components/ui/switch"

export default function Login() {
    // Define timer
    let qrcodeStatusTimer: NodeJS.Timeout
    // Nav
    const nav = useNavigate()
    // Toast
    const { toast } = useToast()
    // State
    const [qrcodeUrl, setQRCodeURL] = useState<string>()
    const [loginStatus, setLoginStatus] = useState<string>()
    const [cocoaConfig, setCocoaConfig] = useState<CocoaConfig>()

    const generateQRCode = async () => {
        // Check if qrcodeStatusTimer is exist
        qrcodeStatusTimer && clearInterval(qrcodeStatusTimer)
        // Get LoginQRCodeURL
        const generateQRCodeResp = JSON.parse(await getLoginQRCodeURL() as string) as GQRCode
        // Check if request is error
        if (generateQRCodeResp.code !== 0) {
            // Generate toast
            toast({
                title: '获取二维码失败',
                description: '请检查网络连接'
            })
        }
        // Generate qrcode
        QRCode.toDataURL(generateQRCodeResp.data.url, (_, url) => {
            // Set qrcodeURL to image src
            setQRCodeURL(url)
        })
        // Check status of qrcode
        qrcodeStatusTimer = setInterval(async () => {
            // Send request to get qrcode status
            let qrcodeStatusResp = JSON.parse(await getLoginStatus(generateQRCodeResp.data.qrcode_key) as string) as LoginStatus
            // Check if request is error
            if (qrcodeStatusResp.code !== 0) {
                // Return this request
                return
            }
            // Get status of qrcode
            switch (qrcodeStatusResp.data.code) {
                case LoginStatusCode.LOGIN_SUCCESS: {
                    // Login successful, save refresh_token
                    await invoke('save_refresh_token', { refreshToken: qrcodeStatusResp.data.refresh_token })
                    // Save cookies
                    await invoke('save_cookies')
                    // Stop timer
                    clearInterval(qrcodeStatusTimer)
                    // Navigate to main
                    nav('/main')
                    // end
                    break
                }
                case LoginStatusCode.QRCODE_NOT_SCANNED: {
                    setLoginStatus('未扫码')
                    break
                }
                case LoginStatusCode.QRCODE_SCANNED_NOT_CONFIRMED: {
                    setLoginStatus('已扫码，未确认')
                    break
                }
                case LoginStatusCode.QRCODE_INVALID: {
                    // Stop timer
                    clearInterval(qrcodeStatusTimer)
                    // Prompt user that qrcode has expired
                    setLoginStatus('二维码已失效，请重新生成')
                }
            }
        }, 1000)
    }

    const getConfig = async () => {
        const config = await invoke('get_config') as CocoaConfig
        setCocoaConfig(config)
    }

    // onMounted
    useEffect(() => {
        getConfig()
    }, [])

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <Tabs defaultValue="account" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="account">二维码登录</TabsTrigger>
                    <TabsTrigger value="password">账号密码登录</TabsTrigger>
                </TabsList>
                <div className=" flex items-center space-x-4 rounded-md border p-4 mt-2">
                    <KeyRound />
                    <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                            登录设置
                        </p>
                        <p className="text-sm text-muted-foreground">
                            是否开启自动登录
                        </p>
                    </div>
                    <Switch checked={cocoaConfig?.auto_login} onCheckedChange={async () => {
                        // Change settings
                        await invoke('change_settings', {
                            settings: {
                                ...cocoaConfig,
                                auto_login: !cocoaConfig?.auto_login,
                            }
                        })
                        // Set auto login
                        setCocoaConfig({ ...cocoaConfig, auto_login: !cocoaConfig?.auto_login })
                    }} />
                </div>
                <TabsContent value="account">
                    <Card>
                        <CardHeader>
                            <CardTitle>二维码</CardTitle>
                            <CardDescription>
                                使用B站手机客户端扫码登录
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                {
                                    qrcodeUrl ?
                                        <img
                                            width={212}
                                            height={212}
                                            src={qrcodeUrl}
                                            alt="qrcode" /> :
                                        <img
                                            width={212}
                                            height={212}
                                            src="data:image/png;base64,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"
                                            alt="qrcode"
                                        />
                                }
                            </div>
                            <div>{loginStatus ? <span>{loginStatus}</span> : <span>&nbsp;</span>}</div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={generateQRCode}>生成二维码</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="password">
                    <Card>
                        <CardHeader>
                            <CardTitle>账号密码</CardTitle>
                            <CardDescription>
                                使用B站账号密码登录
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="current">账号</Label>
                                <Input id="current" type="password" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="new">密码</Label>
                                <Input id="new" type="password" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>登录</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
            <Toaster />
        </div>
    )
}