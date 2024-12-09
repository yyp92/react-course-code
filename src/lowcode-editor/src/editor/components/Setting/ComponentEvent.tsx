import { Collapse, Input, Select, CollapseProps, Button } from 'antd';
import { getComponentById, useComponetsStore } from '../../stores/components';
import { useComponentConfigStore } from '../../stores/component-config';
import type { ComponentEvent } from '../../stores/component-config';
import { GoToLink, GoToLinkConfig } from './actions/GoToLink';
import { ShowMessage, ShowMessageConfig } from './actions/ShowMessage';
import { useState } from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ActionConfig, ActionModal } from './ActionModal';

export function ComponentEvent() {
    const {
        curComponentId,
        curComponent,
        updateComponentProps,
        components
    } = useComponetsStore()
    const { componentConfig } = useComponentConfigStore()

    const [actionModalOpen, setActionModalOpen] = useState(false)
    const [curEvent, setCurEvent] = useState<ComponentEvent>()
    const [curAction, setCurAction] = useState<ActionConfig>()
    const [curActionIndex, setCurActionIndex] = useState<number>()

    function handleModalOk(config?: ActionConfig) {
        if (!config || !curEvent || !curComponent) {
            return
        }

        // 如果有 curAction，就是修改，没有的话才是新增
        if (curAction) {
            updateComponentProps(curComponent.id,  { 
                [curEvent.name]: { 
                    actions: curComponent.props[curEvent.name]?.actions.map((item: ActionConfig, index: number) => {
                        return index === curActionIndex ? config : item
                    })
                }
            })
        }
        else {
            updateComponentProps(curComponent.id, {
                [curEvent.name]: {
                    actions: [
                        ...(curComponent.props[curEvent.name]?.actions || []),
                        config
                    ]
                }
            })
        }

        setCurAction(undefined)
        setActionModalOpen(false)
    }

    function deleteAction(event: ComponentEvent, index: number) {
        if (!curComponent) {
            return
        }

        const actions = curComponent.props[event.name]?.actions

        actions.splice(index, 1)

        updateComponentProps(curComponent.id, {
            [event.name]: {
                actions: actions
            }
        })
    }

    function editAction(config: ActionConfig, index: number) {
        if (!curComponent) {
            return
        }

        setCurAction(config)
        setCurActionIndex(index)
        setActionModalOpen(true)
    }

    const items: CollapseProps['items'] = (componentConfig[curComponent!.name].events || []).map(event => {
        return {
            key: event.name,
            label: (
                <div className='flex justify-between leading-[30px]'>
                    {event.label}

                    <Button
                        type="primary"
                        onClick={(e: any) => {
                            e.stopPropagation()

                            setCurEvent(event)
                            setActionModalOpen(true)
                        }}
                    >添加动作</Button>
                </div>
            ),
            children: (
                <div>
                    {
                        (curComponent?.props[event.name]?.actions || []).map((item: ActionConfig, index: number) => {
                            return (
                                <div key={`${index}`}>
                                    {
                                        item.type === 'goToLink'
                                            ? <div className='border border-[#aaa] m-[10px] p-[10px] relative'>
                                                <div className='text-[blue]'>跳转链接</div>

                                                <div>{item.url}</div>

                                                <div
                                                    style={{
                                                        position: 'absolute',
                                                        top: 10,
                                                        right: 30,
                                                        cursor: 'pointer'
                                                    }}
                                                    onClick={() => editAction(item, index)}
                                                >
                                                    <EditOutlined />
                                                </div>

                                                <div
                                                    style={{
                                                        position: 'absolute',
                                                        top: 10,
                                                        right: 10,
                                                        cursor: 'pointer'
                                                    }}
                                                    onClick={() => deleteAction(event, index)}
                                                >
                                                    <DeleteOutlined />
                                                </div>
                                            </div>
                                            : null
                                    }

                                    {
                                        item.type === 'showMessage'
                                            ? <div className='border border-[#aaa] m-[10px] p-[10px] relative'>
                                                <div className='text-[blue]'>消息弹窗</div>

                                                <div>{item.config.type}</div>

                                                <div>{item.config.text}</div>

                                                <div
                                                    style={{
                                                        position: 'absolute',
                                                        top: 10,
                                                        right: 30,
                                                        cursor: 'pointer'
                                                    }}
                                                    onClick={() => editAction(item, index)}
                                                >
                                                    <EditOutlined />
                                                </div>

                                                <div
                                                    style={{
                                                        position: 'absolute',
                                                        top: 10,
                                                        right: 10,
                                                        cursor: 'pointer'
                                                    }}
                                                    onClick={() => deleteAction(event, index)}
                                                >
                                                    <DeleteOutlined />
                                                </div>
                                            </div>
                                            : null
                                    }

                                    {
                                        item.type === 'customJS'
                                            ? <div key="customJS" className='border border-[#aaa] m-[10px] p-[10px] relative'>
                                                <div className='text-[blue]'>自定义 JS</div>

                                                <div
                                                    style={{
                                                        position: 'absolute',
                                                        top: 10,
                                                        right: 30,
                                                        cursor: 'pointer'
                                                    }}
                                                    onClick={() => editAction(item, index)}
                                                >
                                                    <EditOutlined />
                                                </div>

                                                <div
                                                    style={{
                                                        position: 'absolute',
                                                        top: 10,
                                                        right: 10,
                                                        cursor: 'pointer'
                                                    }}
                                                    onClick={() => deleteAction(event, index)}
                                                >
                                                    <DeleteOutlined />
                                                </div>
                                            </div>
                                            : null
                                    }

                                    {
                                        item.type === 'componentMethod'
                                            ? <div key="componentMethod" className='border border-[#aaa] m-[10px] p-[10px] relative'>
                                                <div className='text-[blue]'>组件方法</div>

                                                <div>{getComponentById(item.config.componentId, components)?.desc}</div>

                                                <div>{item.config.componentId}</div>

                                                <div>{item.config.method}</div>

                                                <div
                                                    style={{
                                                        position: 'absolute',
                                                        top: 10,
                                                        right: 30,
                                                        cursor: 'pointer'
                                                    }}
                                                    onClick={() => editAction(item, index)}
                                                ><EditOutlined /></div>

                                                <div
                                                    style={{
                                                        position: 'absolute',
                                                        top: 10,
                                                        right: 10,
                                                        cursor: 'pointer'
                                                    }}
                                                    onClick={() => deleteAction(event, index)}
                                                ><DeleteOutlined /></div>
                                            </div>
                                        : null
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            )
        }
    })

    if (!curComponent) {
        return null
    }

    return (
        <div className='px-[10px]'>
            <Collapse
                className='mb-[10px]'
                items={items}
                defaultActiveKey={componentConfig[curComponent.name].events?.map(item => item.name)}
            />

            <ActionModal
                visible={actionModalOpen}
                action={curAction}
                handleOk={handleModalOk}
                handleCancel={() => {
                    setActionModalOpen(false)
                }}
            />
        </div>
    )
}
