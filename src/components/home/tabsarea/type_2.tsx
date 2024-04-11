import TypeTwoItem from './type_2_item'
import './styles.css'
import { PGCRankingItem, PGCRankingResp, PGCRankingRespCode, Result, TimelineResp, TimelineRespCode, TimelineTypes } from '@/type/home'
import { useEffect, useState } from 'react'
import { getPGCRanking, getTimeLine } from '@/api/biliApi'
import { Star } from 'lucide-react'
import Image from '../../image'

type TypeTwoProps = {
    timelineType: TimelineTypes
} & React.HTMLAttributes<HTMLDivElement>

export default function TypeTwo({
    timelineType
}: TypeTwoProps) {
    // State
    const [timelineList, setTimelineList] = useState<Array<Result>>()
    const [pgcRanklingList, setPGCRankingList] = useState<Array<PGCRankingItem>>()
    // Effect
    useEffect(() => {
        // initial data
        getTimelineList()
        getPGCRankingList()
    }, [])
    // Func
    const getTimelineList = async () => {
        // Send request to get must-do content
        const timelineResp = JSON.parse(await getTimeLine(timelineType, 2) as string) as TimelineResp
        // Check if request is error
        if (timelineResp.code !== TimelineRespCode.SUCCESS) return
        // Set resp to state
        setTimelineList(timelineResp.result)
    }

    const getPGCRankingList = async () => {
        // Send request to get must-do content
        const pgcRakingResp = JSON.parse(await getPGCRanking(timelineType) as string) as PGCRankingResp
        // Check if request is error
        if (pgcRakingResp.code !== PGCRankingRespCode.SUCCESS) return
        // Set resp to state
        setPGCRankingList(pgcRakingResp.data.list)
    }

    return (
        <div className='fresh-home-categories-bangumi h-[32rem]'>
            <div className='fresh-home-categories-bangumi-timeline'>
                <div className="fresh-home-categories-bangumi-timeline-header">
                    <div className="fresh-home-sub-header">
                        <div className="fresh-home-sub-header-dot">
                        </div>
                        时间表
                    </div>
                </div>
                <div className='fresh-home-categories-bangumi-timeline-content scrolled snap scrollbar-hide w-[58rem]'>
                    {timelineList && timelineList.map((item, index) => (
                        <TypeTwoItem key={index} item={item} />
                    ))}
                </div>
            </div>
            <div className='fresh-home-categories-bangumi-rank-list'>
                <div className="fresh-home-sub-header">
                    <div className="fresh-home-sub-header-dot"></div>
                    排行榜
                </div>
                <div className='fresh-home-rank-list relative'>
                    {
                        pgcRanklingList &&
                        <div className='text-sm relative'>
                            <div className='h-24 border border-bili_grey rounded-xl px-3 py-3 bg-white hover:text-bili_blue transition'>
                                <span className='line-clamp-1'>{pgcRanklingList[0].title}</span>
                            </div>
                            <div className='border border-bili_grey w-64 h-24 flex flex-col justify-between mt-[10.5rem] ml-28 rounded-xl pl-12 py-2 bg-white absolute z-20'>
                                <span className='line-clamp-2 hover:text-bili_blue transition'>{pgcRanklingList[1].title}</span>
                                <div className='flex text-xs items-center space-x-2'>
                                    <span className='hover:text-bili_blue transition'>{pgcRanklingList[1].new_ep.index_show}</span>
                                    <div className='flex space-x-1 items-center'>
                                        <Star className='w-3 h-3' />
                                        <span>{pgcRanklingList[1].rating}</span>
                                    </div>
                                </div>
                            </div>
                            <div className='border border-bili_grey w-72 h-24 rounded-xl pr-6 pl-3 py-2 flex flex-col justify-between bg-white absolute top-[23.5rem] z-30'>
                                <span className='line-clamp-2 hover:text-bili_blue transition'>{pgcRanklingList[2].title}</span>
                                <div className='flex text-xs items-center space-x-2'>
                                    <span className='hover:text-bili_blue transition'>{pgcRanklingList[2].new_ep.index_show}</span>
                                    <div className='flex space-x-1'>
                                        <Star className='w-3 h-3' />
                                        <span>{pgcRanklingList[2].rating}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    <div className='fresh-home-rank-list-first-item animation absolute top-0 left-0'>
                        <div className='fresh-home-rank-list-rank-item'></div>
                        <div className='fresh-home-rank-list-rank-item-title'></div>
                        <div className='fresh-home-rank-list-rank-item-title'></div>
                        <a className='fresh-home-rank-list-cover relative'>
                            {
                                pgcRanklingList &&
                                <>
                                    <Image className='w-80 h-48 object-cover object-center' url={pgcRanklingList[0].ss_horizontal_cover} alt='封面' />
                                    <div className='absolute left-2 bottom-1 px-2 h-5 flex justify-center items-center text-xs text-white bg-transparent_black rounded-md hover:text-bili_blue transition'>
                                        {pgcRanklingList[0].new_ep.index_show}
                                    </div>
                                    <div className='absolute right-2 bottom-1 px-2 h-5 flex justify-center items-center space-x-1 text-xs text-white bg-transparent_black rounded-md hover:text-bili_blue transition'>
                                        <Star className='w-3 h-3' />
                                        <span>{pgcRanklingList[0].rating}</span>
                                    </div>
                                </>
                            }
                        </a>
                        <div className='fresh-home-rank-list-laser' data-number='1'></div>
                    </div>
                    <div className='fresh-home-rank-list-second-item animation z-20'>
                        <a className='fresh-home-rank-list-rank-item'>
                            <div className='fresh-home-rank-list-rank-item-title'></div>
                            <div className='be-up-info fallback'></div>
                            <div className='fresh-home-rank-list-stats'></div>
                        </a>
                        <a className='fresh-home-rank-list-cover'>
                            {
                                pgcRanklingList &&
                                <Image className='w-36 h-24 object-cover object-center' url={pgcRanklingList[1].ss_horizontal_cover} alt='封面' />
                            }
                        </a>
                        <div className='fresh-home-rank-list-laser' data-number='2'></div>
                    </div>
                    <div className='fresh-home-rank-list-third-item animation z-40'>
                        <a className='fresh-home-rank-list-rank-item'>
                            <div className='fresh-home-rank-list-rank-item-title'></div>
                            <div className='be-up-info fallback'></div>
                            <div className='fresh-home-rank-list-stats'></div>
                        </a>
                        <a className='fresh-home-rank-list-cover'>
                            {
                                pgcRanklingList &&
                                <Image className='w-28 h-20 object-cover object-center' url={pgcRanklingList[2].ss_horizontal_cover} alt='封面' />
                            }
                        </a>
                        <div className='fresh-home-rank-list-laser' data-number='3'></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
