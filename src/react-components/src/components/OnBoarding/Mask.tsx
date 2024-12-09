import React, { CSSProperties, useEffect, useState } from 'react';
import { getMaskStyle } from './getMaskStyle'

interface MaskProps {
    // 目标元素
    element: HTMLElement;

    // 遮罩层所在的容器
    container?: HTMLElement;
    renderMaskContent?: (wrapper: React.ReactNode) => React.ReactNode;

    // 解决popover 位置会闪一下
    // 因为 mask 的样式变化有个动画的过程，要等动画结束计算的 style 才准确 
    onAnimationStart?: () => void;
    onAnimationEnd?: () => void;
}

export const Mask: React.FC<MaskProps> = (props) => {
    const {
        element,
        renderMaskContent,
        container,
        onAnimationStart,
        onAnimationEnd
    } = props

    const [style, setStyle] = useState<CSSProperties>({})

    // 解决popover 位置会闪一下
    useEffect(() => {
        onAnimationStart?.()

        const timer = setTimeout(() => {
            onAnimationEnd?.()
        }, 200)
    
        return () => {
            window.clearTimeout(timer)
        }
    }, [element]);

    // 解决窗口改变大小的时候，没有重新计算 mask 样式
    useEffect(() => {
        const observer = new ResizeObserver(() => {
            const style = getMaskStyle(
                element,
                container || document.documentElement
            )
      
            setStyle(style)
        })

        observer.observe(container || document.documentElement)
    }, [])

    useEffect(() => {
        if (!element) {
            return
        }

        // * 目标元素滚动到可视区域
        // 设置 block、inline 为 center 是把元素中心滚动到可视区域中心
        element.scrollIntoView({
            // 垂直方向
            block: 'center',

            // 水平方向
            inline: 'center'
        })
    
        // 滚动完成后，就可以拿到元素的位置，计算 width、height、border-width 的样式了
        const style = getMaskStyle(
            element,
            container || document.documentElement
        )
    
        setStyle(style)
    }, [element, container])

    const getContent = () => {
        if (!renderMaskContent) {
            return null
        }

        return renderMaskContent(
            <div 
                className={'mask-content'}
                style={{
                    width: '100%',
                    height: '100%'
                }}
            />
        )
    }

    return (
        <div
            style={style}
            className='mask'
        >
            {getContent()}
        </div>
    )
}
