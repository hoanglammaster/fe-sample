import CancelIcon from '@mui/icons-material/Cancel'
import {
  FormHelperText,
  IconButton,
  InputAdornment,
  OutlinedTextFieldProps,
  TextField,
  Typography,
} from '@mui/material'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  Controller,
  FieldValues,
  RegisterOptions,
  useWatch,
} from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { NumericFormat } from 'react-number-format'

type InputType = 'single' | 'multi' | 'search' | 'none' | undefined

export const getPropsByInputType = (type: InputType) => {
  if (type === 'single' || type === 'search') {
    return {
      multiline: false,
    }
  } else if (type === 'multi') {
    return {
      multiline: true,
      maxRows: 5,
      minRow: 1,
    }
  } else {
    return {}
  }
}

export const NumberFormatCustom = React.forwardRef<any, any>(
  function NumberFormatCustomBase(props, ref) {
    const { onChange, disabledecimal, disablenegative, ...other } = props

    const handleChange = useCallback(
      (value: any) => {
        if (onChange) {
          onChange({
            target: {
              name: props.name,
              value: value.value,
            },
          })
        }
      },
      [props.name, onChange]
    )

    return (
      <NumericFormat
        {...other}
        decimalSeparator=','
        decimalScale={disabledecimal ? 0 : undefined}
        allowNegative={!disablenegative}
        thousandSeparator='.'
        getInputRef={ref}
        onValueChange={handleChange}
      />
    )
  }
)

export interface CoreInputProps
  extends Omit<OutlinedTextFieldProps, 'variant'> {
  className?: string
  control: any
  name: string
  label?: string
  placeholder?: string
  transform?: any
  InputLabelProps?: any
  required?: boolean
  readOnly?: boolean
  type?: string
  multiline?: boolean
  minRows?: number
  disabled?: boolean
  hidden?: boolean
  helperText?: any
  rules?: RegisterOptions<FieldValues, any>
  variant?: 'outlined' | 'filled' | 'standard'
  disableDecimal?: boolean
  disableNegative?: boolean
  inputType?: 'single' | 'multi' | 'search' | 'none'
  isView?: boolean
  onChangeValue?: (val: any) => void
  showDashPlaceholder?: boolean
}

const CoreInput = (props: CoreInputProps) => {
  const propsExtent: any = getPropsByInputType(props.inputType)
  const newProps = { ...propsExtent, ...props }
  const {
    className,
    control,
    name,
    label,
    placeholder,
    InputLabelProps,
    inputProps,
    InputProps,
    required,
    readOnly,
    type,
    multiline = false,
    minRows = 1,
    hidden,
    helperText,
    disabled,
    rules,
    variant = 'standard',
    onBlur: onBlurAction,
    disableDecimal,
    disableNegative,
    inputType,
    isView,
    onChangeValue,
    showDashPlaceholder = false,
    maxRows,
    ...restProps
  } = newProps

  const { t } = useTranslation('common')

  const inputRef = useRef<any>(null)
  const [isOverflowing, setIsOverflowing] = useState(false)

  const value = useWatch({ control, name })

  useEffect(() => {
    const inputElement = inputRef.current
    if (!!inputElement && !isView) {
      if (inputType === 'multi') {
        setIsOverflowing(!!value?.length)
      } else {
        setIsOverflowing(
          !!value?.length &&
            inputElement?.scrollWidth > inputElement?.clientWidth
        )
      }
    }
  }, [inputType, isView, value])

  if (hidden) {
    return null
  }
  let { transform } = props

  if (type === 'number') {
    transform = {
      input: (value: any) => value,
      output: (e: any) => {
        const output = e.target.value
        return Number.isNaN(output) ? 0 : Number(output)
      },
    }
  }
  return (
    <div className={className}>
      <Controller
        control={control}
        name={name}
        render={({
          field: { onChange, onBlur, value, ref },
          fieldState: { error },
        }) => (
          <>
            <TextField
              fullWidth
              type={type === 'number' ? 'text' : type}
              label={label}
              placeholder={
                readOnly
                  ? showDashPlaceholder
                    ? '--'
                    : ''
                  : placeholder || t('form.input.placeholder', { label }) || ''
              }
              title={
                type === 'password' || inputType === 'multi'
                  ? ''
                  : `${transform?.input ? transform?.input(value) : value}`
              }
              variant={variant}
              onChange={(e) => {
                onChange(transform?.output ? transform?.output(e) : e)
                onChangeValue &&
                  onChangeValue(transform?.output ? transform?.output(e) : e)
                const inputElement = inputRef.current
                if (!!inputElement && !isView) {
                  if (inputType === 'multi') {
                    setIsOverflowing(!!e.target.value.length)
                  } else {
                    setIsOverflowing(
                      inputElement?.scrollWidth > inputElement?.clientWidth
                    )
                  }
                }
              }}
              onBlur={(e) => {
                onBlur()
                onBlurAction && onBlurAction(e)
              }}
              value={
                readOnly &&
                (!value || (!value?.length && typeof value === 'string'))
                  ? '-'
                  : transform?.input
                  ? transform?.input(value)
                  : value
              }
              ref={ref}
              inputRef={inputRef}
              multiline={multiline}
              minRows={minRows}
              disabled={disabled}
              maxRows={readOnly && inputType === 'multi' ? undefined : maxRows}
              error={!!error}
              helperText={error && error.message}
              InputLabelProps={{
                shrink: placeholder ? true : undefined,
                required: readOnly ? false : required,
                ...InputLabelProps,
              }}
              inputProps={{
                ...inputProps,
                readOnly,
                disabledecimal: disableDecimal,
                disablenegative: disableNegative,
                style: {
                  ...inputProps?.style,
                  paddingRight: isOverflowing
                    ? '1.25rem'
                    : inputProps?.style?.paddingRight,
                  textOverflow: 'ellipsis',
                },
              }}
              // eslint-disable-next-line react/jsx-no-duplicate-props
              InputProps={{
                ...InputProps,
                ...(type === 'number' && {
                  inputComponent: NumberFormatCustom,
                }),
                endAdornment:
                  !readOnly &&
                  (!InputProps?.endAdornment && isOverflowing ? (
                    <InputAdornment
                      position='end'
                      sx={{
                        position: 'absolute',
                        top: '16px',
                        right: '0px',
                        padding: 0,
                      }}
                    >
                      <IconButton
                        size='small'
                        onClick={() => {
                          onChange('')
                          setIsOverflowing(false)
                        }}
                      >
                        <CancelIcon
                          style={{ color: 'rbg(191, 191, 191)' }}
                          fontSize='small'
                        />
                      </IconButton>
                    </InputAdornment>
                  ) : (
                    InputProps?.endAdornment
                  )),
                disableUnderline: isView || readOnly,
              }}
              {...restProps}
            />
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
          </>
        )}
        rules={
          readOnly
            ? undefined
            : required || !!rules?.required
            ? {
                ...rules,
                required: t('common:validation.enter', { msg: label }),
              }
            : rules
        }
      />
    </div>
  )
}

export default React.memo(CoreInput)
