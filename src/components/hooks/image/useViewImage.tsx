/* eslint-disable @next/next/no-img-element */
import { WHITE } from '@/components/layouts/WrapLayout/Theme/colors'
import { errorMsg } from '@/helper/message'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Box, Dialog, IconButton, Typography } from '@mui/material'
import axios from 'axios'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import useGetImage from './useGetImage'

interface ImageViewType {
  url: string
  name?: string
}

const useViewImage = () => {
  const [urlImg, setUrlImg] = useState<ImageViewType | null>(null)

  const { handleGetUrlImage, loadingImage, urlImage } = useGetImage()

  const handleDownloadFile = useCallback(async () => {
    if (urlImg) {
      try {
        const resBlob = await axios.get(urlImg.url, {
          responseType: 'blob',
        })
        const url = window.URL.createObjectURL(resBlob?.data)
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', urlImg?.name ?? 'download.png')
        document.body.appendChild(link)
        link.click()
        link.parentNode?.removeChild(link)
      } catch (e) {}
    }
  }, [urlImg])

  const handleOpen = (link: ImageViewType) => setUrlImg(link)
  const handleClose = () => setUrlImg(null)
  const renderDialogImage = useCallback(() => {
    if (!!urlImg) {
      return (
        <Dialog
          open
          fullScreen
          onClose={handleClose}
          PaperProps={{
            className: 'w-full flex items-center',
            sx: {
              background:
                'linear-gradient(180deg, rgba(0, 0, 0, 0.80) 0%, rgba(0, 0, 0, 0.06) 100%)',
            },
          }}
        >
          <Box
            sx={{
              background:
                'linear-gradient(180deg, rgba(0, 0, 0, 0.80) 0%, rgba(0, 0, 0, 0.06) 100%)',
            }}
            className='w-full h-30 flex mb-20 justify-between items-center px-15'
          >
            <Box className='flex items-center'>
              <IconButton onClick={handleClose} className='mr-8'>
                <ArrowBackIcon sx={{ color: WHITE }} />
              </IconButton>
              <Typography variant='body2' sx={{ color: WHITE }}>
                {urlImg?.name}
              </Typography>
            </Box>
            <IconButton onClick={handleDownloadFile}>
              <Image
                alt={urlImg.url}
                src={require('@/assets/svg/ic_download.svg')}
                width={20}
                height={20}
              />
            </IconButton>
          </Box>
          <Box className='flex items-center relative'>
            {urlImage && (
              <Image
                unoptimized
                alt={urlImg?.name ?? ''}
                src={urlImage}
                style={{ objectFit: 'contain' }}
                width={900}
                height={500}
              />
            )}
          </Box>
        </Dialog>
      )
    } else return null
  }, [handleDownloadFile, urlImage, urlImg])

  console.log('urlImag11e', urlImg, urlImage)

  useEffect(() => {
    urlImg?.url && handleGetUrlImage(urlImg?.url)
  }, [urlImg])

  return { handleClose, handleOpen, renderDialogImage }
}

export default useViewImage
