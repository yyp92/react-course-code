import {useLifecycles} from 'react-use'

export const UseLifecycles = () => {
    useLifecycles(
        () => console.log('MOUNTED'),
        () => console.log('UNMOUNTED')
    )

    return null;
}