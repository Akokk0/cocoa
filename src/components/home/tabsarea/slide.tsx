// React
import { useEffect, useRef, useState } from 'react'
// Component
import Image from '../../image';
import UPInfo from '../../upinfo';
// Types
import { List } from '@/type/home';
// Styles
import './styles.css'
import './button_animation.css'
// Icons
import { ArrowLeft, ArrowRight, Clock, Play, RotateCw } from 'lucide-react';
import { openPlayer } from '@/lib/biliUtils';

type SlideProps = {
    list: List,
    getNewVideoDate: () => void
} & React.HTMLAttributes<HTMLDivElement>

export default function Slide({
    list,
    getNewVideoDate
}: SlideProps) {
    // Refs
    const timerIdRef = useRef(null);
    const containerRef = useRef(null);
    // States
    const [items, setItems] = useState<List>(list)
    // Effect
    useEffect(() => {
        setItems(list)
    }, [list])
    // Functions
    const jumpToCard = (index: any) => {
        if (index <= 1 || index >= items.length) {
            return
        }
        let steps = index - 1
        const jump = () => {
            nextCard()
            steps--
            if (steps > 0) {
                setTimeout(jump)
            }
        }
        jump()
    }

    const nextCard = () => {
        setItems((prevItems: List) => {
            return [...prevItems.slice(1), prevItems[0]]
        });
    };

    const handleClicPre = () => {
        if (!timerIdRef.current) {
            previousCard();
            setTimeout(() => {
                timerIdRef.current = null;
            }, 400);
        }
    };

    const handleClicNext = () => {
        if (!timerIdRef.current) {
            nextCard();
            setTimeout(() => {
                timerIdRef.current = null;
            }, 400);
        }
    };

    const previousCard = () => {
        if (containerRef.current) {
            const container: any = containerRef.current;
            const lastChild = container.lastElementChild;
            container.insertBefore(lastChild, container.firstElementChild);
            setTimeout(() => {
                setItems((prevItems: any) => {
                    const lastItem = prevItems[prevItems.length - 1];
                    return [lastItem, ...prevItems.slice(0, -1)];
                });
            }, 400);
        }
    };
    // View
    return (
        <div className="fresh-home-video-slides">
            <div className="fresh-home-video-slides-covers" ref={containerRef}>
                {
                    items.map((item, index) => {
                        return (
                            <a data-id={item.aid} key={item.aid} onClick={e => {
                                e.preventDefault()
                                if (index === 1) {
                                    openPlayer(item.bvid, item.cid)
                                }
                                jumpToCard(index)
                            }} href='#' className="fresh-home-video-slides-cover">
                                <Image className="object-cover object-center" url={item.pic} alt="封面" />
                            </a>
                        )
                    })
                }
            </div>
            <div className="cover-placeholder-vertical"></div>
            <div className='fresh-home-video-slides-row'>
                <div className='fresh-home-video-slides-main-info'>
                    <div className='fresh-home-video-slides-row'>
                        <div className="cover-placeholder-horizontal"></div>
                        <div className='fresh-home-video-slides-main-actions'>
                            <div className="flex space-x-2 mb-1">
                                <div className="flex items-center justify-center space-x-2 text-white bg-bili_blue rounded-full w-24 h-8 text-sm hover:cursor-pointer" onClick={() => openPlayer(items[1].bvid, items[1].cid)}>
                                    <Play className='w-4 h-4' /> <span>播放</span>
                                </div>
                            <div className="border border-bili_grey p-1 rounded-full text-gray-800">
                                <Clock />
                            </div>
                        </div>
                        <div>
                            <UPInfo up={items[1].owner} />
                        </div>
                    </div>
                </div>
                <a target="_blank" className="fresh-home-video-slides-main-title">
                    {items[1].title}
                </a>
            </div>
            <div className='fresh-home-video-slides-main-description scrollbar-hide'>
                <div className='description-text w-72'>{items[1].desc}</div>
            </div>
            <div className="fresh-home-video-slides-actions">
                <button className="absolute right-[7.1rem] bottom-4 rounded-full border flex items-center justify-center p-1 w-8 h-8 transition
                            rotatingF hover:border-bili_blue" onClick={getNewVideoDate}>
                    <RotateCw className="w-5 h-5 rotatingElement" />
                </button>
                <button className="absolute right-[4.5rem] bottom-4 rounded-full border flex items-center justify-center p-1 w-8 h-8 transition
                            popLeftArrow hover:border-bili_blue" onClick={handleClicPre} >
                    <ArrowLeft className="arrow-left" />
                </button>
                <button className="absolute right-4 bottom-4 flex items-center justify-center rounded-full border p-1 w-12 h-12 transition
                            popRightArrow hover:border-bili_blue" onClick={handleClicNext} >
                    <ArrowRight className="w-8 h-8 arrow-right" />
                </button>
            </div>
        </div>
        </div >
    )
}
