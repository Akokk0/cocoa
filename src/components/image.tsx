import { invoke } from "@tauri-apps/api";
import { useEffect, useState } from "react";

type ImageProps = {
    url: string
    alt: string
} & React.HTMLProps<HTMLImageElement>

export default function Image({
    url, alt, ...props
}: ImageProps) {
    const [img, setImg] = useState<string | undefined>();
    useEffect(() => {
        invoke('img_request', { url })
            .then(base64 => setImg(base64 as string))
    }, [url])

    return (
        <>
            {img && <img src={`data:image/jpg;base64,${img}`} alt={alt} {...props} />}
        </>
    )
}
