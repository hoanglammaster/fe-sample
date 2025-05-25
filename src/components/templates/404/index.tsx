import { useErrorBoundary, useHistoryPage } from '@/config/zustand'
import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

const Page404 = () => {
  const router = useRouter()
  const { setIsError } = useErrorBoundary()
  const { listHistory } = useHistoryPage()

  const previousUrl = useMemo(() => {
    const paths = ['update', 'view', 'edit']
    const pathIncludes = paths.some((path) => router.pathname.includes(path))
    if (pathIncludes) {
      const arraySplit = router.pathname.split('/')
      const checkedIndex = arraySplit.findIndex((v) =>
        ['update', 'view', 'edit'].includes(v)
      )
      return router.pathname
        .split('/')
        .filter((v, index) => index < checkedIndex)
        .join('/')
    } else {
      return null
    }
  }, [router.pathname])

  console.log('theUrl', previousUrl)

  const handleGoBack = () => {
    if (!!previousUrl) {
      router.push(previousUrl)
    } else {
      location.reload()
    }
  }
  return (
    <Box className='flex flex-col items-center justify-center w-full h-full'>
      <Image src={require('@/assets/svg/404.svg')} alt='' />
      <Typography variant='h3' className='my-10'>
        Ooops... 404!
      </Typography>
      <Typography variant='body1'>
        The requested URL 404 was not found on this server.
      </Typography>
      <Typography
        variant='body1'
        color='primary'
        sx={{
          marginTop: '40px',
          cursor: 'pointer',
          textDecoration: 'underline',
        }}
        onClick={handleGoBack}
      >
        Go Back!
      </Typography>
    </Box>
  )
}

export default Page404
