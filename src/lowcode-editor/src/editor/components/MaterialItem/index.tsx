import { useEffect, useRef } from "react";
import { useDrag } from "react-dnd";


export interface MaterialItemProps {
    name: string
    desc: string
}

export function MaterialItem(props: MaterialItemProps) {
    const {
        name,
        desc
    } = props

    // type 是当前 drag 的元素的标识，drop 的时候根据这个来决定是否 accept。
    // item 是传递的数据。
    const [_, drag] = useDrag({
        type: name,
        item: {
            type: name
        }
    })


    return (
        <div
            ref={drag}
            className='
                border-dashed
                border-[1px]
                border-[#000]
                py-[8px] px-[10px] 
                m-[10px]
                cursor-move
                inline-block
                bg-white
                hover:bg-[#ccc]
            '
        >
            {desc}
        </div>
    )
}
