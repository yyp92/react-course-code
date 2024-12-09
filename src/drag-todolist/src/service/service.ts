import {request} from './request'
import {apiUrl} from './api'

// 具体的接口
export const getDemo = () => {
    const queryData = {}

    return request(
        `${apiUrl.xx}`,
        undefined,
        queryData
    );
}