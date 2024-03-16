import { Button } from "./ui/button"
import { Input } from "./ui/input"

export default function SendDynamic() {
    return (
        <div className="w-full h-full flex flex-col space-y-2">
            <Input className="flex-1" type="text" placeholder="有什么想和大家分享的" />
            <Button>发布</Button>
        </div>
    )
}