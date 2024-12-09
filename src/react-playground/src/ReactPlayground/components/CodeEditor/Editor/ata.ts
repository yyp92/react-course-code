/**
 * ata 是 automatic type acquisition 自动类型获取。
 * 它可以传入源码，自动分析出需要的 ts 类型包，然后自动下载。
 */
import { setupTypeAcquisition } from '@typescript/ata'
import typescriprt from 'typescript'

export function createATA(onDownloadFile: (code: string, path: string) => void) {
    const ata = setupTypeAcquisition({
        projectName: 'my-ata',
        typescript: typescriprt,
        logger: console,
        delegate: {
            receivedFile: (code, path) => {
                console.log('自动下载的包', path);
                onDownloadFile(code, path);
            }
        },
    })

    return ata
}
