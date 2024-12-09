/**
 * Message
 */

import React, { CSSProperties, FC, forwardRef, ReactNode, useEffect, useImperativeHandle, useMemo } from "react"
import { createPortal } from "react-dom";
import {TransitionGroup, CSSTransition } from 'react-transition-group'
import useStore, { MessageList } from "./useStore"
import { useTimer } from "./useTimer";

// import './index.scss'

export type Position = 'top' | 'bottom'

export interface MessageProps {
    style?: CSSProperties;
    className?: string | string[];
    content: ReactNode;
    duration?: number;
    id?: number;
    position?: Position;
    onClose?: (...args: any) => void;
}

export interface MessageRef {
    add: (messageProps: MessageProps) => number;
    remove: (id: number) => void;
    update: (id: number, messageProps: MessageProps) => void;
    clearAll: () => void;
}

const MessageItem:FC<MessageProps> = (item) => {
    const {
        onMouseEnter,
        onMouseLeave
    } = useTimer({
        id: item.id!,
        duration: item.duration,
        remove: item.onClose!,
    })

    return (
        <div
            className="message-item"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {item.content}
        </div>
    )
}

export const MessageProvider = forwardRef<MessageRef, {}>((props, ref) => {
    const {
        messageList,
        add,
        update,
        remove,
        clearAll
    } = useStore('top')
    const positions = Object.keys(messageList) as Position[]

    // useEffect(() => {
    //     setInterval(() => {
    //         add({
    //             content: Math.random().toString().slice(2, 8)
    //         })
    //     }, 2000)
    // }, [])

    // 用 useImperative 的一个问题，它并不是立刻修改 ref，而是会在之后的某个时间来修改
    // useImperativeHandle(ref, () => {
    //     return {
    //         add,
    //         update,
    //         remove,
    //         clearAll
    //     }
    // }, [])

    if('current' in ref!) {
        ref.current = {
            add,
            update,
            remove,
            clearAll
        }
    }
    

    const messageWrapper =  (
        <div className="message-wrapper">
            {
                positions.map(direction => {
                    return (
                        <TransitionGroup
                            className={`message-wrapper-${direction}`}
                            key={direction}
                        >
                                {
                                    messageList[direction].map(item => {
                                        return (
                                            <CSSTransition
                                                key={item.id}
                                                timeout={1000}
                                                classNames='message'
                                            >
                                                <MessageItem
                                                    onClose={remove}
                                                    {...item}
                                                />
                                            </CSSTransition>
                                        )
                                    })
                                }
                        </TransitionGroup>
                    )
                })
            }
        </div>
    )

    // 用 createPortal 把 messageWrapper 渲染到它下面
    const el = useMemo(() => {
        const el = document.createElement('div')
        el.className = `wrapper`
        document.body.appendChild(el)

        return el
    }, [])

    return createPortal(messageWrapper, el)
})
