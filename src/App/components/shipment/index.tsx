import React from 'react'
import { Table, Tag, Space } from 'antd'
import { Link } from 'react-router-dom'

interface IShipmentProps {
  shipments: any[]
}

const columns = [
  {
    title: 'ID',
    key: 'id',
    render: (record: Record<any, any>) => {
      return (
        <Link to={`/shipment/${record._id}`} target='_blank'>
          {record._id.slice(-5)}
        </Link>
      )
    }
  },
  {
    title: 'Purchase Order',
    key: 'purchaseOrder',
    render: (record: Record<any, any>) => {
      return (
        <Link to={`/purchase-order/${record.purchaseOrderNo.purchaseOrderNo}`} target='_blank'>
          {record.purchaseOrderNo.purchaseOrderNo}
        </Link>
      )
    }
  },
  {
    title: 'Booking',
    key: 'booking',
    render: (record: Record<any, any>) => {
      return (
        <Link to={`/booking/${record.bookingNo.bookingNo}`} target='_blank'>
          {record.bookingNo.bookingNo}
        </Link>
      )
    }

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
  }
]

const Shipment: React.FC<IShipmentProps> = (props) => {
  const { shipments } = props
  return (
    <Table columns={columns} dataSource={shipments} rowKey={(record) => record._id} />
  )
}

export default Shipment
