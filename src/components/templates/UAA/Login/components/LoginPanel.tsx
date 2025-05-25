import { Box, Typography, useMediaQuery } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import styles from './style.module.css'

export const LoginPanel = () => {
  const { t } = useTranslation('common')
  const matches = useMediaQuery('(max-width:640px)')

  if (matches) {
    return null
  }
  return (
    <div className={`relative p-20 w-full flex-1 ${styles.imageBg}`}>
      <Image
        className='absolute top-10 left-10'
        src={require('@/assets/svg/logoVT.svg')}
        height={60}
        alt=''
      />
      <Box className='flex h-full flex-col items-center justify-center '>
        <Typography className='mb-10' style={{ marginBottom: 20 }}>
          The 8th member corporation under - XYZ focuses on the following
          fields: digital finance, data services, e-commerce.
        </Typography>
        <Typography className='mb-10'>
          The establishment of XYZ created the foundation for the digital
          transformation process, perfecting the strategy of “Forging a digital
          society” of Viettel Group.
        </Typography>
      </Box>
    </div>
  )
}
