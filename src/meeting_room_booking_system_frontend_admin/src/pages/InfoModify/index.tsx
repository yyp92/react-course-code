import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { HeadPicUpload } from '../HeadPicUpload';
import {
    successCodeList,
    getUserInfo,
    updateUserInfoCaptcha,
    updateInfo
} from '../../utils/interfaces';

import './index.css';


export interface UserInfo {
    username: string;
    headPic: string;
    nickName: string;
    email: string;
    captcha: string;
}

const layout1 = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
}

export function InfoModify() {
    const [form] = useForm()
    const navigate = useNavigate()

    const onFinish = async (values: UserInfo) => {
        const res = await updateInfo(values)

        const {
            code,
            data,
            message: msg
        } = res.data

        if (successCodeList.includes(code)) {
            if (msg === 'success') {
                message.success('用户信息更新成功')
            }
            else {
                message.error(data)
            }
        }
        else {
            message.error(data || '系统繁忙，请稍后再试')
        }
    }

    const sendCaptcha = async function () {
        const res = await updateUserInfoCaptcha()
        const {
            code,
            data
        } = res.data

        if (successCodeList.includes(code)) {
            message.success(data);
        }
        else {
            message.error('系统繁忙，请稍后再试')
        }
    }

    useEffect(() => {
        async function query() {
            const res = await getUserInfo()
            const {
                code,
                data
            } = res.data

            if (successCodeList.includes(code)) {
                const {
                    headPic,
                    nickName,
                    email
                } = data ?? {}
                form.setFieldValue('headPic', headPic)
                form.setFieldValue('nickName', nickName)
                form.setFieldValue('email', email)
            }
        }

        query()
    }, [])

    return (
        <div id="updateInfo-container">
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
                    shouldUpdate
                >
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
                    <Input disabled/>
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
    )
}