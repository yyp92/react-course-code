import React, { MouseEventHandler, useEffect, useState } from "react";
import { useComponentConfigStore } from "../../stores/component-config";
import { Component, useComponetsStore } from "../../stores/components"
import HoverMask from "../HoverMask";
import SelectedMask from "../SelectedMask";

export function EditArea() {
    const { components, curComponentId, setCurComponentId } = useComponetsStore()
    const { componentConfig } = useComponentConfigStore()
    const [hoverComponentId, setHoverComponentId] = useState<number>()


    // mouseover 的时候做下处理，找到元素的 data-component-id 设置为 hoverComponentId 的 state
    const handleMouseOver: MouseEventHandler = (e)  => {
        // composedPath 是从触发事件的元素到 html 根元素的路径
        const path = e.nativeEvent.composedPath()
    
        for (let i = 0; i < path.length; i += 1) {
            const ele = path[i] as HTMLElement
    
            // 这个 ele.dataset，它是一个 dom 的属性，包含所有 data-xx 的属性的值
            const componentId = ele.dataset?.componentId

            if (componentId) {
                setHoverComponentId(+componentId)
                return
            }
        }
    }  
    
    const handleMouseLeave=() => {
        setHoverComponentId(undefined)
    }

    const handleClick: MouseEventHandler = (e) => {
        const path = e.nativeEvent.composedPath()

        for (let i = 0; i < path.length; i += 1) {
            const ele = path[i] as HTMLElement

            const componentId = ele.dataset?.componentId
            if (componentId) {
                setCurComponentId(+componentId)

                return
            }
        }
    }


    // components 是一个树形结构，我们 render 的时候也要递归渲染
    function renderComponents(components: Component[]): React.ReactNode {
        return components.map((component: Component) => {
            // 从组件配置中拿到 name 对应的组件实例，然后用 React.cloneElement 来创建组件。
            const config = componentConfig?.[component.name]

            if (!config?.dev) {
                return null
            }

            return React.createElement(
                // 组件实例
                config.dev,

                // props 是配置里的 defaultProps 用 component.props 覆盖后的结果
                {
                    key: component.id,
                    id: component.id,
                    name: component.name,
                    styles: component.styles,
                    ...config.defaultProps,
                    ...component.props,
                },

                // React.cloneElement 的第三个参数是 children，递归调用 renderComponents 渲染就行
                renderComponents(component.children || [])
            )
        })
    }

    return (
        <div
            className="h-[100%] edit-area"
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            {renderComponents(components)}

            {/* hoverComponentId !== curComponentId ===> SelectedMask 不和 HoverMask 重合  */}
            {
                hoverComponentId && hoverComponentId !== curComponentId && (
                    <HoverMask
                        portalWrapperClassName="portal-wrapper"
                        containerClassName='edit-area'
                        componentId={hoverComponentId}
                    />
                )
            }

            {
                curComponentId && (
                    <SelectedMask
                        portalWrapperClassName='portal-wrapper'
                        containerClassName='edit-area'
                        componentId={curComponentId}
                    />
                )
            }

            <div className="portal-wrapper"></div>
        </div>
    )
}
