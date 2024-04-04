import { useBiliStore } from "@/store/biliStore"
import { Avatar, AvatarFallback } from "../ui/avatar"
import Image from "../image"
import Lv1Icon from "../icon/level/lv1"
import Lv2Icon from "../icon/level/lv2"
import Lv3Icon from "../icon/level/lv3"
import Lv4Icon from "../icon/level/lv4"
import Lv5Icon from "../icon/level/lv5"
import Lv6Icon from "../icon/level/lv6"

type PersonalLetterProps = {

} & React.HTMLAttributes<HTMLDivElement>

export default function PersonalLetter({
    ...props
}: PersonalLetterProps) {
    const my_info = useBiliStore(state => state.latestUpdatesData)?.my_info
    return (
        my_info &&
        <div className="flex flex-col space-y-4 w-80" {...props}>
            <div className="flex space-x-2 ml-5 mt-4">
                <Avatar className="w-16 h-16">
                    <Image url={my_info.face} alt="头像" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col justify-around">
                    <span className="text-md line-clamp-1">{my_info.name}</span>
                    <div className="flex space-x-2 items-center">
                        {/* Vip标签 */}
                        {
                            my_info.vip.status === 0 ? '' :
                            <span className="bg-[#FB7299] rounded-sm p-1 text-xs text-white">{my_info?.vip.label.text}</span>
                        }
                        {/* 等级标签 */}
                        <span className="text-sm">{levelParser(my_info.level_info.current_level)}</span>
                    </div>
                </div>
            </div>
            <div className="flex justify-around text-sm">
                {/* 关注 */}
                <div className="flex flex-col space-y-1 items-center">
                    <span>{my_info.following}</span>
                    <span className="text-gray-400">关注</span>
                </div>
                {/* 粉丝 */}
                <div className="flex flex-col space-y-1 items-center">
                    <span>{my_info.follower}</span>
                    <span className="text-gray-400">粉丝</span>
                </div>
                {/* 动态 */}
                <div className="flex flex-col space-y-1 items-center">
                    <span>{my_info.dyns}</span>
                    <span className="text-gray-400">动态</span>
                </div>
            </div>
        </div>
    )
}

const levelParser = (level: number) => {
    switch (level) {
        case 1: return <Lv1Icon />
        case 2: return <Lv2Icon />
        case 3: return <Lv3Icon />
        case 4: return <Lv4Icon />
        case 5: return <Lv5Icon />
        case 6: return <Lv6Icon />
    }
}