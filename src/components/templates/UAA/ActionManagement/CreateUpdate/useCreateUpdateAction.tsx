import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import {
  getDetailAction,
  getMaxSequence,
  postAction,
  publishAction,
  updateAction,
} from '../service'
import { useTranslation } from 'react-i18next'
import { TRANSLATE_UAA, UAA_CHILDREN_PATH } from '@/routes'
import { useRouter } from 'next/router'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { useFormCustom } from '@/lib/form'

const defaultValues = {
  code: '',
  name: '',
  index: 0,
  description: '',
  status: 'DRAFT',
  version: 0,
}

const useCreateUpdateAction = () => {
  const { t } = useTranslation(TRANSLATE_UAA.ACTION_MANAGEMENT)
  const router = useRouter()
  const methodForm = useFormCustom({ defaultValues })
  const [dataAction, setDataAction] = useState<any>()
  const { hideDialog, showDialog } = useDialog()
  const [loading, setLoading] = useState(false)
  const [sequence, setSequence] = useState()

  const id = Number(router.query.slug)
  const isView = router.asPath.includes('/view')
  const isEdit = !!id && !isView

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    isEdit ? updateAction : postAction,
    {
      onSuccess: (res: any) => {
        router.push(UAA_CHILDREN_PATH.ACTION_MANAGEMENT)
      },
      onError: (e) => {},
    }
  )

  const onSubmit = methodForm.handleSubmit((val: any) => {
    mutate(val)
  })

  const handlePublishAction = async (id: number, version: number) => {
    try {
      await publishAction(id, version)
      hideDialog()
      router.push(UAA_CHILDREN_PATH.ACTION_MANAGEMENT)
    } catch (e) {
      hideDialog()
    }
  }

  const getDetail = async (id: number) => {
    setLoading(true)
    try {
      const res = await getDetailAction(id)
      setDataAction(res)
    } catch (e) {}
    setLoading(false)
  }

  const getSequence = async () => {
    try {
      const res = await getMaxSequence()
      setSequence(res?.data?.data?.maxSequence)
    } catch (e) {}
  }

  useEffect(() => {
    if (isEdit || isView) {
      getDetail(id)
    } else {
      getSequence()
    }
  }, [id, isEdit, isView])

  useEffect(() => {
    dataAction && methodForm.reset(dataAction)
  }, [dataAction, methodForm])

  useEffect(() => {
    !!sequence && methodForm.setValue('index', sequence)
  }, [methodForm, sequence])

  return [
    {
      methodForm,
      router,
      t,
      isLoadingSubmit,
      isView,
      isEdit,
      id,
      loading,
    },
    { onSubmit, handlePublishAction, showDialog },
  ] as const
}

export default useCreateUpdateAction
