/**
 * * 绘制水印
 */
import { useEffect, useState, useRef } from 'react';
import { WatermarkProps } from '.';
import { merge } from 'lodash-es';

// 参数就是 WatermarkProps 去了 style、className、children
export type WatermarkOptions = Omit<WatermarkProps, 'className' | 'style' | 'children'>; 


export function isNumber(obj: any): obj is number {
    return Object.prototype.toString.call(obj) === '[object Number]' && obj === obj
}
  
// toNumber 会把第一个参数转为 number，如果不是数字的话就返回第二个参数的默认值
const toNumber = (
    value?: string | number,
    defaultValue?: number
) => {
    if (value === undefined) {
        return defaultValue
    }

    if (isNumber(value)) {
        return value
    }

    const numberVal = parseFloat(value)
    return isNumber(numberVal)
        ? numberVal
        : defaultValue
}
 
// 默认 options
const defaultOptions = {
    rotate: -20,
    zIndex: 1,
    width: 100,
    gap: [100, 100],
    fontStyle: {
        fontSize: '16px',
        color: 'rgba(0, 0, 0, 0.15)',
        fontFamily: 'sans-serif',
        fontWeight: 'normal',
    },
    getContainer: () => document.body,
}
  
const getMergedOptions = (o: Partial<WatermarkOptions>) => {
    const options = o || {}
  
    const mergedOptions = {
        ...options,
        rotate: options.rotate || defaultOptions.rotate,
        zIndex: options.zIndex || defaultOptions.zIndex,

        // fontStyle 是默认 fontStyle 和传入的 fontStyle 的合并
        fontStyle: {
            ...defaultOptions.fontStyle,
            ...options.fontStyle
        },
        // width 的默认值，如果是图片就用默认 width，否则 undefined，因为后面文字宽度是动态算的
        width: toNumber(
            options.width,
            options.image
                ? defaultOptions.width
                : undefined
        ),
        height: toNumber(options.height, undefined)!,
        getContainer: options.getContainer!,
        gap: [
            toNumber(
                options.gap?.[0],
                defaultOptions.gap[0]
            ),
            toNumber(
                options.gap?.[1] || options.gap?.[0],
                defaultOptions.gap[1]
            ),
        ],
    } as Required<WatermarkOptions>
  
    const mergedOffsetX = toNumber(mergedOptions.offset?.[0], 0)!;
    const mergedOffsetY = toNumber(
        mergedOptions.offset?.[1] || mergedOptions.offset?.[0],
        0
    )!;
    mergedOptions.offset = [mergedOffsetX, mergedOffsetY]
  
    return mergedOptions
}

// 测量文字尺寸
const measureTextSize = (
    ctx: CanvasRenderingContext2D,
    content: string[],
    rotate: number
) => {
    let width = 0
    let height = 0
    const lineSize: Array<{width: number, height: number}> = []
  
    content.forEach((item) => {
        // ctx.measureText 是用来测量文字尺寸的
        const {
            width: textWidth,
            // fontBoudingAscent 是 baseline 到顶部的距离
            fontBoundingBoxAscent,
            // fontBoundingBoxDescent 是 baseline 到底部的距离
            fontBoundingBoxDescent,
        } = ctx.measureText(item)
    
        // 加起来就是行高
        const textHeight = fontBoundingBoxAscent + fontBoundingBoxDescent
    
        if (textWidth > width) {
            width = textWidth
        }
    
        height += textHeight
        lineSize.push({
            height: textHeight,
            width: textWidth
        })
    })
  
    const angle = (rotate * Math.PI) / 180
  
    // 如果有旋转的话，要用 sin、cos 函数算出旋转后的宽高
    return {
        originWidth: width,
        originHeight: height,
        width: Math.ceil(Math.abs(Math.sin(angle) * height) + Math.abs(Math.cos(angle) * width)),
        height: Math.ceil(Math.abs(Math.sin(angle) * width) + Math.abs(height * Math.cos(angle))),
        lineSize,
    }
}

