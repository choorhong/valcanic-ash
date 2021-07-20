import React, { useCallback } from 'react'
import { Form, Input, Button, Select } from 'antd'
import axios from 'axios'
import DebounceSearch from '../_shared/InputSearch'
import { useHistory } from 'react-router-dom'

const { Option } = Select
const { TextArea } = Input

const { REACT_APP_BASE_URL: baseUrl } = process.env

const CreateShipment = () => {
  const [form] = Form.useForm()
  const history = useHistory()

  const handlSubmit = useCallback(async (values) => {
    const val = {
      ...values,
      bookingNo: values.bookingNo.value,
      purchaseOrderNo: values.purchaseOrderNo.value
    }
    try {
      const result = await axios.post(`${baseUrl}/shipment/create`, val)
      if (result && result.status === 200) {
        history.push('/shipment')
      }
    } catch (error) {
      console.log('value Error: ', error)
    }
  }, [history])

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
      initialValues={{ status: 'CREATED' }}
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
        <DebounceSearch isPO />
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
        <DebounceSearch isBooking />
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
        <Select>
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
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16
        }}
      >
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>

    </Form>
  )
}

export default CreateShipment
