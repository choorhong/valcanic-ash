import React, { useEffect, useState } from 'react'
import Nav from '../../layout/Nav'
import axios from 'axios'
import { useParams } from 'react-router-dom'

interface IViewParams {
  id: string
}

const { REACT_APP_BASE_URL: baseUrl } = process.env

const ViewPurchaseOrderPage: React.FC = (props) => {
  const [orders, setOrders] = useState<any[]>([])
  const params = useParams<IViewParams>()

  useEffect(() => {
    (async () => {
      const result = await axios.get(`${baseUrl}/purchase-order/${params.id}`)
      if (result && result.data) {
        setOrders(result.data)
      }
    }
    )()
  }, [params.id])

  return (
    <Nav>
      <pre>{JSON.stringify(orders[0], null, 4)}</pre>
    </Nav>
  )
}

export default ViewPurchaseOrderPage
