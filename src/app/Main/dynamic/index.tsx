import ChooseUP from "@/components/chooseup";
import PersonalLetter from "@/components/personal_letter";
import SendDynamic from "@/components/senddynamic";

export default function Dynamic() {
    return (
        <div className="bg-[#d3e9e8] h-full">
            <div className="flex space-x-3 p-4">
                <div className="flex flex-col space-y-3 w-[40rem]">
                    <div className="h-40 rounded-md bg-white p-3">
                        <SendDynamic />
                    </div>
                    <div className="h-32 rounded-md bg-white p-3">
                        <ChooseUP />
                    </div>
                    <div className="h-16 rounded-md bg-white">动态类型</div>
                    <div className="rounded-md bg-white">动态</div>
                </div>
                <div className="flex flex-col space-y-3 w-64">
                    <div className="h-40 rounded-md bg-white p-5">
                        <PersonalLetter />
                    </div>
                    <div className="rounded-md bg-white">直播信息</div>
                </div>
                <div className="flex flex-col space-y-3 w-72">
                    <div className="h-40 rounded-md bg-white">社区中心</div>
                    <div>话题</div>
                </div>
            </div>
        </div>
    )
}