const getCanvasData = async (
    options: Required<WatermarkOptions>,
): Promise<{
    width: number;
    height: number;
    base64Url: string
}> => {
    const {
        rotate,
        image,
        content,
        fontStyle,
        gap
    } = options

    // 创建个 canvas 元素，拿到画图用的 context
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!
    const ratio = window.devicePixelRatio

    // 用来设置 canvas 的宽高、rotate、scale
    const configCanvas = (
        size: {
            width: number,
            height: number
        }
    ) => {
        // 宽高同样是 gap + width、gap + height
        const canvasWidth = gap[0] + size.width
        const canvasHeight = gap[1] + size.height

        // 因为不同屏幕的设备像素比不一样，也就是 1px 对应的物理像素不一样，所以要在单位后面乘以 devicePixelRatio
        canvas.setAttribute('width', `${canvasWidth * ratio}px`)
        canvas.setAttribute('height', `${canvasHeight * ratio}px`)
        canvas.style.width = `${canvasWidth}px`
        canvas.style.height = `${canvasHeight}px`

        // 用 tanslate 移动中心点到 宽高的一半的位置再 scale、rotate
        ctx.translate(
            (canvasWidth * ratio) / 2,
            (canvasHeight * ratio) / 2
        )
        // 设置了 scale 放大 devicePixelRatio 倍，这样接下来绘制尺寸就不用乘以设备像素比了
        ctx.scale(ratio, ratio)

        const rotateAngle = (rotate * Math.PI) / 180
        ctx.rotate(rotateAngle)
    }

    const drawText = () => {
        const {
            fontSize,
            color,
            fontWeight,
            fontFamily
        } = fontStyle
        // fontSize 转为 number
        const realFontSize = toNumber(fontSize, 0) || fontStyle.fontSize

        ctx.font = `${fontWeight} ${realFontSize}px ${fontFamily}`
        const measureSize = measureTextSize(
            ctx,
            [...content],
            rotate
        )

        const width = options.width || measureSize.width
        const height = options.height || measureSize.height

        configCanvas({width, height})

        ctx.fillStyle = color!;
        ctx.font = `${fontWeight} ${realFontSize}px ${fontFamily}`;
        // 顶部对齐
        ctx.textBaseline = 'top';

        [...content].forEach((item, index) => {
            // 在 measureTextSize 里计算出每一行的 lineSize，也就是行高、行宽。
            const {
                height: lineHeight,
                width: lineWidth
            } = measureSize.lineSize[index]

            // 在行宽的一半的地方开始绘制文字，行内每个文字的位置是行高的一半 * index
            const xStartPoint = -lineWidth / 2
            const yStartPoint = -(options.height || measureSize.originHeight) / 2 + lineHeight * index

            ctx.fillText(
                item,
                xStartPoint,
                yStartPoint,
                options.width || measureSize.originWidth
            );
        });

        return Promise.resolve({
            base64Url: canvas.toDataURL(),
            height,
            width
        })
    }

    const drawImage = () => {
        return new Promise<{
            width: number;
            height: number;
            base64Url: string
        }>((resolve) => {
            // new Image 指定 src 加载图片
            const img = new Image()

            // * 安全相关的
            //  crssOrign 设置 anonymous 是跨域的时候不携带 cookie
            img.crossOrigin = 'anonymous'
            // refererPolicy 设置 no-referrer 是不携带 referer
            img.referrerPolicy = 'no-referrer'
        
            img.src = image
            img.onload = () => {
                let {
                    width,
                    height
                } = options

                // 对于没有设置 width 或 height 的时候，根据图片宽高比算出另一个值
                if (!width || !height) {
                    if (width) {
                        height = (img.height / img.width) * +width
                    }
                    else {
                        width = (img.width / img.height) * +height
                    }
                }

                // 调用 configCanvas 修改 canvas 的宽高、缩放、旋转
                configCanvas({
                    width,
                    height
                })
            
                // 在中心点绘制一张图片，返回 base64 的结果
                ctx.drawImage(
                    img,
                    -width / 2,
                    -height / 2,
                    width,
                    height
                )

                return resolve({
                    base64Url: canvas.toDataURL(),
                    width,
                    height
                })
            }

            // 加载失败时，onerror 里绘制文本
            img.onerror = () => {
                return drawText()
            }
        })
    }
    
    // 封装 drawText、drawImage 两个方法，优先绘制 image
    return image
        ? drawImage()
        : drawText()
}

export default function useWatermark(params: WatermarkOptions) {
    // 把传入的参数保存到 options 的 state，根据它渲染
    const [options, setOptions] = useState(params || {})

    const mergedOptions = getMergedOptions(options)
    // 用 useRef 保存水印元素的 dom
    const watermarkDiv = useRef<HTMLDivElement>()
    const mutationObserver = useRef<MutationObserver>();

    const container = mergedOptions.getContainer!()
    const {zIndex, gap} = mergedOptions

    useEffect(() => {
        drawWatermark()
    }, [options])

    // 画水印
    const drawWatermark = () => {
        if (!container) {
            return
        }

        // 调用 getCanvasData 方法来绘制，返回 base64Url、width、height 这些信息
        getCanvasData(mergedOptions)
            .then(({ base64Url, width, height }) => {
                // offset
                // 改下 left、top 的值就好了，当然，width、height 也要从 100% 减去这块距离
                const offsetLeft = mergedOptions.offset[0] + 'px'
                const offsetTop = mergedOptions.offset[1] + 'px'

                const wmStyle = `
                    width: calc(100% - ${offsetLeft});
                    height: calc(100% - ${offsetTop});
                    position: absolute;
                    top: ${offsetTop};
                    left: ${offsetLeft};
                    bottom: 0;
                    right: 0;
                    pointer-events: none;
                    z-index: ${zIndex};
                    background-position: 0 0;
                    background-size: ${gap[0] + width}px ${gap[1] + height}px;
                    background-repeat: repeat;
                    background-image: url(${base64Url})
                `
        
                if (!watermarkDiv.current) {
                    const div = document.createElement('div')
                    watermarkDiv.current = div
                    container.append(div)
                    container.style.position = 'relative'
                }
        
                watermarkDiv.current?.setAttribute('style', wmStyle.trim());

                // 防止水印被删除
                if (container) {
                    mutationObserver.current?.disconnect()
            
                    // MutationObserver 可以监听子节点的变动和节点属性变动
                    mutationObserver.current = new MutationObserver((mutations) => {
                        const isChanged = mutations.some((mutation) => {
                            let flag = false
                            
                            // 把水印节点删除
                            if (mutation.removedNodes.length) {
                                flag = Array.from(mutation.removedNodes).some((node) => node === watermarkDiv.current)
                            }

                            // 通过改变属性把水印节点删除
                            if (mutation.type === 'attributes' && mutation.target === watermarkDiv.current) {
                                flag = true
                            }

                            return flag
                        })

                        // 如果删除，watermarkDiv.current 置空然后重新绘制
                        if (isChanged) {
                            watermarkDiv.current = undefined
                            drawWatermark()
                        }
                    })
            
                    mutationObserver.current.observe(
                        container,
                        {
                            attributes: true,
                            subtree: true,
                            childList: true,
                        }
                    )
                }
            })
    }

    return {
        // 调用返回的 generateWatermark 的时候设置 options 触发重绘
        generateWatermark: (newOptions: Partial<WatermarkOptions>) => {
            setOptions(merge(
                {},
                options,
                newOptions
            ))
        },

        destroy: () => {
        },
    }
}

