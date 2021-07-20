import React, { useEffect, useState } from 'react'
import Nav from '../../layout/Nav'
import PurchaseOrder from '../../components/purchaseOrder'
import CreatePurchaseOrder from '../../components/purchaseOrder/create'
import axios from 'axios'

const ShipmentPage: React.FC = (props) => {
  const [orders, setOrders] = useState<any[]>([])

  useEffect(() => {
    (async () => {
      const result = await axios.get('http://localhost:8000/purchase-order')
      if (result && result.data) {
        setOrders(result.data)
      }
    }
    )()
  }, [])

  return (
    <Nav>
      <CreatePurchaseOrder onSetOrder={setOrders} />
      <PurchaseOrder orders={orders} />
    </Nav>
  )
}

export default ShipmentPage
