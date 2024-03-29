import { invoke } from "@tauri-apps/api";
import { useEffect, useState } from "react";

type CssImgProps = {
    url: string
} & React.HTMLProps<HTMLDivElement>

const CssImg: React.FC<CssImgProps> = ({
    url, ...props
}) => {
    const [img, setImg] = useState<string | undefined>();
    useEffect(() => {
        invoke('img_request', { url })
            .then(base64 => setImg(base64 as string))
    }, [url])

    return (
        img && <div style={{ backgroundImage: `url(data:image/jpg;base64,${img})` }} {...props}></div>
    )
}

export default CssImg