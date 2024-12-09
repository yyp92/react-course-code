/**
 * * useMountedState
 */

import { useCallback, useEffect, useRef } from 'react';

export const useMountedState = (): () => boolean => {
    // 通过 useRef 保存 mount 状态
    const mountedRef = useRef<boolean>(false)
    const get = useCallback(
        () => mountedRef.current,
        []
    )

    // useEffect 回调里修改它为 true
    useEffect(() => {
        mountedRef.current = true

        return () => {
            mountedRef.current = false
        }
    }, [])

    return get
}
