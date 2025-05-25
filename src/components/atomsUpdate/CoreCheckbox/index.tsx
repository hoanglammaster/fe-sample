import {
  Checkbox,
  FormControlLabel,
  FormControlLabelProps,
} from '@mui/material'
import { ReactNode } from 'react'
import { Control, Controller, FieldValues } from 'react-hook-form'

export interface CoreCheckboxProps
  extends Omit<FormControlLabelProps, 'label' | 'control'> {
  control: any
  label?: ReactNode
  name: string
  onChangeValue?: (val: boolean) => void
  disabled?: boolean
  readOnly?: boolean
}

const CoreCheckbox = (props: CoreCheckboxProps) => {
  const {
    control,
    label,
    name,
    labelPlacement,
    onChangeValue,
    disabled,
    readOnly,
    ...rest
  } = props
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, ref } }) => (
        <FormControlLabel
          {...rest}
          ref={ref}
          checked={value}
          color='primary'
          onChange={(e, checked) => {
            if (!disabled && !readOnly) {
              onChange(e)
              onChangeValue && onChangeValue(checked)
            }
          }}
          // disabled={disabled}
          sx={{
            margin: 0,
            ...rest.sx,
          }}
          control={
            <Checkbox
              readOnly={readOnly}
              sx={{ padding: 0, marginRight: '5px' }}
            />
          }
          label={label ?? <></>}
          labelPlacement={labelPlacement ?? 'end'}
        />
      )}
    />
  )
}

export default CoreCheckbox
