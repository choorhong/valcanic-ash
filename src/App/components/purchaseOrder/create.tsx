import React, { useState, useCallback } from 'react'
import { Form, Input, Button, Select, Modal } from 'antd'

const { Option } = Select
const { TextArea } = Input

const CreatePurchaseOrder = () => {
  const [visible, setVisible] = useState<boolean>(false)

  const [form] = Form.useForm()

  const handleOk = useCallback(async () => {
    try {
      const values = await form.validateFields()
      console.log('values', values)
      setVisible(false)
    } catch (error) {
      console.log('value Error: ', error)
      form.setFields([
        ...error.errorFields
      ])
    }
  }, [form])

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
