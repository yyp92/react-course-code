import {createUuid} from './createUuid'

export const base64ToBlob = (
    base64String: any,
    type: string, 
    fileName: string
) => {
    type = type || 'png'
    let base64Arr = [];

    try {
        base64Arr = base64String?.split?.(",");
    }
    catch (error) {
        base64String = `data:image/${type || "png"};base64,` + base64String;
    }

    base64Arr = base64String?.split(",");

    let mime = base64Arr?.[0]?.match(/:(.*?);/)?.[1] || `image/${type}`;
    // 去掉url的头，并转化为byte
    let bytes = window.atob(base64Arr[1]); 
    // 处理异常,将ascii码小于0的转换为大于0
    let ab = new window.ArrayBuffer(bytes.length); 
    // 生成视图（直接针对内存）：8位无符号整数，长度1个字节
    let ia = new window.Uint8Array(ab); 

    for (let i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
    }
    let dateTime = new Date();
    let name = createUuid();
    const blobObject: any = new window.Blob([ab], {
        type: mime,
    });

    //禁止改动
    blobObject.name = `${name}.${type}`; 

    return blobObject;
}