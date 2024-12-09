/**
 * useTimeout
 */
import { useCallback, useEffect, useRef } from 'react'

export const useTimeout = (
    fn: () => void,
    delay?: number
) => {
    const fnRef = useRef<Function>(fn)
    const timerRef = useRef<number>()

    useEffect(() => {
        fnRef.current = fn
    })

    const clear = useCallback(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current)
        }
    }, [])

    useEffect(() => {
        timerRef.current = setTimeout(fnRef.current, delay)

        return clear
    }, [delay])

    return clear
}
