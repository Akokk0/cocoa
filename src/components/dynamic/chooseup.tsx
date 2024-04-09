// React
import React from "react"
// UI
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
// Icons
import { Radar } from "lucide-react"
// Components
import TabContent from "./chooseup_tab"
// Utils
import { cn } from "@/lib/utils"
// Stores
import { useBiliStore } from "@/store/biliStore"

type ChooseUPProps = {

} & React.HTMLAttributes<HTMLDivElement>

export default function ChooseUP({
    
}: ChooseUPProps) {
    // Store
    const currentTab = useBiliStore(state => state.dynamicUpCurrentTab)
    const setCurrentTab = useBiliStore(state => state.setDynamicUpCurrentTab)
    const latestUpdatesData = useBiliStore(state => state.latestUpdatesData)
    // State
    // const [updatedDynamic, setUpdatedDynamic] = useState<DynamicItem[]>()
    // Func
    /* const getUpdatedDynamic = async () => {
        const time = Math.floor(DateTime.now().setZone('UTC+8').minus({ hours: 12 }).valueOf() / 1000)
        const hasExists: string[] = []
        const list = dynamicList.filter(item => {
            if (item.modules.module_author.pub_ts > time) {
                if (hasExists.includes(item.modules.module_author.name)) return false
                hasExists.push(item.modules.module_author.name)
                return true
            }
            return false
        })
        for (let i = list.length; i < dynamicList.length && list.length < 5; i++) {
            if (hasExists.includes(dynamicList[i].modules.module_author.name)) continue
            hasExists.push(dynamicList[i].modules.module_author.name)
            list.push(dynamicList[i])
        }
        setUpdatedDynamic(list)
    }
    // Effect
    useEffect(() => {
        getUpdatedDynamic()
    }, []) */

    return (
        <div>
            <Carousel
                opts={{
                    align: "start",
                }}
                className="w-full max-w-[33rem] ml-12 mt-2"
            >
                <CarouselContent>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/6 hover:cursor-pointer" onClick={() => setCurrentTab('all')}>
                        <div className="flex flex-col space-y-2 items-center">
                            <div className={cn('w-16 h-16 rounded-full flex justify-center items-center hover:border hover:border-bili_blue', currentTab === 'all' ? 'border border-bili_blue': '')}>
                                {/* Icon */}
                                <div className="rounded-full w-14 h-14 bg-[#e0f6fd] flex justify-center items-center">
                                    <Radar color="#1e9ed4" className="w-9 h-9" />
                                </div>
                            </div>
                            <span className={cn('text-xs text-center', currentTab === 'all' ? 'text-bili_blue' : '')}>全部动态</span>
                        </div>
                    </CarouselItem>
                    {latestUpdatesData?.up_list.map(item => (
                        <TabContent key={item.mid} currentTab={currentTab} item={item} />
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}