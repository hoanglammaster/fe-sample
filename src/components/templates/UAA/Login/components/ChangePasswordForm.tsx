/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { default as Key } from '@/assets/svg/Key.svg'
import CloseIcon from '@mui/icons-material/Close'
import OtpInput from 'react18-input-otp'
import { default as ArrowsCounterClockwise } from '@/assets/svg/ArrowsCounterClockwise.svg'
import { LoadingButton } from '@mui/lab'
import useChangePassword from '../hooks/useChangePassword'
import CoreInput from '@/components/atoms/CoreInput'

interface Props {
  open?: boolean
  handleClose: () => void
  onSubmit: (val: any) => void
  otp: string | number
  handleResent: () => void
}

const ChangePasswordForm = (props: any) => {
  const { open, handleClose, onSubmit, otp, handleResent } = props

  const methodForm = useForm({
    defaultValues: {
      password: '',
      rePassword: '',
      otp: '',
    },
    mode: 'onChange',
  })
  const [count, setCount] = useState(120)

  const {
    setValue,
    watch,
    control,
    reset,
    formState: { isSubmitting },
  } = methodForm

  useEffect(() => {
    const timer = setInterval(() => {
      if (count > 0) {
        setCount(count - 1)
      }
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [count])

  const handleChange = (otp: string | number) => {
    setValue('otp', otp.toString())
  }

  const otpInputRef = useRef<any>(null)

  const handleResetClick = () => {
    handleResent()
    setCount(0)
    setValue('otp', '')
    otpInputRef?.current?.focus()
  }

  const firstPassword = watch('password')
  const otpValue = watch('otp')

  useEffect(() => {
    reset()
    setCount(otp?.optValiditySeconds ?? 60)
  }, [reset, open, otp?.optValiditySeconds])

  const { t } = useTranslation('common')
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {handleClose ? (
          <IconButton onClick={handleClose} className='absolute right-8 top-8'>
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <form onSubmit={methodForm.handleSubmit(onSubmit)} autoComplete='false'>
        <Box className='w-225 flex-col flex justify-center items-center'>
          <Key />
          <DialogTitle>{t('changepassword.label')}</DialogTitle>
          <Typography className='w-181 h-28 left-23 top-139 text-base text-center '>
            {t('changepassword.text')}
          </Typography>
          <Box className='h-31'>
            <DialogContentText>
              {t('countdown.label', { count })}
            </DialogContentText>
          </Box>

          <Box className='flex w-174 h-35'>
            <OtpInput
              className='w-28 border rounded-md'
              inputStyle='border rounded-md leading-tight focus:outline-none mr-10 mb-20 text-4xl'
              //   otpType='number'
              value={otpValue}
              onChange={handleChange}
              ref={otpInputRef}
              numInputs={otp?.optSize ?? 6}
              separator={<span></span>}
              shouldAutoFocus
            />
            <Box className='flex items-center h-13'>
              <IconButton type='button' onClick={handleResetClick}>
                <ArrowsCounterClockwise />
              </IconButton>
            </Box>
          </Box>

          <CoreInput
            control={control}
            className='w-174 mb-15'
            name='password'
            type='password'
            label={t('changepassword.input.new')}
            placeholder=''
            rules={{
              required: t('rules.required'),
            }}
          />
          <CoreInput
            control={control}
            className='w-174'
            name='rePassword'
            type='password'
            label={t('changepassword.input.re_enter')}
            placeholder=''
            rules={{
              required: t('rules.required'),
              validate: {
                isSame: (v: any) => {
                  return v === firstPassword || t('rules.validate')
                },
              },
            }}
          />
          <Box>
            <LoadingButton
              variant='contained'
              type='submit'
              className='w-150 h-30'
              style={{ borderRadius: 80, marginTop: 30, marginBottom: 30 }}
              disableElevation
              loading={isSubmitting}
              disabled={otpValue.length < 6 || count === 0}
            >
              <Typography variant='h6'>
                {t('changepassword.recovery').toUpperCase()}
              </Typography>
            </LoadingButton>
          </Box>
        </Box>
      </form>
    </Dialog>
  )
}

export default ChangePasswordForm
