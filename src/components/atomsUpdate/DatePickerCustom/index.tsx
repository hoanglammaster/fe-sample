import IconCalendar from '@/components/Icon/IconCalendar'
import {
  BLACK,
  PRIMARY,
  WHITE,
} from '@/components/layouts/WrapLayout/Theme/colors'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import {
  Box,
  ClickAwayListener,
  IconButton,
  OutlinedTextFieldProps,
  Paper,
  Popper,
  TextField,
  Typography,
} from '@mui/material'
import moment, { Moment } from 'moment'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import MaskedInput from 'react-text-mask'
import { handleColorDate, renderDayByMonth } from './utils'

export interface DatePickerCustomProps
  extends Omit<OutlinedTextFieldProps, 'variant'> {
  value?: string | null
  onChangeDate?: (date: string | null) => void
  className?: string
  format?: string
  disabledFuture?: boolean
  disabledPast?: boolean
  minDate?: Moment
  maxDate?: Moment
  readOnly?: boolean
}

const defaultDateFormat = 'DD/MM/YYYY'

// const listDateDay = [
//   'dateRange.mon',
//   'dateRange.tue',
//   'dateRange.wed',
//   'dateRange.thu',
//   'dateRange.fri',
//   'dateRange.sat',
//   'dateRange.sun',
// ]
// const listDateMonth = [
//   'dateRange.month.jan',
//   'dateRange.month.feb',
//   'dateRange.month.mar',
//   'dateRange.month.apr',
//   'dateRange.month.may',
//   'dateRange.month.jun',
//   'dateRange.month.jul',
//   'dateRange.month.aug',
//   'dateRange.month.sep',
//   'dateRange.month.oct',
//   'dateRange.month.nov',
//   'dateRange.month.dec',
// ]
const listDateDay = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const listDateMonth = [
  'January',
  'Febuary',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const DatePickerCustom = (props: DatePickerCustomProps) => {
  const {
    onChangeDate,
    className,
    value,
    format,
    disabledFuture,
    disabledPast,
    minDate,
    maxDate,
    readOnly,
    disabled,
    ...rest
  } = props
  const [timeString, setTimeString] = useState('')
  const [currentDate, setCurrentDate] = useState<Moment | null>(null)
  const [currentMonth, setCurrentMonth] = useState<string>(
    moment().format('MM/YYYY')
  )

  const toDay = moment().format(defaultDateFormat)
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleOpen = (event: any) => {
    if (!readOnly && !disabled) {
      setAnchorEl(event.currentTarget)
    }
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleChooseDate = useCallback((date: Moment) => {
    setCurrentDate(date)
    setAnchorEl(null)
  }, [])

  const open = Boolean(anchorEl)

  const handleClickOutSide = () => {
    handleClose()
    if (onChangeDate) {
      if (currentDate) {
        onChangeDate(currentDate.format(format || defaultDateFormat))
      } else onChangeDate(null)
    }
  }

  const renderDate = useMemo(() => {
    const listCurentDate = renderDayByMonth(currentMonth).map((v) => {
      let isDisabled = v.disabled
      if (v.date.isAfter(moment(toDay, defaultDateFormat)) && disabledFuture) {
        isDisabled = true
      }
      if (v.date.isBefore(moment(toDay, defaultDateFormat)) && disabledPast) {
        isDisabled = true
      }
      if (maxDate && v.date.isAfter(maxDate)) {
        isDisabled = true
      }
      if (minDate && v.date.isBefore(minDate)) {
        isDisabled = true
      }
      return { ...v, disabled: isDisabled }
    })
    return (
      <Box>
        <Box
          className='grid grid-cols-7 bg-[#F4F4F4] mb-2'
          sx={{ borderRadius: '8px' }}
        >
          {listDateDay.map((day, index) => (
            <Box className='h-18 flex items-center justify-center' key={index}>
              <Typography variant='subtitle2' className='text-center'>
                {day}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box className='grid grid-cols-7 gap-2'>
          {listCurentDate.map((day, index) => (
            <Box
              className='h-20 w-25 relative flex items-center justify-center'
              sx={{
                borderRadius: '8px',
                bgcolor: day?.disabled
                  ? undefined
                  : handleColorDate(day.date, currentDate, null),
                cursor: 'pointer',
                ':hover': {
                  opacity: 0.6,
                },
              }}
              key={index}
              onClick={() => {
                if (!day?.disabled) {
                  handleChooseDate(day.date)
                }
              }}
            >
              <Typography
                variant='body2'
                sx={{
                  opacity: day?.disabled ? 0.5 : 1,
                  color: day.date.isSame(currentDate)
                    ? WHITE
                    : day.date.format('DD/MM/YYYY') === toDay
                    ? PRIMARY
                    : BLACK,
                }}
              >
                {day.label}
              </Typography>
              {day.date.format('DD/MM/YYYY') === toDay && (
                <Box
                  className='w-2 h-2 absolute'
                  sx={{
                    borderRadius: '100%',
                    bottom: '8px',
                    backgroundColor: day.date.isSame(currentDate)
                      ? WHITE
                      : PRIMARY,
                  }}
                />
              )}
            </Box>
          ))}
        </Box>
      </Box>
    )
  }, [
    currentDate,
    currentMonth,
    disabledFuture,
    disabledPast,
    handleChooseDate,
    maxDate,
    minDate,
    toDay,
  ])

  useEffect(() => {
    if (!!currentDate) {
      setTimeString(`$${currentDate.format(defaultDateFormat)}`)
    } else {
      setTimeString('')
    }
  }, [currentDate])

  useEffect(() => {
    setCurrentMonth(
      value
        ? moment(value, format || defaultDateFormat).format('MM/YYYY')
        : moment().format('MM/YYYY')
    )
    setCurrentDate(value ? moment(value, format || defaultDateFormat) : null)
  }, [format, value])

  return (
    <Box>
      <MaskedInput
        mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
        placeholder={'DD/MM/YYYY'}
        guide={false}
        value={timeString}
        onChange={(e) => setTimeString(e.target.value)}
        keepCharPositions
        className={className}
        render={(ref, props) => (
          <TextField
            inputRef={ref}
            variant='standard'
            {...props}
            InputProps={{
              readOnly: true,
              endAdornment: <IconCalendar />,
              disableUnderline: readOnly,
            }}
            onClick={handleOpen}
            {...rest}
          />
        )}
        style={{ width: '100%', minWidth: 240 }}
      />
      <Popper open={open} anchorEl={anchorEl}>
        <ClickAwayListener onClickAway={handleClickOutSide}>
          <Paper sx={{ width: 400, p: '10px', borderRadius: '12px' }}>
            <Box className='flex w-full justify-between items-center pb-10'>
              <IconButton
                onClick={() => {
                  const newVal = moment(currentMonth, 'MM/YYYY')
                    .subtract(1, 'months')
                    .format('MM/YYYY')
                  setCurrentMonth(newVal)
                }}
              >
                <KeyboardArrowLeftIcon />
              </IconButton>
              <Typography variant='subtitle1'>
                {listDateMonth[moment(currentMonth, 'MM/YYYY').month()]}
                &nbsp;
                {moment(currentMonth, 'MM/YYYY').format('YYYY')}
              </Typography>
              <IconButton
                onClick={() => {
                  const newVal = moment(currentMonth, 'MM/YYYY')
                    .add(1, 'months')
                    .format('MM/YYYY')
                  setCurrentMonth(newVal)
                }}
              >
                <KeyboardArrowRightIcon />
              </IconButton>
            </Box>
            {renderDate}
          </Paper>
        </ClickAwayListener>
      </Popper>
    </Box>
  )
}

export default DatePickerCustom
