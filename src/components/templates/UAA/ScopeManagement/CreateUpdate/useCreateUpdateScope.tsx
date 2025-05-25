import { useDialog } from '@/components/hooks/dialog/useDialog'
import { STATUS_UAA } from '@/helper/utils'
import { TRANSLATE_UAA, UAA_CHILDREN_PATH } from '@/routes'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { changeStatusPermission, getRoleDetail } from '../List/service'
import {
  createPermissionGroup,
  updatePermissionGroup,
  useQueryGetFeatureByScope,
} from './service'
import { ScopeType } from './type'

const useCreateUpdateScope = () => {
  const [oldIds, setOldIds] = useState<number[]>([])
  const [searchApi, setSearchApi] = useState<string>('')

  const { t } = useTranslation(TRANSLATE_UAA.SCOPE)
  const router = useRouter()
  const { slug } = router.query
  const isCreate = !slug
  const { hideDialog } = useDialog()

  const isView = router.pathname.includes('/view')
  const methodForm = useForm<ScopeType>({
    mode: 'onTouched',
    defaultValues: {
      code: '',
      name: '',
      apiIds: [],
      attachedApiIds: [],
      detachedApiIds: [],
      status: 'DRAFT',
      searchApi: '',
    },
  })
  const watchServiceId = methodForm.watch('serviceId')
  const watchSearchApi = methodForm.watch('searchApi')
  const version = Number(methodForm.watch('version'))

  const { data: listFeature, isLoading: isLoadingFeature } =
    useQueryGetFeatureByScope({
      serviceId: watchServiceId,
      codeOrName: watchSearchApi,
    })

  // const { data: listService, isLoading: isLoadingService } =
  //   useQueryGetListService({ page: 0, size: 10000 })

  const handleCreateUpdateRole = async (val: ScopeType) => {
    try {
      let bodyData: any = { ...val }
      delete bodyData.featureApis
      if (!isCreate) {
        const newAttach = val.apiIds.filter((v) => !oldIds.includes(v))
        const newDettach = oldIds.filter((v) => !val.apiIds.includes(v))
        bodyData = {
          ...bodyData,
          attachedApiIds: newAttach,
          detachedApiIds: newDettach,
          apiIds: [],
        }
      }
      const res = isCreate
        ? await createPermissionGroup(bodyData)
        : await updatePermissionGroup(bodyData, bodyData?.id)
      router.push(UAA_CHILDREN_PATH.SCOPE_MANAGEMENT)
    } catch (err) {}
  }

  const handleChangeStatus = async (id: number) => {
    try {
      const res = await changeStatusPermission(id, version)
      hideDialog()
      router.push(UAA_CHILDREN_PATH.SCOPE_MANAGEMENT)
    } catch (error) {
    } finally {
      hideDialog()
    }
  }
  const onSubmit = methodForm.handleSubmit((data) => {
    if (isView && data.status === STATUS_UAA.DRAFT) {
      data.id && handleChangeStatus(data.id)
    } else handleCreateUpdateRole(data)
  })

  const getDetailRoleData = async (groupPermissionId: string | number) => {
    try {
      const res = await getRoleDetail(groupPermissionId)
      const newData = res?.data?.data
      let newFeatureIds: number[] = []
      newData?.serviceApis?.forEach((element) => {
        element.apis?.forEach((item) => {
          if (item.isMapped) {
            newFeatureIds = [...newFeatureIds, item.id]
          }
        })
      })
      methodForm.reset({
        ...newData,
        apiIds: newFeatureIds,
      })
      setOldIds(newFeatureIds)
    } catch (err) {}
  }

  useEffect(() => {
    slug && getDetailRoleData(slug.toString())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

  const data = {
    listFeature:
      listFeature?.data?.data?.filter((v) => v.apis?.length > 0) ?? [],
    // listService: listService?.data?.data?.content ?? [],
    // isLoadingService,
    isLoadingFeature,
    methodForm,
    onSubmit,
    t,
    isCreate,
    searchApi,
    setSearchApi,
    isView,
  }
  return data
}

export default useCreateUpdateScope
