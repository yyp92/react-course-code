/**
 * 调色板
 */
import { CSSProperties, useState } from "react"
import cs from 'classnames'
import { ColorType } from "./interface";
import { Color } from "./color";
import Palette from "./Palette";
import { useControllableValue } from "ahooks";
import './index.scss'

export interface ColorPickerProps {
    className?: string;
    style?: CSSProperties;
    value?: ColorType;
    defaultValue?: ColorType;
    onChange?: (color: Color) => void;
}

function ColorPickerPanel(props: ColorPickerProps) {
    const {
        className,
        style,
        value,
        onChange
    } = props

    const classNames = cs("color-picker", className)

    const [colorValue, setColorValue] = useControllableValue<Color>(props)

    const onPaletteColorChange = (color: Color) => {
        setColorValue(color)
        onChange?.(color)
    }

    return (
        <div
            className={classNames}
            style={style}
        >
            <Palette
                color={colorValue}
                onChange={onPaletteColorChange}
            ></Palette>

            {/* 添加一个颜色块 */}
            <div
                style={{
                    width: 20,
                    height: 20,
                    // marginTop: '10px',
                    background: colorValue.toRgbString()
                }}
            ></div>
        </div>
    )
}

export default ColorPickerPanel

