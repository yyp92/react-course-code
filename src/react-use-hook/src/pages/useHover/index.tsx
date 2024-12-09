import {useHover} from 'react-use'

export const UseHover = () => {
    const element = (hovered: boolean) => (
        <div>
            Hover me! {hovered && 'Thanks'}
        </div>
    )
        

    const [hoverable, hovered] = useHover(element)

    return (
        <div>
            {hoverable}
            
            <div>{hovered ? 'HOVERED' : ''}</div>
        </div>
    )
}