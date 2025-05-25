import React, { useState, useEffect } from 'react'
import { getListService } from '../../service'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { STATUS_UAA } from '@/helper/utils'
// import PropTypes from 'prop-types'

const SelectService = (props: any) => {
  const { control, name, ...restProps } = props
  const [listService, setListService] = useState([])
  const [loading, setLoading] = useState(false)
  const prepareData = async () => {
    try {
      setLoading(true)
      const res = await getListService({ page: 0, size: 1000 })
      setListService(
        res?.data?.data?.content
          .filter((v: any) => v.status === STATUS_UAA.PUBLISHED)
          .map((v2) => {
            return {
              ...v2,
              name: `${v2?.code} - ${v2?.name}`,
            }
          })
      )
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    prepareData()
  }, [])

  return (
    <CoreAutocomplete
      control={control}
      name={name}
      options={listService}
      labelPath='name'
      valuePath='id'
      loading={loading}
      {...restProps}
    />
  )
}

//SelectService.defaultProps = {}

//SelectService.propTypes = {}

export default React.memo(SelectService)
