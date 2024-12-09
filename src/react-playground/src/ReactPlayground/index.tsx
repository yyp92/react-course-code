import React, { useContext } from 'react'
import { Allotment } from "allotment"
import 'allotment/dist/style.css'
import Header from "./components/Header"
import CodeEditor from "./components/CodeEditor"
import Preview from "./components/Preview"
import { PlaygroundContext } from './PlaygroundContext'

import './index.scss'

const ReactPlayground = () => {
    const {
        theme,
        setTheme
    } = useContext(PlaygroundContext)

    return (
        <div
            style={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column'
            }}
            className={theme}
        >
            <Header />

            <div style={{flex: 1}}>
                {/* defaultSizes 指定 100、100 也就是按照 1:1 的比例展示 */}
                <Allotment defaultSizes={[100, 100]}>
                    {/* minSize 是最小宽度 */}
                    <Allotment.Pane minSize={500}>
                        <CodeEditor />
                    </Allotment.Pane>

                    <Allotment.Pane minSize={0}>
                        <Preview />
                    </Allotment.Pane>
                </Allotment>
            </div>
        </div>
    )
}

export default ReactPlayground