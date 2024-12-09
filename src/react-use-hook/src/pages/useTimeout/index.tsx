import { useState } from 'react'
// import { useTimeout } from 'ahooks'
import { useTimeout } from '@/hooks/ahooks'

export const UseTimeout = () => {
    const [state, setState] = useState(1)

    useTimeout(() => {
        setState(state + 1)
    }, 3000)

    return <div>{state}</div>
}
