import { useUploadForm } from '@/config/zustand'
import { STATUS_UAA } from '@/helper/utils'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { SaveSubMenuProps } from '.'
import {
  postSubMenu,
  putSubMenu,
  useQueryGetDetailSubMenu,
  useQueryGetListAction
} from '../service'

const defaultValues = {
  actionSubMenuRefs: [],
  apiSubMenuRefs: [],
  status: STATUS_UAA.DRAFT,
  serviceId: null,
  systemId: null,
  apiId: null,
  type: null,
  name: null,
  route: '',
  description: '',
}

export const useSaveSubMenu = (props: SaveSubMenuProps) => {
  const { viewId } = props
  const router = useRouter()

  const methodForm = useForm<any>({
    mode: 'onBlur',
    defaultValues,
  })

  const { watch, setValue, reset, control, handleSubmit } = methodForm

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'actionSubMenuRefs',
    keyName: 'key',
  })

  const {
    fields: fieldsNormal,
    append: appendNormal,
    remove: removeNormal,
  } = useFieldArray({
    control,
    name: 'apiSubMenuRefs',
    keyName: 'key',
  })

  const id = viewId ?? Number(router.query?.id)
  const itemType = watch('type') === 'ITEM'

  const isCreate = !id

  const isView = !!viewId || (!!id && router.pathname.includes('/view'))
  const isUpdate = !!id && router.asPath.includes('/update')

  const { isUploading } = useUploadForm()

  const { data: listAction, isLoading: isLoadingAction } =
    useQueryGetListAction({
      status: STATUS_UAA.PUBLISHED,
      page: 0,
      size: 1000,
    })

  const { data: detailSubMenu, isFetching: isLoadingDetailSubMenu } =
    useQueryGetDetailSubMenu({ id: id }, { enabled: !!id })

  const { mutate, isLoading: loadingSaveSubMenu } = useMutation(
    id ? putSubMenu : postSubMenu,
    {
      onSuccess: (res: any) => {
        router.back()
      },
    }
  )

  const onSubmit = handleSubmit(
    async (data) => {
      const convertData = {
        ...data,
        id: id,
        systemId: data?.systemId?.id,
        serviceId: itemType ? data?.serviceId?.id : data?.serviceCollapseId?.id,
        apiId: data?.apiId?.id,
        apiSubMenuRefs: data.apiSubMenuRefs.map((v) => {
          return {
            serviceId: v.service?.id,
            apiId: v.api?.id,
          }
        }),
        actionSubMenuRefs: data.actionSubMenuRefs.map((v) => {
          return {
            actionId: v.actionId,
            apiId: v.api?.id,
          }
        }),
      }
      mutate(convertData)
    },
    (err) => console.log('_______ err _______', err)
  )

  useEffect(() => {
    if (id && detailSubMenu) {
      reset({
        ...detailSubMenu,
        systemId: detailSubMenu?.systemResponse,
        serviceId: detailSubMenu?.serviceResponse,
        serviceCollapseId: detailSubMenu?.serviceResponse,
        apiId: detailSubMenu?.apiResponse,
        actionSubMenuRefs: detailSubMenu?.actionSubMenuRefResponses?.map(
          (item: any) => ({
            api: item?.apiResponse,
            actionId: item?.actionResponse?.id,
          })
        ),
        apiSubMenuRefs: detailSubMenu?.normalApiRefResponses?.map(
          (item: any) => ({
            service: item?.serviceResponse,
            api: item?.apiResponse,
          })
        ),
      })
    }
  }, [id, detailSubMenu, reset])

  const data = {
    router,
    methodForm,
    id,
    isView,
    isCreate,
    isUpdate,
    watch,
    fields,
    append,
    remove,
    fieldsNormal,
    appendNormal,
    removeNormal,
    onSubmit,
    itemType,
    listAction: listAction?.content ?? [],
    isLoadingAction,
    detailSubMenu,
    isLoadingDetailSubMenu,
    loadingSaveSubMenu,
    isUploading,
  }

  return data
}
