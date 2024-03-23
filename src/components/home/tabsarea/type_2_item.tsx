// Styles
import { Result } from '@/type/home'
import './styles.css'
import { useEffect } from 'react'
import Image from '../../image'
import { cn } from '@/lib/utils'
import { AlarmClockCheck } from 'lucide-react'

type TypeTwoItemProps = {
    item: Result
} & React.HTMLAttributes<HTMLDivElement>

export default function TypeTwoItem({
    item
}: TypeTwoItemProps) {
    // Prevent empty data from appearing
    if (item.episodes.length === 0) return
    // Func
    const getWeekIndex = () => {
        switch (item.day_of_week) {
            case 1: return '周一';
            case 2: return '周二';
            case 3: return '周三';
            case 4: return '周四';
            case 5: return '周五';
            case 6: return '周六';
            case 7: return '周日';
            default: return '未知'
        }
    }
    // Value
    let weekIndex = getWeekIndex()
    // Effect
    useEffect(() => {
        console.log(item);

    }, [])

    return (
        <div className={cn('fresh-home-categories-bangumi-timeline-item', item.is_today ? 'h-28' : '')}>
            <div className='flex flex-col items-center space-y-2 min-w-28'>
                <div className='flex space-x-3'>
                    <img width={50} height={48} src="data:image/jpeg;base64,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" alt="" />
                    <div className='flex flex-col justify-around'>
                        <div className='fresh-home-categories-bangumi-timeline-date-number'>{item.date}</div>
                        <div className='fresh-home-categories-bangumi-timeline-date-text'>{weekIndex}</div>
                    </div>
                </div>
                {!item.is_today ? '' :
                    <div className='w-24 text-white text-xs font-bold bg-bili_blue rounded-full py-[0.15rem] flex justify-center'>
                        TODAY
                    </div>
                }
            </div>
            <div className='fresh-home-categories-bangumi-timeline-seasons-container scroll-top scroll-bottom not-empty flex overflow-auto scrollbar-hide'>
                {item.episodes.map(episode => (
                    <div className='fresh-home-categories-bangumi-timeline-seasons'>
                        <a href="" className='fresh-home-categories-bangumi-timeline-season'>
                            <div className='fresh-home-categories-bangumi-timeline-season-cover cover-scale'>
                                <Image url={episode.square_cover} alt='square_cover' />
                            </div>
                            <div className='fresh-home-categories-bangumi-timeline-season-title'>{episode.title}</div>
                            <div className='fresh-home-categories-bangumi-timeline-season-episode'>{episode.pub_index}</div>
                            <div className='fresh-home-categories-bangumi-timeline-season-time'>
                                <div className='fresh-home-categories-bangumi-timeline-season-time-icon'>
                                    <AlarmClockCheck className='w-4 h-4' />
                                </div>
                                <div className='fresh-home-categories-bangumi-timeline-season-time-text'> {episode.pub_time}</div>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
}
