import React from 'react'
import { Table, Tag } from 'antd'
import { Link } from 'react-router-dom'

interface IPurchaseOrderProps {
  orders: any[];
}

const columns = [
  {
    title: 'Purchase Order',
    dataIndex: 'purchaseOrderNo',
    key: 'purchaseOrderNo',
    render: (text: string) => <Link to={`/purchase-order/${text}`} target='_blank'>{text}</Link>
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (status: string) => {
      let color: string
      if (status === 'CREATED') {
        color = 'geekblue'
      } else if (status === 'FULFILLED') {
        color = 'green'
      } else if (status === 'CANCELLED') {
        color = 'volcano'
      } else {
        color = 'cyan'
      }

      return (
        <Tag color={color}>
          {status}
        </Tag>
      )
    }
  },
  {
    title: 'Remarks',
    key: 'remarks',
    dataIndex: 'remarks'
  }
]

const PurchaseOrder: React.FC<IPurchaseOrderProps> = (props) => {
  const { orders } = props
  return (
    <Table columns={columns} dataSource={orders} rowKey={(record) => record._id} />

  )
}

export default PurchaseOrder
