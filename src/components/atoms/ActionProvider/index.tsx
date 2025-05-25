import { useMenuConfigList } from '@/config/zustand'
import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'

const flatMenuRoutes = (listMenu: any[]) => {
  let newList: any[] = []
  listMenu.forEach((item: any) => {
    if (item?.children) {
      newList = [...newList, item, ...flatMenuRoutes(item?.children)]
    } else {
      newList = [...newList, item]
    }
  })
  return newList
}

interface Props {
  children?: ReactNode | ReactNode[]
  action: string | null
}

const ActionProvider = (props: Props) => {
  const { action, children } = props
  const { listMenuConfig } = useMenuConfigList()
  const flatMenus = flatMenuRoutes(listMenuConfig ?? [])
  const router = useRouter()
  const listCurrentMenuItem = flatMenus.find((item) =>
    router.pathname.includes(item.path)
  )

  if (!action) {
    return <>{children}</>
  }
  if (!!listCurrentMenuItem) {
    const listCurrentActions = listCurrentMenuItem?.actions ?? []
    if (listCurrentActions.includes(action)) {
      return <>{children}</>
    } else return null
  }
  return <>{children}</>
}

export default ActionProvider
