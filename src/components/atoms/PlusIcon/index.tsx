import { IconButton } from '@mui/material'
import Image from 'next/image'

export const PlusIcon = ({ handleClick }: { handleClick: () => void }) => {
  return (
    <IconButton onClick={handleClick}>
      <Image
        src={require('@/assets/svg/plusCircleIcon.svg')}
        alt=''
        width={16}
        height={16}
      />
    </IconButton>
  )
}
