import React from 'react'
import { Table, Tag } from 'antd'
import { Link } from 'react-router-dom'
import moment from 'moment'

interface IBookingsProps {
  bookings: any[];
}

const columns = [
  {
    title: 'Booking No',
    dataIndex: 'bookingNo',
    key: 'booking',
    render: (text: any) => <Link to={`/booking/${text}`} target='_blank'>{text}</Link>
  },
  {
    title: 'Departure',
    key: 'departure',
    dataIndex: 'departure',
    render: (arrival: Record<any, any>) => {
      return (
        <>
          <Tag color='geekblue'>
            {moment(arrival.date).format('YYYY-MM-DD')}
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
            {moment(arrival.date).format('YYYY-MM-DD')}
          </Tag>
          <Tag color='volcano'>
            {arrival.location}
          </Tag>
        </>
      )
    }
  }
]

const Booking: React.FC<IBookingsProps> = (props) => {
  const { bookings } = props

  return (
    <Table columns={columns} dataSource={bookings} rowKey={(record) => record._id} />
  )
}

export default Booking
