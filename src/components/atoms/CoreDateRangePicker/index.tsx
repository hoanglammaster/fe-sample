import { RED } from '@/helper/colors'
import { Box, Typography } from '@mui/material'
import moment from 'moment'
import React, { RefCallback, RefObject } from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import DateRangePicker, { DateRangeCustomProps } from '../DateRangePicker'

interface Props extends DateRangeCustomProps {
  control: any
  startName: string
  endName: string
  onChangeValue?: (start: string | null, end: string | null) => void
  format?: string
  className?: string
  label?: string
  placeholder?: string
  required?: boolean
}

const CoreDateRangePicker = (props: Props) => {
  const {
    control,
    endName,
    onChangeValue,
    startName,
    required,
    label,
    disabledFuture,
    disabledPast,
    ...rest
  } = props

  const { t } = useTranslation('common')

  function handleMultipleRefs<T>(
    refs: Array<any | RefObject<T> | null>
  ): RefCallback<T> {
    return (element: T | null) => {
      refs.forEach((ref) => {
        if (typeof ref === 'function') {
          ref(element)
        } else if (ref && 'current' in ref) {
          ;(ref as React.MutableRefObject<T | null>).current = element
        }
      })
    }
  }

  return (
    <Controller
      name={startName}
      control={control}
      rules={{
        required: required
          ? t('common:validation.enter', { msg: label })
          : undefined,
        validate: {
          isValidDay: (v: string) =>
            moment(v, 'DD/MM/YYYY').isValid() ||
            t('common:validation.isInvalid', { label: label }),
        },
      }}
      render={({
        field: {
          value: startValue,
          onChange: onChangeStart,
          ref: refStart,
          ...props
        },
        fieldState: { error: errorStart },
      }) => (
        <Controller
          name={endName}
          control={control}
          rules={{
            required: required
              ? t('common:validation.enter', { msg: label })
              : undefined,
            validate: {
              isValidDay: (v: string) =>
                moment(v, 'DD/MM/YYYY').isValid() ||
                t('common:validation.isInvalid', { label: label }),
              isMoreThanStart: (v: string) => {
                return (
                  moment(v, 'DD/MM/YYYY').isSameOrAfter(
                    moment(startValue, 'DD/MM/YYYY')
                  ) || t('common:validation.isInvalid', { label: label })
                )
              },
            },
          }}
          render={({
            field: {
              value: endValue,
              onChange: onChangeEnd,
              ref: refEnd,
              ...props
            },
            fieldState: { error: errorEnd },
          }) => {
            return (
              <Box>
                <DateRangePicker
                  start={startValue}
                  end={endValue}
                  onChangeDate={(start, end) => {
                    onChangeStart(start)
                    onChangeEnd(end)
                    onChangeValue && onChangeValue(start, end)
                  }}
                  ref={handleMultipleRefs([refStart, refEnd])}
                  label={label}
                  disabledFuture={disabledFuture}
                  disabledPast={disabledPast}
                  {...rest}
                />
                {(errorStart || errorEnd) && (
                  <Typography
                    variant='body2'
                    sx={{ color: RED, fontSize: '12px', margin: '5px 0px' }}
                  >
                    {errorStart?.message || errorEnd?.message}
                  </Typography>
                )}
              </Box>
            )
          }}
        />
      )}
    />
  )
}

export default CoreDateRangePicker
