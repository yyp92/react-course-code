import ReactDOM from 'react-dom/client';
import {
    RouterProvider,
    createBrowserRouter,
    Link,
    Outlet
} from 'react-router-dom';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { UpdatePassword } from './pages/UpdatePassword';
import { ErrorPage } from './pages/ErrorPage';
import { Index } from './pages/Index';
import { UpdateInfo } from './pages/UpdateInfo';

import './index.css';
import { Menu } from './pages/Menu';
import { MeetingRoomList } from './pages/MeetingRoomList';
import { BookingHistory } from './pages/BookingHistory';


const routes = [
    {
        path: "/",
        element: <Index></Index>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Menu />,
                children: [
                  {
                    path: '/',
                    element: <MeetingRoomList />
                  },
                  {
                    path: 'meeting_room_list',
                    element: <MeetingRoomList />
                  },
                  {
                    path: 'booking_history',
                    element: <BookingHistory />
                  }
                ]
            },

            {
                path: 'update_info',
                element: <UpdateInfo />
            },
        ]
    },
    {
        path: "login",
        element: <Login />,
    },
    {
        path: "register",
        element: <Register />,
    },
    {
        path: "update_password",
        element: <UpdatePassword />,
    }
]

export const router = createBrowserRouter(routes);


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(<RouterProvider router={router}/>);
