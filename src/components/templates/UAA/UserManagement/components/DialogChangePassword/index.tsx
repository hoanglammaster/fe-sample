import CoreInput from '@/components/atoms/CoreInput'
import { DialogConfirmCustom } from '@/components/organism/DialogConfirmCustom'
import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE_UAA } from '@/routes'
import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { updateUserPassword } from '../../service'

export const useChangePasswordUser = () => {
  const { t } = useTranslation(TRANSLATE_UAA.USER)

  const [userInfo, setUserInfo] = useState<any>()

  const { handleSubmit, control, watch, formState, reset } = useFormCustom<{
    newPassword: string
    userId: number
  }>({
    mode: 'onTouched',
    defaultValues: {},
  })

  const firstPassword = watch('newPassword')

  const handleSubmitChangePassword = handleSubmit(async (val) => {
    try {
      const dataBody = {
        newPassword: val.newPassword,
        userId: userInfo?.id,
        roleTypeId: userInfo?.userRoleTypeRefs?.[0]?.roleTypeId,
      }
      const res = await updateUserPassword(dataBody)
      setUserInfo(null)
    } catch (err) {}
  })

  useEffect(() => {
    reset({})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo])

  const renderDialog = () => {
    return (
      <DialogConfirmCustom
        title={<Typography variant='h3'>{t('label.resetPassword')}</Typography>}
        open={!!userInfo}
        onCancel={() => setUserInfo(null)}
        onClose={() => setUserInfo(null)}
        position='middle'
        width={500}
        onAgree={handleSubmitChangePassword}
      >
        <Box className='p-10'>
          <form onSubmit={handleSubmitChangePassword} autoComplete='off'>
            <Box>
              <CoreInput
                label={t('label.newPassword')}
                placeholder={t('label.newPassword')}
                control={control}
                type='password'
                name='newPassword'
                className='mb-10'
                required
                rules={{
                  required: t('common:validation.required'),
                }}
              />
              <CoreInput
                label={t('label.reEnterPassword')}
                placeholder={t('label.reEnterPassword')}
                control={control}
                type='password'
                name='rePassword'
                required
                rules={{
                  required: t('common:validation.required'),
                  validate: {
                    isSame: (v: string) =>
                      v === firstPassword || t('validation.rePassword'),
                  },
                }}
              />
            </Box>
          </form>
        </Box>
      </DialogConfirmCustom>
    )
  }
  return { setUserInfo, renderDialog }
}
