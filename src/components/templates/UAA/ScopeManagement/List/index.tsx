import React from 'react'
import useScopeList from './useScopeList'
import PageContainer from '@/components/layouts/MultipleLayouts/Layout1/components/PageContainer'
import { useTranslation } from 'next-i18next'
import { Box, Button, Typography } from '@mui/material'
import PermissionConfigTable from './PermissionConfigTable'
import { useRouter } from 'next/router'
import { TRANSLATE_UAA, UAA_CHILDREN_PATH } from '@/routes'
import ScopeFilter from './ScopeFilter'

const ListScope = () => {
  const {
    filter,
    handleDeleteRow,
    listPermission,
    loading,
    setFilter,
    onSubmit,
    methodForm,
    handleChangeStatus,
  } = useScopeList()

  const router = useRouter()

  const { t } = useTranslation(TRANSLATE_UAA.SCOPE)

  return (
    <PageContainer
      title={
        <Box className='flex items-center'>
          <Typography variant='h1' className='mr-10'>
            {t('title.page')}
          </Typography>
          <Button
            onClick={() =>
              router.push(`${UAA_CHILDREN_PATH.SCOPE_MANAGEMENT}/create`)
            }
            variant='outlined'
            size='medium'
          >
            {t('common:btn.addNew')}
          </Button>
        </Box>
      }
    >
      <ScopeFilter
        methodForm={methodForm}
        onSubmit={onSubmit}
        loading={loading}
      />
      <PermissionConfigTable
        t={t}
        filter={filter}
        handleDeleteRow={handleDeleteRow}
        listPermission={listPermission}
        setFilter={setFilter}
        handleChangeStatus={handleChangeStatus}
        loading={loading}
      />
    </PageContainer>
  )
}

export default ListScope
