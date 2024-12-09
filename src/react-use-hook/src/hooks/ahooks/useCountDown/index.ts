/** 
 * useCountdown 用来获取倒计时
 * 
 * 倒计时的逻辑很简单，就是通过定时器，每次计算下当前日期和目标日期的差值，返回格式化以后的结果。
 * 注意传入的回调函数都要用 useRef 包裹下，用的时候取 ref.current，避免闭包陷阱。
 */

import dayjs from 'dayjs'
import { useEffect, useMemo, useRef, useState } from 'react'

// TDate 是 dayjs 允许的传入的日期类型
export type TDate = dayjs.ConfigType

// Options 是参数的类型，可以传入 leftTime 剩余时间，也可以传入目标日期值 targetDate
export interface CountdownOptions {
    // 剩余时间
    leftTime?: number;

    // 目标日期值
    targetDate?: TDate;

    // 倒计时变化的时间间隔，默认 1s
    interval?: number;

    // 倒计时结束的回调
    onEnd?: () => void;
}

// 返回的格式化后的日期
export interface FormattedRes {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
}

const calcLeft = (target?: TDate) => {
    if (!target) {
        return 0
    }

    // 就是当前日期到目标日期的差值
    const left = dayjs(target).valueOf() - Date.now()

    return left < 0 ? 0 : left
}

const parseMs = (milliseconds: number): FormattedRes => {
    return {
        days: Math.floor(milliseconds / 86400000),
        hours: Math.floor(milliseconds / 3600000) % 24,
        minutes: Math.floor(milliseconds / 60000) % 60,
        seconds: Math.floor(milliseconds / 1000) % 60,
        milliseconds: Math.floor(milliseconds) % 1000,
    }
}

export const useCountDown = (options: CountdownOptions = {}) => {
    const {
        leftTime,
        targetDate,
        interval = 1000,
        onEnd
    } = options || {}

    //  leftTime 和 targetDate 只需要取一个
    const memoLeftTime = useMemo<TDate>(() => {
        // Date.now() 加上 leftTime 就是 targetDate(目标日期)
        return leftTime && leftTime > 0
            ? Date.now() + leftTime
            : undefined
    }, [leftTime])
    const target = 'leftTime' in options
        ? memoLeftTime
        : targetDate

    // * 核心部分是 useState 创建一个 state，在初始和每次定时器都计算一次剩余时间
    const [timeLeft, setTimeLeft] = useState(() => calcLeft(target))

    // onEnd 的函数也是要用 useRef 保存，然后每次更新 ref.current，取的时候取 ref.current
    const onEndRef = useRef(onEnd)
    onEndRef.current = onEnd

    useEffect(() => {
        if (!target) {
            setTimeLeft(0)
            return
        }

        setTimeLeft(calcLeft(target))

        const timer = setInterval(() => {
            const targetLeft = calcLeft(target)
            setTimeLeft(targetLeft)

            if (targetLeft === 0) {
                clearInterval(timer)
                onEndRef.current?.()
            }
        }, interval)

        return () => clearInterval(timer)
    }, [target, interval])

    const formattedRes = useMemo(() => parseMs(timeLeft), [timeLeft])

    return [timeLeft, formattedRes] as const
}
