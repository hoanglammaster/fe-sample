import useDebounce from '@/components/hooks/useDebounce'
import { errorMsg, successMsg } from '@/helper/message'
import { TRANSLATE_UAA, UAA_CHILDREN_PATH } from '@/routes'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useQueryGetFeatureByProduct } from '../../SystemManagement/service'
import { changeStatusPermission, getRoleDetail } from '../List/service'
import { createPermissionGroup, updatePermissionGroup } from './service'
import { PermissionGroupType } from './type'
import { useDialog } from '@/components/hooks/dialog/useDialog'

const useCreateUpdatePermissionConfig = () => {
  const [oldIds, setOldIds] = useState<any[]>([])
  const [searchFeature, setSearchFeature] = useState<string>('')

  const { t } = useTranslation(TRANSLATE_UAA.PERMISSION_CONFIG)
  const router = useRouter()
  const { slug } = router.query
  const isCreate = !slug
  const { showDialog, hideDialog } = useDialog()

  // const [searchValue, setSearchValue] = useState('')
  const [hasFeatures, setHasFeatures] = useState(false)

  const isView = router.pathname.includes('/view')
  const methodForm = useForm<PermissionGroupType>({
    mode: 'onTouched',
    defaultValues: {
      code: '',
      name: '',
      featureActionRefs: [],
      attachFeatureActionRefs: [],
      detachFeatureActionRefs: [],
      status: 'DRAFT',
      searchFeature: '',
    },
  })

  const [loadingPublish, setLoadingPublish] = useState(false)
  const [listFeatureSearch, setListFeatureList] = useState([])
  const { watch } = methodForm

  const systemId = watch('systemId')
  const watchSearchFeature = watch('searchFeature')
  const version = Number(watch('version'))

  const { data: listFeature, isLoading: isLoadingFeature } =
    useQueryGetFeatureByProduct(
      {
        systemId: systemId,
        codeOrName: searchFeature,
      },
      { enabled: !!systemId }
    )

  useEffect(() => setHasFeatures(!(!listFeature?.data?.data)), [listFeature])

  const handleCreateUpdateRole = async (val: PermissionGroupType) => {
    try {
      let bodyData: any = { ...val }
      delete bodyData.featureApis
      if (!isCreate) {
        const newAttach = val.featureActionRefs.filter((v) =>
          !v.actionId
            ? !oldIds.some(
              (v2) =>
                v.featureId === v2.featureId && !v.actionId && !v2.actionId
            )
            : !oldIds.some(
              (v2) =>
                v.featureId === v2.featureId && v.actionId === v2.actionId
            )
        )

        const newDettach = oldIds.filter((v) =>
          !v.actionId
            ? !val.featureActionRefs.some(
              (v2) =>
                v2.featureId === v.featureId && !v.actionId && !v2.actionId
            )
            : !val.featureActionRefs.some(
              (v2) =>
                v2.featureId === v.featureId && v2.actionId === v.actionId
            )
        )
        bodyData = {
          ...bodyData,
          attachFeatureActionRefs: newAttach,
          detachFeatureActionRefs: newDettach,
          featureActionRefs: [],
        }
      }
      isCreate
        ? await createPermissionGroup(bodyData)
        : await updatePermissionGroup(bodyData, bodyData?.id)
      router.push(UAA_CHILDREN_PATH.PERMISSION_CONFIG)
    } catch (err) { }
  }
  const onSubmit = methodForm.handleSubmit((data) => {
    if (!data.featureActionRefs?.length) {
      errorMsg(t('rules.featureRequired'))
    } else {
      handleCreateUpdateRole(data)
    }
  })
  const handleChangeStatus = async (id: number) => {
    try {
      const res = await changeStatusPermission(Number(slug), version)
      setLoadingPublish(true)
      hideDialog()
      router.push(UAA_CHILDREN_PATH.PERMISSION_CONFIG)
    } catch (error) {
      setLoadingPublish(false)
      hideDialog()
    }
  }

  const getDetailRoleData = async (groupPermissionId: string | number) => {
    try {
      const res = await getRoleDetail(groupPermissionId)
      const newData = res?.data?.data
      let newFeatureIds: any[] = []
      newData?.featureActionRefs?.forEach((element) => {
        if (element.isMapped) {
          if (element.actions?.length > 0) {
            element.actions?.forEach((item) => {
              if (item.isMapped) {
                newFeatureIds = [
                  ...newFeatureIds,
                  { actionId: item.id, featureId: element.id },
                ]
              }
            })
          }
          newFeatureIds = [
            ...newFeatureIds,
            { featureId: element?.id, actionId: null },
          ]
        }
      })
      methodForm.reset({
        ...newData,
        systemId: newData?.system?.id,
        featureActionRefs: newFeatureIds,
      })
      setOldIds(newFeatureIds)
    } catch (err) { }
  }

  useEffect(() => {
    slug && getDetailRoleData(slug.toString())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

  useEffect(() => {
    const changeSearch = setTimeout(
      () => {
        setLoadingPublish(true)
        const _listFeatureSearch = listFeature?.data?.data
          .filter((_feature: any) =>
            _feature.code.toLocaleLowerCase().includes(watchSearchFeature.toLocaleLowerCase())
            || _feature.name.toLocaleLowerCase().includes(watchSearchFeature.toLocaleLowerCase()))
          ?? []

        setListFeatureList(_listFeatureSearch);
      },
      500
    )
    return () => {
      setLoadingPublish(false)
      clearTimeout(changeSearch)
    }
  }, [watchSearchFeature])

  console.log('watch', watch())

  const data = {
    listFeature: watchSearchFeature === "" ? listFeature?.data?.data ?? [] : listFeatureSearch,
    isLoadingFeature,
    methodForm,
    onSubmit,
    t,
    isCreate,
    searchFeature,
    setSearchFeature,
    isView,
    showDialog,
    handleChangeStatus,
    loadingPublish,
    hasFeatures,
  }
  return data
}

export default useCreateUpdatePermissionConfig
