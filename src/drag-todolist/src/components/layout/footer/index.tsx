import React from 'react'

import styles from './index.module.scss'

interface FooterProps {
    [key: string]: any
}

export const Footer: React.FC<FooterProps> = ({}) => {
    return (
        <div className={styles.footer}>
            <div>财务系统注意事项</div>
        </div>
    )
}