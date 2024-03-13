import Image from "./image";

type UPInfo = {
    mid: number;
    name: string;
    face: string;
}

type UPInfoProps = {
    up: UPInfo
} & React.HTMLAttributes<HTMLDivElement>

export default function UPInfo({
    up, ...props
}: UPInfoProps) {
    return (
        <div className="h-6 inline-flex w-fit items-center space-x-1 rounded-xl border border-border_color pr-2 hover:bg-bili_grey hover:text-bili_blue transition" {...props}>
            <Image url={up.face} alt="头像" className="rounded-full w-7" />
            <span className="inline-block text-xs">{up.name}</span>
        </div>
    )
}