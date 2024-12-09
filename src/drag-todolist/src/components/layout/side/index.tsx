import React from 'react'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import {Menu} from 'antd'
import type { MenuProps } from 'antd';
import {useNavigate, useParams, useLocation, useMatch} from 'react-router-dom'
import routerConfig, {RouterConfigItemProps} from '../../router'

import styles from './index.module.scss'


type MenuItem = Required<MenuProps>['items'][number];

const getItem = (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem => {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}


interface SideProps {
    [key: string]: any
}

export const Side: React.FC<SideProps> = ({}) => {
    const navigate = useNavigate();
    const location = useLocation()
    const {pathname} = location ?? {}

    // 激活的父菜单
    const [openKeys, setOpenKeys] = React.useState<string[]>([])
    // 激活的菜单项
    const [selectedKeys, setSelectedKeys] = React.useState<string[]>([])
    // 菜单
    const [menuList, setMenuList] = React.useState<MenuItem[]>([])
    // 扁平化路由
    const routerFlat = React.useRef<string[]>([])

    React.useEffect(() => {
        const list = routerConfig
            .slice(0, routerConfig.length - 2)
            .filter((item: RouterConfigItemProps) => !item?.hideInMenu )
            .map((item: RouterConfigItemProps, index: number) => {
                if (index === 0) {
                    setOpenKeys([item?.key])
                }
                

                const newChildren = (item?.children ?? [])
                    .filter((group: RouterConfigItemProps) => !group?.hideInMenu)
                    .map((group: RouterConfigItemProps, indexI: number) => {
                        if (index === 0 && indexI === 0) {
                            setSelectedKeys([group?.key])
                        }

                        return getItem(
                            group?.label,
                            group?.key,
                            group?.icon,
                        )
                    })

                return getItem(
                    item?.label,
                    item?.key,
                    item?.icon,
                    newChildren
                )
            })

        setMenuList(list)

        const getRouterFlat = (list: RouterConfigItemProps[]) => {
            if (!list?.length) {
                return
            }
            
            list.forEach((item: RouterConfigItemProps) => {
                if (!routerFlat.current.includes(item?.key)) {
                    routerFlat.current.push(item?.key)

                    if (Array.isArray(item?.children)) {
                        getRouterFlat(item?.children)
                    }
                }
            })
        }
        getRouterFlat(routerConfig.slice(0, routerConfig.length - 2))
    }, [])

    React.useEffect(() => {
        const pathnameList = pathname?.slice(1)?.split('/')
        // 您的代码
        if (pathname === '/') {
            const newOpenKey = routerConfig?.[0]?.key as string
            const newSelectedKey = routerConfig?.[0]?.children?.[0]?.key as string
            setOpenKeys([newOpenKey])
            setSelectedKeys([newSelectedKey])

            navigate(`/${newOpenKey}/${newSelectedKey}`)
        }
        else if (routerFlat.current.includes(pathnameList?.[0]) || routerFlat.current.includes(pathnameList?.[1])) {
            if (pathnameList?.[0] !== openKeys[0]) {
                setOpenKeys([pathnameList?.[0]])
            }
    
            if (pathnameList?.[1] !== selectedKeys[0]) {
                setSelectedKeys([pathnameList?.[1]])
            }
        }
        // else if () {
            
        // }
        else {
            setOpenKeys([])
            setSelectedKeys([])
        }

        
    }, [pathname])


    // ********* 操作 ********
    const onMenuItemClick: MenuProps['onClick'] = (e: any) => {
        const {key} = e ?? {}
        setSelectedKeys(key)
        navigate(`${openKeys[0]}/${key}`)
    };

    const onMenuItemOpenChange: MenuProps['onOpenChange'] = (openKeys: string[]) => {
        const currentKey = openKeys.slice(-1)
        setOpenKeys(currentKey)

        const activeData = routerConfig.find((item: RouterConfigItemProps) => item?.key === currentKey[0])
        setSelectedKeys([activeData?.children?.[0]?.key ?? ''])
    };


    // ********* 渲染 ********
    return (
        <div className={styles.side}>
            <div  className={styles.logo}>
                <img
                    src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                    alt="logo"
                />

                <span>财务系统</span>
            </div>

            <Menu
                className={styles.menu}
                style={{
                    width: 200,
                    height: '100%'
                }}
                mode={'inline'}
                items={menuList}
                selectedKeys={selectedKeys}
                openKeys={openKeys}
                onOpenChange={onMenuItemOpenChange}
                onClick={onMenuItemClick}
            />
        </div>
    )
}