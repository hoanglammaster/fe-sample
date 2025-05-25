import { STATUS_UAA } from '@/helper/utils'
import { UAA_CHILDREN_PATH } from '@/routes'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryGetListService } from '../../APIManangement/service'
import {
  getListFeatureMap,
  useQueryGetListSystemNotMap,
} from '../../SystemManagement/service'
import {
  createUpdateSystemFeatureMapping,
  getFeatureMappingDetail,
  getListTransType,
  useQueryGetListServicePartner,
} from './service'
import { CreateUpdateSystemFeatureProps } from './type'
// import * as Yup from 'yup'

const useCreateUpdateFeature = () => {
  const router = useRouter()
  const { id } = router.query
  const isCreate = !id
  const isView = router.asPath.includes('/view')
  const [listFeature, setListFeature] = useState<any>([])
  const [filterFeature, setFilterFeature] = useState<any>({ page: 0, size: 10 })
  const [listTransType, setListTransType] = useState<any[]>([])
  const [loadingTransType, setLoadingTransType] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)
  const [loadingFeature, setLoadingFeature] = useState(false)
  const [loadingUpdate, setLoadingUpdate] = useState(false)
  const [customPaging, setCustomPaging] = useState({ page: 0, size: 10 })
  const [oldIds, setOldIds] = useState<number[]>([])
  const [currentSystem, setCurrentSystem] = useState<any | null>(null)

  const formFeatureContext = useForm<CreateUpdateSystemFeatureProps>({
    mode: 'onTouched',
    defaultValues: {
      featureList: [],
      featureIds: [],
      transType: null,
      service: null,
    },
  })
  const watchTransType = formFeatureContext.watch('transType')
  const watchService = formFeatureContext.watch('service')
  const getListTrans = async () => {
    setLoadingTransType(true)
    try {
      const res = await getListTransType()
      setListTransType(res?.data?.data ?? [])
    } catch (err) {}
    setLoadingTransType(false)
  }

  const { data: listService, isLoading: loadingService } =
    useQueryGetListServicePartner(
      {
        page: 0,
        size: 1000,
        transTypeId: listTransType
          ?.filter((v) => v?.transTypeCode === watchTransType)
          .map((v) => v?.id),
      },
      {
        enabled: !!watchTransType,
      }
    )
  const handleCreateUpdateMappingSystemFeature = async (
    val: CreateUpdateSystemFeatureProps
  ) => {
    try {
      setLoadingUpdate(true)

      let newBody: any = {}
      const featureIds = formFeatureContext.watch('featureIds') ?? []
      if (isCreate) {
        newBody = {
          ...val,
          systemId: val.systemId,
          featureIds,
        }
      } else {
        newBody = {
          ...val,
          systemId: val.systemId,
          detachedFeatureIds: oldIds.filter((v) => !featureIds.includes(v)),
          attachedFeatureIds: featureIds.filter((v) => !oldIds.includes(v)),
        }
      }
      const res = await createUpdateSystemFeatureMapping(newBody, !id)
      router.push(UAA_CHILDREN_PATH.SYSTEM_FEATURE_MAPPING)
    } catch (err) {
      setLoadingUpdate(false)
    }
  }
  const handleSubmit = formFeatureContext.handleSubmit((val) => {
    handleCreateUpdateMappingSystemFeature(val)
  })

  const getDetailUpdateFeature = async (featureId: any, params?: any) => {
    try {
      setLoading(true)
      const res = await getFeatureMappingDetail(featureId, params)
      const data = {
        ...res?.data?.data,
      }
      formFeatureContext.reset({
        ...data,
        systemId: data?.id ?? id,
        featureList: data?.features,
        featureIds: data?.features.map((v) => v?.id),
        detachedFeatureIds: [],
        attachedFeatureIds: [],
        transType: null,
        service: null,
      })
      setCurrentSystem({
        id: data?.id,
        code: data?.code,
        name: data?.name,
      })
      setOldIds(data?.features?.map((v) => v.id))
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }
  const getListFeatureMapping = async (params: any) => {
    try {
      setLoadingFeature(true)
      const res = await getListFeatureMap({
        ...params,
        status: STATUS_UAA.PUBLISHED,
      })
      setListFeature(res?.data?.data)
      setLoadingFeature(false)
    } catch (err) {
      setLoadingFeature(false)
    }
  }
  const { data: listSystem } = useQueryGetListSystemNotMap({
    page: 0,
    size: 1000,
  })

  let typingTimer = useRef<any>(null)

  const handleInputChange = (event) => {
    const value = event.target.value
    const newValue = {
      ...filterFeature,
      search: value,
      page: 0,
      size: filterFeature.size,
    }

    clearTimeout(typingTimer.current)

    typingTimer.current = setTimeout(() => {
      setFilterFeature(newValue)
    }, 500)
  }

  useEffect(() => {
    setFilterFeature((prev) => {
      return {
        ...prev,
        transTypeCode: watchTransType,
        serviceCode: watchService,
      }
    })
  }, [watchService, watchTransType])

  const handleChangePaging = (val: any) => {
    const newValue = { search: filterFeature.search, ...val }
    setFilterFeature(newValue)
    getListFeatureMapping(newValue)
  }

  useEffect(() => {
    id && getDetailUpdateFeature(id)
    getListTrans()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  useEffect(() => {
    getListFeatureMapping(filterFeature)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterFeature])

  const data = {
    formFeatureContext,
    loading,
    loadingUpdate,
    isCreate,
    listFeature,
    isView,
    listSystem: currentSystem
      ? [currentSystem, ...(listSystem?.data?.content ?? [])]
      : listSystem?.data?.content ?? [],
    listTransType,
    listService: listService?.content,
    filterFeature,
    customPaging,
    id: Number(id),
    loadingFeature,
    loadingTransType,
    loadingService,
    handleSubmit,
    setFilterFeature,
    handleInputChange,
    handleChangePaging,
    setCustomPaging,
  }

  return data
}

export default useCreateUpdateFeature
