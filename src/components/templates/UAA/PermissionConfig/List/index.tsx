import React from 'react'
import usePermissionConfig from './usePermissionConfig'
import PageContainer from '@/components/layouts/MultipleLayouts/Layout1/components/PageContainer'
import { useTranslation } from 'next-i18next'
import { Box, Button, Typography } from '@mui/material'
import PermissionConfigTable from './PermissionConfigTable'
import { useRouter } from 'next/router'
import { TRANSLATE_UAA, UAA_CHILDREN_PATH } from '@/routes'
import PermissionFilter from './PermissionFilter'

const ListPermissionConfig = () => {
  const {
    filter,
    handleDeleteRow,
    listPermission,
    listProduct,
    loading,
    setFilter,
    onSubmit,
    methodForm,
    handleChangeStatus,
  } = usePermissionConfig()

  const router = useRouter()

  const { t } = useTranslation(TRANSLATE_UAA.PERMISSION_CONFIG)

  return (
    <PageContainer
      title={
        <Box className='flex items-center'>
          <Typography variant='h1' className='mr-10'>
            {t('title.page')}
          </Typography>
          <Button
            onClick={() =>
              router.push(`${UAA_CHILDREN_PATH.PERMISSION_CONFIG}/create`)
            }
            variant='outlined'
            size='medium'
          >
            {t('common:btn.addNew')}
          </Button>
        </Box>
      }
    >
      <PermissionFilter
        methodForm={methodForm}
        onSubmit={onSubmit}
        loading={loading}
        listProduct={listProduct}
      />
      <PermissionConfigTable
        t={t}
        filter={filter}
        handleDeleteRow={handleDeleteRow}
        listPermission={listPermission}
        listProduct={listProduct}
        setFilter={setFilter}
        handleChangeStatus={handleChangeStatus}
        loading={loading}
      />
    </PageContainer>
  )
}

export default ListPermissionConfig
