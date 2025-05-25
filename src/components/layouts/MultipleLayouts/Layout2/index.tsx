import { Box } from '@mui/material'
import { ReactNode, useEffect, useRef } from 'react'
import Header from './components/Header'
import LeftMenu from './components/LeftMenu'
import { useRouter } from 'next/router'
import { useErrorBoundary } from '@/config/zustand'

export const Layout2 = ({ children }: { children: ReactNode }) => {
  const ref = useRef<any>(null)
  const router = useRouter()
  const { isError } = useErrorBoundary()
  useEffect(() => {
    ref.current.scrollTo(0, 0)
  }, [router.pathname, isError])
  return (
    <Box className='flex flex-row' style={{ height: '100vh' }}>
      <LeftMenu />
      <Box
        className='bg-[#f4f4f4]'
        style={{ height: '100%', overflow: 'auto', width: '100%' }}
        ref={ref}
      >
        <Header />
        <div className=' w-full h-full flex-col pb-20'>{children}</div>
      </Box>
    </Box>
  )
}
