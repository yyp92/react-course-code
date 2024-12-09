import {
    useEffect,
    useMemo,
    useState,
} from 'react'
import { createPortal } from 'react-dom'
import { getComponentById, useComponetsStore } from '../../stores/components'

interface HoverMaskProps {
    portalWrapperClassName: string
    containerClassName: string
    componentId: number
}

function HoverMask({
    // 画布区的根元素的 className
    containerClassName,

    // hover 的组件 id
    componentId,

    portalWrapperClassName
}: HoverMaskProps) {
    const {components} = useComponetsStore()
    const [position, setPosition] = useState({
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        labelTop: 0,
        labelLeft: 0,
    })

    useEffect(() => {
        updatePosition()
    }, [componentId])

    useEffect(() => {
        updatePosition()
    }, [components])

    function updatePosition() {
        if (!componentId) return

        const container = document.querySelector(`.${containerClassName}`)
        if (!container) return

        const node = document.querySelector(`[data-component-id="${componentId}"]`)
        if (!node) return

        // 目标元素的位置属性
        const {
            top,
            left,
            width,
            height
        } = node.getBoundingClientRect()
        // 画布元素的位置属性
        const {
            top: containerTop,
            left: containerLeft
        } = container.getBoundingClientRect()

        let labelTop = top - containerTop + container.scrollTop
        let labelLeft = left - containerLeft + width

        // page 组件显示组件名处理
        if (labelTop <= 0) {
            labelTop -= -20
        }

        // 获取两个元素的 boundingClientRect，计算 top、left 的差值，加上 scrollTop、scrollLeft
        // * 因为 boundingClientRect 只是可视区也就是和视口的距离，要算绝对定位的位置的话要加上已滚动的距离
        setPosition({
            top: top - containerTop + container.scrollTop,
            left: left - containerLeft + container.scrollTop,
            width,
            height,
            labelTop,
            labelLeft
        })
    }

    // 然后创建一个 div 挂载在容器下，用于存放 portal
    const el = useMemo(() => {
        return document.querySelector(`.${portalWrapperClassName}`)!
    }, [])

    const curComponent = useMemo(() => {
        return getComponentById(componentId, components);
    }, [componentId])
    

    return createPortal((
        <>
            <div
                style={{
                    position: "absolute",
                    left: position.left,
                    top: position.top,
                    backgroundColor: "rgba(0, 0, 255, 0.1)",
                    border: "1px dashed blue",

                    // * 注意还要设置 pointer-event 为 none，不响应鼠标事件。
                    pointerEvents: "none",

                    width: position.width,
                    height: position.height,
                    zIndex: 12,
                    borderRadius: 4,
                    boxSizing: 'border-box',
                }}
            />

            <div
                style={{
                    position: "absolute",
                    left: position.labelLeft,
                    top: position.labelTop,
                    fontSize: "14px",
                    zIndex: 13,
                    display: (!position.width || position.width < 10) ? "none" : "inline",
                    transform: 'translate(-100%, -100%)',
                }}
            >
                <div
                    style={{
                        padding: '0 8px',
                        backgroundColor: 'blue',
                        borderRadius: 4,
                        color: '#fff',
                        cursor: "pointer",
                        whiteSpace: 'nowrap',
                    }}
                >
                    {curComponent?.desc}
                </div>
            </div>
        </>
    ), el)
}

export default HoverMask
