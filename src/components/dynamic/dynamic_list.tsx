import { DynamicItem, DynamicType, ModuleDynamicDesc, RichTextNodeType, VipStatus } from "@/type/dynamic"
import Image from "../image"
import React from "react"
import Base64BG from "../base64_bg"

type DynamicListProps = {
    dynamicList: DynamicItem[]
} & React.HTMLAttributes<HTMLDivElement>

const DynamicList: React.FC<DynamicListProps> = ({
    dynamicList
}) => {
    return (
        <div className="h-[35rem] overflow-auto scrollbar-hide">
            {dynamicList.map((item, index) => (
                <div key={index} className="flex space-x-5 mb-2 bg-white p-5 rounded-lg">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                        <Image url={item.modules.module_author.face} alt="Avatar" />
                    </div>
                    <div className="flex flex-col flex-1 space-y-2">
                        <div className="flex flex-col space-y-1">
                            <div className={item.modules.module_author.vip.status === VipStatus.Active ? 'text-primary' : ''}>{item.modules.module_author.name}</div>
                            <span className="text-sm text-gray-400">{item.modules.module_author.pub_time}</span>
                        </div>
                        {dynamicTypeParser(item)}
                    </div>
                </div>
            ))}
        </div>
    )
}

const dynamicTextParser = (desc: ModuleDynamicDesc) => {
    return (
        <>
            {desc.rich_text_nodes.map((node, index) => {
                if (node.type === RichTextNodeType.TEXT) {
                    const textParts = node.orig_text.split('\n');
                    return (
                        <span key={index}>
                            {textParts.map((part, index) => (
                                <React.Fragment key={index}>
                                    {part}
                                    {index < textParts.length - 1 && <br />}
                                </React.Fragment>
                            ))}
                        </span>
                    );
                }
                if (node.type === RichTextNodeType.TOPIC) return <span key={index} className="text-bili_blue hover:cursor-pointer">{node.orig_text}</span>
                if (node.type === RichTextNodeType.EMOJI) return <span key={index} className="inline-block"><Image className="w-7 h-7" url={node.emoji?.icon_url!} alt="emoji" /></span>
                if (node.type === RichTextNodeType.NONE) return
                return <span key={index} className="text-bili_blue hover:cursor-pointer">{node.orig_text}</span>
            })}
        </>
    )
}

const dynamicTypeParser = (item: DynamicItem) => {
    switch (item.type) {
        case DynamicType.DRAW:
        case DynamicType.WORD: {
            const picItemsLength = item.modules.module_dynamic.major?.draw?.items.length!

            return (
                <div>
                    {/* Text Area */}
                    {item.modules.module_dynamic.desc && <div className="leading-6 text-sm">{dynamicTextParser(item.modules.module_dynamic.desc)}</div>}
                    {/* Pic Area */}
                    <div className="flex space-x-1 mt-2">
                        {item.modules.module_dynamic.major?.draw?.items.map((pic, index) => {
                            if (picItemsLength === 1) { // one pic
                                if (pic.width > pic.height || pic.width === pic.height) { // Horizontal image,meet the width
                                    return (
                                        <div key={index} className="w-96 flex justify-center items-center overflow-hidden rounded-lg">
                                            <Image className="w-96" url={pic.src} alt="pic" />
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div key={index} className="w-64 h-96 flex justify-center items-center overflow-hidden rounded-lg">
                                            <Image url={pic.src} alt="pic" />
                                        </div>
                                    )
                                }
                            } else if (picItemsLength > 1 && picItemsLength <= 3) {
                                return (
                                    <Base64BG className="h-40 w-36 rounded-lg bg-center bg-no-repeat bg-cover" url={pic.src} />
                                )
                            }
                        })}
                    </div>
                </div>
            )
        }
    }
}

export default DynamicList
