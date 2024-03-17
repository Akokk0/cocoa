import React, { useRef, useState } from 'react'
import './styles.css'

export default function Slide({initItems}:any) {
    const timerIdRef = useRef<any>(null);
    const containerRef = useRef(null);

    const [items, setItems] = useState(initItems)


    const jumpToCard = (index) => {
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
        setItems(prevItems => {
            return [...prevItems.slice(1), prevItems[0]]
        });
    };

    const handleClicPre = () => {
        if (!timerIdRef.current) {
            previousCard();
            timerIdRef.current = setTimeout(() => {
                timerIdRef.current = null;
            }, 400);
        }
    };

    const handleClicNext = () => {
        if (!timerIdRef.current) {
            nextCard();
            timerIdRef.current = setTimeout(() => {
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
                setItems(prevItems => {
                    const lastItem = prevItems[prevItems.length - 1];
                    return [lastItem, ...prevItems.slice(0, -1)];
                });
            }, 400);
        }
    };
  return (
    <div className="fresh-home-video-slides">
    <div className="fresh-home-video-slides-covers" ref={containerRef}>
        {
            items.map(({ coverUrl, id, title }, index) => {
                return (
                    <a data-id={id} key={id} onClick={() => {
                        jumpToCard(index)
                    }} href={index !== 1 ? 'javascript:void(0)' : 'http://baidu.com'} className="fresh-home-video-slides-cover">
                        <img src={coverUrl} alt="" width={'100%'} />
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
                    <a href="https://www.bilibili.com/video/BV1rC4y1j7MU" target="_blank" className="fresh-home-video-slides-play-button">
                        <div data-v-18aa9448="" role="button" className="be-button primary round">
                            <div data-v-18aa9448="" className="content-container">
                                <i className="be-icon mdi mdi-play" data-v-18aa9448="" ></i>
                                播放
                            </div>
                        </div>
                    </a>
                    <a href="https://space.bilibili.com/473456010" title="木羽TiAmo" target="_blank" className="fresh-home-video-slides-up-container">
                        <img width="24" height="24" src="https://i0.hdslb.com/bfs/face/fd6f1e1b9d82900bad0802964ce92decbd471ea9.jpg" />
                        <div className="fresh-home-video-slides-up-name">
                            木羽TiAmo
                        </div>
                    </a>
                </div>
            </div>
            <a title="【中英授权】“快些逃跑吧你已经死到临头！”Epic音乐剧手书Done For" href="https://www.bilibili.com/video/BV1rC4y1j7MU" target="_blank" className="fresh-home-video-slides-main-title">
                {items[1].title}
            </a>
        </div>
        <div className='fresh-home-video-slides-main-description'>
            <div className='description-text'> {items[1].desc}</div>
        </div>
        <div className="fresh-home-video-slides-actions">
            <div className="be-button fresh-home-video-slides-refresh-button light icon" title="刷新" >
                <div className='content-container'>
                    <i className="be-icon mdi mdi-refresh"  ></i>
                </div>
            </div>
            <div
                className="be-button fresh-home-video-slides-previous-button light icon"
                title="上一个"
                onClick={() => {
                    handleClicPre()
                }}
            >
                <div className='content-container'>
                    <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3386" width="20" height="20"><path d="M983.8 312.7C958 251.7 921 197 874 150S772.3 66 711.3 40.3C648.2 13.5 581.1 0 512 0S375.8 13.5 312.7 40.3C251.7 66 197 103 150 150S66 251.7 40.3 312.7C13.5 375.8 0 442.9 0 512s13.5 136.2 40.3 199.3C66 772.3 103 827 150 874s101.8 83.9 162.7 109.7c63.1 26.7 130.2 40.3 199.3 40.3s136.2-13.5 199.3-40.3C772.3 958 827 921 874 874s83.9-101.8 109.7-162.7c26.7-63.1 40.3-130.2 40.3-199.3s-13.5-136.2-40.2-199.3zM623.5 718.5c14.1 14.1 14.1 36.9 0 50.9-7 7-16.2 10.5-25.5 10.5s-18.4-3.5-25.5-10.5L340.6 537.5c-14.1-14.1-14.1-36.9 0-50.9l232-232c14.1-14.1 36.9-14.1 50.9 0 14.1 14.1 14.1 36.9 0 50.9L416.9 512l206.6 206.5z" fill="" p-id="3387"></path></svg>
                </div>
            </div>
            <div onClick={() => {
                handleClicNext()
            }} className="be-button fresh-home-video-slides-next-button light icon" title="下一个"  >
                <div className='content-container'>
                    <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3177" width="20" height="20"><path d="M0 512c0 69.1 13.5 136.2 40.3 199.3C66 772.3 103 827 150 874s101.8 83.9 162.7 109.7c63.1 26.7 130.2 40.3 199.3 40.3s136.2-13.5 199.3-40.3C772.3 958 827 921 874 874s83.9-101.8 109.7-162.7c26.7-63.1 40.3-130.2 40.3-199.3s-13.5-136.2-40.3-199.3C958 251.7 921 197 874 150S772.3 66 711.3 40.3C648.2 13.5 581.1 0 512 0S375.8 13.5 312.7 40.3C251.7 66 197 103 150 150S66 251.7 40.3 312.7C13.5 375.8 0 442.9 0 512z m607.1 0L400.5 305.5c-14.1-14.1-14.1-36.9 0-50.9 14.1-14.1 36.9-14.1 50.9 0l232 231.9c14.1 14.1 14.1 36.9 0 50.9l-231.9 232c-7 7-16.2 10.5-25.5 10.5s-18.4-3.5-25.5-10.5c-14.1-14.1-14.1-36.9 0-50.9L607.1 512z" fill="" p-id="3178"></path></svg>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}
