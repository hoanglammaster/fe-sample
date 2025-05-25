import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { Box } from '@mui/material'
import React from 'react'
import { FieldClusterItem, FormClusterProps } from './type'
import CoreDatePickerCustom from '@/components/atomsUpdate/CoreDatePickerCustom'
import CoreDateRangePicker from '@/components/atomsUpdate/CoreDateRangePickerCustom'
import CoreInput from '@/components/atomsUpdate/CoreInput'
import CoreCheckbox from '@/components/atomsUpdate/CoreCheckbox'

const FormCluster = (props: FormClusterProps) => {
  const { arrayFieldItem, methodForm, colSpan, className } = props

  const { control } = methodForm
  return (
    <Box
      className={`w-full grid grid-cols-${colSpan ?? 2} gap-10 ${className}`}
    >
      {arrayFieldItem.map((item: FieldClusterItem, index: number) => {
        return (
          <Box key={index} className={`col-span-${item?.colSpan ?? 1}`}>
            {item.fieldType === 'input' && (
              <CoreInput
                control={control}
                name={item.name}
                required={item.required}
                className={item.className}
                label={item.label}
                onChangeValue={item.onChangeValue}
                {...item.fieldProps}
              />
            )}
            {item.fieldType === 'select' && (
              <CoreAutocomplete
                control={control}
                className={item.className}
                name={item.name}
                required={item.required}
                options={item.options}
                onChangeValue={item.onChangeValue}
                label={item.label}
                {...(item.fieldProps as any)}
              />
            )}
            {item.fieldType === 'date' && (
              <CoreDatePickerCustom
                control={control}
                name={item.name}
                required={item.required}
                className={item.className}
                label={item.label}
                {...item.fieldProps}
              />
            )}
            {item.fieldType === 'dateRange' && (
              <CoreDateRangePicker
                control={control}
                {...item}
                {...item.fieldProps}
              />
            )}
            {item.fieldType === 'checkbox' && (
              <CoreCheckbox
                name={item.name}
                control={control}
                label={item.label}
                onChangeValue={item.onChangeValue}
                {...item.fieldProps}
              />
            )}
          </Box>
        )
      })}
    </Box>
  )
}

export default FormCluster
