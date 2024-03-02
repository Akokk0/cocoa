import Autoplay from "embla-carousel-autoplay"
// UI
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
} from "@/components/ui/carousel"
import { MustDoResp } from "@/type/home"
import Image from "./image"
// React
import { useRef } from "react"

export default function AutoPlayCarousel({ list }: { list: MustDoResp }) {
    const plugin = useRef(
        Autoplay({ delay: 5000, stopOnInteraction: true })
    )

    return (
        <div>
            <Carousel
                plugins={[plugin.current]}
                className="w-full max-w-xs"
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent>
                    {list.data.list.map((v, i) => (
                        <CarouselItem key={i}>
                            <div className="p-1">
                                <Card>
                                    <Image url={v.pic} alt="封面" />
                                    <CardContent className="flex flex-col justify-start">
                                        <span className="inline-block text-sm mt-2">{v.title}</span>
                                        <div className="h-6 inline-flex w-fit items-center space-x-1 rounded-xl border border-border_color pr-2 mt-2">
                                            <Image url={v.owner.face} alt="头像" className="rounded-full w-6" />
                                            <span className="inline-block text-xs">{v.owner.name}</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    )
}
