/**
 * 包装表单项用的组件
 */
import React, {
    ReactNode,
    CSSProperties,
    useState,
    useContext,
    ReactElement,
    useEffect,
    PropsWithChildren,
    ChangeEvent
} from 'react';
import classNames from 'classnames';
import Schema, { Rules } from 'async-validator';

import FormContext from './FormContext';

export interface ItemProps{
    className?: string;
    style?: CSSProperties;
    label?: ReactNode;
    name?: string;

    // 子节点的属性值
    // valuePropName 默认是 value，当 checkbox 等表单项就要取 checked 属性了
    valuePropName?: string;
    rules?: Array<Record<string, any>>;

    // children 类型为 ReactElement 而不是 ReactNode
    children?: ReactElement;
}

// getValueFromEvent 是根据表单项类型来获取 value
const getValueFromEvent = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e

    if (target.type === 'checkbox') {
        return target.checked
    }
    else if (target.type === 'radio') {
        return target.value
    }

    return target.value
}

const Item = (props: ItemProps) => {
    const { 
        className,
        label,
        children,
        style,
        name,
        valuePropName,
        rules,
    } = props;

    if (!name) {
        return children
    }

    // 创建两个 state，分别存储表单值 value 和 error
    const [value, setValue] = useState<string | number | boolean>();
    const [error, setError] = useState('');

    const {
        onValueChange,
        values,
        validateRegister
    } = useContext(FormContext)

    // 设置 value
    useEffect(() => {
        if (value !== values?.[name]) {
            setValue(values?.[name])
        }
    }, [values, values?.[name]])

    // 在 context 注册 name 对应的 validator 函数
    useEffect(() => {
        validateRegister?.(name, () => handleValidate(value))
    }, [value])



    // ********* 操作 *********
    const handleValidate = (value: any) => {
        let errorMsg = null;
        if (Array.isArray(rules) && rules.length) {
            const validator = new Schema({
                [name]: rules.map(rule => {
                    return {
                        type: 'string',
                        ...rule
                    }
                })
            });

            validator.validate({ [name]:value }, (errors) => {
                if (errors) {
                    if (errors?.length) {
                        setError(errors[0].message!);
                        errorMsg = errors[0].message;
                    }
                } else {
                    setError('');
                    errorMsg = null;
                }
            });

        }

        return errorMsg;
    }

    
    const propsName: Record<string, any> = {}
    if (valuePropName) {
        propsName[valuePropName] = value
    }
    else {
        propsName.value = value
    }



    // ********* 渲染 *********
    const childEle = React.Children.toArray(children).length > 1
        ? children
        // React.cloneElement 复制 chilren，额外传入 value、onChange 等参数
        : (
            React.cloneElement(children!, {
                ...propsName,
                
                // 设置 value，并且修改 context 里的 values 的值
                onChange: (e: ChangeEvent<HTMLInputElement>) => {
                    const value = getValueFromEvent(e)
                    setValue(value)
                    onValueChange?.(name, value)

                    // 校验 rules
                    handleValidate(value)
                }
            })
        )

    const cls = classNames('ant-form-item', className);

    // 组件渲染 label、children、error
    return (
        <div
            className={cls}
            style={style}
        >
            <div>
                {
                    label && <label>{label}</label>
                }
            </div>

            <div>
                {childEle}

                {error && <div style={{color: 'red'}}>{error}</div>}
            </div>
        </div>
    )
}

export default Item
