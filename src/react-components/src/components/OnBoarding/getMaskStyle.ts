export const getMaskStyle = (
    element: HTMLElement,
    container: HTMLElement
) => {
    if (!element) {
        return {}
    }

    const {
        height,
        width,
        left,
        top
    } = element.getBoundingClientRect()

    const elementTopWithScroll = container.scrollTop + top
    const elementLeftWithScroll = container.scrollLeft + left

    return {
        // width、height 就是容器的包含滚动区域的宽高
        width: container.scrollWidth,
        height: container.scrollHeight,

        // border-width 分为上下左右 4 个方向
        // top 和 left 的分别用 scrollTop、scrollLeft 和元素在可视区域里的 left、top 相加计算出来
        borderTopWidth: Math.max(elementTopWithScroll, 0),
        borderLeftWidth: Math.max(elementLeftWithScroll, 0),
        // bottom 和 right 的就用容器的包含滚动区域的高度宽度 scrollHeight、scrollWidth 减去 height、width 再减去 scrollTop、scrollLeft 计算出来
        borderBottomWidth: Math.max(container.scrollHeight - height - elementTopWithScroll, 0),
        borderRightWidth: Math.max(container.scrollWidth - width - elementLeftWithScroll, 0)
    }
}
