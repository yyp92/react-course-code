import React, { useState, useRef, useEffect, MouseEventHandler } from 'react'
import classnames from 'classnames'

import styles from './index.module.scss'
import { Popconfirm } from 'antd'

export interface FileNameItemProps {
    value: string
    actived: boolean
    creating: boolean
    readonly: boolean
    onClick: () => void
    onEditComplete: (name: string) => void
    onRemove: () => void
}

export const FileNameItem: React.FC<FileNameItemProps> = (props) => {
    const {
        value,
        actived = false,
        creating,
        readonly,
        onClick,
        onEditComplete,
        onRemove
    } = props

    const [name, setName] = useState(value)
    const [editing, setEditing] = useState(creating)
    const inputRef = useRef<HTMLInputElement>(null)

    // props.creating 为 true 的时候让 input 聚焦
    useEffect(() => {
        if (creating) {
            inputRef?.current?.focus()
        }
    }, [creating])

    const handleDoubleClick = () => {
        setEditing(true)

        setTimeout(() => {
            inputRef?.current?.focus()
        }, 0)
    }

    const hanldeInputBlur = () => {
        setEditing(false)
        onEditComplete(name)
    }

    return (
        <div
            className={classnames(styles['tab-item'], actived ? styles.actived : null)}
            onClick={onClick}
        >
            {
                editing
                    ? (
                        <input
                            ref={inputRef}
                            className={styles['tabs-item-input']}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onBlur={hanldeInputBlur}
                        />
                    )
                    : (
                        <>
                            <span onDoubleClick={!readonly ? handleDoubleClick : () => {}}>{name}</span>

                            {
                                !readonly
                                    ? (
                                        <Popconfirm
                                            title="确认删除该文件吗？"
                                            okText="确定"
                                            cancelText="取消"
                                            onConfirm={(e: any) => {
                                                e?.stopPropagation()
                                                onRemove()
                                            }}
                                        >
                                            <span style={{ marginLeft: 5, display: 'flex' }}>
                                                <svg width='12' height='12' viewBox='0 0 24 24'>
                                                    <line stroke='#999' x1='18' y1='6' x2='6' y2='18'></line>
                                                    <line stroke='#999' x1='6' y1='6' x2='18' y2='18'></line>
                                                </svg>
                                            </span>
                                        </Popconfirm>
                                    )
                                    : null
                            }
                        </>
                    )
            }
        </div>
    )
}
