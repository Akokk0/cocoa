import { DynamicItem } from "@/type/dynamic"
import Image from "../image"

type DynamicListProps = {
    dynamicList: DynamicItem[]
} & React.HTMLAttributes<HTMLDivElement>

const DynamicList: React.FC<DynamicListProps> = ({
    dynamicList
}) => {
    return (
        <div className="p-5">
            {dynamicList.map(item => (
                <div className="flex space-x-5">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                        <Image url={item.modules.module_author.face} alt="Avatar" />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <div>{item.modules.module_author.name}</div>
                        <span className="text-sm">{item.modules.module_author.pub_time}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default DynamicList
