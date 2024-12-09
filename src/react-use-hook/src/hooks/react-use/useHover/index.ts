import { cloneElement, useState } from "react"

export type Element = ((state: boolean) => React.ReactElement) | React.ReactElement

export const useHover = (element: Element): [React.ReactElement, boolean] => {
    // 用 useState 保存 hover 状态
    const [state, setState] = useState(false);

    const onMouseEnter = (originalOnMouseEnter?: any) => {
        return (event: any) => {
            originalOnMouseEnter?.(event)
            setState(true)
        }
    }

    const onMouseLeave = (originalOnMouseLeave?: any) => {
        return (event: any) => {
            originalOnMouseLeave?.(event)
            setState(false)
        }
    }

    if (typeof element === 'function') {
        element = element(state)
    }

    // 用 cloneElement 复制 ReactElement，给它添加 onMouseEnter、onMouseLeave 事件
    const el = cloneElement(
        element,
        {
            onMouseEnter: onMouseEnter(element.props.onMouseEnter),
            onMouseLeave: onMouseLeave(element.props.onMouseLeave),
        }
    )

    return [el, state]
}