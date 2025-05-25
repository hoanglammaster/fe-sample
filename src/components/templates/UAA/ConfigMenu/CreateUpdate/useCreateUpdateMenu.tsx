import { UAA_CHILDREN_PATH } from '@/routes'
import { useRouter } from 'next/router'
import queryString from 'query-string'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { getListSubMenu } from '../../SubMenu/service'
import { getListSystem, publishListMenuConfig } from '../List/service'
import {
  createMenuConfig,
  getDetailMenuConfig,
  updateMenuConfig,
} from './service'
import { ResponseType } from './type'
import { errorMsg } from '@/helper/message'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { DialogUpdate } from './DialogUpdate'

const handleMenuTree = (menu: any[], parentId?: number) => {
  let listMenu: any[] = []
  let configIndex = 0
  menu.forEach((item) => {
    listMenu = [
      ...listMenu,
      { ...item, parentId, configIndex, children: undefined },
    ]
    if (item.children?.length > 0) {
      listMenu = [...listMenu, ...handleMenuTree(item.children, item.draftId)]
    }
    configIndex = configIndex + 1
  })
  return listMenu
}

const handleConfigMenuTreeBeforeUpload = (menu: any[]) => {
  return menu.map((v) => {
    return {
      subMenuId: v.id,
      children: !!v.children
        ? handleConfigMenuTreeBeforeUpload(v.children)
        : v.children,
    }
  })
}

const handleMenuTreeWhenGetDetail = (menus: any[]) => {
  return menus
}

const useCreateUpdateMenu = () => {
  const router = useRouter()
  const state: any = useMemo(
    () => queryString.parse(router.asPath.split(/\?/)[1]),
    [router]
  )
  const { slug } = router.query
  const isEdit = !!slug

  const isView = !!isEdit && router.pathname.includes('/view')

  const methodForm = useForm<ResponseType['POST']>({
    defaultValues: { systemId: null, menus: [], status: 'DRAFT' },
    mode: 'onTouched',
  })

  const { watch, handleSubmit } = methodForm
  const [listSystem, setListSystem] = useState<any>([])
  const [listPermission, setListPermission] = useState<any>([])
  const [listMenu, setListMenu] = useState<any[]>([])
  const [listLang, setListLang] = useState<any>([])
  const [loading, setLoading] = useState(false)

  const getListSystemData = async () => {
    try {
      setLoading(true)
      const res = await getListSystem({ page: 0, size: 1000 })
      setListSystem(res?.data?.data?.content)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  const getListFeatureForm = async (systemId: number | string) => {
    const res = await getListSubMenu({
      page: 0,
      size: 1000,
      systemId,
      status: 'PUBLISHED',
    })
    setListMenu(res?.content)
  }

  const getDetail = async (id: string) => {
    try {
      setLoading(true)
      const res = await getDetailMenuConfig(id)
      const newData = res?.data?.data ?? {}

      methodForm.reset({
        ...newData,
        menus: newData?.activeMenu,
      })
    } catch (err) {}
  }

  const { hideDialog, showDialog } = useDialog()

  const onPublished = async (id: number | string, version: number) => {
    try {
      await publishListMenuConfig(id, version)
      hideDialog()
      router.push(UAA_CHILDREN_PATH.CONFIGURATION_MENU)
    } catch (e) {
    } finally {
      hideDialog()
    }
  }

  const onAgreeUpdate = async (val: any) => {
    try {
      await updateMenuConfig(slug as string, val)
      router.push(UAA_CHILDREN_PATH.CONFIGURATION_MENU)
    } catch (e) {
    } finally {
      hideDialog()
    }
  }

  const handleSubmitForm = handleSubmit(async (val: any) => {
    if (!val.menus?.length) {
      errorMsg('No Sub Menu has been selected yet')
    } else {
      if (!!isView && val.status === 'DRAFT') {
        onPublished(slug as string, val.version)
      } else {
        const newVal = {
          ...val,
          search: undefined,
          menus: handleConfigMenuTreeBeforeUpload(val.menus),
        }
        try {
          if (!!slug) {
            showDialog(
              <DialogUpdate
                content='Are you sure you want to edit the infomation menu'
                onAgree={() => onAgreeUpdate(newVal)}
              />
            )
          } else {
            await createMenuConfig(newVal)
            router.push(UAA_CHILDREN_PATH.CONFIGURATION_MENU)
          }
        } catch (err) {}
      }
    }
  })

  useEffect(() => {
    getListSystemData()
  }, [])

  const systemId = watch('systemId')

  useEffect(() => {
    if (systemId) {
      getListFeatureForm(systemId)
    }
  }, [systemId])

  useEffect(() => {
    if (slug) {
      getDetail(slug as string)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

  useEffect(() => {
    state &&
      !isEdit &&
      methodForm.reset({ ...state, menus: [], status: 'DRAFT' })
  }, [isEdit, methodForm, state])

  console.log('methodForm', listSystem)

  const data = {
    methodForm,
    listSystem,
    loading,
    listMenu,
    listPermission,
    handleSubmitForm,
    setListMenu,
    listLang,
    isEdit,
  }
  return data
}

export default useCreateUpdateMenu
