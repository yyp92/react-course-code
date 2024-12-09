import { Link, useParams } from "react-router-dom";
import { Button, Radio, Checkbox, Input, message, Form, InputNumber, Segmented, Space } from "antd";
import './index.scss';
import { MaterialItem } from "./Material";
import { useDrop } from "react-dnd";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { examFind, examSave } from "../../interfaces";
import { PreviewModal } from "./PreviewModal";

export type Question = {
    id: number
    question: string

    // type 是题型
    type: 'radio' | 'checkbox' | 'input'

    // options 是单选的选项
    options?: string[]

    // score 是题目分数
    score: number

    // answer 是答案
    answer: string

    // answerAnalyse 是答案解析
    answerAnalyse: string
}

const json: Array<Question> = [
    {
        id: 1,
        type: "radio",
        question: "最长的河？",
        options: [
            "选项1",
            "选项2"
        ],
        score: 5,
        answer: "选项1",
        answerAnalyse: "答案解析"
    },
    {
        id: 2,
        type: "checkbox",
        question: "最高的山？",
        options: [
            "选项1",
            "选项2"
        ],
        score: 5,
        answer: "选项1",
        answerAnalyse: "答案解析"
    },
    {
        id: 3,
        type: "input",
        question: "测试问题",
        score: 5,
        answer: "选项1",
        answerAnalyse: "答案解析"
    },
]

