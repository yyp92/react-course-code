import {isFunction} from 'loadsh'

// 下载文件
export const downloadFile = (
    output: any,
    downloadFileName: string = '未命名文件',
    handleCancel: () => void = () => {}
) => {
    if (!output && isFunction(handleCancel)) {
        handleCancel()
        return
    }
  
    fetch(output, {responseType: 'blob'} as any)
        .then((res: any) => res?.blob?.())
        .then((res: any) => {
            if ((window?.navigator as any)?.msSaveBlob) {
                const suffix = output?.split?.('.')?.pop?.();
                downloadFileName = downloadFileName === '未命名文件'
                    ? downloadFileName + '.' + suffix
                    : downloadFileName;
        
                try {
                    (window?.navigator as any)?.msSaveBlob(res, downloadFileName);
                }
                catch(e) {
                    
                }
            }
            else {
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(res);
                link.download = downloadFileName;
                link.style.display = 'none';
                document.body.appendChild(link);
                link.click();
            }
        }).catch(e => {
            // console.error(e)
            // handleCancel()
        })
        .finally(() => {
            isFunction(handleCancel) && handleCancel()
        })
}