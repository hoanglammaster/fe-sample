import { useDialog } from '@/components/hooks/dialog/useDialog'
import { DialogConfirmCustom } from '@/components/organism/DialogConfirmCustom'
import { Box, Typography } from '@mui/material'
import { useDialogDeleteSubMenu } from './useDeleteDialog'

export const DialogDeleteSubMenu = ({
    id,
    refetch,
    version
}: {
    id: number
    refetch: any
    version: number
}) => {
    const { hideDialog } = useDialog()
    const [values, handles] = useDialogDeleteSubMenu(id, refetch, version)
    const { isLoading } = values
    const { onSubmit } = handles
    return (
        <DialogConfirmCustom
            onClose={hideDialog}
            position='middle'
            width={410}
            formProps={{ onSubmit, 'aria-label': 'dialog delete sub menu' }}
            onCancel={() => {
                hideDialog()
            }}
            loadingBtnAgree={isLoading}
        >
            <Box className='flex flex-col justify-center font-medium text-[20px] max-w-[350px] m-auto text-center'>
                <Typography variant='h4'>
                    Are you sure you want to delete this record?
                </Typography>
            </Box>
        </DialogConfirmCustom>
    )
}