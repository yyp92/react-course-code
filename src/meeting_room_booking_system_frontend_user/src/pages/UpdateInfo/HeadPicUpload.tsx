import { InboxOutlined } from "@ant-design/icons";
import { Button, Input, message } from "antd";
import axios from "axios";
import Dragger, { DraggerProps } from "antd/es/upload/Dragger";
import { presignedUrl } from "../../utils/interfaces";


interface HeadPicUploadProps {
    value?: string;
    onChange?: Function
}

export function HeadPicUpload(props: HeadPicUploadProps) {
    const draggerprops: DraggerProps = {
        name: 'file',
        // action: 'http://localhost:3005/user/upload',
        action: async (file) => {
            const res = await presignedUrl(file.name);
            return res.data.data;
        },
        /**
         * 为什么要 customRequest 呢？
         * 因为默认 Dragger 是用 FormData 的格式上传的，也就是 key value 的格式。
         * 我们指定的 name 就是 key。
         * 但是 minio 要求直接把文件放到 body 里。
         * 所以我们要用 customRequest 自定义请求方式。
         */
        async customRequest(options) {
            const { onSuccess, file, action } = options;
        
            const res = await axios.put(action, file);
        
            onSuccess!(res.data);
        },
        
        onChange(info) {
            const { status } = info.file
    
            if (status === 'done') {
                // console.log(info.file.response) 
                // 这样表单的值就会改，触发重新渲染，就可以看到新的头像
                if (typeof props.onChange === 'function') {
                    // props.onChange(info.file.response.data) 
                    props.onChange('http://localhost:9000/meeting-room-booking-system/' + info.file.name);
                }  
                
                message.success(`${info.file.name} 文件上传成功`);
            }
            else if (status === 'error') {
                message.error(`${info.file.name} 文件上传失败`)
            }
        }
    };
    
    const dragger = (
        <Dragger {...draggerprops}>
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
    
            <p className="ant-upload-text">点击或拖拽文件到这个区域来上传</p>
        </Dragger>
    )

    return props?.value
        ? (
            <div>
                <img
                    // src={'http://localhost:3005/' + props.value}
                    src={props?.value}
                    alt="头像"
                    width="100"
                    height="100"
                />

                {dragger}
            </div>
        )
        : (
            <div>
                {dragger}
            </div>
        )
}
