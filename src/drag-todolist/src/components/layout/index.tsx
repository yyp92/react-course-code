import React from 'react'
import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom'
import {ConfigProvider, Result} from 'antd'
import {Content} from './content'
import { Page403 } from '../403'
import { Page404 } from '../404'
import routerConfig, {RouterConfigItemProps} from '../router'

import {Side} from './side'
import {Header} from './header'
import {Footer} from './footer'

import styles from './index.module.scss'

interface LayoutProps {
    [key: string]: any
}

export const Layout: React.FC<LayoutProps> = ({}) => {
    const includesList = ['login', '403']

    // ********** 操作 **********


    // ********** 渲染 **********
    const renderRouterItem = () => {
        return routerConfig
            .filter((item: RouterConfigItemProps) => !includesList.includes(item?.key))
            .map((item: RouterConfigItemProps) => {
                if (item.key === '*') {
                    return <Route
                        path='*'
                        key={item.key}
                        element={item.template}
                    ></Route>
                }

                return (
                    <Route
                        path={item.key}
                        key={item.key}
                        // element={<Content />}
                    >
                        {
                            item?.children?.map((group: RouterConfigItemProps, index: number) => {
                                if (index === 0) {
                                    return (
                                        <Route
                                            index
                                            path={group.key}
                                            key={group.key}
                                            element={group?.template}
                                        />
                                    )
                                }

                                return (
                                    <Route
                                        key={group.key}
                                        path={group.key}
                                        element={group?.template}
                                    />
                                )
                            })
                        }
                    </Route>
                )
            })
    }

    const renderContent = () => {
        const list = routerConfig.filter((item: RouterConfigItemProps) => includesList.includes(item?.key))

        return (
            <Routes>
                <Route path="/" element={<Content />}>
                    {renderRouterItem()}
                </Route> 

                <Route path={list[0].key} element={list[0].template} />

                <Route path={list[1].key} element={list[1].template} />
            </Routes>
        )
    }

    return (
        <div className={styles.layout}>
            <ConfigProvider
                // 设置为 false 时，移除按钮中 2 个汉字之间的空格
                autoInsertSpaceInButton={false}

                // 主题
                theme={{
                    token: {
                        // Seed Token，影响范围大
                        colorPrimary: '#00b96b',
                        // colorPrimary: '#1677ff',
                        borderRadius: 4,
              
                        // 派生变量，影响范围小
                        // colorBgContainer: '#f6ffed',
                    },
                }}
            >
                <BrowserRouter>
                    {renderContent()}
                </BrowserRouter>
            </ConfigProvider>
        </div>
    )
}