import { listMenuRoutes } from '@/routes'
import { List } from '@mui/material'
import { useRouter } from 'next/router'
import MenuGroup from '../MenuGroup'
import MenuItem from '../MenuItem'

const Menu = () => {
  const router = useRouter()
  const currentPath = router.asPath

  return (
    <List component='nav' aria-labelledby='nested-list-subheader'>
      {listMenuRoutes.map((item, index: number) =>
        item.type === 'item' ? (
          <MenuItem
            key={index}
            name={item.name}
            path={item.path}
            icon={item.icon}
            isChecked={currentPath.startsWith(item.path ?? '')}
          />
        ) : (
          <MenuGroup
            key={index}
            name={item.name}
            path={item.path}
            icon={item.icon}
            child={item.children ?? []}
          />
        )
      )}
    </List>
  )
}

export default Menu
