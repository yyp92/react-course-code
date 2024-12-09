import { strFromU8, strToU8, unzlibSync, zlibSync } from "fflate"

// 需要在浏览器里把多个文件打成 zip 包，这需要用到 jszip
import JSZip from "jszip"
// 代码下载，我们用 file-saver：
import {saveAs} from 'file-saver'

import { Files } from "./PlaygroundContext"


// 就是根据不同的后缀名返回 language
export const fileName2Language = (name: string) => {
    const suffix = name.split('.').pop() || ''

    if (['js', 'jsx'].includes(suffix)) return 'javascript'

    if (['ts', 'tsx'].includes(suffix)) return 'typescript'

    if (['json'].includes(suffix)) return 'json'

    if (['css'].includes(suffix)) return 'css'

    return 'javascript'
}

export function compress(data: string): string {
    // compress 方法里，我们先调用 fflate 包的 strToU8 把字符串转为字节数组，然后 zlibSync 压缩，之后 strFromU8 转为字符串。
    // 最后用 btoa 把这个 base64 编码的字符串转为 asc 码。
    const buffer = strToU8(data)
    const zipped = zlibSync(buffer, { level: 9 })
    const str = strFromU8(zipped, true)

    return btoa(str)
}

export function uncompress(base64: string): string {
    const binary = atob(base64)

    const buffer = strToU8(binary, true)
    const unzipped = unzlibSync(buffer)

    return strFromU8(unzipped)
}

export async function downloadFiles(files: Files) {
    const zip = new JSZip()

    Object.keys(files).forEach((name) => {
        zip.file(name, files[name].value)
    })

    const blob = await zip.generateAsync({ type: 'blob' })
    saveAs(blob, `code${Math.random().toString().slice(2, 8)}.zip`)
}


