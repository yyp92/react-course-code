import { useContext, useState, useEffect } from "react"
import { PlaygroundContext } from "../../../PlaygroundContext"
import { FileNameItem } from "./FileNameItem"

import styles from './index.module.scss'
import { APP_COMPONENT_FILE_NAME, ENTRY_FILE_NAME, IMPORT_MAP_FILE_NAME } from "@/ReactPlayground/files"

export default function FileNameList() {
    // 用 useContext 读取 context 中的 files，用来渲染 tab。
    const { 
        files, 
        removeFile, 
        addFile, 
        updateFileName, 
        selectedFileName ,
        setSelectedFileName
    } = useContext(PlaygroundContext)
    const readonlyFileNames = [
        ENTRY_FILE_NAME,
        IMPORT_MAP_FILE_NAME,
        APP_COMPONENT_FILE_NAME
    ]
    const [tabs, setTabs] = useState([''])
    const [creating, setCreating] = useState(false);

    useEffect(() => {
        setTabs(Object.keys(files))
    }, [files])

    const handleEditComplete = (name: string, prevName: string) => {
        updateFileName(prevName, name)
        setSelectedFileName(name)
        setCreating(false)
    }

    const addTab = () => {
        const newFileName = 'Comp' + Math.random().toString().slice(2, 6) + '.tsx'
        addFile(newFileName)
        setSelectedFileName(newFileName)
        setCreating(true)
    }

    const handleRemove = (name: string) => {
        removeFile(name)
        setSelectedFileName(ENTRY_FILE_NAME)
    }


    return (
        <div className={styles.tabs}>
            {
                tabs.map((item, index, arr) => (
                    <FileNameItem
                        key={item + index}  
                        value={item} 
                        creating={creating}
                        readonly={readonlyFileNames.includes(item)}
                        actived={selectedFileName === item} 
                        onClick={() => setSelectedFileName(item)}
                        onEditComplete={(name: string) => handleEditComplete(name, item)}
                        onRemove={() => handleRemove(item)}                        
                    >
                    </FileNameItem>
                ))
            }

            <div
                className={styles.add}
                onClick={addTab}
            >
                +
            </div>
        </div>
    )
}

