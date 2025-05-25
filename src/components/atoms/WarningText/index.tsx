import { Typography } from '@mui/material'
import Image from 'next/image'
import { ReactNode } from 'react'

export const WarningText = ({ children }: { children: ReactNode }) => {
  return (
    <div className='px-4 py-5 flex items-center bg-[#FFFAFB] rounded-[4px] my-5 gap-4'>
      <Image
        alt='info'
        width={16}
        height={16}
        src={require('@/assets/svg/Info2.svg')}
      />
      <Typography variant='body2'>{children}</Typography>
    </div>
  )
}
