import axios from "axios";
import { RegisterUser } from "../pages/Register";
import { UpdatePassword } from "../pages/UpdatePassword";
import { UserInfo } from "../pages/UpdateInfo";
import { message } from "antd";
import { AddFriend } from "../pages/Friendship/AddFriendModal";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3005/',
    timeout: 3000
})

// 在每次发请求之前，在 header 里加上 authorization，带上 token
axiosInstance.interceptors.request.use(function (config) {
    const accessToken = localStorage.getItem('token')

    if (accessToken) {
        config.headers.authorization = 'Bearer ' + accessToken
    }

    return config
})

// 当响应的 header 带有 token，就更新本地 token。
// 如果返回的是 401 的状态码，就提示错误，跳转登录页。
axiosInstance.interceptors.response.use(
    (response) => {
        const newToken = response.headers['token']

        if (newToken) {
            localStorage.setItem('token', newToken)
        }

        return response
    },
    async (error) => {
        if (!error.response) {
            return Promise.reject(error)
        }

        let { data } = error.response

        if (data.statusCode === 401) {
            message.error(data.message)

            setTimeout(() => {
                window.location.href = '/login'
            }, 1500)
        }
        else {
            return Promise.reject(error)
        }
    }
)


export async function login(username: string, password: string) {
    return await axiosInstance.post('/user/login', {
        username,
        password
    })
}

export async function registerCaptcha(email: string) {
    return await axiosInstance.get('/user/register-captcha', {
        params: {
            address: email
        }
    })
}

export async function register(registerUser: RegisterUser) {
    return await axiosInstance.post('/user/register', registerUser)
}

export async function updatePasswordCaptcha(email: string) {
    return await axiosInstance.get('/user/update_password/captcha', {
        params: {
            address: email
        }
    })
}

export async function updatePassword(data: UpdatePassword) {
    return await axiosInstance.post('/user/update_password', data)
}

// /user/info 查询用户信息的接口，用来回显数据
export async function getUserInfo() {
    return await axiosInstance.get('/user/info')
}

// /user/update 修改用户信息的接口，用来做修改
export async function updateInfo(data: UserInfo) {
    return await axiosInstance.post('/user/update', data)
}

// /user/update/captcha 发送验证码的接口
export async function updateUserInfoCaptcha() {
    return await axiosInstance.get('/user/update/captcha')
}

export async function presignedUrl(fileName: string) {
    return axiosInstance.get(`/minio/presignedUrl?name=${ fileName}`);
}

export async function friendshipList(name?: string) {
    return axiosInstance.get(`/friendship/list?name=${name || ''}`);
}

export async function chatroomList(name?: string) {
    return axiosInstance.get(`/chatroom/list?name=${name || ''}`);
}

export async function friendAdd(data: AddFriend) {
    return axiosInstance.post('/friendship/add', data);
}

export async function friendRequestList() {
    return axiosInstance.get('/friendship/request_list');
}

export async function agreeFriendRequest(id: number) {
    return axiosInstance.get(`/friendship/agree/${id}`);
}

export async function rejectFriendRequest(id: number) {
    return axiosInstance.get(`/friendship/reject/${id}`);
}

export async function chatHistoryList(id: number) {
    return axiosInstance.get(`/chat-history/list?chatroomId=${id}`);
}

export async function findChatroom(userId1: number, userId2: number) {
    return axiosInstance.get(`/chatroom/findChatroom`, {
        params: {
            userId1,
            userId2
        }
    })
}

export async function createOneToOne(friendId: number,) {
    return axiosInstance.get(`/chatroom/create-one-to-one`, {
        params: {
            friendId,
        }
    })
}

export async function groupMembers(chatroomId: number) {
    return axiosInstance.get(`/chatroom/members`, {
        params: {
            chatroomId
        }
    });
}

export async function addMember(chatroomId: number, joinUsername: string) {
    return axiosInstance.get(`/chatroom/join/${chatroomId}`, {
        params: {
            joinUsername
        }
    })
}

export async function createGroup(name: string) {
    return axiosInstance.get(`/chatroom/create-group`, {
        params: {
            name
        }
    })
}

export async function queryFavoriteList() {
    return axiosInstance.get(`/favorite/list`)
}

export async function favoriteAdd(chatHistoryId: number) {
    return axiosInstance.get(`/favorite/add`, {
        params: {
            chatHistoryId
        }
    })
}

export async function favoriteDel(id: number) {
    return axiosInstance.get(`/favorite/del`, {
        params: {
            id
        }
    })
}

