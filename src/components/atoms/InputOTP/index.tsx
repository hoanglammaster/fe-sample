import React, { useRef, useState } from 'react'
import styles from './style.module.css'
import { Box } from '@mui/material'

interface InputProps {
  value: string | number
  onChangeValue: (val: string | number) => void
  ref: any
}

const InputSingleOTP = (props: InputProps) => {
  const { onChangeValue, value, ref } = props

  const handleChange = (event) => {
    const inputValue = event.target.value

    if (inputValue >= 0 && inputValue <= 9) {
      onChangeValue(inputValue)
      if (event.target?.nextSibling) {
        event.target?.nextSibling?.focus()
      }
    }
  }
  const handleKey = (event) => {
    if (event.key === 'Backspace') {
      onChangeValue('')
      if (event.target?.previousSibling) {
        event.target?.previousSibling?.focus()
      }
    }
  }
  return (
    <input
      className={styles.otp_input}
      style={{
        width: '48px',
        height: '56px',
        border: '1px solid #E9E9E9',
        borderRadius: 8,
        boxShadow: 'none',
        paddingLeft: '12px',
        fontSize: '36px',
      }}
      ref={ref}
      value={value}
      type='number'
      onChange={handleChange}
      onKeyDown={handleKey}
      min='0'
      max='9'
      maxLength={1}
    />
  )
}

const InputOTP = (props: any) => {
  const [listVal, setListVal] = useState<any[]>(['', '', '', '', '', ''])
  const inputRefs = useRef<any[]>([])

  React.useEffect(() => {
    console.log('ahahaaa', inputRefs.current)
  })
  return (
    <Box className='flex'>
      {listVal.map((item, index) => {
        return (
          <InputSingleOTP
            key={index}
            value={item}
            ref={(el) => (inputRefs.current[index] = el)}
            onChangeValue={(val) => {
              const newVal = listVal.map((item2, index2) => {
                return index === index2 ? val : item2
              })
              setListVal(newVal)
              // console.log('ahahaaa', inputRefs)
              // refs.current[index + 1]?.current?.focus()
            }}
          />
        )
      })}
    </Box>
  )
}

export default InputOTP
