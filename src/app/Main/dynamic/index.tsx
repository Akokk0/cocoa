import { getDynamicList } from "@/api/biliApi";
import ChooseUP from "@/components/dynamic/chooseup";
import DynamicList from "@/components/dynamic/dynamic_list";
import DynamicTypeSelector from "@/components/dynamic/dynamic_type";
import PersonalLetter from "@/components/dynamic/personal_letter";
import SendDynamic from "@/components/dynamic/send_dynamic";
import { DynamicItem, DynamicListResp, DynamicListRespCode } from "@/type/dynamic";
import { useEffect, useState } from "react";

export default function Dynamic() {
    // State
    const [dynamicList, setDynamicList] = useState<DynamicItem[]>()
    // Func
    const getDynamicListResp = async () => {
        // Send request to get popular content
        const dynamicListResp = JSON.parse(await getDynamicList() as string) as DynamicListResp
        // Check if request is error
        if (dynamicListResp.code != DynamicListRespCode.SUCCESS) return
        //Set resp to state
        setDynamicList(dynamicListResp.data.items)
    }
    // Effect
    useEffect(() => {
        getDynamicListResp()
    }, [])

    return (
        /* BG */
        <div className="bg-[#d3e9e8] h-full">
            {/* All Framework */}
            <div className="flex space-x-3 p-4">
                {/* Left */}
                <div className="overflow-hidden rounded-lg">
                    <div className="flex flex-col space-y-3 w-[42rem] h-[59.5rem] overflow-auto scrollbar-hide">
                        <div className="h-32 rounded-md bg-white p-3">
                            {dynamicList && <ChooseUP dynamicList={dynamicList} />}
                        </div>
                        <div className="h-12 rounded-md bg-white p-3">
                            <DynamicTypeSelector />
                        </div>
                        {dynamicList && <DynamicList dynamicList={dynamicList} />}
                    </div>
                </div>
                {/* Right */}
                <div className="flex flex-col space-y-3 flex-1">
                    <div className="h-[11.75rem] rounded-md bg-white p-3">
                        <SendDynamic />
                    </div>
                    <div className="flex space-x-3">
                        <div className="flex flex-col space-y-3">
                            <div className="flex-1 h-40 w-[19.5rem] rounded-md bg-white">
                                <PersonalLetter />
                            </div>
                            <div className="rounded-md bg-white">直播信息</div>
                        </div>
                        <div className="flex flex-col flex-1 space-y-3">
                            <div className="h-40 rounded-md bg-white">社区中心</div>
                            <div>话题</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}