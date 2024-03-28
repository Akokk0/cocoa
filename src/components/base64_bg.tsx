import { invoke } from "@tauri-apps/api";
import { useEffect, useState } from "react";

type Base64BGProps = {
    url: string
} & React.HTMLProps<HTMLDivElement>

const Base64BG: React.FC<Base64BGProps> = ({
    url, ...props
}) => {
    const [img, setImg] = useState<string | undefined>();
    useEffect(() => {
        invoke('img_request', { url })
            .then(base64 => setImg(base64 as string))
    }, [url])
    
    return (
        <div style={{backgroundImage: `url(data:image/jpg;base64,${img})`}} {...props}></div>
    )
}

export default Base64BG