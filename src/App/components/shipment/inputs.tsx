import React, { useCallback, useMemo } from 'react'
import { Form, Input, Button, Select } from 'antd'
import axios from 'axios'
import DebounceSearch from '../_shared/InputSearch'
import { useHistory } from 'react-router-dom'

const { Option } = Select
const { TextArea } = Input

const { REACT_APP_BASE_URL: baseUrl } = process.env

interface IShipmentProps {
    disabled?: boolean;
    shipment?: Record<any, any>;
}

const CreateShipment: React.FC<IShipmentProps> = (props) => {
  const { disabled, shipment } = props
  const [form] = Form.useForm()
  const history = useHistory()

  const defaultValues = useMemo(() => {
    if (shipment) {
      return {
        purchaseOrderNo: { label: shipment.purchaseOrderNo.purchaseOrderNo, value: shipment.purchaseOrderNo._id },
        bookingNo: { label: shipment.bookingNo.bookingNo, value: shipment.bookingNo._id },
        status: shipment.status,
        remarks: shipment.remarks
      }
    }

    return { status: 'CREATED' }
  }, [shipment])

  const handlSubmit = useCallback(async (values) => {
    const val = {
      ...values,
      bookingNo: values.bookingNo.value,
      purchaseOrderNo: values.purchaseOrderNo.value
    }

    let url = `${baseUrl}/shipment/create`
    if (shipment) {
      url = `${baseUrl}/shipment/edit?id=${shipment._id}`
    }

    try {
      const result = await axios.post(url, val)
      if (result && result.status === 200) {
        history.push('/shipment')
      }
    } catch (error) {
      console.log('value Error: ', error)
    }
  }, [history, shipment])

  return (
    <Form
      form={form}
      name='create-shipment'
      labelCol={{
        span: 4
      }}
      wrapperCol={{
        span: 12
      }}
      initialValues={defaultValues}
      onFinish={handlSubmit}
    >
      <Form.Item
        label='PO #'
        name='purchaseOrderNo'
        rules={[
          {
            required: true,
            message: 'Needed'
          }
        ]}
      >
        <DebounceSearch isPO disabled={disabled} />
      </Form.Item>

      <Form.Item
        label='Booking'
        name='bookingNo'
        rules={[
          {
            required: true,
            message: 'Needed'
          }
        ]}
      >
        <DebounceSearch isBooking disabled={disabled} />
      </Form.Item>

      <Form.Item
        label='Status'
        name='status'
        rules={[
          {
            required: true,
            message: 'Needed'
          }
        ]}
      >
        <Select disabled={disabled}>
          <Option value='CREATED'>CREATED</Option>
          <Option value='SCHEDULED'>SCHEDULED</Option>
          <Option value='SHIPPED'>SHIPPED</Option>
          <Option value='FULFILLED'>FULFILLED</Option>
          <Option value='PAID'>PAID</Option>
          <Option value='CANCELLED'>CANCELLED</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label='Remarks'
        name='remarks'
      >
        <TextArea rows={4} disabled={disabled} />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 4,
          span: 12
        }}
      >
        <Button type='primary' htmlType='submit' disabled={disabled}>
          Submit
        </Button>
      </Form.Item>

    </Form>
  )
}

export default CreateShipment
