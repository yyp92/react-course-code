import { createContext } from 'react';

export interface FormContextProps {
    // 在 context 里保存 values 也就是 Store 的值
    values?: Record<string, any>;

    // 添加 setValues 来修改 values
    setValues?: (values: Record<string, any>) => void;

    // onValueChange 监听 value 变化
    onValueChange?: (key: string, value: any) => void;

    // validateRegister 用来注册表单项的校验规则，也就是 rules 指定的那些
    validateRegister?: (name:string, cb: Function) => void;
}

export default createContext<FormContextProps>({})
