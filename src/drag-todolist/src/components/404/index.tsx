import React from 'react';
import { Button, Result } from 'antd';

export const Page404: React.FC = () => {
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
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                // extra={<Button type="primary">Back Home</Button>}
            />
        </div>
    )
}

 