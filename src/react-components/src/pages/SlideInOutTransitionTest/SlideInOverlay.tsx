import React, { FC, PropsWithChildren, useEffect, useRef } from "react";
import { useTransition, animated } from "@react-spring/web";
import classNames from "classnames";
import Overlay from "./Overlay";
import { CSSProperties } from "styled-components";

const DURATION = 300;

interface SlideInOverlayProps extends PropsWithChildren {
    // 是否展示
    isVisible: boolean;
    // 是从右向左还是从下向上来运动，取值为 right 或 bottom
    from?: "right" | "bottom";

    className?: string | string[];
    style?: CSSProperties;

    onEnter?: () => void;
    onExit?: () => void;
}

const SlideInOverlay: FC<SlideInOverlayProps> = (props) => {
    const {
        isVisible,
        from = "right",
        children,
        style,
        className,
        onEnter,
        onExit
    } = props;

    // 用 useRef 保存上次的 isVisible 参数的值，如果上次的是 true 而当前 isVisible 是 false 就触发。
    const visibleRef = useRef(isVisible);


    // 判断下 isVisible 是 true 的时候再执行 onEnter 的定时器。
    // 并且当 isVisible、onEnter 变化的时候，销毁上次的定时器，重新跑。
    useEffect(() => {
        let timer = null;
      
        if (isVisible === true && onEnter != null) {
            timer = setTimeout(onEnter, DURATION);
        }
      
        return () => {
            if (timer != null) {
                clearTimeout(timer);
            }
        };
    }, [isVisible, onEnter]);

    useEffect(() => {
        let timer = null;
      
        if (isVisible === false && visibleRef.current === true &&  onExit != null) {
            timer = setTimeout(onExit, DURATION);
        }

        visibleRef.current = isVisible;
      
        return () => {
            if (timer != null) {
                clearTimeout(timer);
            }
        };
    }, [isVisible, onExit]);
      
      

    // 这里用 useMemo 的好处是只要 from 参数没变，就直接用之前的值。
    const x = React.useMemo(
        () => (from === "right" ? window.screen.width : window.screen.height),
        [from]
    );

    // 用 react-spring 的 useTransition 来做动画，改变 x、opcity 属性。
    const transitions = useTransition(
        isVisible,

        // 设置初始值、from 的值、enter 的值，以及 leave 的值。
        // 也就是进入动画开始、进入动画结束、离开动画结束的值。
        {
            x,
            opacity: 1,
            from: {
                x,
                opacity: 1,
            },
            enter: { x: 0, opacity: 1 },
            leave: { x, opacity: 0 },
            config: { duration: DURATION },
        }
    );

    const translate = React.useCallback(
        (x: number) => {
            switch (from) {
                case "right":
                    return `translateX(${x}px)`;

                case "bottom":
                    return `translateY(${x}px)`;
            }
        },
        [from]
    );

    return (
        <>
            {
                transitions(
                    (props, isVisible) =>
                        isVisible && (
                            // Overlay 是样式组件，用 as 转为用 animated.div 渲染。
                            <Overlay
                                as={animated.div}
                                className={classNames(className)}
                                style={{
                                    ...style,
                                    transform: props.x.to((x) => (x === 0 ? "none" : translate(x))),
                                    opacity: props.opacity,
                                }}
                            >
                                {children}
                            </Overlay>
                        )
                )
            }
        </>
    );
};

export { SlideInOverlay, DURATION };
