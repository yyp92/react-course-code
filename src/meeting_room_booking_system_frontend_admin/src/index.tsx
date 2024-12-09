import ReactDOM from 'react-dom/client'
import {
    RouterProvider,
    createBrowserRouter,
    Link,
    Outlet
} from 'react-router-dom';
import { Index } from './pages/Index';
import { ErrorPage } from './pages/ErrorPage';
import { UserManage } from './pages/UserManage';
import { Login } from './pages/Login';
import { Menu } from './pages/Menu';

import './index.css';
import { ModifyMenu } from './pages/ModifyMenu';
import { InfoModify } from './pages/InfoModify';
import { PasswordModify } from './pages/PasswordModify';
import { MeetingRoomManage } from './pages/MeetingRoomManage';
import { BookingManage } from './pages/BookingManage';
import { Statistics } from './pages/Statistics';


const routes = [
    {
        path: "/",
        element: <Index></Index>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Menu></Menu>,
                children: [
                    {
                        path: '/',
                        element: <MeetingRoomManage />
                    },
                    {
                        path: 'user_manage',
                        element: <UserManage/>
                    },
                    {
                        path: 'meeting_room_manage',
                        element: <MeetingRoomManage/>
                    },
                    {
                        path: 'booking_manage',
                        element: <BookingManage />
                    },
                    {
                        path: 'statistics',
                        element: <Statistics />
                    }
                ]
            },
            {
                path: "/user",
                element: <ModifyMenu></ModifyMenu>,
                children: [
                    {
                        path: 'info_modify',
                        element: <InfoModify/>
                    },
                    {
                        path: 'password_modify',
                        element: <PasswordModify/>
                    },
                ]
            },
        ]
    },
    {
        path: "login",
        element: <Login />,
    }
]

export const router = createBrowserRouter(routes)
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

root.render(<RouterProvider router={router}/>)
