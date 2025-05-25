import { useErrorBoundary, useUserInfo } from '@/config/zustand'
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import { memo, useEffect, useState } from 'react'
import FontSizeEdit from '../FontSizeEdit'
import LanguageButton from '../LanguageButton'
import { useLogin } from '@/components/templates/UAA/Login/hooks/useLogin'
import useGetImage from '@/helper/useGetImage'

const Header = () => {
  const { t } = useTranslation('common')

  const [anchorEl, setAnchorEl] = useState<any>(null)
  const [client, setClient] = useState(false)
  const openMenu = Boolean(anchorEl)
  const { logoutAccount, getAccountInfo } = useLogin()

  const { userInfo } = useUserInfo()

  const { handleGetUrlImage, loadingImage, urlImage } = useGetImage()

  const accountInfo = userInfo

  useEffect(() => {
    if (!accountInfo?.lastName) {
      getAccountInfo()
      setClient(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountInfo])

  useEffect(() => {
    accountInfo?.imageUrl && handleGetUrlImage(accountInfo?.imageUrl)
  }, [accountInfo])

  return (
    <Paper
      className='sticky top-0 flex flex-row items-center justify-between w-full bg-white rounded-none h-31'
      style={{ zIndex: 100, borderRadius: 0, boxShadow: 'none' }}
      elevation={2}
    >
      <Box></Box>
      <Box className='flex items-center justify-end gap-6 mr-13'>
        {/* <LanguageButton /> */}
        <IconButton>
          <FontSizeEdit />
        </IconButton>

        <IconButton>
          <Image
            src={require('@/assets/svg/iconSearch.svg')}
            alt=''
            height={15}
            width={15}
          />
        </IconButton>

        <IconButton>
          <Image
            src={require('@/assets/svg/iconSetting.svg')}
            alt=''
            height={15}
            width={15}
          />
        </IconButton>

        <div className='px-6'>
          <Typography variant='body2' className='line-clamp-2 max-w-50'>
            {client && (
              <>
                {accountInfo?.firstName ?? ''} {accountInfo?.lastName ?? ''}
              </>
            )}
          </Typography>
        </div>
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
          <Avatar src={urlImage ?? ''}></Avatar>
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={() => setAnchorEl(null)}
      >
        <Link href={'/user'} className='no-underline'>
          <MenuItem className='flex items-center gap-3'>
            <Box
              sx={{
                width: '24px',
                height: '24px',
              }}
              className='flex items-center justify-center'
            >
              <Image
                src={require('@/assets/svg/profileSetting/Profile.svg')}
                alt=''
                width={20}
              />
            </Box>
            {t('account_info')}
          </MenuItem>
        </Link>
        <Link href={'/changePassword'} className='no-underline'>
          <MenuItem className='flex items-center gap-3'>
            <Box
              sx={{
                width: '24px',
                height: '24px',
              }}
              className='flex items-center justify-center'
            >
              <Image
                src={require('@/assets/svg/profileSetting/Lock.svg')}
                alt=''
                width={14}
              />
            </Box>
            {t('changePassword')}
          </MenuItem>
        </Link>

        <MenuItem
          className='flex items-center gap-3'
          onClick={() => {
            logoutAccount()
          }}
        >
          <Box
            sx={{
              width: '24px',
              height: '24px',
            }}
            className='flex items-center justify-center'
          >
            <Image
              src={require('@/assets/svg/profileSetting/LogOut.svg')}
              alt=''
              width={16}
            />
          </Box>
          {t('logout')}
        </MenuItem>
      </Menu>
    </Paper>
  )
}

export default memo(Header)
