import LoadingPage from '@/components/atoms/LoadingPage'
import { PRIMARY } from '@/components/layouts/WrapLayout/Theme/colors'
import ImageView from '@/components/molecules/ImageView'
import {
  getListProduct,
  getMenuByCode,
} from '@/components/templates/UAA/UserManagement/service'
import { useMenuConfigList } from '@/config/zustand'
import { MenuPathProps, listMenuRoutes } from '@/routes'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Box, ButtonBase, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import MenuGroup from './MenuGroup'
import getConfig from 'next/config'

const {
  publicRuntimeConfig: { SYSTEM_CODE },
} = getConfig()

export const renderMenuConfig = (val: any[], gramParentId?: number) => {
  const haveParent = !!gramParentId
    ? val.some((v) => v.parentId !== gramParentId)
    : val.some((v) => !!v?.parentId)
  if (haveParent) {
    if (!!gramParentId) {
      return val
        .filter((v) => v.parentId === gramParentId)
        .map((v: any) => {
          return {
            ...v,
            chidren: renderMenuConfig(
              val.filter((v2) => v2.parentId !== gramParentId),
              v.menuId
            ),
          }
        })
    }
    return val
      .filter((v) => !v.parentId)
      .map((v: any) => {
        return {
          ...v,
          chidren: renderMenuConfig(
            val.filter((v2) => !!v2.parentId),
            v.id
          ),
        }
      })
  }
  return val
}

export const getParentMenu = (currentMenu: MenuPathProps, allMenu: any) => {
  if (allMenu?.children?.some((v: any) => v?.id === currentMenu?.id)) {
    return allMenu
  } else {
    let parentMenu = null
    if (allMenu?.children && allMenu?.children?.length > 0) {
      for (let i = 0; i < allMenu.children.length; i++) {
        const menuCheck = allMenu.children[i]
        const menuIdx: any = getParentMenu(currentMenu, menuCheck)
        if (menuIdx) {
          parentMenu = menuIdx
          break
        }
      }
      return parentMenu
    } else return null
  }
}

const useMenu = () => {
  const [subMenu, setSubMenu] = useState<any | null>(null)
  const [loading, setLoading] = useState(false)
  const [listMenu, setListMenu] = useState<any[]>(listMenuRoutes)

  const handleBackToMenu = () => {
    const parentMenu = getParentMenu(subMenu, {
      id: -1,
      children: listMenuRoutes ?? [],
    })
    if (parentMenu?.id === -1) {
      setSubMenu(null)
    } else setSubMenu(parentMenu)
  }

  const router = useRouter()

  const renderMenuRoutes = () => {
    const totalCurrentMenu = subMenu?.children || listMenu
    if (loading) {
      return <LoadingPage />
    }
    return (
      <Box display='flex' flexDirection={'column'} style={{ width: '100%' }}>
        {subMenu && (
          <ButtonBase
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              padding: 12,
            }}
            onClick={() => handleBackToMenu()}
          >
            <ArrowBackIcon
              style={{ color: PRIMARY, marginRight: 8, width: 20, height: 20 }}
            />
            <Typography color='primary'>{subMenu?.name}</Typography>
          </ButtonBase>
        )}
        {totalCurrentMenu?.map((item: any, index: number) => {
          const isChecked = router?.pathname.startsWith(item.path)
          // const isHavePermision =
          //   listPermission?.length > 0
          //     ? listPermission.some((v) => v.id === item.apiId)
          //     : true
          if (true) {
            return (
              <MenuGroup
                key={index}
                item={item}
                isChecked={isChecked}
                listPermission={[]}
                isSystemAdmin={false}
                indexNumber={0}
                setSubMenu={setSubMenu}
                handleBackToMenu={handleBackToMenu}
              />
            )
          }
          return null
        })}
      </Box>
    )
  }

  const { setListMenuConfig } = useMenuConfigList()

  const getCurrentUserMenu = async (code: string) => {
    try {
      setLoading(true)

      if (!!code) {
        const resMenu = await getMenuByCode(code)
        const newMenu = resMenu?.data?.data?.map((v) => {
          return {
            ...v,
            path: v.route,
            iconRender: v?.iconUrl ? (
              <ImageView
                height={20}
                width={20}
                url={v.iconUrl}
                borderRadius={4}
              />
            ) : null,
          }
        })
        setListMenuConfig(newMenu ?? [])
        setListMenu(newMenu ?? listMenuRoutes)
      }
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  useEffect(() => {
    SYSTEM_CODE && getCurrentUserMenu(SYSTEM_CODE)
  }, [SYSTEM_CODE])

  return { renderMenuRoutes }
}

export default useMenu
