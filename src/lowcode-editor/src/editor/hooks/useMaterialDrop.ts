/**
 * * useDrop 代码
 */

import { useDrop } from "react-dnd"
import { useComponentConfigStore } from "../stores/component-config"
import { getComponentById, useComponetsStore } from "../stores/components"

export interface ItemType {
    type: string
    dragType?: 'move' | 'add',
    id: number
}

export function useMaterailDrop(
    accept: string[],
    id: number
) {
    const {
        addComponent,
        components,
        deleteComponent
    } = useComponetsStore()
    const { componentConfig } = useComponentConfigStore()

    const [{ canDrop }, drop] = useDrop(() => ({
        accept,
        drop: (item: ItemType, monitor) => {
            const didDrop = monitor.didDrop()
            if (didDrop) {
                return
            }

            // 在 useDrop 的时候判断下 dragTag，如果是 move，那就先 delete 再 add
            if (item.dragType === 'move') {
                const component = getComponentById(item.id, components)!

                deleteComponent(item.id)

                addComponent(component, id)
            }
            else {
                const config = componentConfig[item.type]

                addComponent({
                    id: new Date().getTime(),
                    name: item.type,
                    desc: config.desc,
                    props: config.defaultProps,
                    styles: {
                        // background: 'green'
                    }
                }, id)
            }
        },
        collect: (monitor) => ({
            canDrop: monitor.canDrop(),
        }),
    }))

    return {
        canDrop,
        drop
    }
}
