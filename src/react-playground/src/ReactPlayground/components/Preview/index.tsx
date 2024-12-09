import { useContext, useEffect, useState, useRef } from "react"
import { PlaygroundContext } from "../../PlaygroundContext"
import Editor from "../CodeEditor/Editor"
import CompilerWorker from './compiler.worker?worker'

/**
 * <!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Preview</title>
</head>
<body>
<script type="importmap"></script>
<script type="module" id="appSrc"></script>
<div id="root"></div>
</body>
</html>
 */
import iframeRaw from './iframe.html?raw'
import { IMPORT_MAP_FILE_NAME } from "../../files"
import { Message } from "../Message"
import { debounce } from "lodash-es"


interface MessageData {
    data: {
        type: string
        message: string
    }
}


export default function Preview() {
    const { files} = useContext(PlaygroundContext)
    const [compiledCode, setCompiledCode] = useState('')
    const [iframeUrl, setIframeUrl] = useState('')
    const [error, setError] = useState('')
    const compilerWorkerRef = useRef<Worker>()

    // 在 files 变化的时候，对 main.tsx 内容做编译，然后展示编译后的代码。
    // useEffect(() => {
    //     const res = compile(files)
    //     setCompiledCode(res)
    // }, [files])

    useEffect(() => {
        if (!compilerWorkerRef.current) {
            compilerWorkerRef.current = new CompilerWorker()

            compilerWorkerRef.current.addEventListener('message', ({data}) => {
                if (data.type === 'COMPILED_CODE') {
                    setCompiledCode(data.data)
                }
                else {
                    console.log('error', data);
                }

            })
        }
    }, [])

    useEffect(debounce(() => {
        compilerWorkerRef.current?.postMessage(files)
    }, 500), [files])

    useEffect(() => {
        setIframeUrl(getIframeUrl())
    }, [files[IMPORT_MAP_FILE_NAME].value, compiledCode])

    useEffect(() => {
        window.addEventListener('message', handleMessage)

        return () => {
            window.removeEventListener('message', handleMessage)
        }
    }, [])

    const handleMessage = (msg: MessageData) => {
        const {
            type,
            message
        } = msg.data

        if (type === 'ERROR') {
          setError(message)
        }
    }


    const getIframeUrl = () => {
        const res = iframeRaw
            .replace(
                '<script type="importmap"></script>', 
                `<script type="importmap">${
                    files[IMPORT_MAP_FILE_NAME].value
                }</script>`
            ).replace(
                '<script type="module" id="appSrc"></script>',
                `<script type="module" id="appSrc">${compiledCode}</script>`,
            )

        return URL.createObjectURL(new Blob([res], { type: 'text/html' }))
    }

    return (
        <div style={{height: '100%'}}>
            <iframe
                src={iframeUrl}
                style={{
                    width: '100%',
                    height: '100%',
                    padding: 0,
                    border: 'none',
                }}
            />

            <Message
                type='warn'
                content={error}
            />

            {/* <Editor file={{
                name: 'dist.js',
                value: compiledCode,
                language: 'javascript'
            }}/> */}
        </div>
    )
}
