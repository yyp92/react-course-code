import { transform } from '@babel/standalone'
import { Files, File } from '../../PlaygroundContext'
import { ENTRY_FILE_NAME } from '../../files'
import { PluginObj } from '@babel/core'

// babel 编译之前，判断下文件内容有没有 import React，没有就 import 一下：
export const beforeTransformCode = (filename: string, code: string) => {
    let _code = code
    const regexReact = /import\s+React/g

    if ((filename.endsWith('.jsx') || filename.endsWith('.tsx')) && !regexReact.test(code)) {
        _code = `import React from 'react';\n${code}`
    }

    return _code
}


export const babelTransform = (filename: string, code: string, files: Files) => {
    let _code = beforeTransformCode(filename, code);
    let result = ''

    try {
        // 调用 babel 的 transform 方法进行编译。
        result = transform(
            _code,
            {
                // presets 指定 react 和 typescript，也就是对 jsx 和 ts 语法做处理。
                presets: ['react', 'typescript'],
                filename,
                plugins: [customResolver(files)],

                // retainLines 是编译后保持原有行列号不变。
                retainLines: true
            }
        ).code!
    }
    catch (e) {
        console.error('编译出错', e);
    }

    return result
}

const getModuleFile = (files: Files, modulePath: string) => {
    let moduleName = modulePath.split('./').pop() || ''

    if (!moduleName.includes('.')) {
        // 过滤下 files 里的 js、jsx、ts、tsx 文件，如果包含这个名字的模块，那就按照补全后的模块名来查找 file。
        const realModuleName = Object.keys(files)
            .filter(key => {
                return key.endsWith('.ts') 
                    || key.endsWith('.tsx') 
                    || key.endsWith('.js')
                    || key.endsWith('.jsx')
            })
            .find((key) => {
                return key.split('.').includes(moduleName)
            })

        if (realModuleName) {
            moduleName = realModuleName
        }
    }

    return files[moduleName]
}

// json 文件的处理比较简单，就是把 export 一下这个 json，然后作为 blob url 即可
const json2Js = (file: File) => {
    const js = `export default ${file.value}`

    return URL.createObjectURL(new Blob([js], { type: 'application/javascript' }))
}

//  css 文件，则是要通过 js 代码把它添加到 head 里的 style 标签里
const css2Js = (file: File) => {
    const randomId = new Date().getTime()
    const js = `
        (() => {
            const stylesheet = document.createElement('style')
            stylesheet.setAttribute('id', 'style_${randomId}_${file.name}')
            document.head.appendChild(stylesheet)

            const styles = document.createTextNode(\`${file.value}\`)
            stylesheet.innerHTML = ''
            stylesheet.appendChild(styles)
        })()
    `

    return URL.createObjectURL(new Blob([js], { type: 'application/javascript' }))
}

function customResolver(files: Files): PluginObj {
    return {
        visitor: {
            ImportDeclaration(path) {
                const modulePath = path.node.source.value

                if (modulePath.startsWith('.')) {
                    const file = getModuleFile(files, modulePath)

                    if (!file) {
                        return
                    }

                    if (file.name.endsWith('.css')) {
                        path.node.source.value = css2Js(file)
                    }
                    else if (file.name.endsWith('.json')) {
                        path.node.source.value = json2Js(file)
                    }
                    else {
                        path.node.source.value = URL.createObjectURL(
                            new Blob([babelTransform(file.name, file.value, files)], {
                                type: 'application/javascript',
                            })
                        )
                    }
                }
            }
        }
    }
}

export const compile = (files: Files) => {
    const main = files[ENTRY_FILE_NAME]

    return babelTransform(ENTRY_FILE_NAME, main.value, files)
}

// self.postMessage({
//     type: 'COMPILED_CODE',
//     data: 'xx'
// })

self.addEventListener('message', async ({ data }) => {
    try {
        self.postMessage({
            type: 'COMPILED_CODE',
            data: compile(data)
        })
    }
    catch (e) {
        self.postMessage({
            type: 'ERROR',
            error: e
        })
    }
})


