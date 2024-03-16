import { create } from 'zustand'
// Type
import { PersonalInfo } from '@/type/user'

type BiliStoreState = {
    personal: PersonalInfo | undefined,
    setPersonal: (personalInfo: PersonalInfo) => void,
}

export const useBiliStore = create<BiliStoreState>()((set) => ({
    personal: undefined,
    setPersonal(personalInfo) {
        set(() => ({
            personal: personalInfo
        }))
    },
}))