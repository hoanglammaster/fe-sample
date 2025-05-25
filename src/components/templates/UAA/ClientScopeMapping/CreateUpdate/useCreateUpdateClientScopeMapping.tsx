import { STATUS_UAA } from '@/helper/utils'
import { UAA_CHILDREN_PATH } from '@/routes'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryGetListClient } from '../../ClientManagement/List/service/service'
import { getListScope } from '../../ScopeManagement/List/service'
import {
  createUpdateSystemFeatureMapping,
  getFeatureMappingDetail,
  useQueryGetListClientForScope,
} from './service'
import { CreateupdateSystemFeatureProps } from './type'
// import * as Yup from 'yup'

const useCreateUpdateClientScopeMapping = () => {
  const router = useRouter()
  const { id } = router.query
  const isCreate = !id
  const isView = router.asPath.includes('/view')
  const [listScope, setListScope] = useState<any>([])
  const [filterFeature, setFilterFeature] = useState<any>({ page: 0, size: 10 })
  const [oldIds, setOldIds] = useState<number[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingFeature, setLoadingFeature] = useState(false)
  const [loadingUpdate, setLoadingUpdate] = useState(false)
  const [customPaging, setCustomPaging] = useState({ page: 0, size: 10 })

  const formFeatureContext = useForm<CreateupdateSystemFeatureProps>({
    mode: 'onTouched',
    defaultValues: {
      scopeList: [],
      searchScope: '',
    },
  })

  const handleCreateUpdateMappingSystemFeature = async (
    val: CreateupdateSystemFeatureProps
  ) => {
    try {
      let newBody: any = {}
      setLoadingUpdate(true)
      const scopeIds: any[] = val.scopeList.map((v) => v.id)
      if (isCreate) {
        newBody = {
          ...val,
          clientId: val.clientId,
          scopeIds,
        }
      } else {
        newBody = {
          ...val,
          clientId: val.clientId,
          attachedScopeIds: scopeIds.filter((v: number) => !oldIds.includes(v)),
          detachedScopeIds: oldIds.filter((v: number) => !scopeIds.includes(v)),
        }
      }

      const res = await createUpdateSystemFeatureMapping(newBody, !id)
      router.push(UAA_CHILDREN_PATH.CLIENT_SCOPE_MAPPING)
    } catch (err) {
      setLoadingUpdate(false)
    } finally {
      setLoadingUpdate(false)
    }
  }
  const handleSubmit = formFeatureContext.handleSubmit((val) => {
    handleCreateUpdateMappingSystemFeature(val)
  })

  const getDetailUpdateClientScopeMapping = async (
    featureId: any,
    params?: any
  ) => {
    try {
      setLoading(true)
      const res = await getFeatureMappingDetail(featureId, params)
      const data = {
        ...res?.data?.data,
      }
      console.log(data, 'watchData')
      formFeatureContext.reset({
        ...data,
        clientId: data?.id ?? id,
        scopeList: data?.scopes?.content ?? [],
        dettachFeatureIds: [],
        attachedFeatureIds: [],
      })
      setOldIds(data?.scopes?.content?.map((v) => v.id))
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  const getListScopeMapping = async (params: any) => {
    try {
      setLoadingFeature(true)
      const res = await getListScope({
        ...params,
        status: STATUS_UAA.PUBLISHED,
      })
      setListScope(res?.data?.data)
      setLoadingFeature(false)
    } catch (err) {
      setLoadingFeature(false)
    }
  }

  const { data: listClient, isLoading: isLoadingClient } =
    useQueryGetListClientForScope({
      page: 0,
      size: 1000,
    })

  let typingTimer = useRef<any>(null)

  const handleInputChange = (val: string) => {
    const newValue = { codeOrName: val, page: 0, size: filterFeature.size }
    setFilterFeature(newValue)

    clearTimeout(typingTimer.current)

    typingTimer.current = setTimeout(() => {
      getListScopeMapping(newValue)
    }, 500)
  }

  const handleChangePaging = (val: any) => {
    const newValue = { codeOrName: filterFeature.codeOrName, ...val }
    setFilterFeature(newValue)
    getListScopeMapping(newValue)
  }

  useEffect(() => {
    id && getDetailUpdateClientScopeMapping(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  useEffect(() => {
    getListScopeMapping(filterFeature)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const data = {
    formFeatureContext,
    handleSubmit,
    loading,
    loadingUpdate,
    isCreate,
    listClient: listClient?.content ?? [],
    isView,
    listScope: listScope,
    filterFeature,
    setFilterFeature,
    handleInputChange,
    handleChangePaging,
    loadingFeature,
    customPaging,
    setCustomPaging,
  }

  return data
}

export default useCreateUpdateClientScopeMapping
