import { DynamicItem } from "@/type/dynamic"
import { CarouselItem } from "../ui/carousel"
import Image from "../image"
import { cn } from "@/lib/utils"

// Types
type TabContentProps = {
    item: DynamicItem
    currentTab: string
    changeCurrentTab: (id: string) => void
} & React.HTMLAttributes<HTMLDivElement>

// Component
const TabContent = ({
    item,
    currentTab,
    changeCurrentTab
}: TabContentProps) => {
    return (
        <CarouselItem key={item.id_str} className="md:basis-1/2 lg:basis-1/6 hover:cursor-pointer" onClick={() => changeCurrentTab(item.id_str)}>
            <div className="flex flex-col space-y-2 items-center">
                <div className={cn('w-16 h-16 rounded-full flex justify-center items-center', item.id_str === currentTab ? 'border border-bili_blue' : '')}>
                    <Image className="rounded-full w-14 h-14" url={item.modules.module_author.face} alt="头像" />
                </div>
                <span className={cn('text-xs text-center', currentTab === item.id_str ? 'text-bili_blue' : '')}>{item.modules.module_author.name}</span>
            </div>
        </CarouselItem>
    )
}

export default TabContent