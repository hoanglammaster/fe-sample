import { errorMsg, successMsg } from '@/helper/message'
import { STATUS_UAA } from '@/helper/utils'
import { UAA_CHILDREN_PATH } from '@/routes'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  getListService,
  useQueryGetListService,
} from '../../APIManangement/service'
import { getListProduct } from '../../UserManagement/service'
import {
  changeStatusFeature,
  createUpdateFeature,
  getFeatureDetail,
  getListOptionApi,
  getListPartner,
  getListTransType,
  getPartnerInfo,
  useGetListPartner,
  useGetListSubPartner,
} from './service'
import { CreateUpdateFeatureProps } from './type'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { useQueryGetListSystem } from '../../SystemManagement/service'
import { useQueryGetListSubMenu } from '../../SubMenu/service'
import { useQueryGetListApis } from '../List/service'
// import * as Yup from 'yup'

const useCreateUpdateFeature = () => {
  const router = useRouter()
  const { slug } = router.query
  const isCreate = !slug
  const isView = router.asPath.includes('/view')
  const [listService, setListService] = useState<any[]>([])
  const [listServiceTrans, setListServiceTrans] = useState<any[]>([])
  const [listTransType, setListTransType] = useState<any[]>([])
  const [listPartner, setListPartner] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingUpdate, setLoadingUpdate] = useState(false)
  const [oldValue, setOldValue] = useState<number[]>([])
  const { hideDialog, showDialog } = useDialog()

  const formFeatureContext = useForm<CreateUpdateFeatureProps>({
    mode: 'onTouched',
    defaultValues: {
      type: 'NORMAL',
      status: STATUS_UAA.DRAFT,
      transTypeCode: null,
      code: '',
      name: '',
    },
  })

  const version = Number(formFeatureContext.watch('version'))

  const handleCreateUpdateFeature = async (val: CreateUpdateFeatureProps) => {
    try {
      setLoadingUpdate(true)
      const dataBody = {
        ...val,
        code: val?.type === 'NORMAL' ? val?.codeNormal : val?.code,
        name: val?.type === 'NORMAL' ? val?.nameNormal : val?.name,
        apiIds: val?.apis?.map((v) => v.id),
      }
      if (isView && dataBody?.id) {
        const res = await changeStatusFeature(dataBody?.id, version)
      } else {
        if (isCreate) {
          await createUpdateFeature(dataBody, 'post')
        } else {
          const newBody: any = {
            ...dataBody,
          }
          await createUpdateFeature(newBody, 'put')
        }
      }
      hideDialog()
      router.push(UAA_CHILDREN_PATH.FEATURE)
    } catch (err) {
      setLoadingUpdate(false)
      hideDialog()
    }
  }
  const handleSubmit = formFeatureContext.handleSubmit((val) => {
    handleCreateUpdateFeature(val)
  })

  const { data: listSystem, isLoading: loadingSystem } = useQueryGetListSystem({
    page: 0,
    size: 1000,
    status: STATUS_UAA.PUBLISHED,
  })

  const isGetListService =
    !!formFeatureContext.watch('accessChannel')
    // && formFeatureContext.watch('accessChannel') !== 'WEB'

  const { data: listMicroService, isLoading: loadingMicroService } =
    useQueryGetListService(
      {
        page: 0,
        size: 1000,
        status: STATUS_UAA.PUBLISHED,
      },
      {
        enabled: isGetListService,
      }
    )

  const systemId = formFeatureContext.watch('systemId')

  const { data: listSubMenu, isLoading: loadingSubMenu } =
    useQueryGetListSubMenu({
      page: 0,
      size: 1000,
      status: STATUS_UAA.PUBLISHED,
      systemId,
    })

  const { data: listSubPartner, isLoading: loadingSubPartner } =
    useGetListSubPartner(
      {
        serviceId: formFeatureContext.watch('serviceId'),
        partnerId: formFeatureContext.watch('partnerId'),
      },
      {
        enabled:
          !!formFeatureContext.watch('serviceId') &&
          !!formFeatureContext.watch('partnerId') &&
          !!formFeatureContext.watch('isIntermediary'),
      }
    )

  console.log(
    'runhhhh',
    formFeatureContext.watch('serviceId'),
    formFeatureContext.watch('partnerId'),
    !!formFeatureContext.watch('isIntermediary')
  )

  console.log('listSubPartner', listSubPartner)

  const getDetailUpdateFeature = async (featureId: any) => {
    try {
      setLoading(true)
      const res = await getFeatureDetail(featureId)
      const data = {
        ...res?.data?.data,
      }
      formFeatureContext.reset({
        ...data,
        systemId: data?.system?.id,
        transTypeCode: data?.transType?.transTypeCode,
        serviceCode: data?.service?.serviceCode,
        serviceId: data?.service?.id,
        partnerCode: data?.partner?.partnerCode,
        subPartnerCode: data?.subPartner?.partnerCode,
        subMenuId: data?.subMenu?.id,
        partnerId: data?.partner?.id,
        codeNormal: data?.code,
        nameNormal: data?.name,
        microServiceId: data?.microService?.id,
        apis: data?.apis,
      })
      setOldValue(data?.apis?.map((v) => v.id) ?? [])
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }
  const getListTrans = async () => {
    try {
      const res = await getListTransType()
      setListTransType(res?.data?.data ?? [])
    } catch (err) {}
  }

  // getListService

  const getListServiceContent = async () => {
    const res = await getListService({ page: 0, size: 1000 })
    const newList =
      res?.data?.content.filter(
        (v: any) => v.status === STATUS_UAA.PUBLISHED
      ) ?? []
    setListService(newList)
    const serviceCode = formFeatureContext.watch('serviceCode')
    if (!!serviceCode) {
      const currentService = newList.find((v) => v.serviceCode === serviceCode)
      if (!!currentService) {
        const serviceId = currentService?.id
        formFeatureContext.setValue('serviceId', serviceId)
      }
    }
  }

  const getListPartnerByService = async (serviceCode: string) => {
    const res = await getListPartner({ serviceCode })
    const newList =
      res?.data?.data?.filter((v: any) => v.status === 'ACTIVE') ?? []
    setListPartner(newList)
    const partnerCode = formFeatureContext.watch('partnerCode')
    if (!!partnerCode) {
      const currentPartner = newList.find((v) => v.partnerCode === partnerCode)

      console.log('partnerCode', currentPartner?.isIntermediary, newList)

      if (!!currentPartner) {
        const isShowSubPartner = !!currentPartner?.isIntermediary
        formFeatureContext.setValue('isIntermediary', isShowSubPartner)
      }
    }
  }

  console.log('watchcccc', formFeatureContext.watch('isIntermediary'))

  const getPartnerInfoDetail = async (
    roleTypeCode: string,
    serviceCode: string
  ) => {
    try {
      const res = await getPartnerInfo({
        serviceCode,
        roleTypeCodes: [roleTypeCode],
      })

      const newData = res?.data?.data?.content?.[0]

      if (!!newData) {
        formFeatureContext.setValue('code', newData?.partnerServiceCode, {
          shouldValidate: true,
          shouldDirty: true,
        })
        formFeatureContext.setValue('name', newData?.partnerName, {
          shouldValidate: true,
          shouldDirty: true,
        })
      }
    } catch (e) {}
  }

  const serviceCode = formFeatureContext.watch('serviceCode')
  const transTypeCode = formFeatureContext.watch('transTypeCode')
  const partnerCode = formFeatureContext.watch('code')

  useEffect(() => {
    slug && getDetailUpdateFeature(slug)
    getListServiceContent()
    getListTrans()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

  useEffect(() => {
    !!serviceCode && getListPartnerByService(serviceCode)
  }, [serviceCode])

  useEffect(() => {
    const listNewServiceTrans = transTypeCode
      ? listTransType.find((v) => v.transTypeCode === transTypeCode)
          ?.services ?? []
      : []
    setListServiceTrans(listNewServiceTrans)
  }, [listTransType, transTypeCode])

  const data = {
    formFeatureContext,
    handleSubmit,
    loading,
    loadingUpdate,
    isCreate,
    listService,
    isView,
    listTransType,
    listServiceTrans,
    listPartner,
    getPartnerInfoDetail,
    showDialog,
    listSystem,
    loadingSystem,
    slug: Number(slug),
    listMicroService,
    loadingMicroService,
    listSubPartner,
    loadingSubPartner,
    listSubMenu,
    loadingSubMenu,
  }

  return data
}

export default useCreateUpdateFeature
