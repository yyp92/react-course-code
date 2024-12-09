import { useState, useEffect } from "react";
import { Button, Form, Input, Table, message, Image, Badge } from "antd";
import { ColumnsType } from "antd/es/table";
import { 
    successCodeList,
    userSearch,
    freeze
} from "../../utils/interfaces";

import './index.css';
import { useForm } from "antd/es/form/Form";


interface SearchUser {
    username: string;
    nickName: string;
    email: string;
}

export interface UserSearchResult {
    id: number;
    username: string;
    nickName: string;
    email: string;
    headPic: string;
    createTime: Date;
    isFrozen: boolean;
}

export function UserManage() {
    const [form] = useForm()

    const [pageNo, setPageNo] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(10)
    const [userResult, setUserResult] = useState<UserSearchResult[]>([])
    const [num, setNum] = useState<number>(0)

    useEffect(() => {
        searchUser({
            username: form.getFieldValue('username'),
            email: form.getFieldValue('email'),
            nickName: form.getFieldValue('nickName')
        });
    }, [pageNo, pageSize, num])


    // ********* 操作 *********
    const searchUser = async (values: SearchUser) => {
        const res = await userSearch(
            values.username,
            values.nickName,
            values.email,
            pageNo,
            pageSize
        )

        const {
            code,
            message: msg,
            data
        } = res.data

        if (successCodeList.includes(code)) {
            setUserResult(data.users.map((item: UserSearchResult) => {
                return {
                    key: item.username,
                    ...item
                }
            }))
        }
        else {
            message.error(data || '系统繁忙，请稍后再试')
        }
    }

    const changePage = function(
        pageNo: number,
        pageSize: number
    ) {
        setPageNo(pageNo)
        setPageSize(pageSize)
    }

    async function freezeUser(id: number) {
        const res = await freeze(id);
    
        const {
            code,
            message: msg,
            data
        } = res.data

        if (successCodeList.includes(code)) {
            message.success('冻结成功')
            setNum(Math.random())
        }
        else {
            message.error(data || '系统繁忙，请稍后再试')
        }
    }

    const columns: ColumnsType<UserSearchResult> = [
        {
            title: '用户名',
            dataIndex: 'username'
        },
        {
            title: '头像',
            dataIndex: 'headPic',
            render: value => {
                return (
                    value
                    ? (
                        <Image
                            width={50}
                            src={`http://localhost:3005/${value}`}
                        />
                    )
                    : null
                )
            }
        },
        {
            title: '昵称',
            dataIndex: 'nickName'
        },
        {
            title: '邮箱',
            dataIndex: 'email'
        },
        {
            title: '注册时间',
            dataIndex: 'createTime'
        },
        {
            title: '状态',
            dataIndex: 'isFrozen',
            render: (_, record) => (
                record.isFrozen
                    ? <Badge status="success">已冻结</Badge>
                    : null
            )
        },
        {
            title: '操作',
            render: (_, record) => {
                return (
                    <Button
                        type="link"
                        onClick={() => {
                            freezeUser(record?.id)
                        }}
                    >
                        冻结
                    </Button>
                )
            }
        }   
    ]


    // ********* 渲染 *********
    return (
        <div id="userManage-container">
            <div className="userManage-form">
                <Form
                    form={form}
                    onFinish={searchUser}
                    name="search"
                    layout='inline'
                    colon={false}
                >
                    <Form.Item
                        label="用户名"
                        name="username"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="昵称"
                        name="nickName"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="邮箱"
                        name="email"
                        rules={[
                            { 
                                type: "email",
                                message: '请输入合法邮箱地址!'
                            }
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item label=" ">
                        <Button
                            type="primary"
                            htmlType="submit"
                        >
                            搜索用户
                        </Button>
                    </Form.Item>
                </Form>
            </div>

            <div className="userManage-table">
                <Table
                    columns={columns}
                    dataSource={userResult}
                    pagination={{
                        current: pageNo,
                        pageSize: pageSize,
                        onChange: changePage
                    }}
                />  
            </div>
        </div>
    )
}