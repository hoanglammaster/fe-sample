import { useDialog } from '@/components/hooks/dialog/useDialog'
import { DialogConfirmCustom } from '@/components/organism/DialogConfirmCustom'
import React from 'react'
import { resetPassword } from '../../service'
import { errorMsg, successMsg } from '@/helper/message'
import { Typography } from '@mui/material'

const DialogResetPassword = ({
  roleTypeId,
  userId,
  t,
  phoneNumberOtp,
  version,
}: {
  roleTypeId: number
  userId: number
  t: any
  phoneNumberOtp?: number
  version: number
}) => {
  const { hideDialog } = useDialog()
  const onAgree = async () => {
    try {
      const res = await resetPassword({ roleTypeId, userId, version })
      hideDialog()
    } catch (e) {}
  }

  return (
    <DialogConfirmCustom
      open
      position='middle'
      onClose={hideDialog}
      width={500}
      onCancel={hideDialog}
      onAgree={onAgree}
    >
      <div className='flex flex-col px-30 text-center gap-5'>
        <Typography sx={{ fontSize: '16px' }}>
          {t('label.resetPasswordDialog')}
        </Typography>
        <Typography sx={{ fontSize: '16px', color: '#F57322' }}>
          {t('label.noteResetPassword', { phoneNumber: phoneNumberOtp })}
        </Typography>
      </div>
    </DialogConfirmCustom>
  )
}

export default DialogResetPassword
