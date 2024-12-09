/**
 * * useScrolling
 */

import { RefObject, useEffect, useState } from 'react'

export const useScrolling = (ref: RefObject<HTMLElement>): boolean => {
    // 用 useState 创建个状态
    const [scrolling, setScrolling] = useState<boolean>(false)
  
    useEffect(() => {
        if (ref.current) {
            let scollingTimer: number
    
            const handleScrollEnd = () => {
                setScrolling(false)
            }
    
            const handleScroll = () => {
                setScrolling(true)
                clearTimeout(scollingTimer)

                // 并且定时器 150ms 以后修改为 false
                scollingTimer = window.setTimeout(
                    () => handleScrollEnd(),
                    150
                )
            }
    
            // 给 ref 绑定 scroll 事件，scroll 的时候设置 scrolling 为 true
            ref.current?.addEventListener('scroll', handleScroll)
    
            return () => {
                if (ref.current) {
                    ref.current?.removeEventListener('scroll', handleScroll)
                }
            }
        }

        return () => {}
    }, [ref])
  
    return scrolling
}
