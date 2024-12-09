/**
 * * 项目里如何快速定位组件源码
 * 
 * 现在按住 option + 单击，就会直接打开它的对应的组件的源码。
 * 如果按住 option + 右键单击，可以看到它的所有父级组件，然后选择一个组件打开：
 * 
 * 
 * 原理：
 *  那如何打开 vscode 呢？
 *  只要在浏览器打开 vscode://file/文件绝对路径:行号:列号 的地址，就可以自动在 vscode 打开对应文件，并把光标定位到目标行列号。
 */
import React from 'react'
import { ColorPicker, Space } from 'antd';
import Aaa from './Aaa';

export const LocateCodeTest = () => {
    return (
        <div>
            <Space>
                <Space direction="vertical">
                    <ColorPicker defaultValue="#1677ff" size="small" />
                    <ColorPicker defaultValue="#1677ff" />
                    <ColorPicker defaultValue="#1677ff" size="large" />
                </Space>

                <Space direction="vertical">
                    <ColorPicker defaultValue="#1677ff" size="small" showText />
                    <ColorPicker defaultValue="#1677ff" showText />
                    <ColorPicker defaultValue="#1677ff" size="large" showText />
                </Space>
            </Space>

            <Aaa></Aaa>
        </div>
    )
}

