import { useRef } from "react";
import { useScrolling } from "react-use";

export const UseScrolling = () => {
    const scrollRef = useRef(null)
    const scrolling = useScrolling(scrollRef)
  
    return (
        <>
            <div>{scrolling ? "滚动中.." : "没有滚动"}</div>
        
            <div
                ref={scrollRef}
                style={{
                    height: '200px',
                    overflow: 'auto'
                }}
            >
                <div>guang</div>
                <div>guang</div>
                <div>guang</div>
                <div>guang</div>
                <div>guang</div>
                <div>guang</div>
                <div>guang</div>
                <div>guang</div>
                <div>guang</div>
                <div>guang</div>
                <div>guang</div>
                <div>guang</div>
                <div>guang</div>
                <div>guang</div>
                <div>guang</div>
                <div>guang</div>
                <div>guang</div>
                <div>guang</div>
                <div>guang</div>
                <div>guang</div>
                <div>guang</div>
                <div>guang</div>
            </div>
        </>
    )
}