import moment from 'moment'
import PropTypes from 'prop-types'
import React from 'react'
import { Controller, Control } from 'react-hook-form'
import DatePickerCustom, { DatePickerCustomProps } from './DatePickerCustom'

type CoreDatePickerProps = DatePickerCustomProps & {
  className?: string
  title?: string
  placeholder?: string
  name: string
  control: Control<any>
  format?: string
  rules?: object
  required?: boolean
  value?: any
  onChange?: (val: any) => void
  readOnly?: boolean
}

const CoreDatePicker: React.FC<CoreDatePickerProps> = ({
  value,
  onChange,
  title,
  placeholder,
  className,
  inputFormat,
  style,
  name,
  control,
  format,
  rules,
  required,
  ...rest
}: CoreDatePickerProps) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
      }) => {
        return (
          <DatePickerCustom
            name={name}
            placeholder={placeholder}
            className={className}
            value={
              value
                ? format && moment(value, format).isValid()
                  ? moment(value, format)
                  : value
                : null
            }
            // error={error}
            title={
              required ? (
                <>
                  {title}
                  <span style={{ color: 'red' }}> *</span>
                </>
              ) : (
                title
              )
            }
            onChange={(val: any) =>
              val && val.isValid()
                ? onChange(format ? val.format(format) : val)
                : onChange(null)
            }
            {...rest}
            required={false}
          />
        )
      }}
    />
  )
}

CoreDatePicker.propTypes = {
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
  onChange: PropTypes.any,
  name: PropTypes.string.isRequired,
  format: PropTypes.string,
  required: PropTypes.bool,
  rules: PropTypes.any,
}

export default CoreDatePicker
