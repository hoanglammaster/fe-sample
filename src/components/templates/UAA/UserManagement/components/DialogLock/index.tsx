import { useDialog } from '@/components/hooks/dialog/useDialog'
import { DialogConfirmCustom } from '@/components/organism/DialogConfirmCustom'
import { errorMsg, successMsg } from '@/helper/message'
import { Box, Typography } from '@mui/material'
import { actionUser } from '../../service'
import { useState } from 'react'

const DialogAction = ({
  t,
  id,
  action,
  refetch,
  version,
}: {
  t: any
  id: number
  action: string
  refetch: () => void
  version: number
}) => {
  const [loading, setLoading] = useState(false)
  const { hideDialog } = useDialog()
  const onAgree = async () => {
    setLoading(true)
    try {
      const res = await actionUser(id, action, version)
      hideDialog()
      refetch()
    } catch (e) {}
    setLoading(false)
    hideDialog()
  }
  return (
    <DialogConfirmCustom
      open
      position='middle'
      onClose={hideDialog}
      width={500}
      onCancel={hideDialog}
      onAgree={onAgree}
      loadingBtnAgree={loading}
    >
      <Box className='flex flex-col justify-center font-medium text-[20px] max-w-[351px] m-auto text-center'>
        <Typography variant='h4'>
          {t('common:dialog.message', {
            action: t(`common:dialog.action.${action}`),
            label: t('label.user'),
          })}
        </Typography>
      </Box>
    </DialogConfirmCustom>
  )
}

export default DialogAction
