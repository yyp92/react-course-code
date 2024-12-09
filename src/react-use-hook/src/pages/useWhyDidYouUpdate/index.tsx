/**
 * useWhyDidYouUpdate
 * 就是用来打印是哪些 props 改变导致的重新渲染
 */
import {useState} from 'react'
import { useWhyDidYouUpdate } from 'ahooks'

const Demo: React.FC<{ count: number }> = (props) => {
    const [randomNum, setRandomNum] = useState(Math.random())
  
    useWhyDidYouUpdate('Demo', { ...props, randomNum })
  
    return (
        <div>
            <div>
                <span>number: {props.count}</span>
            </div>

            <div>
                randomNum: {randomNum}

                <button onClick={() => setRandomNum(Math.random)}>
                    设置随机 state
                </button>
            </div>
        </div>
    )
}

export const UseWhyDidYouUpdate = () => {
    const [count, setCount] = useState(0)

    return (
        <div>
            <Demo count={count} />
            
            <div>
                <button onClick={() => setCount((prevCount) => prevCount - 1)}>减一</button>
                <button onClick={() => setCount((prevCount) => prevCount + 1)}>加一</button>
            </div>
        </div>
    )
}