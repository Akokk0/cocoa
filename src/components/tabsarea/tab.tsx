// React
import { useEffect, useState } from 'react';
// Component
import TypeOne from './type_1';
import TypeTwo from './type_2';
// Types
import { VideoZone } from '@/type/bili';
// Styles
import './styles.css'

type FreshHomeCategoriesProps = {

} & React.HTMLAttributes<HTMLDivElement>

type Tab = {
    id: number,
    name: string,
    displayName: string,
    content: React.ReactNode
}

const FreshHomeCategories: React.FC<FreshHomeCategoriesProps> = ({ ...props }) => {
    const tabs: Array<Tab> = [
        {
            id: VideoZone.douga,
            name: 'douga',
            displayName: '动画',
            content: <TypeOne videoZone={VideoZone.douga} />
        },
        {
            id: VideoZone.anime,
            name: 'anime',
            displayName: '番剧',
            content: <TypeTwo />
        },
        {
            id: VideoZone.guochuang,
            name: 'guochuang',
            displayName: '国创',
            content: <TypeOne videoZone={VideoZone.guochuang} />
        },
        {
            id: VideoZone.music,
            name: 'music',
            displayName: '音乐',
            content: <TypeOne videoZone={VideoZone.music} />
        },
        {
            id: VideoZone.dance,
            name: 'dance',
            displayName: '舞蹈',
            content: <TypeOne videoZone={VideoZone.dance} />
        },
        {
            id: VideoZone.game,
            name: 'game',
            displayName: '游戏',
            content: <TypeOne videoZone={VideoZone.game} />
        },
        {
            id: VideoZone.knowledge,
            name: 'knowledge',
            displayName: '知识',
            content: <TypeOne videoZone={VideoZone.knowledge} />
        },
        {
            id: VideoZone.tech,
            name: 'tech',
            displayName: '科技',
            content: <TypeOne videoZone={VideoZone.tech} />
        },
        {
            id: VideoZone.sports,
            name: 'sports',
            displayName: '体育',
            content: <TypeOne videoZone={VideoZone.sports} />
        },
        {
            id: VideoZone.car,
            name: 'car',
            displayName: '汽车',
            content: <TypeOne videoZone={VideoZone.car} />
        },
        {
            id: VideoZone.life,
            name: 'life',
            displayName: '生活',
            content: <TypeOne videoZone={VideoZone.life} />
        },
        {
            id: VideoZone.food,
            name: 'food',
            displayName: '美食',
            content: <TypeOne videoZone={VideoZone.food} />
        },
        {
            id: VideoZone.animal,
            name: 'animal',
            displayName: '动物',
            content: <TypeOne videoZone={VideoZone.animal} />
        },
        {
            id: VideoZone.kichiku,
            name: 'kichiku',
            displayName: '鬼畜',
            content: <TypeOne videoZone={VideoZone.kichiku} />
        },
        {
            id: VideoZone.fashion,
            name: 'fashion',
            displayName: '时尚',
            content: <TypeOne videoZone={VideoZone.fashion} />
        },
        {
            id: VideoZone.information,
            name: 'information',
            displayName: '资讯',
            content: <TypeOne videoZone={VideoZone.information} />
        },
        {
            id: VideoZone.ent,
            name: 'ent',
            displayName: '娱乐',
            content: <TypeOne videoZone={VideoZone.ent} />
        },
        {
            id: VideoZone.cinephile,
            name: 'cinephile',
            displayName: '影视',
            content: <TypeOne videoZone={VideoZone.cinephile} />
        },
        {
            id: VideoZone.documentary,
            name: 'documentary',
            displayName: '纪录片',
            content: <TypeOne videoZone={VideoZone.documentary} />
        },
        {
            id: VideoZone.movie,
            name: 'movie',
            displayName: '电影',
            content: <TypeOne videoZone={VideoZone.movie} />
        },
        {
            id: VideoZone.tv,
            name: 'tv',
            displayName: '电视剧',
            content: <TypeOne videoZone={VideoZone.tv} />
        }
    ]

    const [selectedTab, setSelectedTab] = useState<Tab>(tabs[0]);
    const [content, setContent] = useState<React.ReactNode>();

    useEffect(() => {
        setContent(selectedTab.content);
    }, [])

    const selectTab = (tab: Tab) => {
        setSelectedTab(tab);
        setContent(tab.content);
    };

    return (
        <div className='fresh-home' {...props}>
            <div className="fresh-home-categories">
                <div className="fresh-home-header">
                    <div className="fresh-home-header-title">分区</div>
                    <div className="fresh-home-header-center-area">
                        <div className="fresh-home-header-tabs">
                            <div className="default-tabs">
                                {tabs.map((t) => (
                                    <div
                                        key={t.name}
                                        data-name={t.name}
                                        className={`default-tab ${t.id === selectedTab.id ? 'selected' : ''}`}
                                        onClick={() => selectTab(t)}
                                    >
                                        <div className="default-tab-name">{t.displayName}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="fresh-home-categories-content">
                    <div key={selectedTab.id}>
                        {content}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FreshHomeCategories;