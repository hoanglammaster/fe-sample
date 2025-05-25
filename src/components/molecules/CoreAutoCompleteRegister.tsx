import CloseIcon from '@mui/icons-material/Close'
import {
  Autocomplete,
  Chip,
  CircularProgress,
  FormHelperText,
  TextField,
  Typography,
} from '@mui/material'
import { find, get, isObject, map } from 'lodash'
import PropTypes from 'prop-types'
import { useCallback } from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { GRAY_SCALE, GREY } from '../layouts/WrapLayout/Theme/colors'

const CoreAutoCompleteRegister = (props: any) => {
  const {
    className,
    control,
    name,
    options,
    label,
    placeholder,
    InputLabelProps,
    inputProps,
    InputProps,
    shrink,
    required,
    readOnly,
    fetchOptions,
    filter,
    valuePath,
    labelPath,
    loading,
    hasMessageError = true,
    returnValueType,
    multiple,
    disabled,
    helperText,
    isCreateAble,
    AutoCompleteClassName,
    rules,
    defaultValue,
    onChangeValue,
    ...restProps
  } = props

  const { t } = useTranslation('common')

  const getValueOption = useCallback(
    (value: any) => {
      if (multiple) {
        if (isCreateAble) {
          return value
        }
        const values = map(value, (v) => {
          if (!isObject(v)) {
            const option =
              find(options, (item) => {
                return get(item, valuePath) === v
              }) ?? null
            return option
          }
          return v
        }).filter(Boolean)
        return values
      }

      if (returnValueType === 'enum') {
        return find(options, (item) => get(item, valuePath) === value) ?? null
      }

      return value
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [options]
  )

  return (
    <div className={className}>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({
          field: { onChange, onBlur, value, ref },
          fieldState: { error },
        }) => {
          name === 'currency_data' && console.log('value', value)
          return (
            <Autocomplete
              className={AutoCompleteClassName}
              multiple={multiple}
              isOptionEqualToValue={(option, value) => {
                if (value instanceof Object) {
                  return get(option, valuePath) === get(value, valuePath)
                }
                return get(option, valuePath) === value
              }}
              getOptionLabel={(option) => {
                return get(option, labelPath) ?? ''
              }}
              loading={loading}
              options={options}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    {...getTagProps({ index })}
                    key={get(option, valuePath)}
                    variant='outlined'
                    style={{
                      borderRadius: 4,
                      height: 26,
                      borderColor: GRAY_SCALE,
                      color: GREY,
                    }}
                    label={get(option, labelPath) ?? ''}
                    deleteIcon={<CloseIcon />}
                  />
                ))
              }
              noOptionsText={t('form.autocomplete.no_options')}
              disabled={disabled}
              onChange={(_, value: any) => {
                if (onChangeValue) {
                  returnValueType === 'enum'
                    ? onChangeValue(
                        multiple
                          ? value.map((v: any) => get(v, valuePath))
                          : get(value, valuePath) ?? null
                      )
                    : onChangeValue(value)
                }
                returnValueType === 'enum'
                  ? onChange(
                      multiple
                        ? value.map((v: any) => get(v, valuePath))
                        : get(value, valuePath) ?? null
                    )
                  : onChange(value)
              }}
              onBlur={onBlur}
              value={getValueOption(value)}
              renderOption={(props, option: any) => {
                return (
                  <li {...props} key={option[valuePath]}>
                    <Typography variant='body2'>
                      {get(option, labelPath)}
                    </Typography>
                  </li>
                )
              }}
              renderInput={(params) => (
                <>
                  <TextField
                    {...params}
                    placeholder={
                      placeholder ||
                      t('form.autocomplete.placeholder', {
                        label: label?.toLowerCase(),
                      })
                    }
                    inputRef={ref}
                    label={label}
                    error={!!error}
                    helperText={error && hasMessageError && error.message}
                    InputLabelProps={{
                      ...params.InputLabelProps,
                      shrink: true,
                      required,
                      ...InputLabelProps,
                    }}
                    inputProps={{
                      ...params.inputProps,
                      readOnly,
                      ...inputProps,
                    }}
                    // eslint-disable-next-line react/jsx-no-duplicate-props
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {loading ? (
                            <CircularProgress color='inherit' size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                      ...InputProps,
                    }}
                  />
                  {helperText && <FormHelperText>{helperText}</FormHelperText>}
                </>
              )}
              {...restProps}
            />
          )
        }}
        rules={rules}
      />
    </div>
  )
}

CoreAutoCompleteRegister.defaultProps = {
  className: null,
  options: [],
  label: null,
  placeholder: null,
  InputLabelProps: null,
  inputProps: null,
  InputProps: null,
  required: false,
  readOnly: false,
  filter: undefined,
  valuePath: 'value',
  labelPath: 'label',
  returnValueType: 'option',
  // isCacheKey: true,
  // cacheKey: undefined,
  isCreateAble: false,
  onChangeValue: undefined,
}

CoreAutoCompleteRegister.propTypes = {
  className: PropTypes.string,
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.array,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  InputLabelProps: PropTypes.object,
  inputProps: PropTypes.object,
  InputProps: PropTypes.object,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  fetchOptions: PropTypes.func,
  filter: PropTypes.func,
  disableClearable: PropTypes.bool,
  disabled: PropTypes.bool,
  valuePath: PropTypes.string,
  labelPath: PropTypes.string,
  returnValueType: PropTypes.oneOf(['option', 'enum']),
  multiple: PropTypes.bool,
  // isCacheKey: PropTypes.bool,
  // cacheKey: PropTypes.string,
  helperText: PropTypes.any,
  filterOptions: PropTypes.func,
  getOptionLabel: PropTypes.func,
  isCreateAble: PropTypes.bool,
  AutoCompleteClassName: PropTypes.string,
  rules: PropTypes.object,
  defaultValue: PropTypes.any,
  onChangeValue: PropTypes.func,
}

export default CoreAutoCompleteRegister
