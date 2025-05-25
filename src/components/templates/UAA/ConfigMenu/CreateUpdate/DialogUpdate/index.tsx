import { useDialog } from '@/components/hooks/dialog/useDialog'
import { DialogConfirmCustom } from '@/components/organism/DialogConfirmCustom'
import { Box, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'

export const DialogUpdate = ({
  content,
  onAgree,
  isLoading,
}: {
  content: string
  onAgree: () => void
  isLoading?: boolean
}) => {
  const { hideDialog } = useDialog()
  const { handleSubmit } = useForm()
  const onSubmit = handleSubmit(() => onAgree())
  return (
    <DialogConfirmCustom
      onClose={hideDialog}
      position='middle'
      width={410}
      formProps={{ onSubmit, 'aria-label': 'dialog delete system' }}
      onCancel={() => {
        hideDialog()
      }}
      loadingBtnAgree={isLoading}
    >
      <Box className='flex flex-col justify-center font-medium text-[20px] max-w-[351px] m-auto text-center'>
        <Typography variant='h4'>{content}</Typography>
      </Box>
    </DialogConfirmCustom>
  )
}
