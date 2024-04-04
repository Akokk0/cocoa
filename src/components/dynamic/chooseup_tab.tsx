import { LatestUpdatesDataListItem } from "@/type/dynamic"
import { CarouselItem } from "../ui/carousel"
import Image from "../image"
import { cn } from "@/lib/utils"
import { useBiliStore } from "@/store/biliStore"

// Types
type TabContentProps = {
    item: LatestUpdatesDataListItem
    currentTab: string
} & React.HTMLAttributes<HTMLDivElement>

// Component
const TabContent = ({
    item,
    currentTab,
}: TabContentProps) => {
    // Store
    const setCurrentTab = useBiliStore(state => state.setDynamicUpCurrentTab)
    const uid = item.mid.toString()
    return (
        <CarouselItem className="md:basis-1/2 lg:basis-1/6 hover:cursor-pointer" onClick={() => setCurrentTab(uid)}>
            <div className="flex flex-col space-y-2 items-center">
                <div className={cn('w-16 h-16 rounded-full flex justify-center items-center hover:border hover:border-bili_blue', uid === currentTab ? 'border border-bili_blue' : '')}>
                    <Image className="rounded-full w-14 h-14" url={item.face} alt="头像" />
                </div>
                <span className={cn('text-xs text-center', currentTab === uid ? 'text-bili_blue' : '')}>{item.uname}</span>
            </div>
        </CarouselItem>
    )
}

export default TabContent