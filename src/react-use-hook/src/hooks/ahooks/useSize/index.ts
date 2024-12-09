/**
 * * useSize
 */
// 这里为了兼容，用了 resize-observer-polyfill
import ResizeObserver from 'resize-observer-polyfill'
import { RefObject, useEffect, useState } from 'react'

type Size = {
    width: number
    height: number
}

export const useSize = (targetRef: RefObject<HTMLElement>): Size | undefined => {
    // 用 useState 创建 state，初始值是传入的 ref 元素的宽高
    const [state, setState] = useState<Size | undefined>(
        () => {
            const el = targetRef.current

            // 这里取 clientHeight，也就是不包含边框的高度
            return el
                ? {
                    width: el.clientWidth,
                    height: el.clientHeight
                }
                : undefined
        },
    )

    useEffect(() => {
        const el = targetRef.current

        if (!el) {
            return
        }

        // 用 ResizeObserver 监听元素尺寸的变化，改变的时候 setState 触发重新渲染
        const resizeObserver = new ResizeObserver((entries) => {
            entries.forEach((entry) => {
                const {
                    clientWidth,
                    clientHeight
                } = entry.target

                setState({
                    width: clientWidth,
                    height: clientHeight
                })
            })
        })
        resizeObserver.observe(el)

        return () => {
            resizeObserver.disconnect()
        }
    }, [])

    return state
}