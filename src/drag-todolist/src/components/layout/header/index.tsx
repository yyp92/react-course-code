import React from 'react'
import {Avatar} from 'antd'
import { UserOutlined } from '@ant-design/icons';

import styles from './index.module.scss'

interface HeaderProps {
    [key: string]: any
}

export const Header: React.FC<HeaderProps> = ({}) => {
    return (
        <div className={styles.header}>
            <div></div>

            <div className={styles.avatar}>
                <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />

                <div>{'xxx 已登录'}</div>
            </div>
        </div>
    )
}