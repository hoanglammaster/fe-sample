import { Box } from '@mui/material'
import TextField from '@mui/material/TextField'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { log } from 'console'
import PropTypes from 'prop-types'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { Control, Controller, FieldError } from 'react-hook-form'

export type DatePickerCustomProps = {
  className?: string
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
  error?: FieldError | undefined
  size?: string
  style?: React.CSSProperties
  required?: boolean
  control?: Control<any>
  name: string
  rules?: any
  format?: string
  readOnly?: boolean
}

const locale = 'en-US'

const CustomTextFieldForeDate = (props: any) => {
  const { inputProps, valueMoment, readOnly } = props
  const [value, setValue] = useState('')

  useEffect(() => {
    setValue(inputProps?.value)
  }, [inputProps?.value])

  return (
    <TextField
      {...props}
      value={value}
      variant='standard'
      inputProps={{ ...props.inputProps, value: value }}
      onBlur={(e: any) => {
        !valueMoment && setValue('')
      }}
      InputProps={{ readOnly: readOnly, disableUnderline: readOnly }}
    />
  )
}

const DatePickerCustom = (props: DatePickerCustomProps) => {
  const {
    value,
    onChange,
    size,
    title,
    placeholder,
    className,
    inputFormat,
    style,
    error,
    required,
    control,
    name,
    format,
    rules,
    readOnly,
    ...rest
  } = props

  return (
    <LocalizationProvider dateAdapter={AdapterMoment} locale={locale}>
      <Box className={className}>
        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({
            field: { onChange, onBlur, value, ref },
            fieldState: { error },
          }) => (
            <DatePicker
              value={value || null}
              onChange={(newValue: any) => {
                onChange(newValue)
              }}
              className='w-full'
              label={title}
              readOnly={readOnly}
              inputFormat={inputFormat || 'DD/MM/YYYY'}
              {...rest}
              renderInput={(params: any) => (
                <CustomTextFieldForeDate
                  {...params}
                  size={size}
                  error={error}
                  required={required}
                  helperText={error && error.message}
                  valueMoment={value}
                  readOnly={readOnly}
                  inputProps={{
                    ...params.inputProps,
                    placeholder: readOnly ? '' : placeholder ?? 'DD/MM/YYYY',
                  }}
                />
              )}
            />
          )}
        />
      </Box>
    </LocalizationProvider>
  )
}

DatePickerCustom.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  disableFuture: PropTypes.bool,
  acceptRegex: PropTypes.any,
  closeOnSelect: PropTypes.bool,
  disableHighlightToday: PropTypes.bool,
  disableMaskedInput: PropTypes.bool,
  disableOpenPicker: PropTypes.bool,
  disablePast: PropTypes.bool,
  inputFormat: PropTypes.string,
  shouldDisableDate: PropTypes.any,
  shouldDisableMonth: PropTypes.any,
  shouldDisableYear: PropTypes.any,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  error: PropTypes.any,
}

export default DatePickerCustom
