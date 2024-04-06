import { useBiliStore } from "@/store/biliStore"
import { Avatar, AvatarFallback } from "../ui/avatar"
import Image from "../image"
import levelParser from "../level_selector"

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