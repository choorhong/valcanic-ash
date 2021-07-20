import React, { useState, useCallback } from 'react'
import { Form, Input, Button, Select, Modal } from 'antd'
import axios from 'axios'

interface ICreatePurchaseOrderProps {
  onSetOrder: React.Dispatch<React.SetStateAction<any[]>>;
}

const { Option } = Select
const { TextArea } = Input

const { REACT_APP_BASE_URL: baseUrl } = process.env

const CreatePurchaseOrder: React.FC<ICreatePurchaseOrderProps> = (props) => {
  const { onSetOrder } = props
  const [visible, setVisible] = useState<boolean>(false)

  const [form] = Form.useForm()

  const handleOk = useCallback(async () => {
    try {
      await form.validateFields()
    } catch (error) {
      console.log('value Error: ', error)
      return form.setFields([
        ...error.errorFields
      ])
    }

    try {
      const values = await form.getFieldsValue()
      const result = await axios.post(`${baseUrl}/purchase-order/create`, values)
      if (result.status === 200 && result.data) {
        onSetOrder(orders => {
          const newOrders = [...orders]
          newOrders.push(result.data)
          return newOrders
        })
        setVisible(false)
      }
    } catch (error) {
      console.log('http error: ', error)
    }
  }, [form, onSetOrder])

  const handleCancel = useCallback(
    () => {
      setVisible(false)
    }, [])

  return (
    <>
      <Button
        style={{ marginBottom: '2%' }}
        onClick={() => setVisible(true)}
      >
        Create Purchase Order
      </Button>
      {visible &&
      (

        <Modal
          title='Create Purchase Order'
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          width='65%'
        >
          <Form
            form={form}
            name='create-po'
            labelCol={{
              span: 4
            }}
            wrapperCol={{
              span: 12
            }}
            initialValues={{ status: 'CREATED' }}

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
              <Input />
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
                <Option value='FULFILLED'>FULFILLED</Option>
                <Option value='CANCELLED'>CANCELLED</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label='Remarks'
              name='remarks'
            >
              <TextArea rows={4} />
            </Form.Item>

          </Form>
        </Modal>
      )}
    </>

  )
}

export default CreatePurchaseOrder
