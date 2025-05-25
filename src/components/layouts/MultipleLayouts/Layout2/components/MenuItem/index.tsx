import { PRIMARY } from '@/components/layouts/WrapLayout/Theme/colors'
import { ListItemButton, Typography } from '@mui/material'
import Link from 'next/link'
import { ReactNode } from 'react'

interface Props {
  name: string
  path?: string
  isChecked?: boolean
  icon?: ReactNode
  isOpen: boolean
}

const MenuItem = (props: Props) => {
  const { icon, name, path, isOpen, isChecked } = props
  return (
    <Link
      href={path ?? '/'}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <ListItemButton
        style={{
          height: '52px',
          padding: isOpen ? '0 32px' : '0 24px',
          gap: '4px',
          backgroundColor: isChecked ? PRIMARY : '',
          borderRadius: '16px 12px 12px 0',
        }}
      >
        {icon}
        {isOpen && (
          <Typography
            variant='body1'
            style={{
              color: isChecked ? '#F4F4F4' : '',
            }}
          >
            {name}
          </Typography>
        )}
      </ListItemButton>
    </Link>
  )
}

export default MenuItem
