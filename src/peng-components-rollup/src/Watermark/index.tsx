/**
 * WaterMark
 * 
 * 整体思路: 用 canvas 把文字或者图片画出来，导出 base64 的 data url 设置为 div 的重复背景，这个 div 整个覆盖在需要加水印的元素上，设置 pointer-events 是 none
 */
import React, {
    useRef,
    PropsWithChildren,
    CSSProperties,
    FC,
    useCallback,
    useEffect
} from 'react'
import useWatermark from './useWatermark';

export interface WatermarkProps extends PropsWithChildren {
    style?: CSSProperties;
    className?: string;

    zIndex?: string | number;

    // * 水印的参数
    width?: number;
    height?: number;
    rotate?: number;
    // gap 是两个水印之间的空白距离
    gap?: [number, number];
    // offset 是水印相对于 container 容器的偏移量，也就是左上角的空白距离
    offset?: [number, number];

    image?: string;
    content?: string | string[];
    fontStyle?: {
        color?: string;
        fontFamily?: string;
        fontSize?: number | string;
        fontWeight?: number | string;
    };
    getContainer?: () => HTMLElement;
}

const WaterMark: FC<WatermarkProps>  = (props) => {
    const {
        className,
        style,
        zIndex,
        width,
        height,
        rotate,
        image,
        content,
        fontStyle,
        gap,
        offset,
        children
    } = props

    const containerRef = useRef<HTMLDivElement>(null)

    // getContainer 我们加了 useCallback 避免每次都变
    const getContainer = useCallback(() => {
        // getContainer 默认用 containerRef.current，或者传入的 props.getContainer
        return props.getContainer
            ? props.getContainer()
            : containerRef.current!;
    }, [containerRef.current, props.getContainer])

    const {generateWatermark} = useWatermark({
        zIndex,
        width,
        height,
        rotate,
        image,
        content,
        fontStyle,
        gap,
        offset,
        getContainer,
    })

    // 对象参数（fontSize）、数组参数（gap、offset）用 JSON.stringify 序列化后再放到 deps 数组里
    useEffect(() => {
        generateWatermark({
            zIndex,
            width,
            height,
            rotate,
            image,
            content,
            fontStyle,
            gap,
            offset,
            getContainer,
        });
    }, [
        zIndex,
        width,
        height,
        rotate,
        image,
        content,
        JSON.stringify(fontStyle),
        JSON.stringify(gap),
        JSON.stringify(offset),
        getContainer,
    ])


    // ********* 渲染 **********
    const renderContent = () => {
        if (!children) {
            return null
        }

        return (
            <div
                className={className}
                style={style}
                ref={containerRef}
            >
                {children}
            </div>
        )
    }

    return renderContent()
}

export default WaterMark