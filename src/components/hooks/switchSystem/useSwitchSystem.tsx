/* eslint-disable no-unused-vars */
import DefaultImageApp from '@/assets/png/customer.png'
import ArrowsIcon from '@/assets/svg/arrows.svg'
import LoadingPage from '@/components/atoms/LoadingPage'
import { PRIMARY, WHITE } from '@/components/layouts/WrapLayout/Theme/colors'
import useGetImage from '@/components/molecules/useGetImage'
import { getListProduct } from '@/components/templates/UAA/UserManagement/service'
import { errorMsg } from '@/helper/message'
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

// import CoreDialog from "../components/common/CoreDialog";

const BizzAppBox = (props: any) => {
  const { item, handleChangeBizzApp } = props
  const { handleGetUrlImage, urlImage, loadingImage } = useGetImage()

  useEffect(() => {
    item?.imageUrl && handleGetUrlImage(item?.imageUrl)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item])

  return (
    <Box
      className='flex flex-col items-center'
      sx={{
        ':hover': {
          cursor: 'pointer',
        },
      }}
      onClick={() => handleChangeBizzApp(item)}
    >
      {loadingImage ? (
        <div className='relative w-75 h-75'>
          <LoadingPage />
        </div>
      ) : (
        <Image
          width={150}
          height={150}
          style={{ objectFit: 'cover', borderRadius: 8 }}
          src={urlImage ?? DefaultImageApp}
          alt={item?.name}
        />
      )}

      <Typography className='mt-8 line-clamp-1 px-3'>{item?.name}</Typography>
    </Box>
  )
}

export const useSwitchSystem = () => {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const [totalListBizz, setTotalBizzList] = useState<any[]>([])
  const [loginRender, setLoginRender] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleOpenDialog = () => setOpen(true)
  const handleCloseDialog = () => {
    setLoginRender(false)
    setOpen(false)
  }

  const handleOpenDialogOnLogin = async () => {
    try {
      setLoginRender(true)
      setLoading(true)
      const res2 = await getListProduct()
      const newList = res2?.data?.data?.filter((v: any) => !!v.systemLink) ?? []
      setTotalBizzList(newList)
      if (!newList.length || !!window.location.href.includes('localhost')) {
        router.push('/')
      } else if (
        newList.length === 1 &&
        !window.location.href.includes('localhost')
      ) {
        handleChangeBizzApp(newList[0])
        setLoginRender(false)
      } else {
        setOpen(true)
      }
    } catch (e) {
      setLoginRender(false)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  const handleChangeBizzApp = useCallback(
    (bizzApp: any) => {
      if (bizzApp?.systemLink) {
        window.location.href = bizzApp?.systemLink
      }
      if (open) {
        handleCloseDialog()
      }
    },
    [open]
  )
  const { t } = useTranslation('common')

  const getCurrentUserRole = async () => {
    try {
      setLoading(true)
      const res2 = await getListProduct()
      const newList = res2?.data?.data?.filter((v: any) => !!v.systemLink) ?? []
      setOpen(true)
      setTotalBizzList(newList)
      setLoading(false)
    } catch (err) {
      setOpen(false)
    } finally {
      setLoading(false)
    }
  }

  const renderDialogChoseBizzApp = () => {
    return (
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{ className: 'rounded-lg', style: { overflow: 'inherit' } }}
      >
        <DialogTitle
          style={{
            backgroundColor: PRIMARY,
            color: WHITE,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
          className='relative'
        >
          <Box>
            <Box
              className='flex justify-center w-full'
              style={{ position: 'absolute', top: '-50%', left: 0, right: 0 }}
            >
              <Box className='bg-white rounded-full p-10'>
                <Image src={ArrowsIcon} alt='' />
              </Box>
            </Box>
          </Box>

          <Typography
            className='uppercase text-center mt-20'
            variant='h3'
            sx={{ color: WHITE }}
          >
            {t('bizzapp.label')}
          </Typography>
        </DialogTitle>
        <DialogContent>
          {loading ? (
            <LoadingPage />
          ) : (
            <Box className='grid grid-cols-3 gap-15 mx-10 my-20'>
              {totalListBizz?.map((item, index) => {
                return (
                  <BizzAppBox
                    item={item}
                    key={index}
                    handleChangeBizzApp={handleChangeBizzApp}
                  />
                )
              })}
            </Box>
          )}
        </DialogContent>
      </Dialog>
    )
  }
  useEffect(() => {
    open && !loginRender && getCurrentUserRole()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, loginRender])

  return {
    renderDialogChoseBizzApp,
    handleOpenDialog,
    handleCloseDialog,
    handleOpenDialogOnLogin,
    loading,
  }
}
