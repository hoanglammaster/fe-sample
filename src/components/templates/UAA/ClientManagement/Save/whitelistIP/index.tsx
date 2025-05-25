import CoreInput from '@/components/atoms/CoreInput'
import DynamicAction from '@/components/atoms/DynamicAction'
import { REGEX } from '@/helper/regex'
import { TRANSLATE_UAA } from '@/routes'
import { Box, Grid, IconButton } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import { useTranslation } from 'react-i18next'
import DynamicActionCustom from '../../../SubMenu/Save/DynamicActionCustom'

interface Props {
  isView: boolean
  methodForm: any
}

const WhitelistIP = (props: Props) => {
  const { t } = useTranslation(TRANSLATE_UAA.CLIENT)

  const { isView, methodForm } = props
  const { watch, setValue, control } = methodForm

  const status = watch('status')

  return (
    <Grid item xs={12} className='flex flex-col m-15 gap-10'>
      {(watch('ipAddresses') ?? ['']).map((item: any, index: number) => {
        return (
          <div key={item.key} className='w-full flex justify-center gap-3'>
            <Grid item xs={6}>
              <Box className='flex w-full items-start'>
                <CoreInput
                  control={control}
                  className='w-full'
                  name={`ipAddresses.${index}`}
                  label={t('label.ipAddress')}
                  inputProps={{ maxLength: 255 }}
                  required
                  readOnly={isView || status === 'LOCKED'}
                  rules={{
                    validate: {
                      isRequired: (v) =>
                        v.trim().length > 0 ||
                        t('common:validation.enter', {
                          msg: t('label.ipAddress'),
                        }),
                      isValid: (v: any) => {
                        return (
                          REGEX.IP.test(v.trim()) ||
                          REGEX.IP_V6.test(v.trim()) ||
                          t('common:validation.isInvalid', {
                            label: t('label.ipAddress'),
                          })
                        )
                      },
                    },
                  }}
                />
                {!isView && status !== 'LOCKED' && (
                  <div>
                    <DynamicActionCustom
                      handleAddItem={() =>
                        setValue(`ipAddresses`, watch('ipAddresses').concat(''))
                      }
                      className='mt-10'
                      handleRemoveItem={() =>
                        setValue(
                          'ipAddresses',
                          watch('ipAddresses').filter(
                            (v: any, index2: number) => index2 !== index
                          )
                        )
                      }
                      index={index}
                      totalItem={watch('ipAddresses')?.length || 0}
                    />
                  </div>
                )}
              </Box>
            </Grid>
          </div>
        )
      })}
    </Grid>
  )
}

export default WhitelistIP
