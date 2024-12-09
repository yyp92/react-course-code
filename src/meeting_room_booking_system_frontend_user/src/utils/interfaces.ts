import { CreateBooking } from './../pages/MeetingRoomList/CreateBookingModal';
import axios, { AxiosRequestConfig } from "axios";
import {message} from 'antd'
import dayjs from 'dayjs'
import { RegisterUser } from "../pages/Register";
import { UserInfo } from "../pages/UpdateInfo";
import { UpdatePassword } from "../pages/UpdatePassword";
import { SearchBooking } from "../pages/BookingHistory";

export const codeList = [200, 201]

interface PendingTask {
    config: AxiosRequestConfig
    resolve: Function
}

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3005/',
    timeout: 3000
})

// 请求头携带 token
axiosInstance.interceptors.request.use(function (config) {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
        config.headers.authorization = 'Bearer ' + accessToken;
    }

    return config;
})

// 并且通过 refreshing 的标记和 task 队列实现了并发请求只刷新一次
let refreshing = false;
const queue: PendingTask[] = [];

// * axios 对于 400 多、500 多的请求，都会抛出错误
// 因为 axios 默认就是这样处理的，400 多和 500 多的请求，会返回 reject
axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        // 是为了请求没有发送成功的情况的
        if (!error.response) {
            return Promise.reject(error)
        }

        let {
            data,
            config
        } = error.response

        if (refreshing) {
            return new Promise((resolve) => {
                queue.push({
                    config,
                    resolve
                })
            })
        }

        // 当响应码是 401 的时候，就刷新 token，刷新失败提示错误信息，然后跳到登录页
        if (data.code === 401 && !config.url.includes('/user/refresh')) {
            refreshing = true

            const res = await refreshToken()

            refreshing = false

            if (res.status === 200) {
                queue.forEach(({config, resolve}) => {
                    resolve(axiosInstance(config))
                })

                return axiosInstance(config)
            }
            else {
                message.error(res.data)

                setTimeout(() => {
                    window.location.href = '/login'
                }, 1500)
            }
            
        }
        else {
            return error.response
        }
    }
)

async function refreshToken() {
    const res = await axiosInstance.get(
        '/user/refresh',
        {
            params: {
                refresh_token: localStorage.getItem('refresh_token')
            }
        }
    )

    localStorage.setItem('access_token', res.data.access_token || '')
    localStorage.setItem('refresh_token', res.data.refresh_token || '')

    return res
}


// * axios 对于 400 多、500 多的请求，都会抛出错误
// 因为 axios 默认就是这样处理的，400 多和 500 多的请求，会返回 reject
// axiosInstance.interceptors.response.use(
//     (response) => {
//         return response
//     },
//     async (error) => {
//         return error.response
//     }
// )


export async function login(
    username: string,
    password: string
) {
    return await axiosInstance.post(
        '/user/login',
        {
            username,
            password
        }
    );
}

export async function registerCaptcha(email: string) {
    return await axiosInstance.get(
        '/user/register-captcha',
        {
            params: {
                address: email
            }
        }
    )
}

export async function register(registerUser: RegisterUser) {
    return await axiosInstance.post('/user/register', registerUser);
}

export async function updatePasswordCaptcha(email: string) {
    return await axiosInstance.get(
        '/user/update_password/captcha',
        {
            params: {
                address: email
            }
        }
    );
}

export async function updatePassword(data: UpdatePassword) {
    return await axiosInstance.post('/user/update_password', data);
}

export async function getUserInfo() {
    return await axiosInstance.get('/user/info');
}

export async function updateInfo(data: UserInfo) {
    return await axiosInstance.post('/user/update', data);
}

export async function updateUserInfoCaptcha() {
    return await axiosInstance.get('/user/update/captcha');
}

export async function searchMeetingRoomList(
    name: string,
    capacity: number,
    equipment: string, 
    pageNo: number,
    pageSize: number
) {
    return await axiosInstance.get(
        '/meeting-room/list',
        {
            params: {
                name,
                capacity,
                equipment,
                pageNo,
                pageSize
            }
        }
    )
}

export async function bookingList(
    searchBooking: SearchBooking,
    pageNo: number,
    pageSize: number
) {
    let bookingTimeRangeStart
    let bookingTimeRangeEnd
    
    if (searchBooking.rangeStartDate && searchBooking.rangeStartTime) {
        const rangeStartDateStr = dayjs(searchBooking.rangeStartDate).format('YYYY-MM-DD')
        const rangeStartTimeStr = dayjs(searchBooking.rangeStartTime).format('HH:mm')
        bookingTimeRangeStart = dayjs(rangeStartDateStr + ' ' + rangeStartTimeStr).valueOf()
    }

    if (searchBooking.rangeEndDate && searchBooking.rangeEndTime) {
        const rangeEndDateStr = dayjs(searchBooking.rangeEndDate).format('YYYY-MM-DD')
        const rangeEndTimeStr = dayjs(searchBooking.rangeEndTime).format('HH:mm')
        bookingTimeRangeEnd = dayjs(rangeEndDateStr + ' ' + rangeEndTimeStr).valueOf()
    }

    return await axiosInstance.get(
        '/booking/list',
        {
            params: {
                username: searchBooking.username,
                meetingRoomName: searchBooking.meetingRoomName,
                meetingRoomPosition: searchBooking.meetingRoomPosition,
                bookingTimeRangeStart,
                bookingTimeRangeEnd,
                pageNo: pageNo,
                pageSize: pageSize
            }
        }
    )
}

export async function unbind(id: number) {
    return await axiosInstance.get('/booking/unbind/' + id)
}

export async function bookingAdd(booking: CreateBooking) {
    const rangeStartDateStr = dayjs(booking.rangeStartDate).format('YYYY-MM-DD')
    const rangeStartTimeStr = dayjs(booking.rangeStartTime).format('HH:mm')
    const startTime = dayjs(rangeStartDateStr + ' ' + rangeStartTimeStr).valueOf()

    const rangeEndDateStr = dayjs(booking.rangeEndDate).format('YYYY-MM-DD')
    const rangeEndTimeStr = dayjs(booking.rangeEndTime).format('HH:mm')
    const endTime = dayjs(rangeEndDateStr + ' ' + rangeEndTimeStr).valueOf()

    return await axiosInstance.post(
        '/booking/add',
        {
            meetingRoomId: booking.meetingRoomId,
            startTime,
            endTime,
            note: booking.note            
        }
    )
}

export async function presignedUrl(fileName: string) {
    return axiosInstance.get(`/minio/presignedUrl?name=${fileName}`);
}

