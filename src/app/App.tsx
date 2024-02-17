// Basic import
import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api";
// UI
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Link } from "react-router-dom";
// Import utils
import { cn } from "@/lib/utils";
// Import api
import { checkIfCookiesNeedsRefresh, getRefreshCSRF, refreshCookie } from "@/api/biliApi";
import { generateCorrespondPath, parseCSRFromHTML } from "@/lib/biliUtils";
// Import types
import { CookieRefreshResp, WebCookiesRefreshResp, WebCookiesRefreshRespCode } from "@/type/login";

function App() {
  const [loginStatus, setLoginStatus] = useState<boolean>()

  useEffect(() => {
    // Check if cookies needs refresh
    const checkCookies = async () => {
      // Send request to get refresh flag
      const webCookiesRefreshResp = JSON.parse(await checkIfCookiesNeedsRefresh() as string) as WebCookiesRefreshResp
      // Check if account is not login
      if (webCookiesRefreshResp.code === WebCookiesRefreshRespCode.ACCOUNT_NOT_LOGIN) {
        // Acount is not login, return directly
        return
      }
      // Determine whether refresh is needed
      /* if (!webCookiesRefreshResp.data.refresh) {
        // No need fresh, return directly
        return
      } */
      // Cookies need refresh, get CorrespondPath
      // webCookiesRefreshResp.data.timestamp
      const correspondPath = await generateCorrespondPath(webCookiesRefreshResp.data.timestamp)
      // Send request to get refresh_csrf
      const refreshCSRFHTML = await getRefreshCSRF(correspondPath) as string
      // Get csrf from cookies
      const csrf = await invoke('get_csrf') as string
      // Define refreshCSRF
      let refreshCSRF: string
      try {
        // Parse refresh token
        refreshCSRF = parseCSRFromHTML(refreshCSRFHTML)
      } catch (e) {
        // No refresh CSRF was obtained, returning directly
        return
      }
      // Get refresh_token from file
      const refreshToken = await invoke('get_refresh_token') as string
      // Send request to refresh cookies
      /* const refreshCookieResp = JSON.parse(
        await refreshCookie(csrf, refreshCSRF, refreshToken) as string
      ) as CookieRefreshResp */
      console.log("Aaa ", await refreshCookie(csrf, refreshCSRF, refreshToken));
    }
    // Define function for getting app status
    const getAllStatus = async () => {
      const loginFlag = await invoke('is_login') as boolean
      setLoginStatus(loginFlag)
    }
    // Check if cookies needs refresh
    checkCookies()
    // Get all app status
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
