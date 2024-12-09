import React from 'react';
import { Dayjs } from 'dayjs';
import { CalendarProps } from '.';
interface MonthCalendarProps extends CalendarProps {
    curMonth: Dayjs;
    selectHandler?: (date: Dayjs) => void;
}
declare function MonthCalendar(props: MonthCalendarProps): React.JSX.Element;
export default MonthCalendar;
