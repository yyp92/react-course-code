/**
 * useWhyDidYouUpdate
 */
import { useEffect, useRef } from 'react'

// Record<string, any> 是任意的对象的 ts 类型
export type IProps = Record<string, any>

export const useWhyDidYouUpdate = (
    componentName: string,
    props: IProps
) => {
    // 核心就是 useRef 保存 props 或者其他值，当下次渲染的时候，拿到新的值和上次的对比下
    const prevProps = useRef<IProps>({})

    useEffect(() => {
        if (prevProps.current) {
            const allKeys = Object.keys({
                ...prevProps.current,
                ...props
            })
            const changedProps: IProps = {}

            allKeys.forEach((key) => {
                if (!Object.is(prevProps.current[key], props[key])) {
                    changedProps[key] = {
                        from: prevProps.current[key],
                        to: props[key],
                    }
                }
            })

            if (Object.keys(changedProps).length) {
                console.log('[why-did-you-update]', componentName, changedProps)
            }
        }

        prevProps.current = props
    })
}
