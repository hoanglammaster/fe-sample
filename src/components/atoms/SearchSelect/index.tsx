import React, { useState, useMemo, useRef, useEffect } from 'react'
import CancelIcon from '@mui/icons-material/Cancel'
import CloseIcon from '@mui/icons-material/Close'
import {
  Box,
  Checkbox,
  Chip,
  CircularProgress,
  ClickAwayListener,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Paper,
  Popper,
  TextField,
  Typography,
} from '@mui/material'
import { get } from 'lodash'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { GRAY_SCALE, GREY } from '@/helper/colors'

export interface SearchSelectProps {
  className?: string
  options: any[]
  valuePath?: string
  labelPath?: string
  readOnly?: boolean
  value: any[]
  returnValueType?: 'enum' | 'option'
  onChange: (e: any) => void
  onChangeValue?: (e: any[]) => void
  disabled?: boolean
  error?: boolean
  errorMessage?: string
  ref?: any
  onBlur?: (e: any) => void
  label?: string
  placeholder?: string
  loading?: boolean
  required?: boolean
}

const SearchSelect = (props: SearchSelectProps) => {
  const {
    readOnly,
    disabled,
    className,
    onChange,
    options,
    value,
    labelPath = 'name',
    onChangeValue,
    returnValueType = 'enum',
    valuePath = 'id',
    error,
    errorMessage,
    label,
    placeholder,
    loading,
    onBlur,
    ref,
    ...rest
  } = props
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [searchString, setSearchString] = useState<string>('')
  const [focusedOptionIndex, setFocusedOptionIndex] =
    useState<number | null>(null)
  const optionRefs = useRef<HTMLDivElement[]>([])
  const searchInputRef = useRef<HTMLInputElement>(null)

  const handleOpen = (event: any) => {
    if (!readOnly && !disabled) {
      setAnchorEl(event.currentTarget)
    }
  }

  const handleClose = () => {
    setAnchorEl(null)
    setFocusedOptionIndex(null)
  }

  const open = Boolean(anchorEl)

  const { t } = useTranslation('common')

  const filterOption = useMemo(
    () =>
      options.filter((v) =>
        v[labelPath]
          .toString()
          .toLowerCase()
          .includes(searchString.trim().toLocaleLowerCase())
      ),
    [labelPath, options, searchString]
  )

  const checkIsSelected = (val: any) => {
    if (returnValueType === 'option') {
      return value.some((v) => v[valuePath] === val[valuePath])
    } else return value.some((v) => v === val[valuePath])
  }

  const handleCheckValue = (val: any, checked?: boolean) => {
    if (checked) {
      if (returnValueType === 'enum') {
        onChange([...value, val[valuePath]])
        onChangeValue && onChangeValue([...value, val[valuePath]])
      } else {
        onChange([...value, val])
        onChangeValue && onChangeValue([...value, val])
      }
    } else {
      if (returnValueType === 'enum') {
        onChange(value.filter((v) => v !== val[valuePath]))
        onChangeValue &&
          onChangeValue(value.filter((v) => v !== val[valuePath]))
      } else {
        onChange(value.filter((v) => v[valuePath] !== val[valuePath]))
        onChangeValue &&
          onChangeValue(value.filter((v) => v[valuePath] !== val[valuePath]))
      }
    }
  }

  const renderValueArdorment = useMemo(() => {
    if (returnValueType === 'enum') {
      return value?.map((v, index) => (
        <Chip
          variant='outlined'
          style={{
            borderRadius: 4,
            height: 26,
            maxWidth: 200,
            margin: 4,
            borderColor: GRAY_SCALE,
            color: GREY,
          }}
          title={options.find((v2) => v2[valuePath] === v)?.[labelPath]}
          label={options.find((v2) => v2[valuePath] === v)?.[labelPath]}
          deleteIcon={<CloseIcon />}
          key={index}
          onDelete={() => onChange(value.filter((v2) => v2 !== v))}
        />
      ))
    } else {
      return value.map((v, index) => (
        <Chip
          variant='outlined'
          style={{
            borderRadius: 4,
            height: 26,
            maxWidth: 200,
            margin: 4,
            borderColor: GRAY_SCALE,
            color: GREY,
          }}
          title={v?.[labelPath]}
          label={v?.[labelPath]}
          deleteIcon={<CloseIcon />}
          key={index}
          onDelete={() =>
            onChange(value.filter((v2) => v2[valuePath] !== v[valuePath]))
          }
        />
      ))
    }
  }, [labelPath, onChange, options, returnValueType, value, valuePath])

  useEffect(() => {
    if (open && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [open])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setFocusedOptionIndex((prevIndex) => {
        if (prevIndex === null || prevIndex === filterOption.length - 1) {
          return 0
        } else {
          return prevIndex + 1
        }
      })
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setFocusedOptionIndex((prevIndex) => {
        if (prevIndex === null || prevIndex === 0) {
          return filterOption.length - 1
        } else {
          return prevIndex - 1
        }
      })
    } else if (event.key === 'Enter' && focusedOptionIndex !== null) {
      const option = filterOption[focusedOptionIndex]
      handleCheckValue(option, !checkIsSelected(option))
    }
  }

  useEffect(() => {
    if (focusedOptionIndex !== null && optionRefs.current[focusedOptionIndex]) {
      optionRefs.current[focusedOptionIndex].focus()
    }
  }, [focusedOptionIndex])

  return (
    <Box
      className={className}
      onKeyDown={handleKeyDown}
      ref={ref}
      onBlur={onBlur}
    >
      <TextField
        className='w-full'
        onClick={handleOpen}
        variant='standard'
        InputProps={{
          startAdornment: value.length > 0 && (
            <Box className='flex flex-wrap w-full'>{renderValueArdorment}</Box>
          ),
          endAdornment: loading ? (
            <CircularProgress color='inherit' size={20} />
          ) : (
            <div
              className='pr-4'
              style={{
                rotate: open ? '180deg' : undefined,
              }}
            >
              <Image src={require('@/assets/svg/icArrowDown.svg')} alt='' />
            </div>
          ),
          disableUnderline: readOnly,
        }}
        disabled={disabled || loading}
        inputProps={{
          style: {
            width: value.length > 0 ? 0 : undefined,
          },
        }}
        error={error}
        label={label}
        placeholder={
          value.length > 0
            ? ''
            : placeholder ??
              t('form.autocomplete.placeholder', {
                label,
              }).toString()
        }
        helperText={errorMessage}
        ref={ref}
        {...rest}
      />
      <Popper open={open} anchorEl={anchorEl}>
        <ClickAwayListener onClickAway={handleClose}>
          <Paper
            sx={{
              width: anchorEl?.clientWidth ?? 400,
              borderRadius: '0px 0px 4px 4px',
            }}
          >
            <Box className='p-3'>
              <TextField
                variant='standard'
                className='w-full'
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
                InputProps={{
                  disableUnderline: true,
                  startAdornment: (
                    <Image
                      src={require('@/assets/svg/iconSearch.svg')}
                      alt=''
                      height={15}
                      width={15}
                      className='mr-4'
                    />
                  ),
                  endAdornment: !!searchString && (
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
                          setSearchString('')
                        }}
                      >
                        <CancelIcon
                          style={{ color: 'rbg(191, 191, 191)' }}
                          fontSize='small'
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                inputRef={searchInputRef}
              />
            </Box>
            <Divider className='w-full' />
            <Box className='p-3' style={{ maxHeight: 200, overflow: 'auto' }}>
              {filterOption?.length > 0 ? (
                filterOption.map((option, index) => {
                  const isSelected = checkIsSelected(option)
                  return (
                    <Box
                      className={`flex items-center p-3 ${
                        focusedOptionIndex === index ? 'focused-option' : ''
                      }`}
                      key={option[valuePath]}
                      tabIndex={-1}
                      ref={(el) => (optionRefs.current[index] = el as any)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                          handleCheckValue(option, !isSelected)
                        }
                      }}
                    >
                      <FormControlLabel
                        className='w-full'
                        checked={isSelected}
                        onChange={(e, checked) => {
                          console.log('RunThis11')
                          handleCheckValue(option, checked)
                        }}
                        control={
                          <Checkbox
                            size='small'
                            sx={{
                              padding: 0,
                              marginRight: '10px',
                              marginLeft: '10px',
                            }}
                          />
                        }
                        label={
                          <Typography
                            variant='body2'
                            title={get(option, labelPath)}
                          >
                            {get(option, labelPath)}
                          </Typography>
                        }
                      />
                    </Box>
                  )
                })
              ) : (
                <Typography className='m-6' variant='body2'>
                  {t('common:table.no_data')}
                </Typography>
              )}
            </Box>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </Box>
  )
}

export default SearchSelect
