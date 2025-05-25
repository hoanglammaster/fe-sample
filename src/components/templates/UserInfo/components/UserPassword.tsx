import CoreInput from '@/components/atoms/CoreInput'
import { TRANSLATE_UAA } from '@/routes'
import { LoadingButton } from '@mui/lab'
import { Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

const UserPassword = (props: any) => {
  const { formContextPassword, handleSubmitChangePassword } = props
  const { control, formState, watch } = formContextPassword
  const firstPassword = watch('newPassword')
  const { t } = useTranslation(TRANSLATE_UAA.USER)
  return (
    <Box>
      <Typography variant='body1' className='font-bold uppercase my-10 mb-20'>
        Đổi mật khẩu
      </Typography>
      <Box className='flex justify-center'>
        <Box className='w-full' style={{ maxWidth: 930 }}>
          <FormProvider {...formContextPassword}>
            <form onSubmit={handleSubmitChangePassword}>
              <CoreInput
                control={control}
                name='oldPassword'
                type='password'
                label={'Mật khẩu cũ'}
                placeholder={'Mật khẩu cũ'}
                className='w-full mb-15'
                required
                rules={{
                  required: 'Đây là trường bắt buộc',
                }}
              />
              <Box className='flex flex-row'>
                <CoreInput
                  control={control}
                  name='newPassword'
                  type='password'
                  label={'Mật khẩu mới'}
                  placeholder={'Mật khẩu mới'}
                  className='w-1/2 mb-15 mr-15'
                  rules={{
                    required: 'Đây là trường bắt buộc',
                  }}
                />
                <CoreInput
                  control={control}
                  name='newPasswordMatch'
                  type='password'
                  label={'Nhập lại mật khẩu mới'}
                  placeholder={'Nhập'}
                  className='w-1/2 mb-15'
                  rules={{
                    required: 'Đây là trường bắt buộc',
                    validate: {
                      isSame: (v: string) =>
                        v === firstPassword || 'Mật khẩu mới không khớp',
                    },
                  }}
                />
              </Box>
              <Box className='w-full flex justify-center'>
                <LoadingButton
                  className='mt-20'
                  size='large'
                  style={{ marginTop: 40 }}
                  disableElevation
                  type='submit'
                  variant='contained'
                  loading={formState.isSubmitting}
                >
                  {t('common:btn.save')}
                </LoadingButton>
              </Box>
            </form>
          </FormProvider>
        </Box>
      </Box>
    </Box>
  )
}

export default UserPassword
