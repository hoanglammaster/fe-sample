import DateRangePicker, {
  DateRangeCustomProps,
} from '@/components/atoms/DateRangePicker'
import React from 'react'
import { Controller, FieldValues, RegisterOptions } from 'react-hook-form'

export interface CoreDateRangePickerCustomProps extends DateRangeCustomProps {
  control: any
  startName: string
  endName: string
  onChangeValue?: (start: string | null, end: string | null) => void
  format?: string
  className?: string
  label?: string
  placeholder?: string
  startRules?: Omit<
    RegisterOptions<FieldValues, string>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >
  endRules?: Omit<
    RegisterOptions<FieldValues, string>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >
  readOnly?: boolean
}

const CoreDateRangePicker = (props: CoreDateRangePickerCustomProps) => {
  const {
    control,
    endName,
    onChangeValue,
    startName,
    startRules,
    endRules,
    ...rest
  } = props
  return (
    <Controller
      name={startName}
      control={control}
      rules={startRules}
      render={({
        field: { value: startValue, onChange: onChangeStart, ...props },
      }) => (
        <Controller
          name={endName}
          control={control}
          rules={endRules}
          render={({
            field: { value: endValue, onChange: onChangeEnd, ...props2 },
          }) => (
            <DateRangePicker
              start={startValue}
              end={endValue}
              onChangeDate={(start, end) => {
                onChangeStart(start)
                onChangeEnd(end)
                onChangeValue && onChangeValue(start, end)
              }}
              {...props}
              {...props2}
              {...rest}
            />
          )}
        />
      )}
    />
  )
}

export default CoreDateRangePicker
