import { BLACK } from '@/helper/colors'
import { isHTMLString } from '@/helper/message'
import { Box, ButtonBase, Divider, Typography, useTheme } from '@mui/material'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'
import useMediaQuery from '@mui/material/useMediaQuery'
import Image from 'next/image'
import * as React from 'react'
import { ReactNode, useId } from 'react'
import { useTranslation } from 'react-i18next'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='down' ref={ref} {...props} />
})

function ErrorDialogTitle({
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
          className='absolute right-7 top-7'
          onClick={onClose}
          height={25}
          width={25}
          src={require('@/assets/svg/close.svg')}
          alt='close'
        />
      ) : null}
    </DialogTitle>
  )
}

export type Props = {
  open?: boolean
  title?: ReactNode
  onClose: () => void
  position?: 'middle' | 'top'
  width?: number
  message: string
} & Omit<DialogProps, 'open' | 'title'>

export const ErrorDialog = ({
  open = true,
  title,
  fullScreen,
  position,
  width = 480,
  onClose,
  message,
  ...other
}: Props) => {
  const headingId = useId()
  const theme = useTheme()
  const fullScreenValue = useMediaQuery(theme.breakpoints.down('sm'))

  const { t } = useTranslation('common')

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
          justifyContent: 'center',
        },
      }}
      {...other}
    >
      <ErrorDialogTitle id={headingId} onClose={onClose}>
        <Typography variant='h3' className='mt-2'>
          {title ?? 'Error'}
        </Typography>
      </ErrorDialogTitle>
      <DialogContent
        dividers
        sx={{ border: 'none', padding: '0px 10px 20px 10px', margin: 0 }}
      >
        <Box className='flex flex-col justify-center font-medium text-[20px] m-auto text-center mt-10'>
          {isHTMLString(message) ? (
            <Typography
              variant='h4'
              sx={{ color: BLACK }}
              dangerouslySetInnerHTML={{ __html: message }}
            />
          ) : (
            <Typography variant='h4' sx={{ color: BLACK }}>
              {message}
            </Typography>
          )}
        </Box>
      </DialogContent>
      <Divider className='w-full' />
      <ButtonBase sx={{ padding: '20px' }} onClick={() => onClose()}>
        <Typography variant='h4' sx={{ color: '#7A7A7A' }}>
          {t('close')}
        </Typography>
      </ButtonBase>
    </Dialog>
  )
}
