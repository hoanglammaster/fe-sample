import { useDialog } from '@/components/hooks/dialog/useDialog'
import { DialogConfirmCustom } from '@/components/organism/DialogConfirmCustom'
import { Box, Typography } from '@mui/material'
import { useDialogChangeStatusSubMenu } from './usePublishDialog'

export const DialogChangeStatusSubMenu = ({
    id,
    refetch,
    version
}: {
    id: number
    refetch?: any
    version: number
}) => {
    const { hideDialog } = useDialog()
    const [values, handles] = useDialogChangeStatusSubMenu(id, refetch, version)
    const { isLoading } = values
    const { onSubmit } = handles
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
                <Typography variant='h4'>
                    Are you sure you want to publish this record?
                </Typography>
            </Box>
        </DialogConfirmCustom>
    )
}
