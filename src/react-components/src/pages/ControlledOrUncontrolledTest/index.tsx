/**
 * * 受控模式 和 非受控模式
 * 
 * value 由用户控制就是非受控模式，由代码控制就是受控模式。
 */
import {
    SetStateAction,
    ChangeEvent,
    useEffect,
    useRef,
    useState,
    useCallback
} from 'react'

/**
 * * 非受控模式
 */
// export const ControlledOrUncontrolledTest = () => {
//     // const onChange = (event: ChangeEvent<HTMLInputElement>) => {
//     //     console.log(event.target.value)
//     // }
    
//     // return (
//     //     <input
//     //         defaultValue={'guang'}
//     //         onChange={onChange}
//     //     />
//     // )




//     const inputRef = useRef<HTMLInputElement>(null)

//     useEffect(() => {
//         setTimeout(() => {
//             console.log(inputRef.current?.value)
//         }, 2000)
//     }, [])

//     return (
//         <input
//             defaultValue={'guang'}
//             ref={inputRef}
//         />
//     )
// }




/**
 * * 受控模式
 */
// export const ControlledOrUncontrolledTest = () => {
//     const [value, setValue] = useState('guang')

//     function onChange(event: ChangeEvent<HTMLInputElement>) {
//         console.log(event.target.value)
//         setValue(event.target.value)
//     }

//     return (
//         <input
//             value={value}
//             onChange={onChange}
//         />
//     )
// }




/**
 * * 自己封装兼容受控和非受控模式
 * 
 * 如果外部的value有值就是受控模式，否则为非受控模式
 */
function useMergeState<T>(
    defaultStateValue: T,
    props?: {
        defaultValue?: T,
        value?: T,
        onChange?: (value: T) => void
    }
): [T, React.Dispatch<React.SetStateAction<T>>,] {
    const {
        defaultValue,
        value: propsValue,
        onChange
    } = props || {}
    // 是不是首次渲染
    const isFirstRender = useRef(true)
  
    // 通过判断 value 是不是 undefined 来区分受控模式和非受控模式
    const [stateValue, setStateValue] = useState<T>(() => {
        if (propsValue !== undefined) {
            return propsValue!
        }
        else if(defaultValue !== undefined){
            return defaultValue!
        }
        else {
            return defaultStateValue
        }
    })
  
    useEffect(() => {
        /**
         * *当不是首次渲染，但 value 变为 undefined 的情况，也就是从受控模式切换到了非受控模式，要同步设置 state 为 propsValue。
         * 
         * 外部 value 等于 undefined, 也就是一开始有值，后来变成了 undefined （可能是移除了value属性 或者直接传入的 undefined），那么就更新下内部的值。
         * 如果 value 有值，在下一步逻辑中直接返回了 value, 不需要同步到 stateValue
         */
        if (propsValue === undefined && !isFirstRender.current) {
            setStateValue(propsValue!)
        }
    
        isFirstRender.current = false
    }, [propsValue])
  
    const mergedValue = propsValue === undefined
        ? stateValue
        : propsValue

    // 判断是不是函数
    function isFunction(value: unknown): value is Function {
        return typeof value === 'function'
    } 

    const setState = useCallback((value: SetStateAction<T>) => {
        let res = isFunction(value)
            ? value(stateValue)
            : value
    
        // 如果是非受控模式，那渲染用内部 state 的 value，然后 changeValue 里 setValue
        if (propsValue === undefined) {
            setStateValue(res)
        }

        onChange?.(res)
      }, [stateValue])
  
    return [mergedValue, setState]
}


interface CalendarProps{
    value?: Date;
    defaultValue?: Date;
    onChange?: (date: Date) => void;
}
  
function Calendar(props: CalendarProps) {
    const {
        value: propsValue,
        defaultValue,
        onChange
    } = props
  
    const [mergedValue, setValue] = useMergeState(new Date(), {
        value: propsValue,
        defaultValue,
        onChange
    })
  
    // function changeValue(date: Date) {
    //     // 如果是非受控模式，那渲染用内部 state 的 value，然后 changeValue 里 setValue
    //     if (propsValue === undefined) {
    //         setValue(date)
    //     }

    //     onChange?.(date)
    // } 
  
    return (
        <div>
            {mergedValue?.toLocaleDateString()}

            <div onClick={()=> {setValue(new Date('2024-5-1'))}}>2024-5-1</div>
            <div onClick={()=> {setValue(new Date('2024-5-2'))}}>2024-5-2</div>
            <div onClick={()=> {setValue(new Date('2024-5-3'))}}>2024-5-3</div>
        </div>
    )
}


// * 测试
// 非受控模式
// export const ControlledOrUncontrolledTest = () => {
//     return (
//         <Calendar
//             defaultValue={new Date('2024-5-1')}
//             onChange={(date) => {
//                 console.log(date.toLocaleDateString())
//             }}
//         />
//     )
// }


// 受控模式
export const ControlledOrUncontrolledTest = () => {
    const [value, setValue] = useState(new Date('2024-5-1'))

    return (
        <Calendar
            value={value}
            onChange={(date) => {
                console.log(date.toLocaleDateString())
                setValue(date)
            }}
        />
    )
}
