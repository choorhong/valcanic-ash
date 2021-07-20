import React, { useEffect, useState } from 'react'
import Nav from '../../layout/Nav'
import axios from 'axios'
import { useParams } from 'react-router-dom'

interface IViewParams {
  id: string
}

const { REACT_APP_BASE_URL: baseUrl } = process.env

const ViewBookingPage: React.FC = (props) => {
  const [bookings, setBookings] = useState<any[]>([])
  const params = useParams<IViewParams>()

  useEffect(() => {
    (async () => {
      const result = await axios.get(`${baseUrl}/booking/${params.id}`)
      if (result && result.data) {
        setBookings(result.data)
      }
    }
    )()
  }, [params.id])

  return (
    <Nav>
      <pre>{JSON.stringify(bookings[0], null, 4)}</pre>
    </Nav>
  )
}

export default ViewBookingPage
