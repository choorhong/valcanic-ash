import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Input, Button, Tooltip } from 'antd'
import { useHistory } from 'react-router-dom'
import { PlusOutlined } from '@ant-design/icons'
import Nav from '../../layout/Nav'
import Shipment from '../../components/shipment'

const { Search } = Input

const { REACT_APP_BASE_URL: baseUrl } = process.env

const ShipmentPage: React.FC = (props) => {
  const [shipments, setShipments] = useState<any[]>([])

  useEffect(() => {
    (async () => {
      const result = await axios.get(`${baseUrl}/shipment`)
      if (result && result.data) {
        setShipments(result.data)
      }
    }
    )()
  }, [])

  const history = useHistory()
  return (
    <Nav>
      <span style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2%' }}>
        <Search placeholder='Search by Booking or Purchase Order' loading />
        <Tooltip title='Add Shipment'>
          <Button icon={<PlusOutlined />} onClick={() => history.push('/shipment/create')} />
        </Tooltip>
      </span>
      <Shipment shipments={shipments} />
    </Nav>
  )
}

export default ShipmentPage
