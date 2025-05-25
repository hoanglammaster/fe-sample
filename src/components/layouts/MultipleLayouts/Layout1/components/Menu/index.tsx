import { listMenuRoutes } from '@/routes'
import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'
import MenuGroup from '../MenuGroup'
import MenuItem from '../MenuItem'
import { getParentMenu } from './menu'

const Menu = () => {
  const [subMenu, setSubMenu] = useState<any | null>(null)
  const router = useRouter()
  const currentPath = router.asPath

  const handleBackToMenu = () => {
    const parentMenu = getParentMenu(subMenu, {
      id: -1,
      children: listMenuRoutes ?? [],
    })
    if (parentMenu?.id === -1) {
      setSubMenu(null)
    } else setSubMenu(parentMenu)
  }

  return (
    <Box display='flex' flexDirection={'column'} style={{ width: '100%' }}>
      {listMenuRoutes.map((item, index: number) =>
        item.type === 'item' ? (
          <MenuItem
            key={index}
            name={item.name}
            path={item.path}
            isChecked={currentPath.startsWith(item.path ?? '')}
          />
        ) : (
          <MenuGroup
            key={index}
            item={item}
            isChecked={currentPath.startsWith(item.path ?? '')}
            listPermission={[]}
            isSystemAdmin={false}
            indexNumber={0}
            setSubMenu={setSubMenu}
            handleBackToMenu={handleBackToMenu}
          />
        )
      )}
    </Box>
  )
}

export default Menu
