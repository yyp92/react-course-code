import { FC, useState, DragEvent, PropsWithChildren } from 'react'
import classNames from 'classnames'

import styles from './index.module.scss'

interface DraggerProps extends PropsWithChildren{
    onFile: (files: FileList) => void;
}

const Dragger: FC<DraggerProps> = (props) => {
    const {
        onFile,
        children
    } = props

    const [dragOver, setDragOver] = useState<boolean>(false)

    const cs = classNames(
        styles['upload-dragger'],
        {
            [styles['is-dragover']]: dragOver
        }
    )

    const handleDrop = (e: DragEvent<HTMLElement>) => {
        e.preventDefault()
        setDragOver(false)
        onFile(e.dataTransfer.files)
    }
    
    const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
        e.preventDefault()
        setDragOver(over)
    }

    return (
        <div 
            className={cs}
            onDragOver={e => {
                handleDrag(e, true)
            }}
            onDragLeave={e => {
                handleDrag(e, false)
            }}
            onDrop={handleDrop}
        >
            {children}
        </div>
    )
}

export default Dragger
