/**
 * @react-spring/web - useTransition
 */
import { useState, CSSProperties } from 'react'
import { useTransition, animated, AnimatedProps } from '@react-spring/web'

import styles from './index.module.scss'


interface PageItem {
    (props: AnimatedProps<{ style: CSSProperties }>): React.ReactElement
}

const pages: Array<PageItem> = [
    ({ style }) => <animated.div style={{ ...style, background: 'lightpink' }}>A</animated.div>,
    ({ style }) => <animated.div style={{ ...style, background: 'lightblue' }}>B</animated.div>,
    ({ style }) => <animated.div style={{ ...style, background: 'lightgreen' }}>C</animated.div>,
]


/**
 * * 一个元素的过渡动画
 */
// export const ReactSpring1Test = () => {
//     const [index, set] = useState(0);

//     const onClick = () => set(state => (state + 1) % 3);

//     const transitions = useTransition(
//         index,
//         {
//             // 初始状态 (from)
//             from: { transform: 'translate3d(100%,0,0)' },

//             // 进入的时候 (enter)
//             enter: { transform: 'translate3d(0%,0,0)' },

//             // 离开的时候 (leave)
//             leave: { transform: 'translate3d(-100%,0,0)' },
//         }
//     )

//     return (
//         <div
//             className={styles.container}
//             onClick={onClick}
//         >
//             {
//                 transitions((style, i) => {
//                     const Page = pages[i]

//                     return <Page style={style} />
//                 })
//             }
//         </div>
//     )
// }



/**
 * * 多个元素的过渡动画
 */
export const ReactSpring1Test = () => {
    const [items, setItems] = useState([
        {
            id: 1, 
            text: "guang"
        },
        {
            id: 2,
            text: "guang"
        },
    ])

    const transitions = useTransition(
        items,
        {
            // 如果只是想在增删元素的时候才有动画
            initial: {
                transform: 'translate3d(0%,0,0)',
                opacity: 1
            },
            
            from: {
                transform: 'translate3d(100%, 0, 0)',
                opacity: 0
            },
            enter: {
                transform: 'translate3d(0%, 0, 0)',
                opacity: 1
            },
            leave: {
                transform: 'translate3d(-100%, 0, 0)',
                opacity: 0
            },

            // 最好加上 keys，react-spring 会根据这个来添加 key，从而识别出元素的增删
            keys: items.map(item => item.id)
        }
    )

    return (
        <div>
            <div className={styles.itemBox}>
                {
                    transitions((style, i) => {
                        return (
                            <animated.div
                                className={styles.item}
                                style={style}
                            >
                                <span
                                    className={styles.delBtn}
                                    onClick={() => {
                                        setItems(items.filter((item) => item.id !== i.id));
                                    }}
                                >
                                    x
                                </span>

                                {i.text}
                            </animated.div>
                        )
                    })
                }
            </div>

            <div
                className={styles.btn}
                onClick={() => {
                    setItems([
                        ...items,
                        {
                            id: Date.now(),
                            text:  'guang'
                        }
                    ])
                }}
            >
                Add
            </div>
        </div>
    )
}
