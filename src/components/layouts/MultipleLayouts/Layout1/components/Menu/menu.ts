import { MenuPathProps } from '@/routes'

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
