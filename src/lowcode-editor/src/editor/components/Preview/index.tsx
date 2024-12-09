import React, { useRef } from "react";
import { useComponentConfigStore } from "../../stores/component-config";
import { Component, useComponetsStore } from "../../stores/components"
import { message } from "antd";
import { GoToLinkConfig } from "../Setting/actions/GoToLink";
import { ShowMessageConfig } from "../Setting/actions/ShowMessage";
import { ActionConfig } from "../Setting/ActionModal";

export function Preview() {
    const { components } = useComponetsStore()
    const { componentConfig } = useComponentConfigStore()
    const componentRefs = useRef<Record<string, any>>({})

    function handleEvent(component: Component) {
        const props: Record<string, any> = {}

        componentConfig[component.name].events?.forEach((event: any) => {
            const { name } = event ?? {}
            const eventConfig = component.props[name] ?? {}

            if (eventConfig) {
                const {
                    actions = []
                } = eventConfig

                props[name] = (...args: any[]) => {
                    actions?.forEach((action: ActionConfig) => {
                        if (action.type === 'goToLink') {
                            window.location.href = action.url
                        }
                        else if (action.type === 'showMessage') {
                            const {
                                type,
                                text
                            } = action?.config ?? {}

                            if (type === 'success') {
                                message.success(text)
                            }
                            else if (type === 'error') {
                                message.error(text)
                            }
                        }
                        else if (action.type === 'customJS') {
                            /**
                             * new Function 可以传入任意个参数，最后一个是函数体，前面都会作为函数参数的名字。
                             * 然后调用的时候传入参数。
                             * 我们这里只传入了当前组件的 name、props 还有一个方法。
                             */
                            const func = new Function('context', 'args', action.code)

                            func({
                                name: component.name,
                                props: component.props,
                                showMessage(content: string) {
                                    message.success(content)
                                }
                            }, args)
                        }
                        else if (action.type === 'componentMethod') {
                            const component = componentRefs.current[action.config.componentId]

                            if (component) {
                                component[action.config.method]?.(...args)
                            }
                        }
                    })
                }
            }
        })

        return props
    }

    function renderComponents(components: Component[]): React.ReactNode {
        return components.map((component: Component) => {
            const config = componentConfig?.[component.name]

            if (!config?.prod) {
                return null
            }

            return React.createElement(
                config.prod,
                {
                    key: component.id,
                    id: component.id,
                    name: component.name,
                    styles: component.styles,
                    ref: (ref: Record<string, any>) => {
                        componentRefs.current[component.id] = ref
                    },
                    ...config.defaultProps,
                    ...component.props,
                    ...handleEvent(component)
                },
                renderComponents(component.children || [])
            )
        })
    }

    return (
        <div>
            {renderComponents(components)}
        </div>
    )
}
