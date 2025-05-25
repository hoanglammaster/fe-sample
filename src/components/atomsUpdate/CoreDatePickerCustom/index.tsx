import React from 'react'
import { Controller, FieldValues, RegisterOptions } from 'react-hook-form'
import DatePickerCustom from '../DatePickerCustom'
import { DatePickerCustomProps } from '../DatePickerCustom'

export interface CoreDatePickerCustomProps extends DatePickerCustomProps {
  control: any
  name: string
  onChangeValue?: (date: string | null) => void
  format?: string
  className?: string
  label?: string
  placeholder?: string
  rules?: RegisterOptions<FieldValues, any>
}

const CoreDatePickerCustom = (props: CoreDatePickerCustomProps) => {
  const { control, onChangeValue, name, rules, ...rest } = props
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { value, onChange, ...props } }) => (
        <DatePickerCustom
          value={value}
          onChangeDate={(date) => {
            onChange(date)
            onChangeValue && onChangeValue(date)
          }}
          {...props}
          {...rest}
        />
      )}
    />
  )
}

export default CoreDatePickerCustom
