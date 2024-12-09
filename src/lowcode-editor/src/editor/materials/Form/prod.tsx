import { Form as AntdForm, DatePicker, Input } from 'antd';
import React, { forwardRef, ForwardRefRenderFunction, useEffect, useImperativeHandle, useMemo } from 'react';
import { CommonComponentProps } from '../../interface';
import dayjs from 'dayjs';

export interface FormRef {
    submit: () => void
}

const Form: ForwardRefRenderFunction<FormRef, CommonComponentProps> = ({
    children,
    onFinish
}, ref) => {
    const [form] = AntdForm.useForm()

    // 通过 forwardRef + useImperativeHandle 暴露了 submit 方法，需要在 componentConfig 里注册下
    useImperativeHandle(ref, () => {
        return {
            submit: () => {
                form.submit()
            }
        }
    }, [form])

    const formItems = useMemo(() => {
        // 用 React.Children.map 拿到要渲染的 formItems 信息，然后遍历渲染表单项 From.Item，根据类型渲染不同表单
        return React.Children.map(children, (item: any) => {
            return {
                label: item.props?.label,
                name: item.props?.name,
                type: item.props?.type,
                id: item.props?.id,
                rules: item.props?.rules,
            }
        })
    }, [children])


    // onFinish 的时候，需要对 DatePicker 的 value 做下处理，因为值是 dayjs 对象，需要 format 一下拿到字符串值
    async function save(values: any) {
        Object.keys(values).forEach(key => {
            if (dayjs.isDayjs(values[key])) {
                values[key] = values[key].format('YYYY-MM-DD')
            }
        })

        onFinish(values)
    }

    return (
        <AntdForm
            name='form'
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 18 }}
            form={form}
            onFinish={save}
        >
            {
                formItems.map((item: any) => {
                    return (
                        <AntdForm.Item
                            key={item.name}
                            name={item.name}
                            label={item.label}
                            rules={
                                item.rules === 'required'
                                    ? [{
                                        required: true,
                                        message: '不能为空'
                                    }]
                                    : []
                            }
                        >
                            {item.type === 'input' && <Input />}

                            {item.type === 'date' && <DatePicker />}
                        </AntdForm.Item>
                    )
                })
            }
        </AntdForm>
    )
}

export default forwardRef(Form)
