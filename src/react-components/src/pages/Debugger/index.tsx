/**
 * * React 组件如何调试
 */
import { useEffect, useLayoutEffect, useState } from "react";

async function queryData() {
    const data = await new Promise<number>((resolve) => {
        setTimeout(() => {
            resolve(666);
        }, 2000);
    })

    return data;
}

export const Debugger = () => {
    const [num, setNum] = useState(0);

    useLayoutEffect(() => {
        queryData().then(data => {
            setNum(data);
        })
    }, []);
  
    return (
        <div
            onClick={(e) => {
                setNum((prevNum) => prevNum + 1)
            }}
        >{num}</div>
    );
}