import { STATUS_UAA } from '@/helper/utils'
import { UAA_CHILDREN_PATH } from '@/routes'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { getListPermission } from '../../PermissionConfig/List/service'
import {
  createUpdateRoleTypePermissionMapping,
  getRoleTypePermissionDetail,
  useQueryGetListRoleTypeMapping,
  useQueryGetListTierMapping,
} from './service'
import { CreateUpdateSystemFeatureProps } from './type'
// import * as Yup from 'yup'

const useCreateUpdateRoleTypePermissionMapping = () => {
  const router = useRouter()
  const { roletypeId, tierId } = router.query
  const isCreate = !roletypeId && !tierId
  const isView = router.asPath.includes('/view')
  const [listPermission, setListPermission] = useState<any>([])
  const [filterPermission, setFilterPermission] = useState<any>({
    page: 0,
    size: 10,
  })
  const [loading, setLoading] = useState(false)
  const [loadingPermission, setLoadingPermission] = useState(false)
  const [loadingUpdate, setLoadingUpdate] = useState(false)
  const [customPaging, setCustomPaging] = useState({ page: 0, size: 10 })
  const [currentTier, setCurrentTier] = useState<any | null>(null)

  const [oldIds, setOldIds] = useState<number[]>([])

  const formFeatureContext = useForm<CreateUpdateSystemFeatureProps>({
    mode: 'onTouched',
    defaultValues: {
      groupPermissionList: [],
    },
  })

  const { watch } = formFeatureContext

  const handleCreateUpdateMappingSystemFeature = async (
    val: CreateUpdateSystemFeatureProps
  ) => {
    try {
      setLoadingUpdate(true)
      let newBody: any = {}
      const groupPermissionIds: any[] = val.groupPermissionList.map(
        (v) => v.groupPermissionId
      )
      if (isCreate) {
        newBody = {
          ...val,
          roleTypeId: val.roleTypeId,
          tierId: val.tierId,
          groupPermissionIds,
        }
      } else {
        newBody = {
          ...val,
          roleTypeId: val.roleTypeId,
          tierId: val.tierId,
          attachedGroupPermissionIds: groupPermissionIds.filter(
            (v) => !oldIds.includes(v)
          ),
          detachedGroupPermissionIds: oldIds.filter(
            (v) => !groupPermissionIds.includes(v)
          ),
        }
      }

      const res = await createUpdateRoleTypePermissionMapping(newBody, isCreate)
      router.push(UAA_CHILDREN_PATH.ROLE_TYPE_PERMISSION_MAPPING)
    } catch (err) {
      setLoadingUpdate(false)
    }
  }
  const handleSubmit = formFeatureContext.handleSubmit((val) => {
    handleCreateUpdateMappingSystemFeature(val)
  })

  const getDetailUpdateClientScopeMapping = async (
    featureId: any,
    tierId: any
  ) => {
    try {
      setLoading(true)
      const res = await getRoleTypePermissionDetail(featureId, tierId)
      const data = {
        ...res?.data?.data,
      }
      formFeatureContext.reset({
        ...data,
        groupPermissionList:
          data?.groupPermissions?.map((v) => {
            return {
              ...v,
              id: v.groupPermissionId,
              code: v?.groupPermissionCode,
              name: v?.groupPermissionName,
              system: {
                code: v?.systemCode,
                name: v?.systemName,
              },
            }
          }) ?? [],
        detachedGroupPermissionIds: [],
        attachedGroupPermissionIds: [],
      })

      setCurrentTier({
        id: data?.tierId,
        tierName: data?.tierName,
        tierCode: data?.tierCode,
      })

      setOldIds((data?.groupPermissions ?? []).map((v) => v.groupPermissionId))
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  const getListPermissionMapping = async (params: any) => {
    try {
      setLoadingPermission(true)
      const res = await getListPermission({
        ...params,
        status: STATUS_UAA.PUBLISHED,
      })
      setListPermission(res?.data?.data)
      setLoadingPermission(false)
    } catch (err) {
      setLoadingPermission(false)
    }
  }

  const { data: listRoleType, isLoading: loadingRoleType } =
    useQueryGetListRoleTypeMapping({
      page: 0,
      size: 1000,
      status: STATUS_UAA.PUBLISHED,
    })

  const { data: listTier, isLoading: loadingTier } = useQueryGetListTierMapping(
    {
      page: 0,
      size: 10000,
      roleTypeId: watch('roleTypeId'),
      status: STATUS_UAA.PUBLISHED,
    },
    {
      enabled: !!watch('roleTypeId'),
    }
  )

  let typingTimer = useRef<any>(null)

  const handleInputChange = (val: string) => {
    const newValue = {
      systemOrGroup: val,
      page: 0,
      size: filterPermission.size,
    }
    setFilterPermission(newValue)

    clearTimeout(typingTimer.current)

    typingTimer.current = setTimeout(() => {
      getListPermissionMapping(newValue)
    }, 500)
  }

  const handleChangePaging = (val: any) => {
    const newValue = { systemOrGroup: filterPermission.systemOrGroup, ...val }
    setFilterPermission(newValue)
    getListPermissionMapping(newValue)
  }

  useEffect(() => {
    roletypeId &&
      tierId &&
      getDetailUpdateClientScopeMapping(roletypeId, tierId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roletypeId, tierId])

  useEffect(() => {
    getListPermissionMapping(filterPermission)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const data = {
    formFeatureContext,
    handleSubmit,
    loading,
    loadingUpdate,
    isCreate,
    listRoleType: listRoleType?.data?.data?.content ?? [],
    listTier: currentTier
      ? [currentTier, ...[listTier?.data?.data?.content ?? []]]
      : listTier?.data?.data?.content ?? [],
    isView,
    listScope: listPermission,
    filterFeature: filterPermission,
    setFilterFeature: setFilterPermission,
    handleInputChange,
    handleChangePaging,
    loadingFeature: loadingPermission,
    loadingRoleType,
    loadingTier,
    customPaging,
    setCustomPaging,
  }

  return data
}

export default useCreateUpdateRoleTypePermissionMapping
