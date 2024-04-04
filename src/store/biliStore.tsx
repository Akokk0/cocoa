import { create } from 'zustand'
// Type
import { PersonalInfo } from '@/type/user'
import { DynamicTypes, LatestUpdatesData } from '@/type/dynamic'

type biliStoreState = {
    personal: PersonalInfo | undefined,
    setPersonal: (personalInfo: PersonalInfo) => void,

    latestUpdatesData: LatestUpdatesData | undefined,
    setLatestUpdatesData: (data: LatestUpdatesData) => void,

    dynamicUpCurrentTab: string,
    setDynamicUpCurrentTab: (currentTab: string) => void,

    dynamicTypeCurrentTab: DynamicTypes,
    setDynamicTypeCurrentTab: (currentTab: DynamicTypes) => void
}

export const useBiliStore = create<biliStoreState>()((set) => ({
    // Personal info
    personal: undefined,
    setPersonal(personalInfo) {
        set(() => ({
            personal: personalInfo
        }))
    },

    latestUpdatesData: undefined,
    setLatestUpdatesData(data) {
        set(() => ({
            latestUpdatesData: data
        }))
    },

    // Dynamic up CurrentTab
    dynamicUpCurrentTab: 'all',
    setDynamicUpCurrentTab(currentTab) {
        set(() => ({
            dynamicUpCurrentTab: currentTab
        }))
    },

    // Dynamic Type CurrentTab
    dynamicTypeCurrentTab: DynamicTypes.All,
    setDynamicTypeCurrentTab(currentTab) {
        set(() => ({
            dynamicTypeCurrentTab: currentTab
        }))
    }
}))