// @ts-ignore
import MonacoEditor, { OnMount, EditorProps  } from '@monaco-editor/react'
import { editor } from 'monaco-editor'
import {createATA} from './ata'

export interface EditorFile {
    name: string
    value: string
    language: string
}

interface Props {
    file: EditorFile
    onChange?: EditorProps['onChange'],
    options?: editor.IStandaloneEditorConstructionOptions
}

export default function Editor(props: Props) {
    const {
        file,
        onChange,
        options
    } = props

    // 改编辑器的 tsconfig
    const handleEditorMount: OnMount = (editor: any, monaco: any) => {
        // 添加快捷键的交互
        // 可以 cmd（windows 下是 ctrl） + j 的时候格式化代码
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
            editor.getAction('editor.action.formatDocument')?.run()
        })

        // 设置 ts 的默认 compilerOptions
        monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
            jsx: monaco.languages.typescript.JsxEmit.Preserve,
            esModuleInterop: true,
        })

        const ata = createATA((code, path) => {
            monaco.languages.typescript.typescriptDefaults.addExtraLib(code, `file://${path}`)
        })
        
        editor.onDidChangeModelContent(() => {
            ata(editor.getValue());
        });
        
        ata(editor.getValue());
    }
    
    return (
        <MonacoEditor
            height='100%'
            path={file.name}
            language={file.language}

            // onMount 也就是编辑器加载完的回调里
            onMount={handleEditorMount}

            onChange={onChange}
            value={file.value}
            options={
                {
                    fontSize: 14,
                    // scrollBeyondLastLine 是到了最后一行之后依然可以滚动一屏，关闭后就不会了
                    scrollBeyondLastLine: false,

                    // minimap 就是缩略图，关掉就没了
                    minimap: {
                      enabled: false,
                    },

                    // scrollbar 是设置横向纵向滚动条宽度的
                    scrollbar: {
                      verticalScrollbarSize: 6,
                      horizontalScrollbarSize: 6,
                    },
                    ...options
                }
            }
        />
    )
}
