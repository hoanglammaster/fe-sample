/* eslint-disable react-hooks/exhaustive-deps */
import LoadingPage from '@/components/atoms/LoadingPage'
import { errorMsg } from '@/helper/message'
import useGetImage from '@/helper/useGetImage'
import { Avatar, Box, ButtonBase } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { uploadUserAvatar } from '../service'
import CropImageDialog from './CropImageDialog'
import Image from 'next/image'
import { useLogin } from '../../UAA/Login/hooks/useLogin'

const AvatarUpload = (props: any) => {
  const { control, name, watch, getUserDataInfo } = props
  const url = watch(name)
  const [loading, setLoading] = useState(false)
  const { handleGetUrlImage, loadingImage, urlImage } = useGetImage()
  const [urlUpload, setUrlUpload] = useState<any | null>(null)
  const { t } = useTranslation('common')
  const handleChooseFile = async ({ target: { files } }: any, field: any) => {
    try {
      setLoading(true)
      const listType = ['image/png', 'image/jpeg', 'image/gif']
      const file = files[0]
      const fileSizeInMB = 20 * 1024 * 1024 // 20MB in bytes
      if (listType.includes(file.type)) {
        if (file.size < fileSizeInMB) {
          const reader = new FileReader()
          reader.onload = () => {
            setUrlUpload(reader.result)
          }
          reader.readAsDataURL(file)
        } else {
          errorMsg(t('common:validation.fileSize', { max: '20MB' }))
        }
      } else errorMsg(t('message.upload_fail', { field: 'PNG, JPEG, JPG' }))

      setLoading(false)
    } catch (error) {
      setLoading(false)
    } finally {
      uploadRef.current.value = null
    }
  }

  const uploadRef: any = useRef()

  const { getAccountInfo } = useLogin()

  const handleUploadFile = async (file: any) => {
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('file', file)
      await uploadUserAvatar(formData)
      setUrlUpload(null)
      getUserDataInfo()
      getAccountInfo()
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    url && handleGetUrlImage(url)
  }, [url])

  return (
    <Box>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <div
            style={{ position: 'relative', height: '180px', width: '180px' }}
          >
            {loading || loadingImage ? (
              <div
                style={{
                  height: '180px',
                  width: '180px',
                  borderRadius: '50%',
                  border: '0.5px solid grey',
                }}
              >
                <LoadingPage />
              </div>
            ) : (
              <Box className='flex justify-center'>
                <Avatar
                  sx={{ ':hover': { cursor: 'pointer' } }}
                  style={{ width: 180, height: 180 }}
                  src={urlImage}
                />
              </Box>
            )}

            <input
              type='file'
              ref={uploadRef}
              accept='.jpg,.png,.jpeg,.gif'
              onChange={(e) => handleChooseFile(e, field)}
              className='absolute top-0 right-0 w-full h-full opacity-0 cursor-pointer'
              style={{ zIndex: 0, visibility: 'hidden' }}
            />
            <ButtonBase
              onClick={() => uploadRef?.current?.click()}
              sx={{
                backgroundColor: '#00000073',
                width: '62px',
                height: '62px',
                borderRadius: '50%',
                position: 'absolute',
                top: '120px',
                right: '0px',
              }}
              className='flex justify-center items-center'
            >
              <Image
                src={require('@/assets/svg/Camera.svg')}
                alt=''
                width={30}
              />
            </ButtonBase>
          </div>
        )}
      />
      <CropImageDialog
        open={!!urlUpload}
        onClose={() => setUrlUpload(null)}
        imageSrc={urlUpload}
        onSaveImage={handleUploadFile}
        loading={loading}
      />
    </Box>
  )
}

export default AvatarUpload
