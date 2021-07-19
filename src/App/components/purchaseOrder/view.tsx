import React from 'react'
import { Table, Tag, Space } from 'antd'
import { Link } from 'react-router-dom'
const columns = [
  {
    title: 'Purchase Order',
    dataIndex: 'purchaseOrderNo',
    key: 'purchaseOrderNo',
    render: (text: string) => <Link to='/purchase-order'>{text}</Link>
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
    render: (text: string, record: any) => (
      <Space size='middle'>
        Ha
      </Space>
    )
  }
]

const data = [
  {
    key: '1',
    purchaseOrderNo: 'John Brown',
    status: 'CREATED',
    remarks: 'New York No. 1 Lake Park'
  },
  {
    key: '2',
    purchaseOrderNo: 'Jim Green',
    status: 'FULFILLED',
    remarks: 'London No. 1 Lake Park'
  },
  {
    key: '3',
    purchaseOrderNo: 'Joe Black',
    status: 'CANCELLED',
    remarks: 'Sidney No. 1 Lake Park'
  }
]

const PurchaseOrder: React.FC = () => {
  return (
    <Table columns={columns} dataSource={data} />
  )
}

export default PurchaseOrder
