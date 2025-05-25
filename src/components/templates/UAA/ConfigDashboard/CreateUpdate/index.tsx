import React from 'react'
import useCreateUpdateConfigDashboard from './useCreateUpdateConfigDashboard'
import { useTranslation } from 'react-i18next'
import { TRANSLATE_UAA, UAA_CHILDREN_PATH } from '@/routes'
import PageContainer from '@/components/layouts/MultipleLayouts/Layout1/components/PageContainer'
import { Box, Button, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { Controller, useFieldArray } from 'react-hook-form'
import RoleSystem from './RoleSystem'
import dynamic from 'next/dynamic'
import { GREEN, RED } from '@/components/layouts/WrapLayout/Theme/colors'
import { LoadingButton } from '@mui/lab'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'

const { EditText } = {
  EditText: dynamic(
    () =>
      import('@/components/molecules/EditText').then(
        (component) => component.EditText
      ),
    { ssr: false, loading: () => <p>Loading editor.....</p> }
  ),
}

const CreateUpdateConfigDashboard = () => {
  const {
    handleRecallMenu,
    handleSubmitForm,
    listMenu,
    listSystem,
    loading,
    methodForm,
    isEdit,
  } = useCreateUpdateConfigDashboard()
  const { t } = useTranslation(TRANSLATE_UAA.CONFIG_DISPLAY_SYSTEM)

  const router = useRouter()
  const {
    control,
    formState: { isSubmitting },
  } = methodForm
  const { append, remove, fields } = useFieldArray({
    control,
    name: 'menuIds',
  })
  const renderListSystem = () => {
    return (
      fields?.length > 0 &&
      Array.isArray(fields) &&
      fields?.map((item, index) => {
        const propsField = {
          append,
          remove,
          total: fields.length,
          name: `menuIds.[${index}]`,
          index,
          control,
          listMenu,
        }
        return <RoleSystem {...propsField} key={item.id} />
      })
    )
  }
  return (
    <PageContainer
      title={t('title.title_new')}
      pageTitle={
        <Typography
          gutterBottom
          noWrap
          variant='h6'
          component='div'
          className='flex items-center gap-4'
        >
          {t('title.box')}
        </Typography>
      }
    >
      <form onSubmit={handleSubmitForm}>
        <Box>
          <Box className='grid gap-15 my-10'>
            <Box className='grid gap-15'>
              <Box className='flex justify-center'>
                <CoreAutocomplete
                  control={control}
                  name='productId'
                  label='Hệ thống'
                  className='w-4/5'
                  required
                  valuePath='id'
                  labelPath='name'
                  returnValueType='enum'
                  options={listSystem}
                />
              </Box>
              <Box className='flex justify-center'>
                <Box className='w-4/5 justify-center'>
                  <Typography className='font-[500]'>
                    Nội dung
                    <span className='text-red-700'>*</span>
                  </Typography>
                  <Controller
                    name='description'
                    control={control}
                    render={({
                      field: { onChange, value, onBlur },
                      formState,
                    }) => (
                      <Box className='w-full mb-10'>
                        <EditText
                          setEditorText={onChange}
                          editorText={value}
                          error={formState.errors.description?.message}
                          disabled={false}
                          // onBlur={onBlur}
                        />
                      </Box>
                    )}
                  />
                </Box>
              </Box>
              {renderListSystem()}
            </Box>
            <Box className='text-center'>
              <Button
                variant='contained'
                sx={{
                  backgroundColor: RED,
                }}
                className='px-10 py-8 mr-10'
                onClick={() =>
                  router.push(UAA_CHILDREN_PATH.CONFIG_DISPLAY_SYSTEM)
                }
              >
                {t('btn.cancel')}
              </Button>
              <LoadingButton
                type='submit'
                variant='contained'
                loading={isSubmitting}
                className='px-10 py-8'
                sx={{
                  backgroundColor: GREEN,
                }}
              >
                {isEdit ? t('btn.update') : t('btn.add')}
              </LoadingButton>
            </Box>
          </Box>
        </Box>
      </form>
    </PageContainer>
  )
}

export default CreateUpdateConfigDashboard
