import React, { useState, useCallback } from 'react'
import { Form, Input, Button, DatePicker, Modal } from 'antd'
import moment from 'moment'
import { randomIdGenerator } from '../../utils/idGenerators'
import axios from 'axios'

interface ICreateBookingProps {
  onSetBooking: React.Dispatch<React.SetStateAction<any[]>>;
}

const { TextArea } = Input

const CreateBooking: React.FC<ICreateBookingProps> = (props) => {
  const { onSetBooking } = props
  const [visible, setVisible] = useState<boolean>(false)

  const [form] = Form.useForm()

  const handleOk = useCallback(async () => {
    try {
      const values = await form.validateFields()
      const modifiedValues = {
        bookingNo: values.bookingNo,
        remarks: values.remarks,
        arrival: {
          date: moment(values.arrivalDate).format('YYYY-MM-DD'),
          location: values.arrivalLocation
        },
        departure: {
          date: moment(values.departureDate).format('YYYY-MM-DD'),
          location: values.departureLocation
        }
      }
      const result = await axios.post('http://localhost:8000/booking/create', modifiedValues)
      if (result.status === 200 && result.data) {
        onSetBooking(bookings => {
          const newBookings = [...bookings]
          newBookings.push(result.data)
          return newBookings
        })
        setVisible(false)
      }
    } catch (error) {
      console.log('value Error: ', error)
      form.setFields([
        ...error.errorFields
      ])
    }
  }, [form, onSetBooking])

  const handleCancel = useCallback(
    () => {
      setVisible(false)
    }, [])

  const randomBookingNo = randomIdGenerator()

  return (
    <>
      <Button
        style={{ marginBottom: '2%' }}
        onClick={() => setVisible(true)}
      >
        Create Booking
      </Button>
      {visible &&
        (
          <Modal
            title='Create Booking'
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            width='65%'
          >
            <Form
              form={form}
              name='create-booking'
              labelCol={{
                span: 4
              }}
              wrapperCol={{
                span: 12
              }}
              initialValues={{
                bookingNo: randomBookingNo,
                departureLocation: 'Los Angeles, CA',
                arrivalLocation: 'Penang, Malaysia'
              }}
            >
              <Form.Item
                label='Booking #'
                name='bookingNo'
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
                label='Departure'
                style={{
                  marginBottom: 0
                }}
                required
              >
                <Form.Item
                  name='departureDate'
                  style={{
                    display: 'inline-block',
                    width: '40%'
                  }}
                  rules={[
                    {
                      required: true,
                      message: 'Needed'
                    }
                  ]}
                >
                  <DatePicker placeholder='Date' />
                </Form.Item>
                <Form.Item
                  name='departureLocation'
                  style={{
                    display: 'inline-block',
                    width: '60%'
                  }}
                  rules={[
                    {
                      required: true,
                      message: 'Needed'
                    }
                  ]}
                >
                  <Input placeholder='Location' />
                </Form.Item>
              </Form.Item>

              <Form.Item
                label='Arrival'
                style={{
                  marginBottom: 0
                }}
                required
              >
                <Form.Item
                  name='arrivalDate'
                  style={{
                    display: 'inline-block',
                    width: '40%'
                  }}
                  rules={[
                    {
                      required: true,
                      message: 'Needed'
                    }
                  ]}
                >
                  <DatePicker placeholder='Date' />
                </Form.Item>
                <Form.Item
                  name='arrivalLocation'
                  style={{
                    display: 'inline-block',
                    width: '60%'
                  }}
                  rules={[
                    {
                      required: true,
                      message: 'Needed'
                    }
                  ]}
                >
                  <Input placeholder='Location' />
                </Form.Item>
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

export default CreateBooking
