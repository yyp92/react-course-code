/**
 * popover 基于 floating-ui 封装
 */
import {
    useState,
    useRef,
    CSSProperties,
    PropsWithChildren,
    ReactNode,
    useMemo
} from 'react';
import {
    useInteractions,
    useFloating,
    useHover,
    useClick,
    useDismiss,
    offset,
    arrow,
    flip,
    FloatingArrow
} from '@floating-ui/react';

import './index.scss'
import { createPortal } from 'react-dom';


type Alignment = 'start' | 'end'
type Side = 'top' | 'right' | 'bottom' | 'left'
type AlignedPlacement = `${Side}-${Alignment}`

// 参数继承 PropsWithChildren，可以传入 children 参数
interface PopoverProps extends PropsWithChildren {
    // 可以传入 content，也就是浮层的内容
    content: ReactNode,

    // trigger 参数是触发浮层的方式，可以是 click 或者 hover
    trigger?: 'hover' | 'click'

    // placement 就是 12 个方向
    placement?: Side | AlignedPlacement,

    // open、onOpenChange 则是可以在组件外控制 popover 的显示隐藏
    open?: boolean,
    onOpenChange?: (open: boolean) => void,

    // className 和 style 设置到内层的 span 元素上
    className?: string;
    style?: CSSProperties
}

const Popover = (props: PopoverProps) => {
    const {
        open,
        onOpenChange,
        content,
        children,
        trigger = 'hover',
        placement = 'bottom',
        className,
        style
    } = props
    const arrowRef = useRef(null)
    const [isOpen, setIsOpen] = useState(open)

    // * useFloating 是用来给浮层确定位置的
    const {
        refs,
        floatingStyles,
        context
    } = useFloating({
        open: isOpen,
        onOpenChange: (open) => {
            setIsOpen(open)

            onOpenChange?.(open)
        },

        // 指定浮层出现的方向
        placement,

        // 中间件
        middleware: [
            // 修改两者距离的
            offset(10),

            // 箭头三角
            arrow({
                element: arrowRef,
            }),

            // 处理边界问题
            flip()
        ]
    })

    // const hover = useHover(context)
    // const click = useClick(context)
    const dismiss = useDismiss(context)
    const interaction = trigger === 'hover'
        ? useHover(context)
        : useClick(context)

    // * useInteractions 是用来绑定交互事件的
    const {
        getReferenceProps,
        getFloatingProps
    } = useInteractions([
        // hover,
        // click,
        interaction,

        // 现在点击其它位置，浮层就会消失，并且按 ESC 键也会消失
        dismiss
    ])


    // ********* 渲染 *********
    const el = useMemo(() => {
        const el = document.createElement('div')
        el.className = `wrapper`

        document.body.appendChild(el)
        return el
    }, [])

    const floating = (
        isOpen && (
            <div
                className="popover-floating"
                ref={refs.setFloating}
                style={floatingStyles}
                {...getFloatingProps()}
            >
                {content}

                <FloatingArrow
                    ref={arrowRef}
                    context={context}
                    fill="#fff"
                    stroke="#000"
                    strokeWidth={1}
                />
            </div>
        )
    )
  
    return (
        <>
            <span
                ref={refs.setReference}
                {...getReferenceProps()}
                className={className}
                style={style}
            >
                {children}
            </span>

            {createPortal(floating, el)}
        </>
    )
}

export default Popover
  