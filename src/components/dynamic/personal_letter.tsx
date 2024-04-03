import { useBiliStore } from "@/store/biliStore"
import { Avatar, AvatarFallback } from "../ui/avatar"
import Image from "../image"

type PersonalLetterProps = {

} & React.HTMLAttributes<HTMLDivElement>

export default function PersonalLetter({
    ...props
}: PersonalLetterProps) {
    const personalInfo = useBiliStore(state => state.personal)
    return (
        personalInfo &&
        <div className="flex flex-col space-y-4 w-80" {...props}>
            <div className="flex space-x-2 ml-5 mt-4">
                <Avatar className="w-16 h-16">
                    <Image url={personalInfo?.face!} alt="头像" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col justify-around">
                    <span className="text-md line-clamp-1">{personalInfo?.name}</span>
                    <div className="flex space-x-2 items-center">
                        {/* Vip标签 */}
                        {
                            personalInfo?.vip.status === 0 ? '' :
                            <span className="bg-[#FB7299] rounded-sm p-1 text-xs text-white">{personalInfo?.vip.label.text}</span>
                        }
                        {/* 等级标签 */}
                        <span className="text-sm">LV{personalInfo.level}</span>
                    </div>
                </div>
            </div>
            <div className="flex justify-around text-sm">
                {/* 关注 */}
                <div className="flex flex-col space-y-1 items-center">
                    <span>{personalInfo.following}</span>
                    <span>关注</span>
                </div>
                {/* 粉丝 */}
                <div className="flex flex-col space-y-1 items-center">
                    <span>{personalInfo.follower}</span>
                    <span>粉丝</span>
                </div>
                {/* 动态 */}
                <div className="flex flex-col space-y-1 items-center">
                    <span>{personalInfo.coins}</span>
                    <span>硬币数</span>
                </div>
            </div>
        </div>
    )
}