import { MenuPathProps } from '@/routes'
import { Box, Collapse, ListItemButton, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { ReactNode, useState } from 'react'
import MenuItem from '../MenuItem'

interface Props {
  name: string
  path?: string
  icon: ReactNode
  child: MenuPathProps[]
  isOpen: boolean
}

const MenuGroup = (props: Props) => {
  const router = useRouter()
  const currentPath = router.asPath
  const { name, icon, child, isOpen } = props
  const [open, setOpen] = useState(false)

  return (
    <Box>
      <ListItemButton
        style={{
          height: '52px',
          padding: isOpen ? '0 32px' : '0 24px',
          gap: '4px',
        }}
        onClick={() => setOpen(!open)}
      >
        {icon}
        {isOpen && <Typography variant='body1'>{name}</Typography>}
      </ListItemButton>

      {child && (
        <Collapse in={open}>
          <Box
            sx={{
              paddingLeft: '14px',
            }}
          >
            {child.map((item: any, index: number) => {
              return (
                <MenuItem
                  key={index}
                  name={item.name}
                  path={item.path}
                  icon={item.icon}
                  isOpen={isOpen}
                  isChecked={currentPath === item.path}
                />
              )
            })}
          </Box>
        </Collapse>
      )}
    </Box>
  )
}

export default MenuGroup
