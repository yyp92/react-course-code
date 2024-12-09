import {
    useEffect,
    useMemo,
    useState,
} from 'react';
import { createPortal } from 'react-dom';
import { getComponentById, useComponetsStore } from '../../stores/components';
import { Dropdown, Popconfirm, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

interface SelectedMaskProps {
    portalWrapperClassName: string
    containerClassName: string
    componentId: number;
}

function SelectedMask({
    containerClassName,
    portalWrapperClassName,
    componentId
}: SelectedMaskProps) {
    const [position, setPosition] = useState({
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        labelTop: 0,
        labelLeft: 0,
    })

    const {
        components,
        curComponentId,
        deleteComponent,
        setCurComponentId
    } = useComponetsStore()


    useEffect(() => {
        updatePosition()
    }, [componentId])

    // 删除组件后会触发它父组件的 hover，但这时候高亮框的高度是没删除元素的高度，会多出一块。
    // 还有，click 选中的组件再添加组件的时候编辑框高度不会变化
    useEffect(() => {
        setTimeout(() => {
            updatePosition()
        }, 200)
    }, [components])

    // * 使用者是可能调整窗口大小的，这时候编辑框没有重新计算位置
    useEffect(() => {
        const resizeHandler = () => {
            updatePosition()
        }

        window.addEventListener('resize', resizeHandler)

        return () => {
            window.removeEventListener('resize', resizeHandler)
        }
    }, [])

    function updatePosition() {
        if (!componentId) return

        const container = document.querySelector(`.${containerClassName}`)
        if (!container) return

        const node = document.querySelector(`[data-component-id="${componentId}"]`)
        if (!node) return

        const {
            top,
            left,
            width,
            height
        } = node.getBoundingClientRect()
        const {
            top: containerTop,
            left: containerLeft
        } = container.getBoundingClientRect()

        let labelTop = top - containerTop + container.scrollTop
        let labelLeft = left - containerLeft + width

        if (labelTop <= 0) {
            labelTop -= -20
        }

        setPosition({
            top: top - containerTop + container.scrollTop,
            left: left - containerLeft + container.scrollTop,
            width,
            height,
            labelTop,
            labelLeft,
        })
    }

    const el = useMemo(() => {
        return document.querySelector(`.${portalWrapperClassName}`)!
    }, [])

    const curSelectedComponent = useMemo(() => {
        return getComponentById(componentId, components)
    }, [componentId])
    
    const curComponent = useMemo(() => {
        return getComponentById(componentId, components)
    }, [componentId])

    const parentComponents = useMemo(() => {
        const parentComponents = []
        let component = curComponent

        // 每个组件都有 component.parentId，用来找父组件也很简单，不断向上找，放到一个数组里就行。
        while(component?.parentId) {
            component = getComponentById(component.parentId, components)
            parentComponents.push(component)
        }

        return parentComponents
    }, [curComponent])

    function handleDelete() {
        deleteComponent(curComponentId!)
        setCurComponentId(null)
    }

    return createPortal((
        <>
            <div
                style={{
                    position: "absolute",
                    left: position.left,
                    top: position.top,
                    backgroundColor: "rgba(0, 0, 255, 0.1)",
                    border: "1px dashed blue",
                    pointerEvents: "none",
                    width: position.width,
                    height: position.height,
                    zIndex: 12,
                    borderRadius: 4,
                    boxSizing: 'border-box',
                }}
            />

            <div
                style={{
                    position: "absolute",
                    left: position.labelLeft,
                    top: position.labelTop,
                    fontSize: "14px",
                    zIndex: 13,
                    display: (!position.width || position.width < 10) ? "none" : "inline",
                    transform: 'translate(-100%, -100%)',
                }}
            >
                <Space>
                    <Dropdown
                        menu={{
                            items: parentComponents.map((item: any) => ({
                                key: item.id,
                                label: item.desc,
                            })),
                            onClick: ({ key }) => {
                                setCurComponentId(+key)
                            }
                        }}
                        disabled={parentComponents.length === 0}
                    >
                        <div
                            style={{
                                padding: '0 8px',
                                backgroundColor: 'blue',
                                borderRadius: 4,
                                color: '#fff',
                                cursor: "pointer",
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {curSelectedComponent?.desc}
                        </div>
                    </Dropdown>

                    {/* 如果 id 不为 1，说明不是 Page 组件，就显示删除按钮 */}
                    {
                        curComponentId !== 1 && (
                            <div style={{ padding: '0 8px', backgroundColor: 'blue' }}>
                                <Popconfirm
                                    title="确认删除？"
                                    okText={'确认'}
                                    cancelText={'取消'}
                                    onConfirm={handleDelete}
                                >
                                    <DeleteOutlined style={{ color: '#fff' }} />
                                </Popconfirm>
                            </div>
                        )
                    }
                </Space>
            </div>
        </>
    ), el)
}

export default SelectedMask
