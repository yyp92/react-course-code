import React from 'react'
import { AppstoreOutlined, MailOutlined, NodeCollapseOutlined, SettingOutlined } from '@ant-design/icons';
import {Menu} from 'antd'
import type { MenuProps } from 'antd';
import Home from '@/pages/home'
import { Page403 } from '@/components/403'
import { Page404 } from '@/components/404'
import Login from '@/components/login'

export interface RouterConfigItemProps {
    label: React.ReactNode,
    key: string,
    icon?: React.ReactNode,
    template?: React.ReactNode | null,
    hideInMenu?: boolean,
    children?: RouterConfigItemProps[],
}

const routerConfig: RouterConfigItemProps[] = [
    {
        label: '分组1',
        key: 'group1',
        icon: <AppstoreOutlined />,
        hideInMenu: false,
        children: [
            {
                label: '分组11',
                key: 'group11',
                icon: null,
                hideInMenu: false,
                template: <Home />
            },
            {
                label: '分组12',
                key: 'group12',
                icon: null,
                hideInMenu: false,
                template: <>group12</>
            },
            {
                label: '分组13',
                key: 'group13',
                icon: null,
                hideInMenu: false,
                template: <>group13</>
            },
        ]
    },

    {
        label: '分组2',
        key: 'group2',
        icon: <SettingOutlined />,
        hideInMenu: false,
        children: [
            {
                label: '分组21',
                key: 'group21',
                icon: null,
                hideInMenu: false,
                template: <>group21</>,
            },
            {
                label: '分组22',
                key: 'group22',
                icon: null,
                hideInMenu: false,
                template: <>group22</>,
            },
            {
                label: '分组23',
                key: 'group23',
                icon: null,
                hideInMenu: false,
                template: <>group23</>,
            },
        ]
    },

    
    // login
    {
        key: 'login',
        label: 'login',
        template: <Login />,
        icon: null,
        hideInMenu: true,
        children: [],
    },

    // 403
    {
        key: '403',
        label: '403',
        template: <Page403 />,
        icon: null,
        hideInMenu: true,
        children: [],
    },

    // 404
    {
        key: '*',
        label: '404',
        template: <Page404 />,
        icon: null,
        hideInMenu: true,
        children: [],
    },
]

export default routerConfig