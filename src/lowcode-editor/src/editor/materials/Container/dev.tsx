import { CommonComponentProps } from '../../interface';
import { useMaterailDrop } from "../../hooks/useMaterialDrop"
import { useDrag } from 'react-dnd';
import { useEffect, useRef } from 'react';


const Container = ({
    name,
    id,
    children,
    styles
}: CommonComponentProps) => {
    // * 因为要同时给 div 绑定 drag、drop 的处理，所以用 useRef 拿到 ref 之后再绑定
    const divRef = useRef<HTMLDivElement>(null)
    const {
        canDrop,
        drop
    } = useMaterailDrop(
        [
            'Button',
            'Modal',
            'Container',
            'Table',
            'Form'
        ],
        id
    )

    const [_, drag] = useDrag({
        type: name,
        item: {
            type: name,
            dragType: 'move',
            id: id
        }
    })

    useEffect(() => {
        drop(divRef)
        drag(divRef)
    }, [])


    return (
        <div
            ref={divRef}
            data-component-id={id}
            style={styles}
            className={`min-h-[100px] p-[20px] ${ canDrop ? 'border-[2px] border-[blue]' : 'border-[1px] border-[#000]'}`}
        >{children}</div>
    )
}

export default Container
