import { useBiliStore } from "@/store/biliStore"
import Image from "../image"
import { open } from "@tauri-apps/api/shell"

type IsLiveProps = {

} & React.HTMLAttributes<HTMLDivElement>

const IsLive: React.FC<IsLiveProps> = ({
    ...props
}) => {
    const latestUpdatesData = useBiliStore(state => state.latestUpdatesData)
    return (
        <div className="p-5" {...props}>
            <div>
                <span className="font-bold">正在直播&nbsp;</span>
                <span className="text-gray-400">{latestUpdatesData?.live_users.count}</span>
            </div>
            <div className="grid grid-cols-3 grid-rows-3 mt-3">
                {latestUpdatesData?.live_users.items.slice(0, 9).map((item, index) => (
                    <div key={index} onClick={() => open(item.jump_url).catch(console.error)} className="flex rounded-lg space-x-2 hover:bg-bili_grey hover:cursor-pointer">
                        {/* Avatar */}
                        <div className="p-2 rounded-lg">
                            <Image className="w-16 h-16 rounded-full object-cover object-center" url={item.face} alt="Avatar" />
                        </div>
                        {/* Info */}
                        <div className="flex-1 py-3">
                            {/* UpName */}
                            <h3 className="text-base line-clamp-2 hover:text-bili_blue">{item.uname}</h3>
                            {/* Title */}
                            <span className="text-gray-400 text-xs line-clamp-1">{item.title}</span>
                        </div>
                    </div>
                ))}
                {latestUpdatesData?.live_users.items.length! > 9 &&
                    <span className="ml-3">...</span>
                }
            </div>
        </div>
    )
}

export default IsLive