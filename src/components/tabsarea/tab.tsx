import React, { useEffect, useState } from 'react';
import './styles.css'
import Content from './content';
import Fanju from './fanju';
import Donghua from './donghua';
// 请替换为实际的Content组件导入

const FreshHomeCategories = () => {
  const tabs = [
    {
      id: 2,
      name: 'Tab2',
      displayName: '动画',
      category: [],
      href: '/',
      order: 0,
      content: <Donghua />
    },
    {
      id: 3,
      name: 'Tab3',
      displayName: '番剧',
      category: [],
      href: '/',
      order: 0,
      content: <Fanju />
    }]
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [content, setContent] = useState('');

  useEffect(() => {
    // @ts-ignore
    setContent(selectedTab.content);
  }, [])

  const selectTab = (tab) => {
    setSelectedTab(tab);
    setContent(tab.content);
  };

  return (
    <div className='fresh-home'>
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
          <div key={Math.random()}>
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreshHomeCategories;