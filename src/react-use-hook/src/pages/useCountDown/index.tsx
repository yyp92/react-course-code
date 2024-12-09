/**
 * useCountDown
 * 用来获取倒计时
 */
// import { useCountDown } from 'ahooks'
import { useCountDown } from '@/hooks/ahooks'

export const UseCountDown = () => {
    const [countdown, formattedRes] = useCountDown({
        targetDate: `${new Date().getFullYear()}-12-31 23:59:59`,
    });
    
    const {
        days,
        hours,
        minutes,
        seconds,
        milliseconds
    } = formattedRes

    return (
        <p>
            距离今年年底还剩 {days} 天 {hours} 小时 {minutes} 分钟 {seconds} 秒 {milliseconds} 毫秒
        </p>
    )
}