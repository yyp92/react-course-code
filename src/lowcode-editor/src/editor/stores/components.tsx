import { CSSProperties } from 'react';
import { create, StateCreator } from 'zustand';
// 数据持久化
import { persist } from 'zustand/middleware';

// 定义了每个 Component 节点的类型，有 id、name、props 属性，然后通过 chiildren、parentId 关联父子节点。
export interface Component {
    id: number;
    name: string;
    props: any;
    styles?: CSSProperties
    desc: string;
    children?: Component[];
    parentId?: number;
}

interface State {
    components: Component[]
    mode: 'edit' | 'preview'
    curComponentId?: number | null
    curComponent: Component | null
}

// 定义了 add、delete、update 的增删改方法，用来修改 components 组件树
interface Action {
    addComponent: (component: Component, parentId?: number) => void
    deleteComponent: (componentId: number) => void
    updateComponentStyles: (componentId: number, styles: CSSProperties, replace?: boolean) => void
    updateComponentProps: (componentId: number, props: any) => void
    setCurComponentId: (curComponentId?: number | null) => void
    setMode: (mode: State['mode']) => void;
}

const creator: StateCreator<State & Action> = (set, get) => ({
    components: [
        {
            id: 1,
            name: 'Page',
            props: {},
            desc: '页面',
        }
    ],
    curComponentId: null,
    curComponent: null,
    mode: 'edit',
    setMode: (mode) => set({mode}),
    setCurComponentId: (componentId) => set((state) => ({
        curComponentId: componentId,
        curComponent: getComponentById(componentId!, state.components),
    })),

    addComponent: (component, parentId) => set((state) => {
        // 新增会传入 parentId，在哪个节点下新增
        if (parentId) {
            const parentComponent = getComponentById(
                parentId,
                state.components
            )

            // 查找到 parent 之后，在 children 里添加一个 component，并把 parentId 指向这个 parent
            if (parentComponent) {
                if (parentComponent.children) {
                    parentComponent.children.push(component)
                }
                else {
                    parentComponent.children = [component]
                }
            }

            component.parentId = parentId

            return {
                components: [...state.components]
            }
        }

        // 没有 parentId 就直接放在 components 下
        return {
            components: [
                ...state.components,
                component
            ]
        }
    }),

    // * 删除则是找到这个节点的 parent，在 parent.children 里删除当前节点
    deleteComponent: (componentId) => {
        if (!componentId) return

        const component = getComponentById(
            componentId,
            get().components
        )

        if (component?.parentId) {
            const parentComponent = getComponentById(
                component.parentId,
                get().components
            )

            if (parentComponent) {
                parentComponent.children = parentComponent?.children?.filter((item) => item.id !== +componentId)

                set({
                    components: [
                        ...get().components
                    ]
                })
            }
        }
    },

    updateComponentProps: (componentId, props) => set((state) => {
        const component = getComponentById(
            componentId,
            state.components
        )

        if (component) {
            component.props = {
                ...component.props,
                ...props
            }

            return {
                components: [
                    ...state.components
                ]
            }
        }

        return {
            components: [
                ...state.components
            ]
        }
    }),

    updateComponentStyles: (componentId, styles, replace) => set((state) => {
        const component = getComponentById(
            componentId,
            state.components
        )

        if (component) {
            component.styles = replace
            ? {...styles}
            : {
                ...component.styles,
                ...styles
            }
    
            return {
                components: [...state.components]
            }
        }

        return {
            components: [...state.components]
        }
    }),   
})

export const useComponetsStore = create<State & Action>()(persist(creator, {
    name: 'xxx'
}))


// * 这是一个树形结构，想要增删改都要先找到 parent 节点，我们实现了查找方法
export function getComponentById(
    id: number | null,
    components: Component[]
): Component | null {
    if (!id) {
        return null
    }

    // 如果节点 id 是查找的目标 id 就返回当前组件，否则遍历 children 递归查找
    for (const component of components) {
        if (component.id == id) {
            return component
        }

        if (component.children && component.children.length > 0) {
            const result = getComponentById(id, component.children)

            if (result !== null) {
                return result
            }
        }
    }

    return null
}
