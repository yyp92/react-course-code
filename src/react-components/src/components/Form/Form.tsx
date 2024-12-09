/**
 * Form
 * 
 * 原理：
 *  每个表单项都有 value 和 onChange 参数，我们只要在 Item 组件里给 children 传入这俩参数，把值收集到全局的 Store 里。
 *  这样在 Store 里就存储了所有表单项的值，在 submit 时就可以取出来传入 onFinish 回调。
 *  并且，还可以用 async-validator 对表单项做校验，如果有错误，就把错误收集起来传入 onFinishFailed 回调。
 *  用 Context。
 *  在 Form 里保存 Store 到 Context，然后在 Item 里取出 Context 的 Store 来，同步表单值到 Store。
 */
import React, {
    CSSProperties,
    useState,
    useRef,
    FormEvent,
    ReactNode,
    useImperativeHandle,
    forwardRef
} from 'react';
import classNames from 'classnames';
import FormContext from './FormContext';

// Record<string,any> 是 ts 的类型，任意的对象的意思
export interface FormProps extends React.HTMLAttributes<HTMLFormElement> {
    className?: string;
    style?: CSSProperties;

    // 点击提交的回调 onFinish
    onFinish?: (values: Record<string, any>) => void;

    // 点击提交有错误时的回调 onFinishFailed
    onFinishFailed?: (errors: Record<string, any>) => void;

    // 初始值 initialValues
    initialValues?: Record<string, any>;
    children?: ReactNode
}

export interface FormRefApi {
    getFieldsValue: () => Record<string, any>,
    setFieldsValue: (values: Record<string, any>) => void,
}

const Form = forwardRef<FormRefApi, FormProps>((props: FormProps, ref) => {
    const { 
        className, 
        style,
        children, 
        onFinish,
        onFinishFailed,
        initialValues,
        ...others 
    } = props

    // 用 useState 保存 values
    const [values, setValues] = useState<Record<string, any>>(initialValues || {})

    // 用 useRef 保存 errors 和 validator
    const validatorMap = useRef(new Map<string, Function>())
    const errors = useRef<Record<string, any>>({})

    useImperativeHandle(ref, () => {
        return {
            getFieldsValue() {
                return values
            },

            setFieldsValue(fieldValues) {
                setValues({
                    ...values,
                    ...fieldValues
                })
            }
        }
    }, [])


    // ********** 操作 *********
    const onValueChange = (key: string, value: any) => {
        values[key] = value
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        // 调用所有 validator 对值做校验
        for (let [key, callbackFunc] of validatorMap.current) {
            if (typeof callbackFunc === 'function') {
                errors.current[key] = callbackFunc();
            }
        }

        // .filter(Boolean) 就是去除 undefined/null/空字符串
        const errorList = Object.keys(errors.current).map(key => {
                return errors.current[key]
        }).filter(Boolean)

        if (errorList.length) {
            onFinishFailed?.(errors.current)
        }
        else {
            onFinish?.(values)
        }
    }

    const handleValidateRegister = (name: string, cb: Function) => {
        validatorMap.current.set(name, cb);
    }

    const cls = classNames('ant-form', className);



    // ********** 渲染 *********
    return (
        <FormContext.Provider
            value={{
                onValueChange,
                values,
                setValues: (v) => setValues(v),
                validateRegister: handleValidateRegister
            }}
        >
            <form
                {...others}
                className={cls}
                style={style}
                onSubmit={handleSubmit}
            >
                {children}
            </form>
        </FormContext.Provider>
    );
})

export default Form
