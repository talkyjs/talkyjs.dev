import React from 'react'
import {  Row, Col, Card } from 'antd'

type Props = {
    items: Array<{
        title: string;
        content: string | JSX.Element
    }>
}
export const StaticCardGrid = (props: Props) => {
    return (
    <Row gutter={16}>
        {props.items.map((item, i)=> (
            <Col span={12} style={{marginBottom: 16}} key={i}>
            <Card title={item.title}>
                {item.content}
            </Card>
            </Col>
        ))}
    </Row>
    )
}