import { invoke } from "@tauri-apps/api";
import { useState } from "react";

type ImageProps = {
    url: string
    alt: string
} & React.HTMLProps<HTMLImageElement>

export default function Image({
    url, alt, ...props
}: ImageProps) {
    const [img, setImg] = useState<string | undefined>();
    invoke('img_request', { url })
        .then(i => setImg(i as string))

    return (
        <>
            {img && <img src={`data:image/jpeg;base64,${img}`} alt={alt} {...props} />}
        </>
    )
}