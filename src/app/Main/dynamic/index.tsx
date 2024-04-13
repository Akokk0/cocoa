import { useEffect, useState } from "react";
// APIs
import { getDynamicList, getPerosnalDynamicList } from "@/api/biliApi";
// Components
import ChooseUP from "@/components/dynamic/chooseup";
import DynamicList from "@/components/dynamic/dynamic_list";
import DynamicTypeSelector from "@/components/dynamic/dynamic_type";
import IsLive from "@/components/dynamic/is_live";
import PersonalLetter from "@/components/dynamic/personal_letter";
import SendDynamic from "@/components/dynamic/send_dynamic";
// Store
import { useBiliStore } from "@/store/biliStore";
// Types
import { DynamicData, DynamicItem, DynamicListResp, DynamicListRespCode, DynamicTypes } from "@/type/dynamic";
import Topic from "@/components/dynamic/topic";

export default function Dynamic() {
    // Store
    const currentUp = useBiliStore(state => state.dynamicUpCurrentTab)
    const currentType = useBiliStore(state => state.dynamicTypeCurrentTab)
    // State
    const [dynamicResp, setDynamicResp] = useState<DynamicData>()
    const [dynamicList, setDynamicList] = useState<DynamicItem[]>()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    // Func
    const getDynamicListResp = async (type: DynamicTypes = DynamicTypes.All) => {
        // Set isLoading to true
        setIsLoading(true)
        // Send request to get popular content
        const dynamicListResp = JSON.parse(await getDynamicList({ type }) as string) as DynamicListResp
        // Check if request is error
        if (dynamicListResp.code != DynamicListRespCode.SUCCESS) return
        // Set resp to state
        setDynamicResp(dynamicListResp.data)
        // Set resp to state
        setDynamicList(dynamicListResp.data.items)
        // Set isLoading to false
        setIsLoading(false)
    }

    const getPersonalDynamicListResp = async (uid: string) => {
        // Set isLoading to true
        setIsLoading(true)
        // Send request to get popular content
        const dynamicListResp = JSON.parse(await getPerosnalDynamicList(uid, {}) as string) as DynamicListResp
        // Check if request is error
        if (dynamicListResp.code != DynamicListRespCode.SUCCESS) return
        //Set resp to state
        setDynamicList(dynamicListResp.data.items)
        // Set isLoading to false
        setIsLoading(false)
    }

    const getMoreDynamicListResp = async () => {
        let params = {
            type: currentType,
            offset: parseInt(dynamicResp?.offset!),
            update_baseline: dynamicResp?.update_baseline,
        }
        let dynamicListResp: DynamicListResp
        if (currentUp === 'all') {
            // Send request to get popular content
            dynamicListResp = JSON.parse(await getDynamicList(params) as string) as DynamicListResp
        } else {
            dynamicListResp = JSON.parse(await getPerosnalDynamicList(currentUp, params) as string) as DynamicListResp
        }
        // Check if request is error
        if (dynamicListResp.code != DynamicListRespCode.SUCCESS) return
        // Set resp to state
        setDynamicResp(dynamicListResp.data)
        // Check if dynamicList is null
        if (!dynamicList) return
        // Set resp to state
        setDynamicList([...dynamicList, ...dynamicListResp.data.items])
    }
    // Effect
    useEffect(() => {
        if (currentUp === 'all') getDynamicListResp()
        else getPersonalDynamicListResp(currentUp)
    }, [currentUp])

    useEffect(() => {
        getDynamicListResp(currentType)
    }, [currentType])

    useEffect(() => {
        console.log(dynamicList);
    }, [dynamicList])

    useEffect(() => {
        console.log(dynamicResp);
    }, [dynamicResp])

    return (
        /* BG */
        <div className="bg-[#d3e9e8] h-full">
            {/* All Framework */}
            <div className="flex space-x-3 p-4">
                {/* Left */}
                <div className="overflow-hidden rounded-lg">
                    {isLoading ?
                        <div className="w-[42rem] text-center bg-white p-2">正在玩命加载中...</div> :
                        <div className="flex flex-col w-[42rem]">
                            {dynamicList && <DynamicList hasMore={dynamicResp?.has_more!} dynamicList={dynamicList} getMoreData={getMoreDynamicListResp} />}
                        </div>
                    }
                </div>
                {/* Right */}
                <div className="flex flex-col space-y-3 flex-1">
                    <div className="h-[11.75rem] rounded-md bg-white p-3">
                        <SendDynamic />
                    </div>
                    <div className="flex space-x-3">
                        <div className="h-40 rounded-md bg-white">
                            <PersonalLetter />
                        </div>
                        <div className="flex-1 h-40 rounded-md bg-white">
                            <Topic />
                        </div>
                    </div>
                    <div className="h-32 rounded-md bg-white p-3">
                        {dynamicList && <ChooseUP />}
                    </div>
                    {currentUp === 'all' &&
                        <div className="h-12 rounded-md bg-white p-3">
                            <DynamicTypeSelector />
                        </div>
                    }
                    <div className="flex-1 rounded-md bg-white">
                        <IsLive />
                    </div>
                </div>
            </div>
        </div>
    )
}