/**
* 统一请求方式
*/
import axios from 'axios';
import {HTTP_METHOD} from './httpType';
import {message} from 'antd';
import {base64ToBlob} from '@utils/index';
import {split, get} from 'loadsh'

/**
* axios
*
* need to import 'axios' at top
* https://github.com/mzabriskie/axios
*/
export const httpRuquest = (
    url: string,
    method: HTTP_METHOD = HTTP_METHOD.GET,
    data: any = {},
    credentials: boolean = false,
    headers: any = {}
) => {
    const options: any = {
        url,
        method,
        headers: {},
        withCredentials: credentials
    };

    try {
        // options.headers['X-Access-Token'] = getUserInfo().accessToken; 
        // options.headers['X-Device'] = getUserInfo().deviceInfo.deviceName === 'pc' ? 'pc' : getUserInfo().deviceInfo.deviceType;
        // options.headers['X-Device-Id'] = getUserInfo().deviceInfo.deviceId ?? getUserInfo().deviceId;
        // options.headers['Company-Id'] = getUserInfo().companyId; 
        // options.headers['User-Id'] = getUserInfo().deviceInfo.aesUserId
        options.timeout = 1000 * 60 * 1;
    }
    catch(error) {
        console.error('not headers!!!!!')
    }

    if (method !== HTTP_METHOD.GET) {
        if (headers) {
            for (let key in headers) {
                options.headers[key] = headers[key];
            }
        }
        else{
            options.headers['Accept'] = 'application/json, text/javascript';
            options.headers['Content-Type'] = 'application/json;charset=UTF-8';
        }
        options.data = data;
    }
    else if (method === HTTP_METHOD.GET) {
        options.params = data
    }
    else {
        throw new Error(`未知的HTTP Method:${method}`)
    }

    const instance = axios.create();
    instance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (!error.response) {
                error.response = {}
            }

            return Promise.reject(error.response)
        }
    )

    return instance(options);
}

/**
* 发送请求
*/
export const request = httpRuquest.request = async (
    url: string,
    method: HTTP_METHOD = HTTP_METHOD.GET,
    data: any = {},
    credentials: boolean = false,
    headers: any = {}
) => {
    const response = await httpRuquest(url, method, data, credentials, headers);
    const {data: responseData, status, statusText} = response ?? {}
    const {message: responseDataMessage, msg, code} = responseData ?? {}

    if (status < 200 || status >= 300) {
        const err: any = new Error(`HTTP(${url}) ERROR(${statusText})`)
        err.code = status

        message.error('systerm is Error!')

        throw err
    }

    if (code === 4001) {
        message.error(responseDataMessage)
    }

    if (response.data.code === 4000) {
        //入职登记表获取信息时 不需要此提示
        if (
            window.location.hash.indexOf('/entryform') > -1
            || window.location.hash.indexOf('/identifyCard') > -1
            || window.location.hash.indexOf('/notice/detail') > -1
        ) {
            return response?.data
        }

        message.info(msg || responseDataMessage)
    }

    return responseData
}

/**
* 上传文件
*/
export const updateFile = httpRuquest.updateFile = async (
    url: string,
    files: any,
    name: string,
    isbase64: any,
    type: string,
    headers: any
) => {
    let data: any = null;
    let contentType: any = {};

    if (isbase64) {
        // 创建form对象
        data = new FormData();  
        files.map((file: any) => {
            const fileData = name ? base64ToBlob(file,type,name) : file;
            // 通过append向form对象添加数据
            data.append(name || 'file', fileData, fileData.name)  
            // FormData私有类对象，访问不到，可以通过get判断值是否传进去
            //console.log(data.get('file')) 
            contentType = {'Content-Type': 'multipart/form-data'};
            
            return file;
        })   
    }
    else {
        if (name) {
            data = new FormData(); 
            Object.keys(files).map((item: any) => {
                data.append(item, files[item]); 

                return item;
            })
            contentType = {'Content-Type': 'multipart/form-data'};

            if (headers) {
                contentType = Object.assign(contentType, headers);
            }
        }
        else{
            data = files;
        }
    }

    const response = await httpRuquest(url, HTTP_METHOD.POST, data, false,contentType);
    const {data: responseData, status, statusText} = response ?? {}
    let newResponseData = responseData

    if (status < 200 || status >= 300) {
        const err: any = new Error(`HTTP(${url}) ERROR(${statusText})`);
        err.code = status;
        throw err
    }

    let urlList = split(url,'/')
    if (urlList[urlList.length - 1] === 'upload-chat-file') {
        // 永中的上传接口
        let newRes: any = JSON.parse(JSON.stringify(responseData));
        let newParmasData = {
            name: get(newRes, 'data.original_name'),
            file_name: get(newRes, 'data.original_name'),
            fileUrl: get(newRes, 'data.url'),
            // fileViewPath: get(newRes, 'view_path.filePath'),
            fileViewPath: newRes?.view_path?.filePath ? newRes?.view_path?.filePath : '',
            size: get(newRes, 'data.file_size')
        };

        newRes.data = Object.assign(newRes?.data, newParmasData);

        newResponseData = newRes
    }
    
    return newResponseData
}
