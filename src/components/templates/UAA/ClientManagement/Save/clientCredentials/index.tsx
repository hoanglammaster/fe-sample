import CoreInput from '@/components/atoms/CoreInput'
import { TEXT_BUTTON } from '@/components/layouts/WrapLayout/Theme/colors'
import { REGEX } from '@/helper/regex'
import { TRANSLATE_UAA, UAA_TRANSLATE_PATH } from '@/routes'
import { GridOff } from '@mui/icons-material'
import { Box, Button, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import CoreInputCustom from '../CoreInputCustom'
import { access } from 'fs'
import { RED } from '@/helper/colors'
import InputClientSecret from './InputClientSecret'

interface Props {
  isView: boolean
  methodForm: any
  onSubmit: () => void
}

const ClientCredentials = (props: Props) => {
  const { t } = useTranslation(TRANSLATE_UAA.CLIENT)
  const { isView, methodForm, onSubmit } = props

  const [accessTokenValiditySeconds, refreshTokenValiditySeconds] =
    methodForm.watch([
      'accessTokenValiditySeconds',
      'refreshTokenValiditySeconds',
    ])

  const { control, watch } = methodForm
  const status = watch('status')

  return (
    <Grid container spacing={{ xs: 1, sm: 2, md: 3 }} className='px-20 py-10'>
      <Grid item xs={6}>
        <CoreInput
          control={control}
          className='w-full mr-10'
          name='clientId'
          inputProps={{ maxLength: 50 }}
          label={t('label.clientId')}
          required={!isView}
          readOnly={isView || status === 'LOCKED'}
          rules={{
            validate: {
              validate1: (v: string) =>
                REGEX.CLIENT_ID.test(v) ||
                t('common:validation.isInvalid', {
                  label: t('label.clientId'),
                }),
            },
          }}
        />
      </Grid>

      <Grid item xs={6}>
        <Box className='flex items-center'>
          <InputClientSecret
            control={control}
            className='w-full'
            name='clientSecret'
            inputProps={{ maxLength: 255 }}
            label={t('label.clientSecret')}
            placeholder={t('label.clickAutoGen')}
            readOnly
            type='password'
            required={!isView}
          />
          {!isView && status !== 'LOCKED' && (
            <Button
              variant='outlined'
              size='small'
              sx={{ minWidth: '70px', padding: 0 }}
              onClick={onSubmit}
            >
              {t('label.autoGen')}
            </Button>
          )}
        </Box>
      </Grid>

      <Grid item xs={6}>
        <Box className='flex w-full items-start'>
          <CoreInput
            control={control}
            label={t('label.accessToken')}
            name='accessTokenValiditySeconds'
            type='text'
            disableDecimal
            disableNegative
            required={!isView}
            readOnly={isView || status === 'LOCKED'}
            className='w-full'
            inputProps={{
              style: {
                textAlign: !watch('accessTokenValiditySeconds')
                  ? 'left'
                  : 'right',
              },
              maxLength: 255,
            }}
            transform={{
              output: (val: any) => {
                const stringVal = val.target.value
                return stringVal
                  ? stringVal?.replace(/\D/g, '').length > 0
                    ? Number(stringVal?.replace(/\D/g, '')).toString()
                    : stringVal?.replace(/\D/g, '')
                  : val
              },
            }}
          />
          <div className='mt-11 ml-2'>
            <Typography variant='body2' sx={{ color: TEXT_BUTTON }}>
              {t('label.second')}
            </Typography>
          </div>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box className='flex w-full items-start'>
          <CoreInput
            className='w-full'
            control={control}
            name='refreshTokenValiditySeconds'
            label={t('label.refreshToken')}
            type='text'
            disableDecimal
            disableNegative
            required={!isView}
            readOnly={isView || status === 'LOCKED'}
            inputProps={{
              style: {
                textAlign: !watch('refreshTokenValiditySeconds')
                  ? 'left'
                  : 'right',
              },
              maxLength: 255,
            }}
            transform={{
              output: (val: any) => {
                const stringVal = val.target.value
                return stringVal
                  ? stringVal?.replace(/\D/g, '').length > 0
                    ? Number(stringVal?.replace(/\D/g, '')).toString()
                    : stringVal?.replace(/\D/g, '')
                  : val
              },
            }}
          />
          <div className='mt-11 ml-2'>
            <Typography variant='body2' sx={{ color: TEXT_BUTTON }}>
              {t('label.second')}
            </Typography>
          </div>
        </Box>
      </Grid>
    </Grid>
  )
}

export default ClientCredentials
