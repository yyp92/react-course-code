/**
 * 管理 Message 列表的 hook
 */
import { useState } from 'react'
import { MessageProps, Position } from '.'

export type MessageList = {
    top: MessageProps[],
    bottom: MessageProps[]
}

const initialState = {
    top: [],
    bottom: []
}

let count = 1

/**
 * 生成一个新的 id
 */
export function getId(messageProps: MessageProps) {
    // 如果传入了 id 就直接用传入的
    if (messageProps.id) {
        return messageProps.id
    }

    // 否则返回递增的 id
    count += 1

    return count
}

/**
 * 遍历 top 和 bottom 数组，查找下有没有对应的 Message
 */
export function getMessagePosition(messageList: MessageList, id: number) {
    for (const [position, list] of Object.entries(messageList)) {
        if (list.find((item) => item.id === id)) {
            return position as Position
        }
    }
}

/**
 * 查找的方式就是先找到它在哪个数组里，然后返回对应数组中的下标
 */
export function findMessage(messageList: MessageList, id: number) {
    const position = getMessagePosition(messageList, id)
  
    const index = position
        ? messageList[position].findIndex((message) => message.id === id)
        : -1
  
    return {
        position,
        index,
    }
}

function useStore(defaultPosition: Position) {
    const [messageList, setMessageList] = useState<MessageList>({ ...initialState })

    return {
        messageList,

        // add 核心就是 setMessageList 添加一个元素
        add: (messageProps: MessageProps) => {
            const id = getId(messageProps)

            setMessageList((preState) => {
                // 先根据 id 查找有没有已有的 message，如果有就不添加，直接返回之前的
                if (messageProps?.id) {
                    const position = getMessagePosition(preState, messageProps.id)

                    if (position) {
                        return preState
                    }
                }

                // 否则，top 的在前面插入一个元素，bottom 的在后面插入一个元素
                const position = messageProps.position || defaultPosition
                const isTop = position.includes('top')
                const messages = isTop
                    ? [
                        {
                            ...messageProps,
                            id 
                        },
                        ...(preState[position] ?? [])
                    ]
                    : [
                        ...(preState[position] ?? []),
                        {
                            ...messageProps,
                            id
                        }
                    ]

                return {
                    ...preState,
                    [position]: messages,
                }
            })

            return id
        },

        // update 找到对应的 message 修改信息
        update: (id: number, messageProps: MessageProps) => {
            if (!id) {
                return
            }

            setMessageList((preState) => {
                const nextState = { ...preState }
                const { position, index } = findMessage(nextState, id)

                if (position && index !== -1) {
                    nextState[position][index] = {
                        ...nextState[position][index],
                        ...messageProps,
                    }
                }

                return nextState
            })
        },

        // remove 是找到对应的数组，从中删除这个元素
        remove: (id: number) => {
            setMessageList((prevState) => {
                const position = getMessagePosition(prevState, id)
    
                if (!position) {
                    return prevState
                }

                return {
                    ...prevState,
                    [position]: prevState[position].filter((notice) => notice.id !== id),
                }
            })
        },
        
        // clear 是重置数组
        clearAll: () => {
            setMessageList({ ...initialState })
        },
    }
}

export default useStore
