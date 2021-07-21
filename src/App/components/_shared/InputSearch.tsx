import React, { useState, useMemo, useCallback } from 'react'
import { Select, Spin } from 'antd'
import debounce from 'lodash/debounce'
import axios from 'axios'

interface IInputSearchProps {
    debounceTimeout?: number;
    isBooking?: boolean;
    isPO?: boolean;
    disabled?: boolean
}

const { REACT_APP_BASE_URL: baseUrl } = process.env

const InputSearch: React.FC<IInputSearchProps> = (props) => {
  const { isBooking, isPO, debounceTimeout = 800, ...rest } = props
  const [fetching, setFetching] = useState<boolean>(false)
  const [options, setOptions] = useState<any[] | undefined>([])

  const searchOperation = useCallback(
    async (value) => {
      // Default to /purchase-order/search
      let url = `${baseUrl}/purchase-order/search`
      if (isBooking) {
        url = `${baseUrl}/booking/search`
      }
      try {
        const result = await axios.post(url, { value })
        return result
      } catch (error) {
        console.log('error', error)
      }
    }, [isBooking])

  const debounceFetcher = useMemo(() => {
    const loadOptions = async (value: string) => {
      setFetching(true)

      try {
        const result = await searchOperation(value)
        if (result && result.data) {
          const options = result.data.map((data: Record<any, any>) => ({
            label: isBooking ? data.bookingNo : data.purchaseOrderNo,
            value: data._id
          }))
          setOptions(options)
          setFetching(false)
        }
      } catch (error) {
        console.log('error', error)
        setFetching(false)
      }
    }

    return debounce(loadOptions, debounceTimeout)
  }, [searchOperation, debounceTimeout, isBooking])

  return (
    <Select
      placeholder={isBooking ? 'Search Booking' : 'Search PO'}
      allowClear
      labelInValue
      filterOption={false}
      showSearch
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size='small' /> : null}
      {...rest}
      options={options}
    />
  )
}

export default InputSearch
