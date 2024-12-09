/**
 * use-gesture 实现拖动，拿到方向、距离等信息，然后用 react-spring 做属性变化的动画
 */
import {useRef} from 'react'
import { useSprings, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react';

import styles from './index.module.scss'


const pages = [
    'https://images.pexels.com/photos/62689/pexels-photo-62689.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'https://images.pexels.com/photos/733853/pexels-photo-733853.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'https://images.pexels.com/photos/4016596/pexels-photo-4016596.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'https://images.pexels.com/photos/351265/pexels-photo-351265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'https://images.pexels.com/photos/924675/pexels-photo-924675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
]

export const UseGestureTest = () => {
    // 用 useRef 保存当前的 index，初始值是 0
    const index = useRef(0)
    const width = window.innerWidth

    // 多个元素并行的动画
    const [props, api] = useSprings(
        pages.length,
        i => ({
            // x 的初始值是 width * i，也就是依次平铺
            x: i * width,
            scale: 1
        })
    )

    const bind = useDrag(({
        // active 是当前是否在拖动
        active,

        // movement 是拖动距离 [x, y]
        movement: [mx],

        // direction 是拖动方向 [x, y]，1 代表向左（向上）、-1 代表向右（向下）
        direction: [xDir],

        // cancel 方法可以中止事件
        cancel
    }) => {
        // 当正在拖动并且拖动的距离超过了宽度的一半，就改变 index
        if (active && Math.abs(mx) > width / 2) {
            // index 根据移动的方向来计算，xDir 大于 0，就是向左，index 减一，反之加一
            let newIndex = index.current + (xDir > 0 ? -1 : 1);
        
            if (newIndex < 0) {
                newIndex = 0;
            }
        
            if (newIndex > pages.length - 1) {
                newIndex = pages.length - 1;
            }
        
            index.current =  newIndex;
            
            // 改变 index 之后调用 cancel，就不再处理后续 drag 事件了
            cancel()
        }

        // 然后根据拖动距离来计算每个元素的 x 和 scale
        api.start(i => {
            // x 根据和当前 index 的差值 * width 计算，然后加上拖动的距离
            // 比如当前 index 为 1，那 index 为 2 的 x 就是 (2 - 1) * width，而 index 为 0 的就是 (0 - 1) * width
            const x = (i - index.current) * width + (active ? mx : 0)
            // scale 则是用拖动的距离除以 width 算一个比值，然后用 1 减去它，因为刚开始拖动的时候 scale 大
            const scale = active
                ? 1 - Math.abs(mx) / width / 2
                : 1
            
            return { x, scale }
        })
    })

    return (
        <div className={styles.wrapper}>
            {
                props.map(({ x, scale }, i) => (
                    <animated.div
                        className={styles.page}
                        {...bind()}
                        key={i}
                        style={{x}}
                    >
                        <animated.div
                            style={{
                                scale,
                                backgroundImage: `url(${pages[i]})`
                            }}
                        />
                    </animated.div>
                ))
            }
        </div>
    )
}