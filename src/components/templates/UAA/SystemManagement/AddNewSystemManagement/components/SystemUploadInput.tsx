import UploadSimple from '@/components/Icon/UploadSimple'
import ViewIcon from '@/components/Icon/ViewIcon'
import LoadingPage from '@/components/atoms/LoadingPage'
import CoreDialog from '@/components/molecules/CoreDialog'
import { errorMsg } from '@/helper/message'
import useGetImage from '@/helper/useGetImage'
import CloseIcon from '@mui/icons-material/Close'
import {
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import Divider from '@mui/material/Divider'
import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { fileUploadUAA } from '../../service'
// import PropTypes from 'prop-types'

const SystemUploadInput = (props: any) => {
  const {
    control,
    name,
    className,
    label,
    placeholder,
    required,
    params,
    helperText,
    fileType,
    disabled,
    ...restProps
  } = props
  const [loading, setLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<string>('')
  const { handleGetUrlImage, urlImage, loadingImage } = useGetImage()
  const { t } = useTranslation('common')

  const handleOpenDialog = (url: string) => {
    setOpen(url?.endsWith('.pdf') ? 'pdf' : 'img')
    handleGetUrlImage(url)
  }
  const handleUploadFile = async (e: any, field: any) => {
    const files = e.target.files
    const filesSize = files[0]?.size
    try {
      setLoading(true)
      const listType = ['image/png', 'image/jpeg', 'image/gif']
      if (listType.includes(files[0].type) && filesSize <= 209715200) {
        const formData = new FormData()
        formData.append('file', files[0])
        const res = await fileUploadUAA(formData, params)
        field.onChange(res?.data?.data.url)
      } else errorMsg(t('helperText.filesCanBeUploaded'))

      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  // useEffect(() => {
  //   if (
  //     open === 'pdf' &&
  //     urlImage &&
  //     document.getElementById('file-viewer-frame')
  //   ) {
  //     document.getElementById('file-viewer-frame').src = `${urlImage}#toolbar=0`
  //   }
  // }, [open, urlImage])

  return (
    <div className={className}>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <TextField
            fullWidth
            error={!!error}
            helperText={error && error.message}
            InputLabelProps={{
              shrink: placeholder ? true : undefined,
              required,
            }}
            onBlur={field.onBlur}
            inputRef={field.ref}
            variant='standard'
            label={label}
            placeholder={placeholder ?? label?.toLowerCase()}
            value={field.value ?? ''}
            // value={field.value.uploadFile?.originFileName}
            InputProps={{
              style: { padding: 0 },
              readOnly: true,
              endAdornment: (
                <InputAdornment position='end'>
                  <Box className='flex items-center justify-center mx-3 cursor-pointer'>
                    {field.value && (
                      <IconButton
                        onClick={() => {
                          !disabled && field.onChange(null)
                        }}
                      >
                        <CloseIcon color='error' fontSize='small' />
                      </IconButton>
                    )}
                    <Divider orientation='vertical' flexItem />
                    {field.value ? (
                      <ViewIcon
                        onClick={() => {
                          handleOpenDialog(field.value)
                        }}
                      />
                    ) : (
                      <Typography
                        sx={{ color: '#747475', marginX: '5px' }}
                        variant='body2'
                      >
                        Upload
                        <input
                          type='file'
                          accept={fileType}
                          disabled={disabled}
                          onChange={(e) => handleUploadFile(e, field)}
                          className='absolute w-[100px] top-0 h-full opacity-0 cursor-pointer right-6'
                        />
                      </Typography>
                    )}
                    {loading ? (
                      <CircularProgress size={20} sx={{ color: '#747475' }} />
                    ) : (
                      <Box className='relative'>
                        <UploadSimple />
                        <input
                          type='file'
                          accept={fileType}
                          onChange={(e) =>
                            handleUploadFile(e.target.value, field)
                          }
                          disabled={disabled}
                          className='absolute top-0 right-0 w-full h-full opacity-0 cursor-pointer'
                          style={{ zIndex: 0 }}
                        />
                      </Box>
                    )}
                  </Box>
                </InputAdornment>
              ),
            }}
          />
        )}
        {...restProps}
      />
      {helperText && (
        <Typography className='italic text-[#747475] text-[12px]'>
          {helperText}
        </Typography>
      )}
      <CoreDialog
        open={!!open}
        handleClose={() => setOpen('')}
        maxWidth='md'
        fullWidth
        dialogContent={
          <Box className='relative w-full p-10 h-200'>
            {loadingImage ? (
              <LoadingPage />
            ) : open === 'pdf' ? (
              <iframe
                id='file-viewer-frame'
                title='demo'
                src=''
                width='100%'
                height='100%'
                style={{
                  overflow: 'auto',
                  backgroundColor: '#FFFFFF',
                  color: '#000000',
                }}
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={urlImage}
                alt=''
                style={{
                  height: '100%',
                  width: '100%',
                  objectFit: 'contain',
                }}
              />
            )}
          </Box>
        }
      />
    </div>
  )
}

//InputUploadFile.defaultProps = {}

//InputUploadFile.propTypes = {}

export default React.memo(SystemUploadInput)
