import {
    Button,
    Checkbox,
    Form,
    Input,
    message
} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import cookies from 'js-cookie'
import { login } from '../../utils/interfaces';
import './index.css';
import { useEffect } from 'react';

interface LoginUser {
    username: string;
    password: string;
}

const layout1 = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 }
}

const layout2 = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24 }
}


export function Login() {
    const navigate = useNavigate()

    useEffect(() => {
        const userInfo = cookies.get('userInfo');
        const accessToken = cookies.get('accessToken');
        const refreshToken = cookies.get('refreshToken');

        if (userInfo && accessToken && refreshToken) {
            localStorage.setItem('user_info', userInfo);
            localStorage.setItem('access_token', accessToken);
            localStorage.setItem('refresh_token', refreshToken);

            cookies.remove('userInfo');
            cookies.remove('accessToken');
            cookies.remove('refreshToken');
        }
    }, [])


    const onFinish = async (values: LoginUser) => {
        const res = await login(
            values.username,
            values.password
        )
        const {
            code,
            message: msg,
            data
        } = res.data

        if ([200, 201].includes(code)) {
            message.success('登录成功')

            const {
                accessToken,
                refreshToken,
                userInfo
            } = data
            
            localStorage.setItem('access_token', accessToken);
            localStorage.setItem('refresh_token', refreshToken);
            localStorage.setItem('user_info', JSON.stringify(userInfo));

            setTimeout(() => {
                navigate('/')
            }, 1000)
        }
        else {
            message.error(data || '系统繁忙，请稍后再试');
        }
    }
    
    // ********** 渲染 ********** 
    return (
        <div id="login-container">
            <h1>会议室预订系统</h1>

            <Form
                {...layout1}
                onFinish={onFinish}
                colon={false}
                autoComplete="off"
            >
                <Form.Item
                    label="用户名"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: '请输入用户名!' 
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[
                        { 
                            required: true,
                            message: '请输入密码!'
                        }
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    {...layout2}
                >
                    <div className='links'>
                        <Link to="/register">创建账号</Link>
                        <Link to="/update_password">忘记密码</Link>
                    </div>
                </Form.Item>

                <Form.Item
                    {...layout2}
                >
                    <div>
                        <a href="#" onClick={() => {
                            window.location.href = "http://localhost:3005/user/google";
                        }}>Google 账号登录</a>
                    </div>
                </Form.Item>


                <Form.Item
                    {...layout2}
                >
                    <Button
                        className='btn'
                        type="primary"
                        htmlType="submit"
                    >
                        登录
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}