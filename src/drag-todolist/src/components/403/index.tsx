import React from 'react';
import { Button, Result } from 'antd';

export const Page403: React.FC = () => {
    return (
        <div
            style={{
                flex: '1',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
           <Result
                status="403"
                title="403"
                subTitle="Sorry, you are not authorized to access this page."
                // extra={<Button type="primary">Back Home</Button>}
            />
        </div>
    )
}