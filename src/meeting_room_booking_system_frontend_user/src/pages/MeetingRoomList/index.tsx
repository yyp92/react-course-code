import { useEffect, useMemo, useState } from "react"
import { Badge, Button, Form, Input, Popconfirm, Table, message } from "antd"
import { ColumnsType } from "antd/es/table"
import { useForm } from "antd/es/form/Form"
import {
    codeList,
    searchMeetingRoomList
} from "../../utils/interfaces"

import './index.css'
import { CreateBookingModal } from "./CreateBookingModal"


interface SearchMeetingRoom {
    name: string;
    capacity: number;
    equipment: string;
}

export interface MeetingRoomSearchResult {
    id: number,
    name: string;
    capacity: number;
    location: string;
    equipment: string;
    description: string;
    isBooked: boolean;
    createTime: Date;
    updateTime: Date;
}


export function MeetingRoomList() {
    const [form ]  = useForm()
    const [pageNo, setPageNo] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(10)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [currentMeetingRoom, setCurrentMeetingRoom] =  useState<MeetingRoomSearchResult>()
    const [meetingRoomResult, setMeetingRoomResult] = useState<Array<MeetingRoomSearchResult>>([])

    useEffect(() => {
        searchMeetingRoom({
            name: form.getFieldValue('name'),
            capacity: form.getFieldValue('capacity'),
            equipment: form.getFieldValue('equipment')
        })
    }, [pageNo, pageSize])


    const columns: ColumnsType<MeetingRoomSearchResult> = useMemo(() => [
        {
            title: '名称',
            dataIndex: 'name'
        },
        {
            title: '容纳人数',
            dataIndex: 'capacity',
        },
        {
            title: '位置',
            dataIndex: 'location'
        },
        {
            title: '设备',
            dataIndex: 'equipment'
        },
        {
            title: '描述',
            dataIndex: 'description'
        },
        {
            title: '添加时间',
            dataIndex: 'createTime'
        },
        {
            title: '上次更新时间',
            dataIndex: 'updateTime'
        },
        {
            title: '预定状态',
            dataIndex: 'isBooked',
            render: (_, record) => (
                record.isBooked
                    ? <Badge status="error">已被预订</Badge>
                    : <Badge status="success">可预定</Badge>
            )
        },
        {
            title: '操作',
            render: (_, record) => (
                <div>
                    <Button
                        type="link"
                        onClick={() => {
                            setIsCreateModalOpen(true)
                            setCurrentMeetingRoom(record)
                        }}
                    >预定</Button>
                </div>
            )
        }
    ], [])

    const searchMeetingRoom = async (values: SearchMeetingRoom) => {
        const res = await searchMeetingRoomList(
            values.name,
            values.capacity,
            values.equipment,
            pageNo,
            pageSize
        )

        const {
            code,
            data
        } = res.data

        if (codeList.includes(code)) {
            setMeetingRoomResult(data.meetingRooms.map((item: MeetingRoomSearchResult) => {
                return {
                    key: item.id,
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


    return (
        <div id="meetingRoomList-container">
            <div className="meetingRoomList-form">
                <Form
                    form={form}
                    onFinish={searchMeetingRoom}
                    name="search"
                    layout='inline'
                    colon={false}
                    autoComplete="off"
                >
                    <Form.Item
                        label="会议室名称"
                        name="name"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="容纳人数"
                        name="capacity"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="设备"
                        name="equipment"
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item label=" ">
                        <Button
                            type="primary"
                            htmlType="submit"
                        >
                            搜索会议室
                        </Button>
                    </Form.Item>
                </Form>
            </div>

            <div className="meetingRoomList-table">
                <Table
                    columns={columns}
                    dataSource={meetingRoomResult}
                    pagination={ {
                        current: pageNo,
                        pageSize: pageSize,
                        onChange: changePage
                    }}
                />
            </div>

            {
                currentMeetingRoom
                ? (
                    <CreateBookingModal
                        meetingRoom={currentMeetingRoom}
                        isOpen={isCreateModalOpen}
                        handleClose={() => {
                            setIsCreateModalOpen(false);
                        }}
                    />
                )
                : null
            }
        </div>
    )
}
