import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
    const [content, setContent] = useState('')

    async function query() {
        try {
            const res = await axios.post('http://localhost:3000/user/login', {
                username: 'guang',
                password: '123456'
            })


            const res2 = await axios.get('http://localhost:3000/user/bbb', {
                headers: {
                    Authorization: `Bearer ${res.data}`
                }
            })

            setContent(res2.data)
        }
        catch (e: any) {
            console.log(e.response.data.message);
        }
    }

    useEffect(() => {
        // * 这个 token 我们一般都放到 localstorage 里，每次请求都带上。
        // axios.interceptors.request.use(function (config) {
        //     const token = localStorage.getItem('token');
          
        //     if (accessToken) {
        //       config.headers.authorization = 'Bearer ' + token;
        //     }

        //     return config;
        // })

        // 单 token 如何刷新呢？
        // 很简单，拦截器里把 header 里的新 token 更新到 localStorage 就好了
        axios.interceptors.response.use(
            (response) => {
                const newToken = response.headers['token']

                if (newToken) {
                    localStorage.setItem('token ', newToken)
                }

                return response;

            }
        )

        query()
    }, [])

    return (
        <div style={{ fontSize: '100px' }}>{content}</div>
    )
}

export default App
