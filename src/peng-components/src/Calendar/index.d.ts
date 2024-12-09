import React, { CSSProperties, ReactNode } from 'react';
import { Dayjs } from 'dayjs';
export interface CalendarProps {
    value: Dayjs;
    style?: CSSProperties;
    classNames?: string | string[];
    dateRender?: (currentDate: Dayjs) => ReactNode;
    dateInnerContent?: (currentDate: Dayjs) => ReactNode;
    locale?: string;
    onChange?: (date: Dayjs) => void;
}
declare const Calendar: (props: CalendarProps) => React.JSX.Element;
export default Calendar;
