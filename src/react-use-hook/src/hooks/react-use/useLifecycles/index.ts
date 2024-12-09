/**
 * * useLifecycles
 */
import { useEffect } from 'react'

export const useLifecycles = (
    mount: Function,
    unmount?: Function
) => {
    useEffect(() => {
        // 在 useEffect 里调用 mount，这时候 dom 操作完了，组件已经 mount
        if (mount) {
            mount()
        }

        // 清理函数里调用 unmount，在组件从 dom 卸载时调用
        return () => {
            if (unmount) {
                unmount()
            }
        }
    }, [])
}
