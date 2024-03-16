import { useBiliStore } from "@/store/biliStore"
import { useEffect } from "react"

export default function PersonalLetter() {
    useEffect(() => {
        const personalInfo = useBiliStore(state => state.personal)
        console.log(personalInfo);
        
    })

    return (
        <div>
            个人信息
        </div>
    )
}