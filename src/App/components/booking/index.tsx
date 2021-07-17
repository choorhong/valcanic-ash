import React from 'react'
import { Table, Tag, Space } from 'antd'

const columns = [
  {
    title: 'Booking',
    dataIndex: 'name',
    key: 'name',
    render: (text: any) => <a>{text}</a>
  },
  {
    title: 'Forwarder',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: 'ERD / Cut off',
    key: 'tags',
    dataIndex: 'tags',
    render: (tags: any) => (
      <>
        {tags.map((tag: any) => {
          let color = tag.length > 5 ? 'geekblue' : 'green'
          if (tag === 'loser') {
            color = 'volcano'
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          )
        })}
      </>
    )
  },
  {
    title: 'Vessel',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: 'Note',
    key: 'action',
    render: (text: string, record: any) => (
      <Space size='middle'>
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    )
  }
]

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York',
    tags: ['nice', 'developer']
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No',
    tags: ['loser']
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No',
    tags: ['cool', 'teacher']
  }
]

const Booking: React.FC = () => {
  return (
    <Table columns={columns} dataSource={data} />
  )
}

export default Booking
