/**
 * 文件列表
 */
import { FC } from 'react'
import c from 'classnames'
import { Progress } from 'antd';
import {
    CheckOutlined,
    CloseOutlined,
    DeleteOutlined,
    FileOutlined,
    LoadingOutlined
} from '@ant-design/icons';
import styles from './index.module.scss'

export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    status?: 'ready' | 'uploading' | 'success' | 'error';
    percent?: number;
    raw?: File;
    response?: any;
    error?: any;
}

interface UploadListProps {
    fileList: UploadFile[];
    onRemove: (file: UploadFile) => void;
}

const UploadList: FC<UploadListProps> = (props) => {
    const {
        fileList,
        onRemove,
    } = props;

    return (
        <ul className={styles['upload-list']}>
            {
                fileList.map(item => {
                    return (
                        <li
                            className={c(
                                styles['upload-list-item'],
                                styles[`upload-list-item-${item.status}`]
                            )}
                            key={item.uid}
                        >
                            {/* 文件名 */}
                            <span className={styles['file-name']}>
                                {
                                    (item.status === 'uploading' || item.status === 'ready') && 
                                        <LoadingOutlined />
                                }

                                {
                                    item.status === 'success' && 
                                        <CheckOutlined />
                                }

                                {
                                    item.status === 'error' && 
                                        <CloseOutlined />
                                }
                                {item.name}
                            </span>

                            {/* 删除按钮 */}
                            <span className={styles['file-actions']}>
                                <DeleteOutlined
                                    onClick={() => {
                                        onRemove(item)
                                    }}
                                />
                            </span>

                            {/* 进度 */}
                            {
                                item.status === 'uploading' && 
                                    <Progress percent={item.percent || 0}/>
                            }
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default UploadList