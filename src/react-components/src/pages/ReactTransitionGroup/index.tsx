/**
 * react-transition-group react官方的过渡动画
 * 
 * 通过改变 className 来给组件加上的过渡效果的
 */
import { useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup  } from 'react-transition-group';

import './index.scss'


/**
 * 初始化没有动画
 */
// export const ReactTransitionGroup = () => {
//     const [flag, setFlag] = useState(false);

//     // useEffect(() => {
//     //     setTimeout(() => {
//     //         setFlag(true);
//     //     }, 3000);
//     // }, []);
  
//     return (
//         <>
//             <CSSTransition
//                 in={flag}
//                 timeout={1000}
//             >
//                 <div id="box"></div>
//             </CSSTransition>

//             <button onClick={() => setFlag(!flag)}>{!flag ?  '进入' : '离开'}</button>
//         </>
        
//     )
// }



/**
 * 初始化有动画
 */
// export const ReactTransitionGroup = () => {
//     const [flag, setFlag] = useState(true);
  
//     return (
//         <>
//             <CSSTransition
//                 in={flag}
//                 appear={true}
//                 timeout={1000}
//             >
//                 <div id="box"></div>
//             </CSSTransition>

//             <button onClick={() => setFlag(!flag)}>{!flag ?  '进入' : '离开'}</button>
//         </>
        
//     )
// }



/**
 * 多个动画
 */
export const ReactTransitionGroup = () => {
    const [items, setItems] = useState([
        { id: 1, text: "guang" },
        { id: 2, text: "guang" },
    ])
  
    return (
        <div>
            <TransitionGroup className="item-box">
            {
                items.map(({ id, text }) => (
                    <CSSTransition
                        key={id}
                        timeout={1000}
                    >
                        <div className="item">
                            <span
                                className="del-btn"
                                onClick={() => {
                                    setItems(items.filter((item) => item.id !== id))
                                }}
                            >
                                x
                            </span>

                            {text}
                        </div>
                    </CSSTransition>
                ))
            }
            </TransitionGroup>
    
            <div
                className="btn"
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
