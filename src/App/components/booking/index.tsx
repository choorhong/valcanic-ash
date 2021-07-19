import React from 'react'
import { Table, Tag } from 'antd'
import { Link } from 'react-router-dom'

const columns = [
  {
    title: 'Booking No',
    dataIndex: 'bookingNo',
    key: 'booking',
    render: (text: any) => <Link to='/booking'>{text}</Link>
  },
  {
    title: 'Departure',
    key: 'departure',
    dataIndex: 'departure',
    render: (arrival: Record<any, any>) => {
      return (
        <>
          <Tag color='geekblue'>
            {arrival.date}
          </Tag>
          <Tag color='green'>
            {arrival.location}
          </Tag>
        </>
      )
    }
  },
  {
    title: 'Arrival',
    key: 'arrival',
    dataIndex: 'arrival',
    render: (arrival: Record<any, any>) => {
      return (
        <>
          <Tag color='geekblue'>
            {arrival.date}
          </Tag>
          <Tag color='volcano'>
            {arrival.location}
          </Tag>
        </>
      )
    }
  }
]

const data = [
  {
    key: '1',
    bookingNo: 'ZRWV593355666',
    departure: { date: '2021-07-13', location: 'Los Angeles, CA' },
    arrival: { date: '2021-07-19', location: 'Penang, Malaysia' },
    remarks: 'New York'
  },
  {
    key: '2',
    bookingNo: 'YEJZ041336228',
    departure: { date: '2021-07-13', location: 'Los Angeles, CA' },
    arrival: { date: '2021-07-19', location: 'Penang, Malaysia' },
    remarks: undefined

  },
  {
    key: '3',
    bookingNo: 'YEJZ041336228',
    departure: { date: '2021-07-13', location: 'Los Angeles, CA' },
    arrival: { date: '2021-07-19', location: 'Penang, Malaysia' },
    remarks: 'Yup'

  }
]

const Booking: React.FC = () => {
  return (
    <Table columns={columns} dataSource={data} />
  )
}

export default Booking
