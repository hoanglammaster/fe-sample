import { GRAY_SCALE, GREY } from '@/helper/colors'
import { errorMsg } from '@/helper/message'
import { PageResponseApi } from '@/service/type'
import CloseIcon from '@mui/icons-material/Close'
import {
  Autocomplete,
  AutocompleteProps,
  Chip,
  CircularProgress,
  FilterOptionsState,
  FormHelperText,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { useDebounce } from '@uidotdev/usehooks'
import { get } from 'lodash'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useId,
  useState,
} from 'react'
import { Controller } from 'react-hook-form'

export interface FormControlAutoCompleteProps<
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined
> extends Omit<
    AutocompleteProps<T, Multiple, DisableClearable, any>,
    'renderInput' | 'options' | 'freeSolo'
  > {
  control: any
  name: string
  genus?: 'normal' | 'small'
  label: ReactNode
  placeholder?: string
  rules?: any
  disabled?: boolean
  readOnly?: boolean
  labelSearch?: string
  labelPath?: string
  labelPath2?: string
  subLabelPath2?: string
  valuePath?: string
  isHasMessageError?: boolean
  helperText?: string
  required?: boolean
  params?: any
  variant?: 'outlined' | 'filled' | 'standard'
  isViewProp?: boolean
  exceptValues?: any[] // example: [{ id: 1 },{ id: 2 },{ id: 3 }]
  hasAllOption?: boolean
  fetchDataFn: (val: any) => Promise<PageResponseApi<any>>
  onChangeValue?: (val: any) => void
  onAfterChangeValue?: () => void
  disableDefaultRequired?: boolean
}

const CoreAutoCompleteAPI: <
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined
>(
  prop: FormControlAutoCompleteProps<T, Multiple, DisableClearable>
) => React.ReactElement<
  FormControlAutoCompleteProps<T, Multiple, DisableClearable>
