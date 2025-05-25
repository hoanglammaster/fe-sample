import { TextField } from '@mui/material'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import moment, { Moment } from 'moment'
import Image from 'next/image'
import * as React from 'react'
import { Control, Controller } from 'react-hook-form'

export type DatePickerCustomProps = {
  locale?: string
  disabled?: boolean
  disableFuture?: boolean
  acceptRegex?: any
  closeOnSelect?: boolean
  disableHighlightToday?: boolean
  disableMaskedInput?: boolean
  disableOpenPicker?: boolean
  disablePast?: boolean
  inputFormat?: string
  shouldDisableDate?: any
  shouldDisableMonth?: any
  shouldDisableYear?: any
  title?: React.ReactNode
  placeholder?: string
  value?: any
  onChange?: (value: any) => void
  error?: boolean
  helperText?: string
  control: Control<any>
  name: string
  format?: string
  genus?: 'small' | 'normal'
  rules?: object
  required?: boolean
  trigger?: any
  minDate?: any
  maxDate?: any
}

export const DatePickerCustom = (props: DatePickerCustomProps) => {
  const {
    locale = 'en-US',
    value,
    onChange,
    title,
    placeholder = 'dd/mm/yyyy',
    inputFormat = 'DD/MM/YYYY',
    error,
    control,
    name,
    format,
    helperText,
    genus = 'normal',
    rules,
    required,
    trigger,
    ...rest
  } = props

  return (
    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={locale}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value, ref } }) => (
          <DatePicker
            label={title}
            value={value ? (format ? moment(value, format) : value) : null}
            onChange={(newValue: Moment | null) => {
              if (newValue) {
                if (format) {
                  onChange(newValue.format(format))
                } else {
                  onChange(newValue.isValid() ? newValue.format() : newValue)
                }
              } else {
                onChange(null)
              }
              trigger && trigger()
            }}
            inputRef={ref}
            inputFormat={inputFormat}
            components={{
              OpenPickerIcon: () => (
                <div className='pr-6'>
                  <Image src={require('@/assets/svg/iconDate.svg')} alt='' />
                </div>
              ),
            }}
            {...rest}
            renderInput={(params: any) => (
              <TextField
                {...params}
                fullWidth
                variant='standard'
                onBlur={(e) => {
                  const value = e.target.value
                  if (value) {
                    const date = moment(value, inputFormat)
                    if (date.isValid()) {
                    } else {
                      onChange(null)
                    }
                  }
                }}
                required={required}
                error={error}
                helperText={helperText}
                value={
                  value
                    ? format && moment(value, format).isValid()
                      ? moment(value, format)
                      : value
                    : null
                }
                inputProps={{
                  ...params.inputProps,
                  placeholder,
                }}
                InputProps={{
                  ...params.InputProps,
                  required: false,
                  ...(genus === 'small'
                    ? {
                        style: {
                          minHeight: '38px',
                          height: '38px',
                        },
                      }
                    : {}),
                }}
              />
            )}
          />
        )}
        rules={rules}
      />
    </LocalizationProvider>
  )
}
