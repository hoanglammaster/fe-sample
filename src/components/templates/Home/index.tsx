import PageContainer from '@/components/layouts/MultipleLayouts/Layout1/components/PageContainer'
import { Box, Typography } from '@mui/material'
import React from 'react'

const HomePage = () => {
  return (
    <PageContainer title={<></>}>
      <Box className='w-full h-250 flex justify-center'>
        <Typography variant='h3'>Welcome to UAA service</Typography>
      </Box>
    </PageContainer>
  )
}

export default HomePage