> = (props) => {
  const { t } = useTranslation()

  const {
    control,
    name,
    multiple,
    placeholder,
    rules,
    label,
    genus = 'normal',
    disabled,
    readOnly,
    labelSearch = 'search',
    labelPath = 'name',
    labelPath2,
    subLabelPath2,
    valuePath = 'id',
    isHasMessageError = true,
    helperText,
    required,
    params,
    variant = 'standard',
    isViewProp,
    exceptValues,
    hasAllOption,
    fetchDataFn,
    onChangeValue,
    onAfterChangeValue,
    disableDefaultRequired,
    ...restProps
  } = props

  const router = useRouter()
  const { actionType } = router.query
  const isView = isViewProp !== undefined ? isViewProp : actionType === 'VIEW'

  const [page, setPage] = useState(0)
  const [isClick, setIsClick] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [search, setSearch] = useState('')
  const debounceSearch = useDebounce(search, 700)
  const [data, setData] = useState<any>([])
  const [dataPage0, setDataPage0] = useState<any>([])

  const convertParam = JSON.stringify(params)
  const convertExceptValues = JSON.stringify(exceptValues)

  const handleSearchData = useCallback(
    async (isPreApply: boolean, pageOption?: number) => {
      setIsLoading(true)
      const pageValue = pageOption ?? page

      const data = await fetchDataFn({
        page: pageValue,
        size: 20,
        [labelSearch]: debounceSearch,
        ...(params ? params : {}),
      })

      if (data && Array.isArray(data.data.content)) {
        const dataValue = [
          ...data.data.content.map((item: any) => ({
            ...item,
            [labelPath]: get(item, labelPath),
            [valuePath]: get(item, valuePath),
          })),
        ]

        setData((pre: any) => {
          const newVal = [...(isPreApply ? pre : []), ...dataValue]
          return exceptValues
            ? newVal.filter((obj) => {
                return !exceptValues.some((item: any) => {
                  if (valuePath.includes('.')) {
                    const [firstPart, secondPart] = valuePath.split('.')
                    return item[firstPart][secondPart] === obj[valuePath]
                  } else {
                    return item[valuePath] === obj[valuePath]
                  }
                })
              })
            : newVal
        })
        // setTotalPages(data.data.totalPages)
      }

      setIsLoading(false)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [debounceSearch, convertParam, page, totalPages]
  )

  const handleFetchData = useCallback(
    async (isPreApply: boolean, pageOption?: number) => {
      try {
        setIsLoading(true)
        const pageValue = pageOption ?? page

        if (pageValue !== 0 && pageValue >= totalPages) {
          setIsLoading(false)
          return
        }
        const data = await fetchDataFn({
          page: pageValue,
          size: 20,
          [labelSearch]: debounceSearch,
          ...(params ? params : {}),
        })

        if (data && Array.isArray(data?.data.content)) {
          const dataValue = data.data.content.map((item: any) => ({
            ...item,
            [labelPath]: get(item, labelPath),
            [valuePath]: get(item, valuePath),
          }))

          if (pageValue === 0) {
            setDataPage0(dataValue)
          }

          setData((pre: any) => {
            const newVal = [...(isPreApply ? pre : []), ...dataValue]

            return newVal
          })

          setTotalPages(data.data.totalPages)
        }
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        errorMsg(error)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page, totalPages, convertParam]
  )

  useEffect(() => {
    try {
      if (isClick && !isView && !disabled && !readOnly) handleFetchData(false)
    } catch (error) {
      errorMsg(error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClick, isView, disabled, readOnly, convertParam, convertExceptValues])

  useEffect(() => {
    if (isClick && !isView && !disabled && !readOnly) {
      if (debounceSearch) {
        handleSearchData(false, 0)
      } else {
        setPage(() => 0)
        setData(dataPage0)
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceSearch, convertParam, isView, disabled, readOnly])

  const handleSCroll = async (e: any) => {
    const listboxNode = e.currentTarget
    const currentHeight = listboxNode.scrollTop + listboxNode.clientHeight

    if (listboxNode.scrollHeight - currentHeight <= 1) {
      setPage((prev) => prev + 1)
      if (search.length > 0) {
        handleSearchData(true, page + 1)
      } else {
        handleFetchData(true, page + 1)
      }
    }
  }

  const id = useId()

  const finalData = (
    (!debounceSearch || debounceSearch.toLocaleLowerCase() === 'all') &&
    hasAllOption
      ? [
          {
            [valuePath]: null,
            [labelPath]: 'All',
          },
          ...data,
        ]
      : data
  ).filter((obj) => {
    if (!!exceptValues) {
      return !exceptValues.some((item: any) => {
        if (valuePath.includes('.')) {
          const [firstPart, secondPart] = valuePath.split('.')
          return item[firstPart][secondPart] === obj[valuePath]
        } else {
          return item[valuePath] === obj[valuePath]
        }
      })
    }
    return true
  })

  return (
    // <ClickAwayListener onClickAway={() => {}}>
    <div
      onClick={() => {
        if (!readOnly && !disabled && !isView && !isClick) setIsClick(true)
      }}
    >
      <Controller
        control={control}
        name={name}
        render={({
          field: { onChange, onBlur, value, ref },
          fieldState: { error },
        }) => {
          console.log('valuesss', value)
          return (
            <Autocomplete
              forcePopupIcon={isView ? false : true}
              multiple={multiple}
              value={multiple ? value ?? ([] as any) : value ?? null}
              options={finalData?.length > 0 ? finalData : [{}]}
              disabled={disabled}
              readOnly={readOnly || isView}
              loading={isLoading}
              title={
                multiple
                  ? undefined
                  : labelPath2 &&
                    !!get(value, labelPath) &&
                    !!get(value, labelPath2)
                  ? get(value, labelPath) + ' - ' + get(value, labelPath2)
                  : get(value, labelPath)
              }
              noOptionsText={t('table.no_data')}
              onBlur={onBlur}
              onChange={(e, value: any) => {
                onChange(value)
                if (onChangeValue) onChangeValue(value)
                if (onAfterChangeValue) onAfterChangeValue()
              }}
              popupIcon={
                !readOnly ? (
                  <div className='pr-4'>
                    <Image
                      src={require('@/assets/svg/icArrowDown.svg')}
                      alt=''
                    />
                  </div>
                ) : (
                  ''
                )
              }
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant='outlined'
                    style={{
                      borderRadius: 4,
                      height: 26,
                      borderColor: GRAY_SCALE,
                      color: GREY,
                    }}
                    label={get(option, labelPath)}
                    {...getTagProps({ index })}
                    deleteIcon={<CloseIcon />}
                    key={index}
                  />
                ))
              }
              isOptionEqualToValue={(option, value) => {
                if (value instanceof Object) {
                  return get(option, valuePath) === get(value, valuePath)
                }
                return get(option, valuePath) === value
              }}
              getOptionLabel={(option) => {
                return labelPath2 &&
                  !!get(option, labelPath) &&
                  !!get(option, labelPath2)
                  ? get(option, labelPath) + ' - ' + get(option, labelPath2)
                  : get(option, labelPath)
              }}
              renderOption={(props, option: any) => {
                const label =
                  !!labelPath2 && !!get(option, valuePath)
                    ? get(option, labelPath) + ' - ' + get(option, labelPath2)
                    : get(option, labelPath)
                return (
                  <li {...props}>
                    <Typography
                      variant='body2'
                      className='truncate ...'
                      title={label}
                      sx={{ lineHeight: '1rem' }}
                    >
                      {label}
                    </Typography>
                  </li>
                )
              }}
              filterOptions={(options, params: FilterOptionsState<any>) => {
                setSearch(params.inputValue)
                return options
              }}
              PaperComponent={
                !finalData?.length || finalData?.length < 1
                  ? ({ children, ...other }) => {
                      console.log(
                        'finalDataIn',
                        finalData,
                        isLoading,
                        !finalData.length || finalData?.length < 1
                      )
                      return (
                        <Paper>
                          <div className='w-full p-6'>
                            <Typography
                              variant='body2'
                              className='truncate ...'
                              sx={{
                                lineHeight: '1rem',
                                fontSize: '16px',
                                padding: 0.5,
                                opacity: 0.6,
                              }}
                            >
                              {isLoading ? 'Loading ...' : t('table.no_data')}
                            </Typography>
                          </div>
                        </Paper>
                      )
                    }
                  : undefined
              }
              disableCloseOnSelect={multiple}
              renderInput={(params) => {
                return (
                  <>
                    <TextField
                      {...params}
                      inputProps={{
                        ...params.inputProps,
                        value: readOnly
                          ? !!params.inputProps.value ||
                            !!params.InputProps.startAdornment
                            ? params.inputProps.value
                            : '-'
                          : params.inputProps.value,
                      }}
                      variant={variant}
                      inputRef={ref}
                      label={label}
                      onKeyDown={(event) => {
                        if (event.key == 'Enter') {
                          event.preventDefault()
                          event.stopPropagation()
                          return false
                        }
                      }}
                      error={!!(error || helperText)}
                      helperText={error && isHasMessageError && error.message}
                      placeholder={
                        (multiple ? !!value?.length : !!value) || readOnly
                          ? ''
                          : placeholder ||
                            t('form.autocomplete.placeholder', {
                              label,
                            }).toString()
                      }
                      InputLabelProps={{
                        // ...params.InputLabelProps,
                        shrink: true,
                        required: readOnly ? false : required,
                      }}
                      InputProps={{
                        disableUnderline: isView || readOnly ? true : false,
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {isLoading ? (
                              <CircularProgress color='inherit' size={20} />
                            ) : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                    />
                    {helperText && (
                      <FormHelperText>{helperText}</FormHelperText>
                    )}
                  </>
                )
              }}
              ListboxProps={{
                onScroll: (e) => {
                  handleSCroll(e)
                },
              }}
              {...restProps}
            />
          )
        }}
        rules={
          readOnly
            ? undefined
            : required && !disableDefaultRequired
            ? {
                ...rules,
                required: t('common:validation.enter', { msg: label }),
              }
            : rules
        }
      />
    </div>
    // </ClickAwayListener>
  )
}

export default React.memo(CoreAutoCompleteAPI)
