import React from 'react'
import Nav from '../../layout/Nav'
import PurchaseOrder from '../../components/purchaseOrder/view'
import CreatePurchaseOrder from '../../components/purchaseOrder/create'

const ShipmentPage: React.FC = (props) => {
  return (
    <Nav>
      <CreatePurchaseOrder />
      <PurchaseOrder />
    </Nav>
  )
}

export default ShipmentPage
