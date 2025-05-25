import { IconButton, InputAdornment, TextField } from '@mui/material'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import CancelIcon from '@mui/icons-material/Cancel'

interface Props {
  value: string
  handleInputChange: (val: string) => void
  t: any
}

const SearchTextField = (props: Props) => {
  const { value, handleInputChange, t } = props
  const inputRef = useRef<any>(null)
  const [isOverflowing, setIsOverflowing] = useState(false)
  return (
    <TextField
      value={value}
      title={value}
      onChange={(e) => {
        handleInputChange(e.target.value)
        const inputElement = inputRef.current
        if (!!inputElement) {
          setIsOverflowing(
            inputElement?.scrollWidth > inputElement?.clientWidth
          )
        }
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.stopPropagation()
          e.preventDefault()
        }
      }}
      variant='standard'
      inputRef={inputRef}
      InputProps={{
        endAdornment: (
          <InputAdornment
            position='end'
            sx={{
              position: 'absolute',
              top: '16px',
              right: '0px',
              padding: 0,
            }}
          >
            {isOverflowing && (
              <IconButton
                size='small'
                onClick={() => {
                  setIsOverflowing(false)
                  handleInputChange('')
                }}
              >
                <CancelIcon
                  style={{ color: 'rgb(191, 191, 191)' }}
                  fontSize='small'
                />
              </IconButton>
            )}
            <Image
              src={require('@/assets/svg/iconSearch.svg')}
              alt=''
              width={16}
              height={16}
            />
          </InputAdornment>
        ),
      }}
      inputProps={{
        style: {
          paddingRight: isOverflowing ? '2.25rem' : '1.25rem',
          textOverflow: 'ellipsis',
        },
        maxLength: 255,
      }}
      className='w-full'
      placeholder={t('label.listPermissionPlaceholder')}
    />
  )
}

export default SearchTextField
