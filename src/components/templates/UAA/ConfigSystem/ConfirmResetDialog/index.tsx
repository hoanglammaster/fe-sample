import { useDialog } from '@/components/hooks/dialog/useDialog'
import { useConfirmResetDialog } from './useConfirmResetDialog'
import { DialogCustom } from '@/components/organism/DialogCustom'
import { Box, Typography } from '@mui/material'
import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import { DialogConfirmCustom } from '@/components/organism/DialogConfirmCustom'

export const DialogConfirmReset = ({
  id,
  refetch,
}: {
  id: number
  refetch: any
}) => {
  const { hideDialog } = useDialog()
  const [values, handles] = useConfirmResetDialog(id, refetch)
  const { isLoading } = values
  const { onSubmit } = handles
  return (
    <DialogConfirmCustom
      onClose={hideDialog}
      position='middle'
      width={410}
      formProps={{ onSubmit, 'aria-label': 'dialog delete feature' }}
      onCancel={() => {
        hideDialog()
      }}
      loadingBtnAgree={isLoading}
    >
      <Box className='flex flex-col justify-center font-medium text-[20px] max-w-[351px] m-auto text-center'>
        <Typography variant='h4'>
          Are you sure you want to reset to default value?
        </Typography>
      </Box>
    </DialogConfirmCustom>
  )
}
