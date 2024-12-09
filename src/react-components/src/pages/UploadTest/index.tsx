import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
// import type { UploadProps } from 'antd';
// import { Button, message, Upload } from 'antd';
import { Button } from 'antd';
import Upload, { UploadProps } from '@/components/Upload'

// const props: UploadProps = {
//     name: 'file',
//     // action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
//     action: 'http://localhost:3333/upload',
//     headers: {},
//     onChange(info) {
//         if (info.file.status !== 'uploading') {
//             console.log(info.file, info.fileList);
//         }

//         if (info.file.status === 'done') {
//             message.success(`${info.file.name} file uploaded successfully`);
//         }
//         else if (info.file.status === 'error') {
//             message.error(`${info.file.name} file upload failed.`);
//         }
//     },
// }

const props: UploadProps = {
    name: 'file',
    action: 'http://localhost:3333/upload',
    beforeUpload(file) {
        if (file.name.includes('1.')) {
            return false;
        }

        return true;
    },
    onSuccess(ret) {
        console.log('onSuccess', ret);
    },
    onError(err) {
        console.log('onError', err);
    },
    onProgress(percentage, file) {
        console.log('onProgress', percentage);
    },
    onChange(file) {
        console.log('onChange', file);
    }
}

export const UploadTest = () => {
    return (
        <Upload
            {...props}
            drag
        >
            {/* <Button icon={<UploadOutlined />}>Click to Upload</Button> */}

            <p>
                <InboxOutlined style={{fontSize: '50px'}}/>
            </p>

            <p>点击或者拖拽文件到此处</p>
        </Upload>
    )
}