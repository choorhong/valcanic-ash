import React from 'react'
import Nav from '../../layout/Nav'
import CreateShipment from '../../components/shipment/create'

const ShipmentPage: React.FC = (props) => {
  return (
    <Nav>
      <CreateShipment />
    </Nav>
  )
}

export default ShipmentPage
