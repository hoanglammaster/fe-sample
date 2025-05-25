import { TEXT_BUTTON } from '@/components/layouts/WrapLayout/Theme/colors'
import { errorMsg } from '@/helper/message'
import { Box, Button, Slide, Typography, useTheme } from '@mui/material'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { TransitionProps } from '@mui/material/transitions'
import useMediaQuery from '@mui/material/useMediaQuery'
import Image from 'next/image'
import * as React from 'react'
import { ComponentPropsWithoutRef, ReactNode, useId } from 'react'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='down' ref={ref} {...props} />
})

function BootstrapDialogTitle({
  children,
  onClose,
  ...other
}: {
  id: string
  children?: React.ReactNode
  onClose: () => void
}) {
  return (
    <DialogTitle
      sx={{
        padding: '30px 0 0 0',
        minHeight: '50px',
        display: 'flex',
        justifyContent: 'center',
      }}
      {...other}
    >
      {children}
      {onClose ? (
        <Image
          className='absolute cursor-pointer right-10 top-10'
          onClick={onClose}
          height={15}
          width={15}
          src={require('@/assets/svg/close.svg')}
          alt='close'
        />
      ) : null}
    </DialogTitle>
  )
}

export type Props = {
  open?: boolean
  loadingBtnImport?: boolean
  title?: ReactNode
  formProps?: ComponentPropsWithoutRef<'form'>
  bottomNode?: ReactNode
  onClose: () => void
  position?: 'middle' | 'top'
  width?: number
  fontSize?: number
  noSuccess?: any
  noTotal?: any
  handleDownloadResult?: any
} & Omit<DialogProps, 'open' | 'title'>

export const DialogImportResultCustom = ({
  open = true,
  title,
  fontSize,
  formProps,
  bottomNode,
  fullScreen,
  position,
  width = 640,
  loadingBtnImport,
  onClose,
  noSuccess,
  noTotal,
  handleDownloadResult,
  ...other
}: Props) => {
  const headingId = useId()
  const theme = useTheme()
  const fullScreenValue = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Dialog
      TransitionComponent={Transition}
      aria-labelledby={headingId}
      open={open}
      fullScreen={fullScreen || fullScreenValue}
      PaperProps={{
        style: {
          width: '100%',
          minWidth: `${width}px`,
          maxWidth: `${width}px`,
        },
      }}
      sx={{
        color: '#242424',
        '& .MuiDialog-container': {
          flexDirection: 'column',
          justifyContent: position === 'middle' ? 'center' : 'start',
          paddingTop: position === 'middle' ? '' : '100px',
        },
      }}
      {...other}
    >
      <BootstrapDialogTitle id={headingId} onClose={onClose}>
        <Typography variant='h3' className='mt-2'>
          {title}
        </Typography>
      </BootstrapDialogTitle>

      <form {...formProps}>
        <DialogContent
          dividers
          sx={{
            border: 'none',
            padding: 0,
            margin: 0,
            marginBottom: 3,
            overflow: 'hidden',
          }}
        >
          <Typography
            fontWeight={400}
            variant='h5'
            sx={{
              textAlign: 'center',
              marginTop: '20px',
              fontSize: '16px',
            }}
          >
            {`Successfully imported ${noSuccess}/${noTotal} records`}
          </Typography>
          <Typography
            fontWeight={400}
            variant='h5'
            sx={{
              textAlign: 'center',
              textDecorationLine: 'underline',
              color: '#507AE5',
              marginTop: '20px',
              cursor: 'pointer',
              fontSize: '16px',
            }}
            onClick={() => {
              handleDownloadResult()
            }}
          >
            Download The Result File Here
          </Typography>
        </DialogContent>
        {bottomNode && <>{bottomNode}</>}

        <Box
          className='flex items-center justify-center'
          sx={{ border: '1px solid #E9E9E9' }}
        >
          <Button
            color='inherit'
            sx={{
              width: '50%',
              fontSize: '18px',
              color: TEXT_BUTTON,
              borderRadius: 0,
              height: '54px',
              backgroundColor: 'white',
            }}
            onClick={onClose}
          >
            Close
          </Button>
        </Box>
      </form>
    </Dialog>
  )
}
