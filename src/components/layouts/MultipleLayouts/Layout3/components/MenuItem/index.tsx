import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

interface Props {
  name: string
  path?: string
  isChecked?: boolean
  icon: ReactNode
}

const MenuItem = (props: Props) => {
  const { icon, name, path } = props

  return (
    <Link
      href={path ?? '/'}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <ListItemButton
        style={{
          minHeight: '40px',
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: '60px',
            paddingLeft: '8px',
          }}
        >
          {icon ?? <Image alt='' src={require('@/assets/svg/user.svg')} />}
        </ListItemIcon>
        <ListItemText primary={name} />
        <div className='pl-10'>
          <Image alt='' src={require('@/assets/svg/link.svg')} />
        </div>
      </ListItemButton>
    </Link>
  )
}

export default MenuItem
