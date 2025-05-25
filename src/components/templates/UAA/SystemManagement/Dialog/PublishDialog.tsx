import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { DialogConfirmCustom } from '@/components/organism/DialogConfirmCustom'
import { DialogCustom } from '@/components/organism/DialogCustom'
import { Box, Typography } from '@mui/material'

interface Props {
  t: any
  onSubmit: any
  row?: any
}

export const PublishDialog = (props: Props) => {
  const { onSubmit, t, row } = props
  const { hideDialog } = useDialog()
  return (
    <DialogConfirmCustom
      onClose={hideDialog}
      position='middle'
      width={500}
      onCancel={() => {
        hideDialog()
      }}
      onAgree={() => (row ? onSubmit(row?.id, row?.version) : onSubmit())}
    >
      <Box className='flex flex-col justify-center font-medium text-[20px] max-w-[351px] m-auto text-center'>
        <Typography variant='h4'>{t('question.publish')}</Typography>
      </Box>
    </DialogConfirmCustom>
  )
}
