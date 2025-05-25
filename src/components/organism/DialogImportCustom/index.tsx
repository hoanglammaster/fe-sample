/* eslint-disable @next/next/no-img-element */
import LoadingPage from '@/components/atoms/LoadingPage'
import {
  PRIMARY,
  TEXT_BUTTON,
} from '@/components/layouts/WrapLayout/Theme/colors'
import { errorMsg } from '@/helper/message'
import { LoadingButton } from '@mui/lab'
import {
  Box,
  Button,
  Divider,
  IconButton,
  LinearProgress,
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
import { useTranslation } from 'react-i18next'
// let XLSX = require('xlsx')

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
  loadingImport?: boolean
  textBtnImport?: string
  title?: ReactNode
  formProps?: ComponentPropsWithoutRef<'form'>
  bottomNode?: ReactNode
  onClose: () => void
  onCancel: () => void
  position?: 'middle' | 'top'
  width?: number
  height?: number
  fontSize?: number
  onImport?: any
  handleDownloadTemplate?: any
} & Omit<DialogProps, 'open' | 'title'>

export const DialogImportCustom = ({
  open = true,
  title,
  fontSize,
  children,
  formProps,
  bottomNode,
  fullScreen,
  position,
  width = 640,
  loadingBtnImport,
  loadingImport,
  onCancel,
  onClose,
  textBtnImport = 'Import',
  onImport,
  handleDownloadTemplate,
  ...other
}: Props) => {
  const headingId = useId()
  const theme = useTheme()
  const fullScreenValue = useMediaQuery(theme.breakpoints.down('sm'))
  const { t } = useTranslation()

  const [file, setFile] = React.useState<File | null>(null)
  const [fileName, setFileName] = React.useState<string>('')
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const uploadedFile = e.target.files?.[0]
      const validType = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel',
      ]
      if (
        uploadedFile &&
        uploadedFile?.size < 10000000 &&
        validType.includes(uploadedFile.type)
      ) {
        setFile(uploadedFile)
        setFileName(uploadedFile.name)
        setProgress(0)
      } else if (uploadedFile && uploadedFile?.size > 10000000) {
        errorMsg('File must not exceed 10MB')
        handleClearFile()
      } else if (uploadedFile && !validType.includes(uploadedFile.type)) {
        errorMsg(t('common:validation.fileValid', { field: 'xls, xlsx' }))
        handleClearFile()
      }
    } catch (e) {
      onClose()
    } finally {
      e.target.files = null
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleClearFile = () => {
    setFile(null)
    setFileName('')
    setProgress(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const [progress, setProgress] = React.useState<number>(0)

  React.useEffect(() => {
    let timer: any = null
    if (fileName && progress < 100) {
      timer = setInterval(() => {
        setProgress((prevProgress) =>
          prevProgress >= 90 ? 100 : prevProgress + Math.random() * 11
        )
      }, 100)
    } else {
      clearInterval(timer)
    }
    return () => {
      clearInterval(timer)
    }
  }, [fileName, progress])

  const handleDownloadFile = () => {
    if (file) {
      const url = URL.createObjectURL(file)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', file.name)
      document.body.appendChild(link)
      link.click()
      link.remove()
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    formProps?.onSubmit?.(event)
  }

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
          // minHeight: `${height}px`,
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
          {title}
        </Typography>
      </BootstrapDialogTitle>

      <form {...formProps} onSubmit={handleSubmit}>
        {loadingImport ? (
          <div className='flex flex-col'>
            <div className='pt-20'>
              <LoadingPage />
            </div>
            <div className='flex justify-center mt-30'>
              <Typography>{"Don't Close Window"}</Typography>
            </div>
          </div>
        ) : (
          <DialogContent
            dividers
            sx={{
              border: 'none',
              padding: '10px',
              margin: 0,
              overflow: 'hidden',
            }}
          >
            <input
              type='file'
              accept='.xlsx'
              style={{ display: 'none' }}
              id='fileInput'
              onChange={handleFileUpload}
              ref={fileInputRef}
            />
            <label htmlFor='fileInput'>
              <Box
                sx={{
                  borderRadius: '8px',
                  border: `1px dashed var(--primary-viettel-pay-red-60, #F56685)`,
                  display: 'flex',
                  width: '540px',
                  height: '78px',
                  padding: '16px 115px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  margin: 'auto',
                }}
              >
                <Image
                  alt=''
                  src={require('@/assets/svg/import/uploadFile.svg')}
                />
                <Typography variant='h5' color={PRIMARY} fontSize={16}>
                  Upload file
                </Typography>
              </Box>
            </label>
            {!!fileName && (
              <Box className='flex items-center justify-center gap-5 mt-10'>
                {/* <Image alt='' src={require('@/assets/svg/import/fileSelected.svg')} /> */}
                <Box>
                  <Box className='flex items-center justify-between gap-5 mb-2'>
                    <Typography
                      variant='h5'
                      sx={{
                        cursor: 'pointer',
                        marginTop: progress < 100 ? 0 : '5px',
                      }}
                      onClick={handleDownloadFile}
                    >
                      {fileName}
                    </Typography>
                    {progress < 100 && (
                      <Typography variant='h5' color={TEXT_BUTTON}>
                        {`(${Math.round(progress)}%)`}
                      </Typography>
                    )}
                  </Box>
                  {progress < 100 && (
                    <Box>
                      <LinearProgress
                        variant='determinate'
                        value={progress}
                        style={{ borderRadius: '4px', width: '480px' }}
                      />
                    </Box>
                  )}
                </Box>
                <IconButton onClick={handleClearFile}>
                  <svg
                    width='16'
                    height='17'
                    viewBox='0 0 16 17'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <circle
                      cx='8'
                      cy='8.13379'
                      r='8'
                      fill='black'
                      fill-opacity='0.25'
                    />
                    <path
                      fill-rule='evenodd'
                      clip-rule='evenodd'
                      d='M10.3332 11.5983C10.6846 11.9498 11.2545 11.9498 11.6059 11.5983C11.9574 11.2469 11.9574 10.677 11.6059 10.3256L9.27251 7.99211L11.4646 5.80007C11.816 5.4486 11.816 4.87875 11.4646 4.52728C11.1131 4.17581 10.5432 4.17581 10.1918 4.52728L7.99972 6.71932L5.80767 4.52728C5.4562 4.1758 4.88635 4.1758 4.53488 4.52728C4.18341 4.87875 4.18341 5.4486 4.53488 5.80007L6.72693 7.99211L4.39349 10.3256C4.04201 10.677 4.04201 11.2469 4.39349 11.5983C4.74496 11.9498 5.31481 11.9498 5.66628 11.5983L7.99972 9.26491L10.3332 11.5983Z'
                      fill='white'
                    />
                  </svg>
                </IconButton>
              </Box>
            )}
            {!fileName && (
              <Typography
                fontWeight={600}
                variant='h5'
                sx={{
                  textAlign: 'center',
                  textDecorationLine: 'underline',
                  color: '#507AE5',
                  marginTop: '20px',
                  cursor: 'pointer',
                }}
                onClick={handleDownloadTemplate}
              >
                Download import file template
              </Typography>
            )}
            <Typography
              variant='h5'
              sx={{
                textAlign: 'center',
                color: '#F57322',
                marginTop: '20px',
                fontStyle: 'italic',
              }}
            >
              Note: The system only allows importing a maximum of 1000 lines at
              a time!
            </Typography>
          </DialogContent>
        )}

        {bottomNode && <>{bottomNode}</>}
        {loadingImport ? (
          <Box
            className='flex'
            sx={{ border: '1px solid #E9E9E9', marginTop: '20px' }}
          >
            <Button
              color='inherit'
              sx={{
                width: '100%',
                fontSize: '18px',
                color: '#7A7A7A',
                borderRadius: 0,
                height: '54px',
                backgroundColor: 'white',
              }}
              onClick={onCancel}
            >
              Close
            </Button>
          </Box>
        ) : (
          <Box
            className='flex'
            sx={{ border: '1px solid #E9E9E9', marginTop: '20px' }}
          >
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
              Cancel
            </Button>
            <Divider sx={{ backgroundColor: '#E9E9E9', width: '1px' }} />
            {!onImport && (
              <LoadingButton
                color='inherit'
                type='submit'
                loading={loadingBtnImport}
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
                {textBtnImport}
              </LoadingButton>
            )}
            {!!onImport && (
              <Button
                color='inherit'
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
                onClick={() => {
                  if (!!file) {
                    onImport(file)
                  } else {
                    errorMsg(t('common:validation.enter', { msg: 'File' }))
                    onClose()
                  }
                }}
                disabled={
                  loadingBtnImport || (!(progress === 0) && progress < 100)
                }
              >
                {textBtnImport}
              </Button>
            )}
          </Box>
        )}
      </form>
    </Dialog>
  )
}
