import { useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";

import './index.css';


export function Index() {
    useEffect(() => {
        const userInfo = localStorage.getItem('user_info')

        if (!userInfo) {
            window.location.href = '/login'
        }
    }, [])

    return (
        <div id="index-container">
            <div className="header">
                <Link to="/" className="sys_name">
                    <h1>会议室预定系统-后台管理</h1>
                </Link>
                
                <Link to="/user/info_modify">
                    <UserOutlined className="icon"/>
                </Link>
            </div>

            <div className="body">
                <Outlet></Outlet>
            </div>
        </div>
    )
}