import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import { LoginPanel } from './components/LoginPanel'
import { LoginForm } from './components/LoginForm'
import { useEffect } from 'react'
import { removeCmsToken, removeUserCookie } from '@/config/token'

export const Login = () => {
  useEffect(() => {
    removeCmsToken()
    removeUserCookie()
  }, [])

  return (
    <Box className='flex h-screen w-screen items-center justify-center bg-[#F7F9FE]'>
      <Box
        className='flex flex-row items-stretch flex-1'
        sx={{
          maxWidth: 1000,
          height: 600,
          boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
          borderRadius: 12,
        }}
      >
        <LoginPanel />
        <LoginForm />
      </Box>
    </Box>
  )
}
