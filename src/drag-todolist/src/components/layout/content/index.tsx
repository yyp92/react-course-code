import React from 'react'
import {Outlet} from 'react-router-dom'

import {Side} from '../side'
import {Header} from '../header'
import {Footer} from '../footer'

import styles from './index.module.scss'

interface ContentProps {
    [key: string]: any
}


export const Content: React.FC<ContentProps> = ({}) => {

    // ********** 渲染 **********

    return (
        <div className={styles.layoutContent}>
            <Side />

            <div className={styles.wraper}>
                <Header />

                <div className={styles.contentInner}>
                    <Outlet />
                </div>

                <Footer />
            </div>
        </div>
    )
    // return (
    //     <div className={styles.contentInner}>
    //         <Outlet />
    //     </div>
    // )
}