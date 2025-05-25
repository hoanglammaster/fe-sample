import { NumberFormatCustom } from '@/components/atoms/CoreInput'
import { GREEN } from '@/components/layouts/WrapLayout/Theme/colors'
import DoneIcon from '@mui/icons-material/Done'
import {
  ClickAwayListener,
  Fade,
  FormHelperText,
  List,
  ListItemButton,
  Paper,
  Popper,
  TextField,
  Typography,
} from '@mui/material'
import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'

const SearchAutocomplete = (props: any) => {
  const {
    className,
    label,
    placeholder,
    InputLabelProps,
    inputProps,
    InputProps,
    required,
    readOnly,
    type,
    multiline,
    minRows,
    hidden,
    helperText,
    allowTranslation,
    disabled,
    rules,
    multiple,
    transitionDelay,
    value,
    valuePath,
    onChange,
    labelPath,
    fetchOption,
    ...restProps
  } = props

  const [searchText, setSearchText] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const [options, setOptions] = useState([])

  const refOption = useRef<any>()

  const inputRef = useRef<any>()

  const getOption = async (val?: any) => {
    const listOption = await fetchOption(val)
    setOptions(listOption)
  }

  const handleChangeInput = (e: any) => {
    setSearchText(e.target.value)
    if (!!refOption.current) {
      clearTimeout(refOption.current)
    }
    refOption.current = setTimeout(
      () => getOption(e.target.value),
      transitionDelay || 500
    )
  }

  const isChecked = (val: any) => {
    if (multiple) {
      return value?.some(
        (v: any) => v?.[`${valuePath}`] === val?.[`${valuePath}`]
      )
    } else return value?.[`${valuePath}`]
  }

  const onSelectValue = (val?: any) => {
    if (multiple) {
      if (isChecked(val)) {
        onChange(
          value.filter(
            (v: any) => v?.[`${valuePath}`] !== val?.[`${valuePath}`]
          )
        )
      } else onChange(value ? value?.concat(val) : [val])
    } else {
      if (isChecked(val)) {
        onChange(null)
      } else onChange(val)
    }
  }

  const getOptionLabel = (val: any) => {
    return labelPath ? val?.[`${labelPath}`] : val?.name
  }

  useEffect(() => {
    getOption()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <div>
        <TextField
          fullWidth
          type={type === 'number' ? 'text' : type}
          label={label}
          placeholder={placeholder}
          onChange={handleChangeInput}
          value={searchText}
          multiline={multiline}
          minRows={minRows}
          disabled={disabled}
          ref={inputRef}
          onFocus={() => !disabled && setOpen(true)}
          onClick={() => !disabled && setOpen(true)}
          InputLabelProps={{
            shrink: placeholder ? true : undefined,
            required,
            ...InputLabelProps,
          }}
          inputProps={{
            readOnly,
            ...inputProps,
          }}
          // eslint-disable-next-line react/jsx-no-duplicate-props
          InputProps={{
            ...InputProps,
            ...(type === 'number' && {
              inputComponent: NumberFormatCustom,
            }),
          }}
          {...restProps}
        />
        <Popper
          open={open}
          anchorEl={inputRef?.current}
          style={{
            width: inputRef?.current?.offsetWidth,
            margin: '4px 0',
            zIndex: 1300,
          }}
          placement='bottom'
          transition
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper>
                <div style={{ padding: '6px 12px' }}>
                  {options.length === 0 && (
                    <Typography
                      variant='body1'
                      color='textSecondary'
                      style={{ margin: '16px 0px 0px 0px' }}
                    ></Typography>
                  )}
                </div>
                <List style={{ maxHeight: 250, overflow: 'auto' }}>
                  {options?.length > 0 &&
                    options.map((one, index) => (
                      <ListItemButton
                        key={index}
                        role={undefined}
                        dense
                        onClick={(e) => {
                          e.preventDefault()
                          onSelectValue(one)
                        }}
                        selected={isChecked(one)}
                      >
                        <Typography
                          variant='body2'
                          style={{
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            flex: 1,
                          }}
                        >
                          {getOptionLabel && getOptionLabel(one)}
                        </Typography>
                        <DoneIcon
                          style={{
                            opacity: 0.6,
                            width: 18,
                            height: 18,
                            visibility: isChecked(one) ? 'visible' : 'hidden',
                            color: GREEN,
                            justifySelf: 'flex-end',
                          }}
                        />
                      </ListItemButton>
                    ))}
                </List>
              </Paper>
            </Fade>
          )}
        </Popper>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </div>
    </ClickAwayListener>
  )
}

SearchAutocomplete.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  transform: PropTypes.object,
  InputLabelProps: PropTypes.object,
  inputProps: PropTypes.object,
  InputProps: PropTypes.object,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  type: PropTypes.string,
  multiline: PropTypes.bool,
  minRows: PropTypes.number,
  disabled: PropTypes.bool,
  hidden: PropTypes.bool,
  helperText: PropTypes.any,
  rules: PropTypes.object,
  allowTranslation: PropTypes.bool,
  multiple: PropTypes.bool,
  transitionDelay: PropTypes.number,
  valuePath: PropTypes.string,
  labelPath: PropTypes.string,
  fetchOption: PropTypes.any,
  value: PropTypes.any,
  onChange: PropTypes.func,
}

export default SearchAutocomplete
