import { errorMsg, successMsg } from '@/helper/message'
import { STATUS_UAA } from '@/helper/utils'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useQueryGetListService } from '../../APIManangement/service'
import { useGetListPartner } from '../../Feature/CreateUpdate/service'
import {
  createClient,
  generateSecretClientKey,
  getClientDetail,
  getConfigKey,
  publishClient,
  updateClient,
} from '../List/service/service'
import { ClientType } from './type'
import { UAA_CHILDREN_PATH } from '@/routes'
import { useDialog } from '@/components/hooks/dialog/useDialog'

const clientSecretDefault = '************************' // clientSecret in View and Update

export const useSaveClient = () => {
  const router = useRouter()
  const [loadingPage, setLoadingPage] = useState<boolean>(false)

  const [accessToken, setAccessToken] = useState(0)
  const [refreshToken, setRefreshToken] = useState(0)

  const formClientContext = useForm<ClientType>({
    mode: 'onTouched',
    defaultValues: {
      code: '',
      name: '',
      accessTokenValiditySeconds: 0,
      refreshTokenValiditySeconds: 0,
      status: 'DRAFT',
      clientSecret: '',
      ipAddresses: [''],
      authenticationType: null,
      isUsingIP: false,
    },
  })

  const id = router.query?.id

  const isCreate = !id

  const isView = router.pathname.includes('/view')

  const clientType = formClientContext.watch('type')

  const version = Number(formClientContext.watch('version'))

  const { hideDialog } = useDialog()

  const { data: listPartner, isLoading: loadingPartner } = useGetListPartner(
    {
      page: 0,
      size: 1000,
      status: 'ACTIVE',
    },
    { enabled: clientType === 'PARTNER' }
  )

  const { data: listService, isLoading: loadingService } =
    useQueryGetListService(
      {
        page: 0,
        size: 1000,
        status: STATUS_UAA.PUBLISHED,
      },
      { enabled: clientType === 'INTERNAL' }
    )

  const handleCreateUpdateClient = async (val: ClientType) => {
    try {
      const newVal = {
        ...val,
        code: val?.type !== 'INTERNAL' ? val?.codeExternal : val?.code,
        name: val?.type !== 'INTERNAL' ? val?.nameExternal : val?.name,
        serviceId: val?.service?.id,
        ipAddresses: val.isUsingIP ? val.ipAddresses : [],
        clientId:
          val.authenticationType === 'CLIENT_CREDENTIALS' ? val.clientId : '',
        accessTokenValiditySeconds:
          val.authenticationType === 'CLIENT_CREDENTIALS'
            ? val.accessTokenValiditySeconds
            : accessToken,
        refreshTokenValiditySeconds:
          val.authenticationType === 'CLIENT_CREDENTIALS'
            ? val.refreshTokenValiditySeconds
            : accessToken,
        clientSecret:
          val.authenticationType === 'CLIENT_CREDENTIALS'
            ? val?.clientSecret === clientSecretDefault
              ? undefined
              : val?.clientSecret
            : '',
      }

      if (val.id) {
        const res = await updateClient(newVal, val.id)
        router.push(UAA_CHILDREN_PATH.CLIENT_MANAGEMENT)
      } else {
        const res = await createClient(newVal)
        router.push(UAA_CHILDREN_PATH.CLIENT_MANAGEMENT)
      }
    } catch (e) {}
  }

  const handleSubmit = formClientContext.handleSubmit(handleCreateUpdateClient)

  const getSecretKey = async () => {
    try {
      const data = await generateSecretClientKey()
      formClientContext.setValue('clientSecret', data?.secret ?? '')
    } catch (e) {}
  }

  const handlePublishClient = async () => {
    try {
      if (!!id) {
        const data = await publishClient(id as string, version)
        router.push(UAA_CHILDREN_PATH.CLIENT_MANAGEMENT)
        hideDialog()
      }
    } catch (e) {
      hideDialog()
    }
  }

  const getDetail = async (id: string) => {
    setLoadingPage(true)
    const res = await getClientDetail(id)
    formClientContext.reset({
      ...res,
      nameExternal: res?.name,
      codeExternal: res?.code,
      service: res?.serviceResponse,
      refreshTokenValiditySeconds: res?.refreshTokenValiditySeconds
        ? res?.refreshTokenValiditySeconds?.toString()
        : '',
      accessTokenValiditySeconds: res?.accessTokenValiditySeconds
        ? res?.accessTokenValiditySeconds?.toString()
        : '',
      clientSecret:
        res?.authenticationType === 'CLIENT_CREDENTIALS'
          ? clientSecretDefault
          : '',
      ipAddresses: res?.ipAddresses ?? [],
      isUsingIP: !!res?.ipAddresses?.length,
    })
    setLoadingPage(false)
  }
  const getConfig = async (configKey: string) => {
    setLoadingPage(true)
    try {
      const res = await getConfigKey({ configKey })
      if (configKey === 'ACCESS_TOKEN_EXPIRE_TIME') {
        formClientContext.setValue(
          'accessTokenValiditySeconds',
          Number(res?.data?.configValue)
        )
        setAccessToken(Number(res?.data?.configValue))
      } else {
        formClientContext.setValue(
          'refreshTokenValiditySeconds',
          Number(res?.data?.configValue)
        )
        setRefreshToken(Number(res?.data?.configValue))
      }
    } catch (e) {}
    setLoadingPage(false)
  }

  useEffect(() => {
    id && getDetail(id as string)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  useEffect(() => {
    if (!isView) {
      getConfig('ACCESS_TOKEN_EXPIRE_TIME')
      getConfig('REFRESH_TOKEN_EXPIRE_TIME')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCreate])

  console.log(formClientContext.watch('authenticationType'), 'watch123')

  const data = {
    router,
    formClientContext,
    listPartner:
      listPartner?.data?.data?.filter((v) => v.status === 'ACTIVE') ?? [],
    listService: listService?.data?.content ?? [],
    loadingPartner,
    loadingService,
    isView,
    isCreate,
    loadingPage,
    accessToken,
    refreshToken,
    getSecretKey,
    handleSubmit,
    handlePublishClient,
  }

  return data
}
