import React, {useContext} from 'react'
import {Dayjs} from 'dayjs'
// import './index.scss'
import LocaleContext from './LocaleContext'
import allLocales from './locale'


interface HeaderProps {
    curMonth: Dayjs
    preMonthHandler: () => void
    nextMonthHandler: () => void
    todayHandler: () => void
}

function Header(props: HeaderProps) {
    const {
        curMonth,
        preMonthHandler,
        nextMonthHandler,
        todayHandler
    } = props

    // 国际化
    const localeContext = useContext(LocaleContext)
    const CalendarContext = allLocales[localeContext.locale]

    return (
        <div className={'calendarHeader'}>
            <div className={'calendarHeaderLeft'}>
                <div
                    className={'calendarHeaderIcon'}
                    onClick={preMonthHandler}
                >&lt;</div>

                <div className={'calendarHeaderValue'}>{curMonth.format(CalendarContext.formatMonth)}</div>

                <div
                    className={'calendarHeaderIcon'}
                    onClick={nextMonthHandler}
                >&gt;</div>

                <button
                    className={'calendarHeaderBtn'}
                    onClick={todayHandler}
                >{CalendarContext.today}</button>
            </div>
        </div>
    )
}

export default Header