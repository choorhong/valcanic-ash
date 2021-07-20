import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Nav from '../../layout/Nav'
import Booking from '../../components/booking'
import CreateBooking from '../../components/booking/create'

const { REACT_APP_BASE_URL: baseUrl } = process.env

const BookingPage: React.FC = (props) => {
  const [bookings, setBookings] = useState<any[]>([])

  useEffect(() => {
    (async () => {
      const result = await axios.get(`${baseUrl}/booking`)
      if (result && result.data) {
        setBookings(result.data)
      }
    }
    )()
  }, [])

  return (
    <Nav>
      <CreateBooking onSetBooking={setBookings} />
      <Booking bookings={bookings} />
    </Nav>
  )
}

export default BookingPage
