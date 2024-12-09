import {useRef, useEffect, useState} from "react"
import classNames from "classnames"
import {useDrag } from 'react-dnd'
import {ListItem, useTodoListStore} from './store'


interface ItemProps {
    data: ListItem
}

function Item(props: ItemProps) {
    const {data} = props
    const updateItem = useTodoListStore(state => state.updateItem)
    const ref = useRef<HTMLDivElement>(null)

    // 用两个 state 分别保存 editing 状态和 input 内容
    const [editing, setEditing] = useState(false)
    const [editingContent, setEditingContent] = useState(data.content)

    const [{ dragging }, drag] = useDrag({
        type: 'list-item',
        item: {
            id: data.id
        },
        collect(monitor) {
            return {
                dragging: monitor.isDragging()
            }
        },
    })

    useEffect(() => {
        drag(ref)
    }, [])

    return (
        <div
            ref={ref}
            className={classNames(
                "h-100 border-2 border-black bg-blue-300 p-10",
                "flex justify-start items-center",
                "text-xl tracking-wide",
                dragging ? 'bg-white border-dashed' : ''
            )}

            // onDoubleClick 的时候显示 input，修改 editing 状态为 true
            onDoubleClick={() => {
                setEditing(true)
            }}
        >
            <input
                type="checkbox" 
                className="w-40 h-40 mr-10"
                checked={data.status === 'done' ? true : false}
                onChange={(e) => {
                    updateItem({
                        ...data,
                        status: e.target.checked ? 'done' : 'todo'
                    })
                }}
            />

            <p>
                {
                    editing
                    ? (
                        <input 
                            value={editingContent}
                            onChange={(e) => {
                                setEditingContent(e.target.value)
                            }}

                            // onBlur 的时候修改 editing 状态为 false
                            // 
                            onBlur={() => {
                                setEditing(false)

                                // 用 updateItem 更新状态
                                updateItem({
                                    ...data,
                                    content: editingContent
                                })
                            }}
                        />
                    )
                    : data.content 
                }
            </p>
        </div>
    )
}

export default Item