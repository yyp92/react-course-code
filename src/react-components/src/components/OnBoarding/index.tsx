/**
 * OnBoarding 漫游式引导
 * 
 * * antd 里是用 4 个 rect 元素实现的
 * * 我们是用一个 div 设置 width、height、四个方向不同的 border-width 实现的
 */
import React, { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button, Popover } from 'antd';
import { Mask } from './Mask'
import { TooltipPlacement } from 'antd/es/tooltip';
import './index.scss';

export interface OnBoardingStepConfig {
    // 每一步在哪个元素（selector）
    selector: () => HTMLElement | null;
  
    // 方位
    placement?: TooltipPlacement;
  
    // 显示内容
    renderContent?: (currentStep: number) => React.ReactNode;
  
    // 上一步的回调
    beforeForward?: (currentStep: number) => void;
  
    // 下一步的回调
    beforeBack?: (currentStep: number) => void;
}

  
export interface OnBoardingProps {
    // 直接指定显示第几步
    step?: number;

    steps: OnBoardingStepConfig[];

    getContainer?: () => HTMLElement;

    // 全部完成后的回调
    onStepsEnd?: () => void;
}

const OnBoarding:FC<OnBoardingProps> = (props) => {
    const {
        step = 0,
        steps,
        onStepsEnd,
        getContainer
    } = props

    // 记录当前处于哪一步
    const [currentStep, setCurrentStep] = useState<number>(0)
    const [, setRenderTick] = useState<number>(0)
    // 解决结束后，mask 不会消失
    const [done, setDone] = useState<boolean>(false)
    const [isMaskMoving, setIsMaskMoving] = useState<boolean>(false)

    const currentSelectedElement = steps[currentStep]?.selector()
    const currentContainerElement = getContainer?.() || document.documentElement

    // 效果就是在 dom 渲染完之后，触发重新渲染，从而渲染这个 OnBoarding 组件
    useEffect(() => {
        setRenderTick(1)    
    }, [])

    useEffect(() => {
        setCurrentStep(step!)
    }, [step])


    const getCurrentStep = () => {
        return steps[currentStep]
    }

    // 上一步
    const back = async () => {
        if (currentStep === 0) {
            return
        }

        const { beforeBack } = getCurrentStep()
        await beforeBack?.(currentStep)
        setCurrentStep(currentStep - 1)
    }

    // 下一步
    const forward = async () => {
        if (currentStep === steps.length - 1) {
            await onStepsEnd?.()
            setDone(true)
            return
        }

        const { beforeForward } = getCurrentStep()
        await beforeForward?.(currentStep)
        setCurrentStep(currentStep + 1)
    }

    

    const renderPopover = (wrapper: React.ReactNode) => {
        const config = getCurrentStep()

        if (!config) {
            return wrapper
        }

        const { renderContent } = config
        const content = renderContent
            ? renderContent(currentStep)
            : null

        const operation = (
            <div className={'onboarding-operation'}>
                {
                    currentStep !== 0 && (
                        <Button
                            className={'back'}
                            onClick={() => back()}>
                            {'上一步'}
                        </Button>
                    )
                }

                <Button
                    className={'forward'}
                    type={'primary'}
                    onClick={() => forward()}
                >
                    {
                        currentStep === steps.length - 1
                            ? '我知道了'
                            : '下一步'
                    }
                </Button>
            </div>
        )

        // 动画结束才会渲染 Popover
        if (isMaskMoving) {
            return wrapper
        }

        return (
            <Popover
                content={
                    <div>
                        {content}
                        {operation}
                    </div>
                }
                open={true}
                placement={getCurrentStep()?.placement}>
                {wrapper}
            </Popover>
        )
    }

    // 第一次渲染的时候，元素是 null，触发重新渲染之后，就会渲染下面的 Mask 了
    if (!currentSelectedElement || done) {
        return null
    }

    const mask = (
        <Mask
            container={currentContainerElement}
            element={currentSelectedElement}
            renderMaskContent={(wrapper) => renderPopover(wrapper)}
            onAnimationStart={() => {
                setIsMaskMoving(true)
            }}
            onAnimationEnd={() => {
                setIsMaskMoving(false)
            }}
        />
    )

    return createPortal(mask, currentContainerElement)
}


export default OnBoarding