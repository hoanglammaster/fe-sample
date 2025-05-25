import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { GREEN, RED } from '@/components/layouts/WrapLayout/Theme/colors'
import { STATUS_UAA } from '@/helper/utils'
import { TRANSLATE_UAA, UAA_CHILDREN_PATH } from '@/routes'
import { Box, Button } from '@mui/material'
import { useRouter } from 'next/router'
import queryString from 'query-string'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { checkMenuConfig } from '../service'

export const flatFormOption = [
  {
    id: 'WEB',
    name: 'Website',
  },
  {
    id: 'MOBILE',
    name: 'Mobile',
  },
]

interface Props {
  open?: boolean
  listSystem: any[]
  isEdit?: boolean
  handleClose: () => void
}

const CreateMenuDialog = (props: Props) => {
  const { t } = useTranslation(TRANSLATE_UAA.MENU)
  const { control, handleSubmit, reset } = useForm({ mode: 'onTouched' })
  const { isEdit, handleClose, listSystem, open } = props

  const router = useRouter()
  const onSubmit = async (data: any) => {
    try {
      const newBody = {
        platform: data?.platform,
        systemCode: listSystem?.find((v) => v.id === data?.systemId)?.code,
      }
      await checkMenuConfig(newBody)
      router.push(
        `${UAA_CHILDREN_PATH.CONFIGURATION_MENU}/create?${queryString.stringify(
          data
        )}`
      )
    } catch (e) {}
  }

  useEffect(() => {
    !open && reset({})
  }, [open])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box className='px-12 pt-12 mb-20'>
        <Box className='grid gap-15 grid-cols-2'>
          <CoreAutocomplete
            name='systemId'
            label={t('column.system')}
            control={control}
            options={listSystem
              ?.filter((v) => v.status === STATUS_UAA.PUBLISHED)
              .map((v) => {
                return { ...v, name: v?.code + ' - ' + v?.name }
              })}
            labelPath='name'
            valuePath='id'
            returnValueType='enum'
            required
            rules={{
              required: t('common:validation.requiredField'),
            }}
          />
          <CoreAutocomplete
            name='platform'
            label={t('column.platform')}
            className=''
            control={control}
            options={flatFormOption}
            labelPath='name'
            valuePath='id'
            returnValueType='enum'
            required
            rules={{
              required: t('common:validation.requiredField'),
            }}
          />
        </Box>
      </Box>
      <Box className='text-center'>
        <Button
          onClick={handleClose}
          className='px-6 py-8 mr-10 w-50'
          variant='outlined'
          color='inherit'
        >
          {t('common:btn.cancel')}
        </Button>
        <Button type='submit' variant='contained' className='px-10 py-8 w-60'>
          {isEdit ? t('common:btn.update') : t('common:btn.next')}
        </Button>
      </Box>
    </form>
  )
}

export default CreateMenuDialog
