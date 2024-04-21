// Store
import { useBiliStore } from "@/store/biliStore"
// Types
import { DynamicTypes } from "@/type/dynamic"
// React
import { useEffect, useRef, useState } from "react"

type DynamicTypeProps = {

} & React.HTMLAttributes<HTMLDivElement>

const DynamicTypeSelector: React.FC<DynamicTypeProps> = ({
    ...props
}) => {
    // Store
    const setDynamicTypeCurrentTab = useBiliStore(state => state.setDynamicTypeCurrentTab)
    // Types
    type Tab = { id: number, title: string, type: DynamicTypes }
    // Data
    const tabs: Tab[] = [
        { id: 0, title: '全部', type: DynamicTypes.All },
        { id: 1, title: '视频投稿', type: DynamicTypes.Video },
        { id: 2, title: '追番追剧', type: DynamicTypes.PGC },
        { id: 3, title: '专栏', type: DynamicTypes.Article }
    ]
    // State
    const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({})
    // Refs
    const tabRefs = useRef<{ [key: number]: HTMLDivElement | null }>({})
    // Func
    const handleTabClick = (tab: Tab) => {
        // Get the current element
        const tabElement = tabRefs.current[tab.id];
        // Check if element is exist
        if (!tabElement) return
        // Define the new indicator style
        const newIndicatorStyle = {
            width: `${tabElement.offsetWidth}px`,
            left: `${tabElement.offsetLeft}px`,
        };
        // Set the new style
        setIndicatorStyle(newIndicatorStyle);
        // Update current tab
        setDynamicTypeCurrentTab(tab.type);
    };

    useEffect(() => {
        handleTabClick(tabs[0])
    }, [])

    return (
        <div {...props}>
            <div className="flex relative">
                {tabs.map((tab) => (
                    <div
                        key={tab.id}
                        ref={el => tabRefs.current[tab.id] = el}
                        className="cursor-pointer text-gray-500 text-sm mr-7 hover:text-bili_blue"
                        onClick={() => handleTabClick(tab)}
                    >
                        {tab.title}
                    </div>
                ))}
                <div
                    className="absolute -bottom-1 h-[0.20rem] bg-bili_blue rounded-full"
                    style={{
                        ...indicatorStyle,
                        transition: "left 0.3s ease-out, width 0.3s ease-out",
                    }}
                ></div>
            </div>
        </div>
    )
}

export default DynamicTypeSelector