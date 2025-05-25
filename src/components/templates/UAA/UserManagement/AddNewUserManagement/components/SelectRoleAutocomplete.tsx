import React, { useEffect, useState } from 'react'
import { getListRole } from '../../service'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { STATUS_UAA } from '@/helper/utils'

interface Props {
  className?: string
  control: any
  productId: number
  name: string
}

const SelectRoleAutocomplete = (props: Props) => {
  const { className, name, control, productId } = props

  const [option, setOption] = useState<any>([])

  const getListRoleOption = async (id: number) => {
    try {
      const res = await getListRole({ systemId: id })
      setOption(res?.data?.data?.content ?? [])
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (productId) {
      getListRoleOption(productId)
    }
  }, [productId])

  return (
    <CoreAutocomplete
      className={className}
      label={'Permission Group'}
      control={control}
      name={`${name}.roles`}
      required
      valuePath='id'
      labelPath='name'
      returnValueType='enum'
      multiple
      disabled={!productId}
      options={option}
    />
  )
}

export default SelectRoleAutocomplete
