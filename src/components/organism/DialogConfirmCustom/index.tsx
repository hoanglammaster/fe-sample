import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import { LoadingButton } from '@mui/lab'
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Typography,
  useTheme,
} from '@mui/material'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
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
  loadingBtnAgree?: boolean
  textBtnAgree?: string
  textBtnCancel?: string
  title?: ReactNode
  children: ReactNode
  formProps?: ComponentPropsWithoutRef<'form'>
  bottomNode?: ReactNode
  onClose: () => void
  onCancel: () => void
  onAgree?: () => void
  position?: 'middle' | 'top'
  width?: number
  fontSize?: number
} & Omit<DialogProps, 'open' | 'title'>

export const DialogConfirmCustom = ({
  open = true,
  title,
  fontSize,
  children,
  formProps,
  bottomNode,
  fullScreen,
  position,
  width = 640,
  loadingBtnAgree,
  onCancel,
  onClose,
  onAgree,
  textBtnAgree = 'Agree',
  textBtnCancel = 'Cancel',
  ...other
}: Props) => {
  const headingId = useId()
  const theme = useTheme()
  const fullScreenValue = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Dialog
      onClose={onClose}
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
        <Typography variant='h3' className='mt-2 mb-10'>
          {title ?? 'Confirmation'}
        </Typography>
      </BootstrapDialogTitle>

      <form {...formProps}>
        <DialogContent
          dividers
          sx={{ border: 'none', padding: 0, margin: 0, marginBottom: 4 }}
        >
          {children}
        </DialogContent>
        {bottomNode && <>{bottomNode}</>}

        <Box className='flex' sx={{ border: '1px solid #E9E9E9' }}>
          <Button
            color='inherit'
            sx={{
              width: '50%',
              fontSize: '18px',
              color: '#7A7A7A',
              borderRadius: 0,
              height: '54px',
              backgroundColor: 'white',
            }}
            onClick={onCancel}
          >
            {textBtnCancel}
          </Button>
          <Divider sx={{ backgroundColor: '#E9E9E9', width: '1px' }} />
          {!onAgree && (
            <LoadingButton
              color='inherit'
              type='submit'
              loading={loadingBtnAgree}
              sx={{
                width: '50%',
                fontSize: '18px',
                color: '#EE0033',
                fontWeight: 700,
                borderRadius: 0,
                height: '54px',
                backgroundColor: 'white',
                border: 'none',
              }}
            >
              Agree
            </LoadingButton>
          )}
          {!!onAgree && (
            <LoadingButton
              color='inherit'
              loading={loadingBtnAgree}
              sx={{
                width: '50%',
                fontSize: '18px',
                color: '#EE0033',
                fontWeight: 700,
                borderRadius: 0,
                height: '54px',
                backgroundColor: 'white',
                border: 'none',
              }}
              onClick={() => onAgree()}
            >
              {textBtnAgree}
            </LoadingButton>
          )}
        </Box>
      </form>
    </Dialog>
  )
}
