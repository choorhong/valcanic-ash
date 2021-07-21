import React, { useEffect, useState, useCallback } from 'react'
import Nav from '../../layout/Nav'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'
import EditShipment from '../../components/shipment/inputs'
import { Button, Popconfirm } from 'antd'
import { EditOutlined, LoadingOutlined, ExclamationOutlined } from '@ant-design/icons'

interface IViewParams {
  id: string
}

const { REACT_APP_BASE_URL: baseUrl } = process.env

const ViewShipmentPage: React.FC = () => {
  const [shipment, setShipment] = useState<Record<any, any>>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [disabled, setDisabled] = useState<boolean>(true)
  const history = useHistory()

  const params = useParams<IViewParams>()

  useEffect(() => {
    (async () => {
      const result = await axios.get(`${baseUrl}/shipment/${params.id}`)
      if (result && result.data) {
        setShipment(result.data)
        setIsLoading(false)
      }
    }
    )()
  }, [params.id])

  const handleDelete = useCallback(
    async () => {
      try {
        await axios.delete(`${baseUrl}/shipment/delete?id=${params.id}`)
        history.push('/shipment')
      } catch (error) {
        console.log('Delete shipment error:', error)
      }
    }, [history, params.id])

  return (
    <Nav>
      <Button
        icon={<EditOutlined />}
        style={{ margin: '0 2% 2% 0' }}
        onClick={() => { setDisabled(d => !d) }}
      >
        {disabled ? 'Edit Shipment' : 'Cancel Edit'}
      </Button>
      <Popconfirm
        title='Are you sure to delete?'
        onConfirm={handleDelete}
        okText='Yes'
        okType='danger'
        cancelText='No'
      >
        <Button
          icon={<ExclamationOutlined />}
          style={{ margin: '0 2% 2% 0' }}
          danger
          type='ghost'
        >
          Delete Shipment
        </Button>
      </Popconfirm>,

      {
        isLoading
          ? <div><LoadingOutlined /></div>
          : <EditShipment disabled={disabled} shipment={shipment} />
      }
    </Nav>
  )
}

export default ViewShipmentPage
