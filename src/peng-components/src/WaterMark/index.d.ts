/**
 * WaterMark
 *
 * 整体思路: 用 canvas 把文字或者图片画出来，导出 base64 的 data url 设置为 div 的重复背景，这个 div 整个覆盖在需要加水印的元素上，设置 pointer-events 是 none
 */
import { PropsWithChildren, CSSProperties, FC } from 'react';
export interface WatermarkProps extends PropsWithChildren {
    style?: CSSProperties;
    className?: string;
    zIndex?: string | number;
    width?: number;
    height?: number;
    rotate?: number;
    gap?: [number, number];
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
declare const WaterMark: FC<WatermarkProps>;
export default WaterMark;
