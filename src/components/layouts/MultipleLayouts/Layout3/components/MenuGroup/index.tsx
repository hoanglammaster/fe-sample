import { MenuPathProps } from '@/routes'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import {
  Collapse,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import List from '@mui/material/List'
import Link from 'next/link'
import { ReactNode, useState } from 'react'
import Image from 'next/image'

interface Props {
  name: string
  path?: string
  icon: ReactNode
  child: MenuPathProps[]
}

const MenuGroup = (props: Props) => {
  const { name, icon, child } = props
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* <ListItemButton className='flex gap-4' onClick={() => setOpen(!open)}>
        {icon ? (
          <div>{icon}</div>
        ) : (
          <Image alt='' src={require('@/assets/svg/user.svg')} />
        )}
        <ListItemText primary={name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton> */}

      <ListItemButton
        onClick={() => setOpen(!open)}
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
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      {child && (
        <Collapse in={open} timeout='auto' unmountOnExit>
          <List component='div' disablePadding className='ml-6'>
            {child.map((item: any, index: number) => {
              return (
                <Link
                  key={index}
                  href={item.path}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <ListItemButton
                    className='flex h-20 cursor-pointer justify-between items-center gap-5'
                    sx={{ paddingLeft: 6 }}
                  >
                    <Typography variant='body2'>{item.name}</Typography>
                  </ListItemButton>
                  <Divider sx={{ margin: '0 18px' }} />
                </Link>
              )
            })}
          </List>
        </Collapse>
      )}
    </>
  )
}

export default MenuGroup
