import {useRef} from 'react'
import { MessageProvider, MessageRef  } from "@/components/Message";
import { ConfigProvider } from "@/components/Message/ConfigProvider";
import { useMessage } from "@/components/Message/useMessage";

// export const MessageTest = () => {
//     const messageRef = useRef<MessageRef>(null)

//     return (
//         <div>
//             <MessageProvider ref={messageRef} />

//             <button
//                 onClick={() =>{
//                     messageRef.current?.add({
//                         content:'请求成功'
//                     })
//                 }}
//             >成功</button>
//         </div>
//     )
// }



function Aaa() {
    const message = useMessage()
  
    return (
        <button
            onClick={() =>{
                message.add({
                    content:'请求成功'
                })
            }}
        >成功</button>
    )
}

// 在最外层包裹 ConfigProvider 来设置 context，然后在 Aaa 组件里用 useMessage 拿到 message api，调用 add 方法。
export const MessageTest = () => {
    return (
        <ConfigProvider>
            <div>
                <Aaa></Aaa>
            </div>
        </ConfigProvider>
    )
}
