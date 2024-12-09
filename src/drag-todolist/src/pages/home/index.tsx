import React from 'react'
import {useNavigate} from 'react-router-dom'
import {Button} from 'antd'

import styles from './index.module.scss'

interface HomeProps {
    [key: string]: any
}

const Home: React.FC<HomeProps> = () => {
    const navigate = useNavigate()

    // ********* 操作 *********


    // ********* 渲染 *********
    return (
        <div>
            <Button onClick={() => navigate('/403')}>403</Button>
            <Button onClick={() => navigate('/login')}>login</Button>
        </div>
    )
}

export default Home