/**
 * 需要根据 x、y 的值来算出当前的颜色
 * 
 * 这块逻辑就是用 x/width 用 y/height 求出一个比例来
 */
import { TransformOffset } from "./Transform";
import { Color } from "./color";

export const calculateColor = (props: {
    offset: TransformOffset;
    containerRef: React.RefObject<HTMLDivElement>;
    targetRef: React.RefObject<HTMLDivElement>;
    color: Color;
}): Color => {
    const {
        offset,
        targetRef,
        containerRef,
        color
    } = props

    const {
        width,
        height
    } = containerRef.current!.getBoundingClientRect()
    const { 
        width: targetWidth,
        height: targetHeight
    } = targetRef.current!.getBoundingClientRect()

    const centerOffsetX = targetWidth / 2
    const centerOffsetY = targetHeight / 2

    // x、y 还要加上圆点的半径，这样才是中心点位置
    const saturation = (offset.x + centerOffsetX) / width
    const lightness = 1 - (offset.y + centerOffsetY) / height
    const hsv = color.toHsv()

    return new Color({
        h: hsv.h,
        s: saturation <= 0 ? 0 : saturation,
        v: lightness >= 1 ? 1 : lightness,
        a: hsv.a,
    })
}

export const calculateOffset = (
    containerRef: React.RefObject<HTMLDivElement>,
    targetRef: React.RefObject<HTMLDivElement>,
    color: Color
): TransformOffset => {
    const { width, height } = containerRef.current!.getBoundingClientRect()
    const { 
        width: targetWidth,
        height: targetHeight 
    } = targetRef.current!.getBoundingClientRect()

    const centerOffsetX = targetWidth / 2
    const centerOffsetY = targetHeight / 2
    const hsv = color.toHsv()

    /**
     * 色相（Hue）表示颜色的类型，以角度度量，通常在0到360之间，其中红色位于0度、绿色位于120度、蓝色位于240度。
     * 饱和度（Saturation）表示颜色的纯度或浓度，取值范围为0到1，0表示灰色阴影，1表示纯色。
     * 明度（Value或Brightness）表示颜色的亮度，取值范围为0到1，0表示黑色，1表示白色。
     */
    // * 根据 hsv 里的 s 和 v 的百分比乘以 width、height，计算出 x、y，然后减去滑块的宽高的一半
    return {
        x: hsv.s * width - centerOffsetX,
        y: (1 - hsv.v) * height - centerOffsetY,
    }
}
