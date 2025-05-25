/* eslint-disable @next/next/no-img-element */
import LoadingPage from '@/components/atoms/LoadingPage'
import useGetImage from '@/components/hooks/image/useGetImage'
import useViewImage from '@/components/hooks/image/useViewImage'
import { RED } from '@/components/layouts/WrapLayout/Theme/colors'
import { authUAAAPI } from '@/config/axiosConfig'
import { useUploadForm } from '@/config/zustand'
import { errorMsg, successMsg } from '@/helper/message'
import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import ImageViewBlob from './ImageViewBlob'

interface Props {
  isView?: boolean
  name: string
  onChangeValue?: (e: any) => void
  control: any
  label?: string
  className?: string
  required?: boolean
}

export const uploadImageFile = async (dataBody: any): Promise<any> => {
  const { data } = await authUAAAPI({
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    url: '/cms/api/v1/systems/images',
    data: dataBody,
    isFileUpload: true,
  })

  return data
}

const CoreUploadBox = (props: Props) => {
  const { label, control, isView, onChangeValue, name, className, required } =
    props
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { setIsUploading } = useUploadForm()
  const { handleClose, handleOpen, renderDialogImage } = useViewImage()

  const { t } = useTranslation('common')

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, ref } }) => {
        const handleChangeFile = async (
          event: React.ChangeEvent<HTMLInputElement>
        ) => {
          try {
            const listFileAllow = ['jpg', 'png', 'jpeg']
            const file = event.target.files?.[0]
            if (file) {
              if (listFileAllow.some((v) => file.type.includes(v))) {
                setLoading(true)
                setIsUploading(true)
                if (file.size <= 2000000) {
                  const formData = new FormData()

                  formData.append('file', file)

                  const res = await uploadImageFile(formData)

                  onChange(res?.data?.relativeUrl)
                  setLoading(false)
                  setIsUploading(false)
                } else {
                  errorMsg('File must not exceeds 2MB')
                  setLoading(false)
                  setIsUploading(false)
                }
              } else {
                errorMsg(
                  t('common:validation.imageType', { msg: '.JPG, .PNG, .JPEG' })
                )
                setLoading(false)
                setIsUploading(false)
              }
            }
          } catch (error) {
            setLoading(false)
            setIsUploading(false)
          }
          if (inputRef.current) {
            inputRef.current.value = ''
          }
        }
        return (
          <div className={className}>
            {label && (
              <Typography
                variant='body2'
                className='mb-4'
                style={{ fontSize: '11px', fontWeight: 700, color: '#7A7A7A' }}
              >
                {label} {required && <span style={{ color: RED }}>*</span>}
              </Typography>
            )}
            {loading ? (
              <Box className='w-50 h-50 rounded-[8px]' sx={{}}>
                <LoadingPage />
              </Box>
            ) : (
              <>
                {value ? (
                  <>
                    <div className='w-[64px] h-[64px] relative'>
                      <Box
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleOpen({ url: value, name: value })}
                      >
                        <ImageViewBlob url={value} width={64} height={64} />
                      </Box>
                      {!isView && (
                        <Image
                          alt='deleteImage'
                          className='absolute top-[-5px] cursor-pointer right-[-5px] z-9999'
                          src={require('@/assets/svg/icon_delete_image.svg')}
                          onClick={() => onChange(null)}
                        />
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className='w-[64px] h-[64px] flex justify-center items-center flex-col cursor-pointer rounded-[8px]'
                      style={{ border: '1px dashed #A7A7A7' }}
                      onClick={() => {
                        if (inputRef.current !== null) {
                          inputRef.current?.click()
                        }
                      }}
                    >
                      <Image
                        alt='addImage'
                        src={require('@/assets/svg/add_image.svg')}
                      />
                      <Typography variant='caption' className='mt-4'>
                        Add photo
                      </Typography>
                    </div>
                    <input
                      ref={inputRef}
                      type='file'
                      accept='.jpeg, .png ,.jpg'
                      hidden
                      disabled={isView}
                      onChange={handleChangeFile}
                    />
                  </>
                )}
              </>
            )}
            {renderDialogImage()}
          </div>
        )
      }}
    />
  )
}

export default CoreUploadBox