export function Edit() {
    const [form] = Form.useForm()
    let { id } = useParams()
    const [curQuestionId, setCurQuestionId] = useState<number>()
    const [json, setJson] = useState<Array<Question>>([])
    const [key, setKey] = useState<string>('json')
    const [isPreviewModalOpen, setPreviewModalOpen] = useState(false)

    // drop 的时候显示个消息提示
    // isOver:  over 的时候加个蓝色边框
    const [{ isOver }, drop] = useDrop(() => ({
        accept: ['单选题', '多选题', '填空题'],
        drop: (item: { type: string }) => {
            // message.success(item.type)

            const type = {
                单选题: 'radio',
                多选题: 'checkbox',
                填空题: 'input'
            }[item.type] as Question['type']

            setJson((json) => [
                ...json,
                {
                    id: new Date().getTime(),
                    type,
                    question: "最高的山？",
                    options: [
                        "选项1",
                        "选项2"
                    ],
                    score: 5,
                    answer: "选项1",
                    answerAnalyse: "答案解析"
                }
            ])

            // json.push({
            //     id: new Date().getTime(),
            //     type,
            //     question: "最高的山？",
            //     options: [
            //         "选项1",
            //         "选项2"
            //     ],
            //     score: 5,
            //     answer: "选项1",
            //     answerAnalyse: "答案解析"
            // })
        },
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    }))

    useEffect(() => {
        form.setFieldsValue(json.filter(item => item.id === curQuestionId)[0])
    }, [curQuestionId])

    useEffect(() => {
        query()
    }, [])


    async function query() {
        if (!id) {
            return
        }

        try {
            const res = await examFind(+id)

            if (res.status === 201 || res.status === 200) {
                try {
                    setJson(JSON.parse(res.data.content))
                }
                catch (e) { }
            }
        }
        catch (e: any) {
            message.error(e.response?.data?.message || '系统繁忙，请稍后再试')
        }
    }

    async function saveExam() {
        if (!id) {
            return
        }

        try {
            const res = await examSave({
                id: +id,
                content: JSON.stringify(json)
            });
            if (res.status === 201 || res.status === 200) {
                message.success('保存成功')
            }
        }
        catch (e: any) {
            message.error(e.response?.data?.message || '系统繁忙，请稍后再试');
        }
    }

    function renderComponents(arr: Array<Question>) {
        return arr.map(item => {
            let formComponent

            if (item.type === 'radio') {
                formComponent = <Radio.Group>
                    {
                        item.options?.map(option => <Radio value={option}>{option}</Radio>)
                    }
                </Radio.Group>
            }
            else if (item.type === 'checkbox') {
                formComponent = <Checkbox.Group options={item.options} />
            }
            else if (item.type === 'input') {
                formComponent = <Input />
            }

            return (
                <div
                    className="component-item"
                    key={item.id}
                    onClick={() => {
                        setCurQuestionId(item.id)
                    }}
                    style={item.id === curQuestionId ? { boxShadow: '0 0 0 2px blue' } : {}}
                >
                    <p className="question">{item.question}</p>

                    <div className="options">
                        {formComponent}
                    </div>

                    <p className="score">
                        分值：{item.score}
                    </p>

                    <p className="answer">
                        答案：{item.answer}
                    </p>

                    <p className="answerAnalyse">
                        答案解析：{item.answerAnalyse}
                    </p>
                </div>
            )
        })
    }

    return (
        <div id="edit-container">
            <div className="header">
                <div>试卷编辑器</div>

                <div>
                    <Space>
                        <Button
                            type="default"
                            onClick={() => {
                                setPreviewModalOpen(true)
                            }}
                        >预览</Button>

                        <Button
                            type="primary"
                            onClick={saveExam}
                        >保存</Button>

                        <Button type="default">
                            <Link to="/">返回</Link>
                        </Button>
                    </Space>
                </div>

            </div>

            <div className="body">
                <div className="materials">
                    <MaterialItem name="单选题" type="单选题" />
                    <MaterialItem name="多选题" type="多选题" />
                    <MaterialItem name="填空题" type="填空题" />

                </div>

                <div
                    className="edit-area"
                    ref={drop}
                    style={isOver ? { border: '2px solid blue' } : {}}
                >
                    {
                        renderComponents(json)
                    }
                </div>

                <div className="setting">
                    <Segmented
                        value={key}
                        onChange={setKey}
                        block
                        options={['json', '属性']}
                    />

                    {
                        key === 'json' && <pre>
                            {JSON.stringify(json, null, 4)}
                        </pre>
                    }

                    {
                        key === '属性' && curQuestionId && json
                            .filter(item => item.id === curQuestionId)
                            .map((item, index) => {
                                return <div key={index}>
                                    <Form
                                        form={form}
                                        style={{ padding: '20px' }}
                                        initialValues={item}
                                        onValuesChange={(changed, values) => {
                                            setJson(json => {
                                                return json.map((cur) => {
                                                    return cur.id === item.id
                                                        ? {
                                                            id: item.id,
                                                            ...values,
                                                            options: typeof values.options === 'string'
                                                                ? values.options?.split(',')
                                                                : values.options
                                                        }
                                                        : cur
                                                })
                                            })
                                        }}
                                    >
                                        <Form.Item
                                            label="问题"
                                            name="question"
                                            rules={[
                                                { required: true, message: '请输入问题!' },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>

                                        <Form.Item
                                            label="类型"
                                            name="type"
                                            rules={[
                                                { required: true, message: '请选择类型!' },
                                            ]}
                                        >
                                            <Radio.Group>
                                                <Radio value='radio'>单选题</Radio>
                                                <Radio value='checkbox'>多选题</Radio>
                                                <Radio value='input'>填空题</Radio>
                                            </Radio.Group>
                                        </Form.Item>

                                        {
                                            item.type !== 'input' && <Form.Item
                                                label="选项（逗号分割）"
                                                name="options"
                                                rules={[
                                                    { required: true, message: '请输入选项!' },
                                                ]}
                                            >
                                                <Input />
                                            </Form.Item>
                                        }

                                        <Form.Item
                                            label="分数"
                                            name="score"
                                            rules={[
                                                { required: true, message: '请输入分数!' },
                                            ]}
                                        >
                                            <InputNumber />
                                        </Form.Item>

                                        <Form.Item
                                            label="答案"
                                            name="answer"
                                            rules={[
                                                { required: true, message: '请输入答案!' },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>

                                        <Form.Item
                                            label="答案分析"
                                            name="answerAnalyse"
                                            rules={[
                                                { required: true, message: '请输入答案分析!' },
                                            ]}
                                        >
                                            <TextArea />
                                        </Form.Item>
                                    </Form>
                                </div>
                            })
                    }
                </div>
            </div>

            <PreviewModal
                isOpen={isPreviewModalOpen}
                json={json}
                handleClose={() =>{
                    setPreviewModalOpen(false)
                }}
            />
        </div>
    )
}