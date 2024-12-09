import { Button, Form, Input, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    codeList,
    getUserInfo,
    updateUserInfoCaptcha,
    updateInfo
} from '../../utils/interfaces';
import { HeadPicUpload } from './HeadPicUpload';

import './index.css';

export interface UserInfo {
    headPic: string;
    nickName: string;
    email: string;
    captcha: string;
}

const layout1 = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
}

export function UpdateInfo() {
    const [form] = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        async function query() {
            const res = await getUserInfo();
            const {
                code,
                message: msg,
                data
            } = res.data;
    
            if (codeList.includes(code)) {
                const {
                    headPic,
                    nickName,
                    email
                } = data

                form.setFieldsValue({
                    headPic,
                    nickName,
                    email
                })
            }
        }

        query()
    }, [])


    const onFinish = async (values: UserInfo) => {
        const res = await updateInfo(values)
        const {
            code,
            message: msg,
            data
        } = res.data
    
        if (codeList.includes(code)) {
            const {
                message: msg,
                data
            } = res.data;

            if (msg === 'success') {
                message.success('用户信息更新成功');

                const userInfo = localStorage.getItem('user_info');
                if (userInfo) {
                    const info = JSON.parse(userInfo);
                    info.headPic = values.headPic;
                    info.nickName = values.nickName;

                    localStorage.setItem('user_info', JSON.stringify(info));
                }

            }
            else {
                message.error(data);
            }
        }
        else {
            message.error(data || '系统繁忙，请稍后再试');
        }
    }

    const sendCaptcha = async function () {
        const res = await updateUserInfoCaptcha()
        const {
            code,
            message: msg,
            data
        } = res.data

        if (codeList.includes(code)) {
            message.success(data);
        }
        else {
            message.error('系统繁忙，请稍后再试');
        }
    }


    return <div id="updateInfo-container">
        <Form
            form={form}
            {...layout1}
            onFinish={onFinish}
            colon={false}
            autoComplete="off"
        >
            <Form.Item
                label="头像"
                name="headPic"
                rules={[
                    {
                        required: true,
                        message: '请输入头像!'
                    },
                ]}
            >
                {/* <Input/> */}
                <HeadPicUpload></HeadPicUpload>
            </Form.Item>

            <Form.Item
                label="昵称"
                name="nickName"
                rules={[
                    {
                        required: true,
                        message: '请输入昵称!'
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="邮箱"
                name="email"
                rules={[
                    {
                        required: true,
                        message: '请输入邮箱!'
                    },
                    {
                        type: "email",
                        message: '请输入合法邮箱地址!'
                    }
                ]}
            >
                <Input disabled />
            </Form.Item>

            <div className='captcha-wrapper'>
                <Form.Item
                    label="验证码"
                    name="captcha"
                    rules={[
                        {
                            required: true,
                            message: '请输入验证码!'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Button
                    type="primary"
                    onClick={sendCaptcha}
                >发送验证码</Button>
            </div>

            <Form.Item
                {...layout1}
                label=" "
            >
                <Button
                    className='btn'
                    type="primary"
                    htmlType="submit"
                >
                    修改
                </Button>
            </Form.Item>
        </Form>
    </div>   
}