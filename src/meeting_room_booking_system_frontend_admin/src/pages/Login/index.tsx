import { Button, Checkbox, Form, Input, message } from 'antd'
import { useNavigate } from 'react-router-dom';
import {
    successCodeList,
    login
} from '../../utils/interfaces';

import './index.css';

interface LoginUser {
    username: string;
    password: string;
}

const layout1 = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 }
}

export function Login() {
    const navigate = useNavigate()

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

        if (successCodeList.includes(code)) {
            message.success('登录成功')

            const {
                accessToken,
                refreshToken,
                userInfo
            } = data ?? {}

            localStorage.setItem('access_token', accessToken)
            localStorage.setItem('refresh_token', refreshToken)
            localStorage.setItem('user_info', JSON.stringify(userInfo))

            setTimeout(() => {
                navigate('/')
            }, 1000)
        }
        else {
            message.error(data || '系统繁忙，请稍后再试');
        }
    }


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

                <Form.Item label=" ">
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
