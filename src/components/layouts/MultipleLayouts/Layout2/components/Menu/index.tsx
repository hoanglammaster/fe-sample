import { listMenuRoutes } from '@/routes'
import { Box } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import MenuGroup from '../MenuGroup'
import MenuItem from '../MenuItem'

const Menu = ({ isOpen }: { isOpen: boolean }) => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const currentPath = router.asPath

  return (
    <Box
      display='flex'
      flexDirection='column'
      style={{ width: '100%', gap: '14px' }}
    >
      {listMenuRoutes.map((item, index: number) =>
        item.type === 'item' ? (
          <MenuItem
            key={index}
            name={t(item.name)}
            path={item.path}
            icon={item.icon}
            isChecked={currentPath === item.path}
            isOpen={isOpen}
          />
        ) : (
          <MenuGroup
            key={index}
            name={t(item.name)}
            path={item.path}
            icon={item.icon}
            child={item.children ?? []}
            isOpen={isOpen}
          />
        )
      )}
    </Box>
  )
}

export default Menu
