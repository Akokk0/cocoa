// UI
import AutoPlayCarousel from "@/components/autoplay-carousel"
import VideoList from "@/components/videolist"
import AreaTabs from "@/components/areatabs"

export default function Home() {
    return (
        <div className="p-4">
            <div className="flex space-x-80">
                <h2 className="text-2xl font-bold">入站必刷</h2>
                <h2 className="text-2xl font-bold">热门</h2>
            </div>
            <div className="flex mt-3">
                <AutoPlayCarousel />
                <VideoList className="ml-20" />
            </div>
            <AreaTabs className="mt-5" />
        </div>
    )
}