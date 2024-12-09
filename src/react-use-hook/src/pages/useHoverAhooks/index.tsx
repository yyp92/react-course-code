/**
 * ahooks useHover
 */
import {useRef} from 'react'
// import { useHover } from 'ahooks'
import { useHover } from '@/hooks/ahooks'

export const UseHoverAhooks = () => {
    const ref = useRef<HTMLDivElement>(null)
    const isHovering = useHover(ref)

    return (
        <div ref={ref}>{isHovering ? 'hover' : 'leaveHover'}</div>
    )
}