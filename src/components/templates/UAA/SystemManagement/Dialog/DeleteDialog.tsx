import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { DialogConfirmCustom } from '@/components/organism/DialogConfirmCustom'
import { DialogCustom } from '@/components/organism/DialogCustom'
import { Box, Typography } from '@mui/material'

interface Props {
  t: any
  handleDeleteRow: any
  row?: any
  text?: string
}

export const DeleteDialog = (props: Props) => {
  const { handleDeleteRow, t, row, text } = props
  const { hideDialog } = useDialog()
  return (
    <DialogConfirmCustom
      onClose={hideDialog}
      position='middle'
      width={500}
      onCancel={() => {
        hideDialog()
      }}
      onAgree={() => {
        row ? handleDeleteRow(row?.id, row?.version) : handleDeleteRow()
      }}
    >
      <Box className='flex flex-col justify-center font-medium text-[20px] max-w-[351px] m-auto text-center'>
        <Typography variant='h4'>{text ?? t('question.delete')}</Typography>
      </Box>
    </DialogConfirmCustom>
  )
}
