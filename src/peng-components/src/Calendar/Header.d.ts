import React from 'react';
import { Dayjs } from 'dayjs';
interface HeaderProps {
    curMonth: Dayjs;
    preMonthHandler: () => void;
    nextMonthHandler: () => void;
    todayHandler: () => void;
}
declare function Header(props: HeaderProps): React.JSX.Element;
export default Header;
