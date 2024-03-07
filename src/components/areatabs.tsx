import { useState } from "react"

type AreaTabsProps = {

} & React.HTMLAttributes<HTMLDivElement>

const AreaTabs: React.FC<AreaTabsProps> = ({ ...props }) => {
    const [currentTab, setCurrentTab] = useState<string>('anime')

    const Tab = ({
        value, children
    }: {
        value: string, children: React.ReactNode
    }) => {
        return (
            <li
                onClick={() => setCurrentTab(value)}
                style={currentTab === value ? {fontWeight: 'bold'}: undefined}
            >{children}</li>
        )
    }

    return (
        <div {...props}>
            <ul className="flex space-x-2 text-[#7f7f7f] text-sm">
                <Tab value="anime">动画</Tab>
                <Tab value="fanju">番剧</Tab>
                <Tab value="guo">国创</Tab>
            </ul>
        </div>
    )
}

export default AreaTabs