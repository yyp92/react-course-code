import { Form, Input, InputNumber, Select } from 'antd';
import { CSSProperties, useEffect, useState } from 'react';
import { ComponentConfig, ComponentSetter, useComponentConfigStore } from '../../stores/component-config';
import { useComponetsStore } from '../../stores/components';
import CssEditor from './CssEditor';
import { debounce } from 'lodash-es';
import styleToObject from 'style-to-object';

export function ComponentStyle() {
    const [form] = Form.useForm()
    const [css, setCss] = useState<string>(`.comp{\n\n}`);

    const {
        curComponentId,
        curComponent,
        updateComponentStyles
     } = useComponetsStore()
    const {
        componentConfig
    } = useComponentConfigStore()

    useEffect(() => {
        form.resetFields()

        const data = form.getFieldsValue()

        form.setFieldsValue({
            ...data,
            ...curComponent?.styles
        })

        setCss(toCSSStr(curComponent?.styles!))
    }, [curComponent])

    function toCSSStr(css: Record<string, any>) {
        let str = `.comp {\n`

        for (let key in css) {
            let value = css[key]

            if (!value) {
                continue
            }

            if (['width', 'height'].includes(key) &&  !value.toString().endsWith('px')) {
                value += 'px'
            }
    
            str += `\t${key}: ${value};\n`
        }

        str += `}`

        return str
    }
    

    function renderFormElememt(setting: ComponentSetter) {
        const {
            type,
            options
        } = setting

        if (type === 'select') {
            return <Select options={options} />
        }
        else if (type === 'input') {
            return <Input />
        }
        else if (type === 'inputNumber') {
            return <InputNumber />
        }
    }

    function valueChange(changeValues: CSSProperties) {
        if (curComponentId) {
            updateComponentStyles(
                curComponentId,
                changeValues
            )
        }
    }

    const handleEditorChange = debounce((value) => {
        setCss(value)
    
        let css: Record<string, any> = {}
    
        try {
            // 去掉注释 /** */
            const cssStr = value.replace(/\/\*.*\*\//, '') 
                // 去掉 .comp {
                .replace(/(\.?[^{]+{)/, '') 
                // 去掉 }
                .replace('}', '')
    
            // 然后 parse 完之后是 font-size、border-color 这种，转为驼峰之后更新到 store。
            styleToObject(cssStr, (name, value) => {
                css[name.replace(/-\w/, (item) => item.toUpperCase().replace('-', ''))] = value
            })
    
            console.log(css)

            updateComponentStyles(curComponentId!, css, true)
        }
        catch(e) {}
    }, 500)
    

    if (!curComponentId || !curComponent) {
        return null
    }

    return (
        <Form
            form={form}
            onValuesChange={valueChange}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
        >
            {
                componentConfig[curComponent.name]?.stylesSetter?.map(setter => (
                    <Form.Item
                        key={setter.name}
                        name={setter.name}
                        label={setter.label}
                    >
                        {renderFormElememt(setter)}
                    </Form.Item>
                ))
            }

            <div className='h-[200px] border-[1px] border-[#ccc]'>
                <CssEditor
                    value={css}
                    onChange={handleEditorChange}
                />
            </div>
        </Form>
    )
}
