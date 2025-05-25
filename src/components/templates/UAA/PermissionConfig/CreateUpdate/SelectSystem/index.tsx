import React, { useEffect, useState } from 'react'
import { getAllSystem } from '../service'
import { errorMsg } from '@/helper/message'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { STATUS_UAA } from '@/helper/utils'

const SelectSystem = (props: any) => {
  const { control, name, required, ...restProps } = props
  const [listSystem, setListSystem] = useState<any[]>([])
  const prepareData = async () => {
    try {
      const res = await getAllSystem()
      setListSystem(
        res?.data?.data?.content?.filter(
          (v: any) => v.status === STATUS_UAA.PUBLISHED
        ) ?? []
      )
    } catch (error) {}
  }

  useEffect(() => {
    prepareData()
  }, [])

  return (
    <CoreAutocomplete
      control={control}
      name={name}
      options={listSystem?.map((v) => {
        return { ...v, name: `${v?.code ?? ''} - ${v?.name ?? ''}` }
      })}
      labelPath='name'
      valuePath='id'
      required={required}
      {...restProps}
    />
  )
}

export default SelectSystem
