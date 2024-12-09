import {
    CSSProperties,
    FC,
    ReactNode,
    useRef,
    useState,
    useEffect
} from 'react';

/**
 * className 和 style 是给外层 div 添加样式的。
 * placeholder 是占位的内容。
 * offset 是距离到可视区域多远就触发加载。
 * onContentVisible 是进入可视区域的回调。
 */
interface MyLazyloadProps{
    className?: string,
    style?: CSSProperties,
    placeholder?: ReactNode,
    offset?: string | number,
    width?: number | string,
    height?: string | number,
    onContentVisible?: () => void,
    children: ReactNode,
}

const MyLazyload: FC<MyLazyloadProps> = (props) => {
    const {
        className = '',
        style,
        offset = 0,
        width,
        onContentVisible,
        placeholder,
        height,
        children
    } = props;

    // 用 useRef 保存外层 div 的引用
    const containerRef = useRef<HTMLDivElement>(null);
    // 用 useState 保存 visible 状态
    const [visible, setVisible] = useState(false);

    const styles = {
        height,
        width,
        ...style
    };

    // * 补充下 IntersectionObserver 监听 div 进入可视区域的情况
    const elementObserver = useRef<IntersectionObserver>();

    useEffect(() => {
        const options = {
            // 这里的 rootMargin 就是距离多少进入可视区域就触发，和参数的 offset 一个含义。
            rootMargin: typeof offset === 'number' ? `${offset}px` : offset || '0px',

            // threshold 是元素进入可视区域多少比例的时候触发，0 就是刚进入可视区域就触发。
            threshold: 0
        };

        elementObserver.current = new IntersectionObserver(lazyLoadHandler, options);

        const node = containerRef.current;

        if (node instanceof HTMLElement) {
            elementObserver.current.observe(node);
        }

        return () => {
            if (node && node instanceof HTMLElement) {
                elementObserver.current?.unobserve(node);
            }
        }
    }, []);

    function lazyLoadHandler (entries: IntersectionObserverEntry[]) {
        const [entry] = entries;
        const { isIntersecting } = entry;
    
        // 当 isIntersecting 为 true 的时候，就是从不相交到相交，反之，是从相交到不相交。
        if (isIntersecting) {
            setVisible(true);
            onContentVisible?.();
    
            const node = containerRef.current;

            if (node && node instanceof HTMLElement) {
                elementObserver.current?.unobserve(node);
            }
        }
    };

    return (
        <div
            ref={containerRef}
            className={className}
            style={styles}
        >
            {
                visible
                    ? children
                    : placeholder
            }
        </div>
    )
}

export default MyLazyload;
