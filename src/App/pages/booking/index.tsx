import React from 'react'
import Nav from '../../layout/Nav'
import Booking from '../../components/booking'
import CreateBooking from '../../components/booking/create'

const BookingPage: React.FC = (props) => {
  return (
    <Nav>
      <CreateBooking />
      <Booking />
    </Nav>
  )
}

export default BookingPage
