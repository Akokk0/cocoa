import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
} from "@/components/ui/carousel"
import { MustDoResp } from "@/type/home"
import { useEffect, useRef, useState } from "react"
import { invoke } from "@tauri-apps/api"

export function AutoPlayCarousel({ list }: { list: MustDoResp }) {
    const plugin = useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )

    const Cover = ({ url, ...props }: { url: string }) => {
        const [img, setImg] = useState<string | undefined>();
        invoke('img_request', { url })
            .then(i => setImg(i as string))

        return (
            <>
                {img && <img src={`data:image/jpeg;base64,${img}`} alt="封面" {...props} />}
            </>
        )
    }

    return (
        <div>
            <Cover url={list.data.list[0].pic} />
            {/* <Carousel
                plugins={[plugin.current]}
                className="w-full max-w-xs"
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent>
                    {list.data.list.map((v, i) => (
                        <CarouselItem key={i}>
                            <div className="p-1">
                                <Card>
                                    <CardContent className="flex items-center justify-center p-6">
                                        <img src={v.pic} alt="封面" />
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselNext />
            </Carousel> */}
        </div>
    )
}
