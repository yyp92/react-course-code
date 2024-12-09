/**
 * * Upload
 */
import { FC, useRef, ChangeEvent, PropsWithChildren, useState } from 'react'
import axios from 'axios'
import UploadList, {UploadFile} from './UploadList';
import Dragger from './Dragger';

import styles from './index.module.scss'


export interface UploadProps extends PropsWithChildren {
    // action 是上传的 url
    action: string;

    // headers 是携带的请求头
    headers?: Record<string, any>;

    // name 是文件的表单字段名
    name?: string;

    // data 是携带的数据
    data?: Record<string, any>;

    withCredentials?: boolean;

    // accept 是 input 接受的文件格式
    accept?: string;

    // multiple 是 input 可以多选
    multiple?: boolean;

    // beforeUpload 是上传之前的回调，如果返回 false 就不上传，也可以返回 promise，比如在服务端校验的时候，等 resolve 之后才会上传
    beforeUpload?: (file: File) => boolean | Promise<File>;

    // onProgress 是进度更新时的回调，可以拿到进度。
    onProgress?: (percentage: number, file: File) => void;

    // onSuccess 和 onError 是上传成功、失败时的回调。
    onSuccess?: (data: any, file: File) => void;
    onError?: (err: any, file: File) => void;

    // onChange 是上传状态改变时的回调。
    onChange?: (file: File) => void;

    // 删除文件
    onRemove?: (file: UploadFile) => void;

    drag?: boolean;
}

// mock 数据
// const fileList: UploadFile[] = [
//     {
//         uid: '11',
//         size: 111,
//         name: 'xxxx',
//         status: 'uploading',
//         percent: 50
//     },
//     {
//         uid: '22',
//         size: 111,
//         name: 'yyy',
//         status: 'success',
//         percent: 50
//     },
//     {
//         uid: '33',
//         size: 111,
//         name: 'zzz',
//         status: 'error',
//         percent: 50
//     },
// ]

const Upload: FC<UploadProps> = (props) => {
    const {
        action,
        name,
        headers,
        data,
        withCredentials,
        accept,
        multiple,
        children,
        beforeUpload,
        onProgress,
        onSuccess,
        onError,
        onChange,
        onRemove,
        drag
    } = props

    const fileInput = useRef<HTMLInputElement>(null);
    // 文件列表
    const [fileList, setFileList] = useState<Array<UploadFile>>([]);


    // ********* 操作 *********
    const updateFileList = (
        updateFile: UploadFile,
        updateObj: Partial<UploadFile>
    ) => {
        setFileList(prevList => {
            return prevList.map(file => {
                if (file.uid === updateFile.uid) {
                    return {
                        ...file,
                        ...updateObj
                    }
                }
                else {
                    return file
                }
            })
        })
    }

    const handleRemove = (file: UploadFile) => {
        setFileList((prevList) => {
            return prevList.filter(item => item.uid !== file.uid)
        })

        if (onRemove) {
          onRemove(file)
        }
    }

    const handleClick = () => {
        if (fileInput.current) {
            fileInput.current.click()
        }
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        // 拿到所有 files 依次上传
        const files = e.target.files
        if (!files) {
            return
        }
        uploadFiles(files)

        // file input 置空
        if (fileInput.current) {
            fileInput.current.value = ''
        }
    }

    const uploadFiles = (files: FileList) => {
        let postFiles = Array.from(files)

        postFiles.forEach(file => {
            if (!beforeUpload) {
                post(file)
            }
            else {
                const result = beforeUpload(file)

                if (result && result instanceof Promise) {
                    result.then(processedFile => {
                        post(processedFile)
                    })
                }
                else if (result !== false) {
                    post(file)
                }
            }
        })
    }

    const post = (file: File) => {
        let uploadFile: UploadFile = {
            uid: Date.now() + 'upload-file',
            status: 'ready',
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file
        }
        setFileList(prevList => {
            return [uploadFile, ...prevList]
        })

        // 携带 FormData 数据，包含 file 和其它 data 字段
        const formData = new FormData()

        formData.append(name || 'file', file)
        if (data) {
            Object.keys(data).forEach(key => {
                formData.append(key, data[key])
            })
        } 

        axios.post(
            action,
            formData,
            {
                headers: {
                    ...headers,
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials,
                onUploadProgress: (e) => {
                    let percentage = Math.round((e.loaded * 100) / e.total!) || 0

                    if (percentage < 100) {
                        updateFileList(
                            uploadFile,
                            { 
                                percent: percentage,
                                status: 'uploading'
                            }
                        )

                        if (onProgress) {
                            onProgress(percentage, file)
                        }
                    }
                }
            }
        )
            .then(resp => {
                updateFileList(
                    uploadFile,
                    {
                        status: 'success',
                        response: resp.data
                    }
                )

                onSuccess?.(resp.data, file)
                onChange?.(file)
            })
            .catch(err => {
                updateFileList(
                    uploadFile,
                    {
                        status: 'error',
                        error: err
                    }
                )

                onError?.(err, file)
                onChange?.(file)
            })
    }



    // ********* 渲染 *********
    return (
        <div className={styles['upload-component']}>
            <div 
                className={styles['upload-input']}
                onClick={handleClick}
            >
                {
                    drag 
                        ? (
                            <Dragger
                                onFile={(files) => {
                                    uploadFiles(files)
                                }}
                            >
                                {children}
                            </Dragger>
                        )
                        : children
                }

                <input
                    className={styles['upload-file-input']}
                    type="file"
                    ref={fileInput}
                    onChange={handleFileChange}
                    accept={accept}
                    multiple={multiple}
                />
            </div>

            <UploadList
                fileList={fileList}
                onRemove={handleRemove}
            />
        </div>
    )
}

export default Upload