import React from 'react'
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { IntlProvider, useIntl, defineMessages, FormattedDate, FormattedMessage, FormattedNumber} from 'react-intl'
import enUS from './en-US.json';
import zhCN from './zh-CN.json';

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

const messsages = defineMessages({
    username: {
        id: "username",
        defaultMessage: '用户名'
    },
    username1: {
        id: "username1",
        defaultMessage: '用户名'
    },
    password: {
        id: "password"
    },
    rememberMe: {
        id: 'rememberMe'
    },
    submit: {
        id: 'submit'
    },
    inputYourUsername: {
        id: 'inputYourUsername'
    },
    inputYourPassword: {
        id: 'inputYourPassword'
    }
})

// const messsages = defineMessages({
//     username: {
//         id: "username",
//         defaultMessage: '用户名',
//         description: '这是登录的用户名'
//     },
//     password: {
//         id: "password",
//         defaultMessage: '密码',
//         description: '这是登录的密码'
//     },
//     rememberMe: {
//         id: 'rememberMe',
//         defaultMessage: '记住我',
//         description: '登录页的记住我复选框'
//     },
//     submit: {
//         id: 'submit',
//         defaultMessage: '提交',
//         description: '登录页的提交按钮'
//     },
//     inputYourUsername: {
//         id: 'inputYourUsername',
//         defaultMessage: '请输入用户名！',
//         description: '登录页的用户名为空的提示'
//     },
//     inputYourPassword: {
//         id: 'inputYourPassword',
//         defaultMessage: '请输入密码！',
//         description: '登录页的密码为空的提示'
//     }
// })

const ReactIntl = () => {
    const intl = useIntl();

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };
    
    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

      
    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<FieldType>
                label={intl.formatMessage(messsages.username)}
                name="username"
                rules={[{ required: true, message: intl.formatMessage(messsages.inputYourUsername)  }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<FieldType>
                label={intl.formatMessage(messsages.password)}
                name="password"
                rules={[{ required: true, message: intl.formatMessage(messsages.inputYourUsername) }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item<FieldType>
                name="remember"
                valuePropName="checked"
                wrapperCol={{ offset: 8, span: 16 }}
            >
                <Checkbox>{intl.formatMessage(messsages.rememberMe)}</Checkbox>
            </Form.Item>


            {/* 但国际化可不只是替换下文案这么简单，日期、数字等的格式也都不一样 */}
            <div>
                日期：
                <div>{intl.formatDate(new Date(), { weekday: 'long' })}</div> 
                <div>{intl.formatDate(new Date(), { weekday: 'short' })}</div> 
                <div>{intl.formatDate(new Date(), { weekday: 'narrow' })}</div>
                <div>{intl.formatDate(new Date(), {  dateStyle: 'full' })}</div>
                <div>{intl.formatDate(new Date(), {  dateStyle: 'long' })}</div>
            </div>

            <div>
                相对时间：
                <div>{intl.formatRelativeTime(200, 'hour')}</div> 
                <div>{intl.formatRelativeTime(-10, 'minute')}</div> 
            </div>

            <div>
                数字：
                <div>
                    {
                        intl.formatNumber(200000, {
                            style: 'currency',
                            currency: intl.locale.includes('en') ? 'USD' : 'CNY'
                        })
                    }
                </div> 

                <div>
                    {
                        intl.formatNumber(10000, {
                            style: 'unit',
                            unit: 'meter'
                        })
                    }
                </div>
            </div>

            <div>
                组件版本：
                <div><FormattedDate value={new Date} dateStyle='full'></FormattedDate></div>
                <div><FormattedMessage id={messsages.rememberMe.id}></FormattedMessage></div>
                <div><FormattedNumber style='unit' unit='meter' value={2000}></FormattedNumber></div>
            </div>

            <div>
                message 支持占位符:
                <div>{intl.formatMessage(messsages.username, { name: '光'})}</div>
                <div><FormattedMessage id={messsages.username.id} values={{name: '东'}}></FormattedMessage></div>
            </div>

            <div>
                message 支持占位符:
                <div>{intl.formatMessage(messsages.username, { name: '光'})}</div>
                <div><FormattedMessage id={messsages.username.id} values={{name: '东'}}></FormattedMessage></div>
            </div>

            <div>
                国际化的消息还可以用一些 html 标签，也就是支持富文本:
                <div>{intl.formatMessage(messsages.username1, { name1: '光'})}</div>
            </div>



            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    {intl.formatMessage(messsages.submit)}
                </Button>
            </Form.Item>
        </Form>
    )
}

const messages: Record<string, any> = {
    'en-US': enUS,
    'zh-CN': zhCN
}
const locale = navigator.language;
// const locale = 'zh-CN';
  
export const ReactIntlTest = () => {
    return (
        <IntlProvider
            messages={messages[locale]}
            locale={locale}
            defaultLocale="zh_CN"
            defaultRichTextElements={
                {
                    bbb: (str) => <b>{str}</b>,
                    strong: (str) => <strong>{str}</strong>
                }
            }
        >
            <ReactIntl />
        </IntlProvider>
    )
}
