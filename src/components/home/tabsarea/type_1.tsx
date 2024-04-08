// React
import { useEffect, useState } from 'react';
// Component
import Slide from './slide';
import Image from '../../image';
// APIs
import { getRanking, getRegionNew } from '@/api/biliApi';
// types
import { VideoZone } from '@/type/bili';
import { List, RankingResp, RankingRespCode, RegionNewResp, VideoListRespCode } from '@/type/home';
// Styles
import './styles.css'
import { Youtube } from 'lucide-react';
import RankingList from './ranking_list';

type TypeOneProps = {
    videoZone: VideoZone
} & React.HTMLAttributes<HTMLDivElement>

export default function TypeOne({
    videoZone, ...props
}: TypeOneProps) {
    const [regionNewVideoList, setRegionNewVideoList] = useState<List>()
    const [regionRankingVideoList, setRegionRankingVideoList] = useState<List>()

    const getNewVideoDate = async () => {
        // Send request to get must-do content
        const regionNewResp = JSON.parse(await getRegionNew(videoZone) as string) as RegionNewResp
        // Check if request is error
        if (regionNewResp.code !== VideoListRespCode.SUCCESS) return
        // Set resp to state
        setRegionNewVideoList(regionNewResp.data.archives)
    }

    const getRankingData = async () => {
        // Send request to get must-do content
        const rankingResp = JSON.parse(await getRanking(videoZone) as string) as RankingResp
        // Check if request is error
        if (rankingResp.code !== RankingRespCode.SUCCESS) return
        // Set resp to state
        setRegionRankingVideoList(rankingResp.data.list)
    }

    useEffect(() => {
        getNewVideoDate()
        getRankingData()
    }, [])

    return (
        <div className='fresh-home-categories-bangumi' {...props}>
            <div className='fresh-home-categories-bangumi-timeline'>
                <div className="fresh-home-categories-bangumi-timeline-header">
                    <div className="fresh-home-sub-header">
                        <div className="fresh-home-sub-header-dot">
                        </div>
                        最新发布
                    </div>
                </div>
                {regionNewVideoList && <Slide list={regionNewVideoList} getNewVideoDate={getNewVideoDate} />}
                {regionRankingVideoList && <RankingList list={regionRankingVideoList.slice(3, 11)} />}
            </div>
            <div className='fresh-home-categories-bangumi-rank-list'>
                <div className="fresh-home-sub-header">
                    <div className="fresh-home-sub-header-dot"></div>
                    排行榜
                </div>
                <div className='fresh-home-rank-list relative'>
                    {
                        regionRankingVideoList &&
                        <div className='text-sm relative'>
                            <div className='h-24 border border-bili_grey rounded-xl px-3 py-3 bg-white hover:text-bili_blue transition'>
                                <span className='line-clamp-1'>{regionRankingVideoList[0].title}</span>
                            </div>
                            <div className='border border-bili_grey w-64 h-24 flex flex-col justify-between mt-[10.5rem] ml-28 rounded-xl pl-12 py-2 bg-white absolute z-20'>
                                <span className='line-clamp-2 hover:text-bili_blue transition'>{regionRankingVideoList[1].title}</span>
                                <div className='flex text-xs items-center space-x-2'>
                                    <span className='hover:text-bili_blue transition'>UP&nbsp;{regionRankingVideoList[1].owner.name}</span>
                                    <div className='flex space-x-1'>
                                        <Youtube className='w-4 h-4' />
                                        <span>{regionRankingVideoList[1].stat.view > 10000 ? `${(regionRankingVideoList[1].stat.view / 10000).toFixed(1)}万` : regionRankingVideoList[1].stat.view}</span>
                                    </div>
                                </div>
                            </div>
                            <div className='border border-bili_grey w-72 h-24 rounded-xl pr-6 pl-3 py-2 flex flex-col justify-between bg-white absolute top-[23.5rem] z-30'>
                                <span className='line-clamp-2 hover:text-bili_blue transition'>{regionRankingVideoList[2].title}</span>
                                <div className='flex text-xs items-center space-x-2'>
                                    <span className='hover:text-bili_blue transition'>UP&nbsp;{regionRankingVideoList[2].owner.name}</span>
                                    <div className='flex space-x-1'>
                                        <Youtube className='w-4 h-4' />
                                        <span>{regionRankingVideoList[2].stat.view > 10000 ? `${(regionRankingVideoList[2].stat.view / 10000).toFixed(1)}万` : regionRankingVideoList[2].stat.view}</span>
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
                                regionRankingVideoList &&
                                <>
                                    <Image className='w-80 h-48 object-cover object-center' url={regionRankingVideoList[0].pic} alt='封面' />
                                    <div className='absolute left-2 bottom-1 px-2 h-5 flex justify-center items-center text-xs text-white bg-transparent_black rounded-md hover:text-bili_blue transition'>
                                        UP&nbsp;
                                        {regionRankingVideoList[0].owner.name}
                                    </div>
                                </>
                            }
                        </a>
                        <div className='fresh-home-rank-list-laser' data-number='1'></div>
                    </div>
                    <div className='fresh-home-rank-list-second-item animation z-20'>
                        <a className='fresh-home-rank-list-rank-item'>
                            <div className='fresh-home-rank-list-rank-item-title'></div>
                            <a className='be-up-info fallback'></a>
                            <div className='fresh-home-rank-list-stats'></div>
                        </a>
                        <a className='fresh-home-rank-list-cover'>
                            {
                                regionRankingVideoList &&
                                <Image className='w-36 h-24 object-cover object-center' url={regionRankingVideoList[1].pic} alt='封面' />
                            }
                        </a>
                        <div className='fresh-home-rank-list-laser' data-number='2'></div>
                    </div>
                    <div className='fresh-home-rank-list-third-item animation z-40'>
                        <a className='fresh-home-rank-list-rank-item'>
                            <div className='fresh-home-rank-list-rank-item-title'></div>
                            <a className='be-up-info fallback'></a>
                            <div className='fresh-home-rank-list-stats'></div>
                        </a>
                        <a className='fresh-home-rank-list-cover'>
                            {
                                regionRankingVideoList &&
                                <Image className='w-28 h-20 object-cover object-center' url={regionRankingVideoList[2].pic} alt='封面' />
                            }
                        </a>
                        <div className='fresh-home-rank-list-laser' data-number='3'></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
