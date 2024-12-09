import { useEffect, useRef, useState } from "react";
import { Button, DatePicker, Form, Select, message } from "antd";
import * as echarts from 'echarts';
import dayjs from 'dayjs'
import {
    successCodeList,
    meetingRoomUsedCount,
    userBookingCount 
} from "../../utils/interfaces";

import "./index.css";
import { useForm } from "antd/es/form/Form";


interface UserBookingData {
    userId: string;
    username: string;
    bookingCount: string;
}

interface MeetingRoomUsedData {
    meetingRoomName: string;
    meetingRoomId: number;
    usedCount: string;
}


export function Statistics() {
    const [form] = useForm()
    const containerRef = useRef<HTMLDivElement>(null)
    const containerRef2 = useRef<HTMLDivElement>(null)
    const [userBookingData, setUserBookingData] = useState<Array<UserBookingData>>()
    const [meetingRoomUsedData, setMeetingRoomUsedData] = useState<Array<MeetingRoomUsedData>>();
  

    useEffect(() => {
        const myChart = echarts.init(containerRef.current)

        if (!userBookingData) {
            return
        }
    
        myChart.setOption({
            title: {
                text: '用户预定情况'
            },
            tooltip: {},
            xAxis: {
                data: userBookingData?.map(item => item.username)
            },
            yAxis: {},
            series: [
                {
                    name: '预定次数',
                    type: form.getFieldValue('chartType'),
                    data: userBookingData?.map(item => {
                        return {
                            name: item.username,
                            value: item.bookingCount
                        }
                    })
                }
            ]
        })
    }, [userBookingData])

    useEffect(() => {
        const myChart = echarts.init(containerRef2.current)

        if (!meetingRoomUsedData) {
            return
        }
    
        myChart.setOption({
            title: {
                text: '会议室使用情况'
            },
            tooltip: {},
            xAxis: {
                data: meetingRoomUsedData?.map(item => item.meetingRoomName)
            },
            yAxis: {},
            series: [
                {
                    name: '使用次数',
                    type: form.getFieldValue('chartType'),
                    data: meetingRoomUsedData?.map(item => {
                        return {
                            name: item.meetingRoomName,
                            value: item.usedCount
                        }
                    })
                }
            ]
        })
    }, [meetingRoomUsedData])


    const getStatisticData = async (values: {
        startTime: string;
        endTime: string;
    }) => {
        const startTime = dayjs(values.startTime).format('YYYY-MM-DD')
        const endTime = dayjs(values.endTime).format('YYYY-MM-DD')

        const res = await userBookingCount(startTime, endTime)
        const {
            data,
            code
        } = res.data

        if (successCodeList.includes(code)) {
            setUserBookingData(data)
        }
        else {
            message.error(data || '系统繁忙，请稍后再试')
        }

        const res2 = await meetingRoomUsedCount(startTime, endTime);
        const {
            data: data2,
            code: code2
        } = res2.data

        if (successCodeList.includes(code2)) {
            setMeetingRoomUsedData(data2)
        }
        else {
            message.error(data2 || '系统繁忙，请稍后再试')
        }
    }

    return (
        <div id="statistics-container">
            <div className="statistics-form">
                <Form
                    form={form}
                    onFinish={getStatisticData}
                    name="search"
                    layout='inline'
                    colon={false}
                >
                    <Form.Item
                        label="开始日期"
                        name="startTime"
                    >
                        <DatePicker />
                    </Form.Item>

                    <Form.Item
                        label="结束日期"
                        name="endTime"
                    >
                        <DatePicker />
                    </Form.Item>

                    <Form.Item
                        label="图表类型"
                        name="chartType"
                        initialValue={"bar"}
                    >
                        <Select>
                            <Select.Option value="pie">饼图</Select.Option>
                            <Select.Option value="bar">柱形图</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                        >
                            查询
                        </Button>
                    </Form.Item>
                </Form>
            </div>

            <div className="statistics-chart" ref={containerRef}></div>
            <div className="statistics-chart" ref={containerRef2}></div>
        </div>
    )
}

