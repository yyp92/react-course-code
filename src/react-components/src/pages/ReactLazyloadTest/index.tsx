import React, { useEffect, useRef } from 'react'
import img1 from './img1.png';
import img2 from './img2.png';
// import LazyLoad, {forceCheck} from 'react-lazyload';

import LazyLoad from './MyLazyLoad';

import styles from './index.module.scss'

const LazyGuang = React.lazy(() => import('./Guang'));

export const ReactLazyloadTest = () => {
    const scrollRef = useRef<HTMLDivElement>(null)

    // useEffect(() => {
    //     if (scrollRef.current) {
    //         // 在需要的时候调用 forceCheck，例如在滚动事件之后
    //         // * 解决滚动到可视区域不渲染问题
    //         scrollRef.current.addEventListener('scroll', () => {
    //             forceCheck();
    //         }, false); 
    //     }
    // }, [scrollRef.current])

    return (
        <div
            className={styles.reactLazyloadTest}
            ref={scrollRef}
        >
            {/* <LazyGuang /> */}

            <p>xxxxxx</p>
            <p>xxxxxx</p>
            <p>xxxxxx</p>
            <p>xxxxxx</p>
            <p>xxxxxx</p>
            <p>xxxxxx</p>
            <p>xxxxxx</p>
            <p>xxxxxx</p>
            <p>xxxxxx</p>
            <p>xxxxxx</p>
            <p>xxxxxx</p>
            <p>xxxxxx</p>
            <p>xxxxxx</p>
            <p>xxxxxx</p>
            <p>xxxxxx</p>
            <p>xxxxxx</p>
            <p>xxxxxx</p>
            <p>xxxxxx</p>
            <p>xxxxxx</p>
            <p>xxxxxx</p>
            <p>xxxxxx</p>
            <p>xxxxxx</p>
            <p>xxxxxx</p>
            <p>xxxxxx</p>
            <p>xxxxxx</p>
            <p>xxxxxx</p>
            <p>xxxxxx</p>
            <p>xxxxxx</p>
            <p>xxxxxx</p>
            <p>xxxxxx</p>
            <p>xxxxxx</p>
            <p>xxxxxx</p>
            <p>xxxxxx</p>
            <p>xxxxxx</p>
            <p>xxxxxx</p>
            <p>xxxxxx</p>
            <p>xxxxxx</p>
            <p>xxxxxx</p>
            <p>xxxxxx</p>
            <p>xxxxxx</p>
            <p>xxxxxx</p>
            <p>xxxxxx</p>
            <p>xxxxxx</p>
            <p>xxxxxx</p>
            <p>xxxxxx</p>
            <p>xxxxxx</p>
            <p>xxxxxx</p>
            <p>xxxxxx</p>
            <p>xxxxxx</p>
            <p>xxxxxx</p>
            <p>xxxxxx</p>
            <p>xxxxxx</p>
            <p>xxxxxx</p>

            <LazyLoad placeholder={<div>loading...</div>} >
                {/* <img src={img1} /> */}
                <LazyGuang />
            </LazyLoad>

            <LazyLoad placeholder={<div>loading...</div>} offset={200}>
                <img src={img2} />
            </LazyLoad>
        </div>
    )
}
