import { useDialog } from '@/components/hooks/dialog/useDialog'
import { DialogConfirmCustom } from '@/components/organism/DialogConfirmCustom'
import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import { errorMsg, successMsg } from '@/helper/message'
import { actionClient } from '../service/service'

const DialogActionClient = ({
  t,
  row,
  action,
  refetch,
}: {
  t: any
  row: any
  action: string
  refetch: () => void
}) => {
  const { hideDialog } = useDialog()
  const [loading, setLoading] = useState(false)
  const onAgree = async () => {
    setLoading(true)
    try {
      const res = await actionClient(row?.id, action, row?.version)
      hideDialog()
      refetch()
    } catch (e) {
      hideDialog()
    }
    setLoading(false)
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
      <Box className='flex flex-col justify-center font-medium text-[20px] max-w-[351px] m-auto text-center'>
        <Typography variant='h4'>
          {t('common:dialog.message', {
            action: t(`common:dialog.action.${action}`),
            label: t('common:label.record'),
          })}
        </Typography>
      </Box>
    </DialogConfirmCustom>
  )
}

export default DialogActionClient
