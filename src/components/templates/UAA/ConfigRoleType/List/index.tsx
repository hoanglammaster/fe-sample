import React, { useMemo } from 'react'
import useConfigRoleTypeList from './useConfigRoleTypeList'
import { Box, Button, Typography } from '@mui/material'
import PageContainer from '@/components/layouts/MultipleLayouts/Layout1/components/PageContainer'
import { ColumnProps, CustomTable } from '@/components/organism/TableCustom'
import ConfigRoleTypeFilter from './ConfigRoleTypeFilter'
import Link from 'next/link'
import { UAA_CHILDREN_PATH } from '@/routes'
import EditIcon from '@/components/Icon/EditIcon'
import { useRouter } from 'next/router'
import ListService from '../../Service/List'

const ConfigRoleTypeList = () => {
  const {
    filterConfig,
    getListConfig,
    handleDeleteRow,
    listConfig,
    loading,
    setFilterConfig,
    t,
    onSubmit,
    methodForm,
    listPermission,
    listSystem,
  } = useConfigRoleTypeList()
  const router = useRouter()
  const columns = useMemo(
    () =>
      [
        {
          header: 'System',
          fieldName: 'systemName',
          render: (val) => (
            <Typography variant='body2'>
              {listSystem.find((v) => v.id === val.systemId)?.name}
            </Typography>
          ),
        },
        { header: 'Role type', fieldName: 'roleTypeName' },
        { header: 'Tier', fieldName: 'tierName' },
        { header: 'Permission Groups', fieldName: 'groupPermissionName' },
        {
          header: 'Action',
          fieldName: 'roleTypeName',
          render: (val) => (
            <Box>
              <EditIcon
                ondblclick={(e: any) => {
                  e.stopPropagation()
                  router.push(
                    `${UAA_CHILDREN_PATH.CONFIG_ROLE_TYPE}/update/${val.id}`
                  )
                }}
              />
            </Box>
          ),
        },
      ] as ColumnProps[],
    [listSystem, router]
  )
  return (
    <PageContainer
      title={
        <Box className='flex items-center'>
          <Typography className='mr-10' variant='h3'>
            {t('title.config')}
          </Typography>
          <Link
            href={`${UAA_CHILDREN_PATH.CONFIG_ROLE_TYPE}/create`}
            className='no-underline'
          >
            <Button variant='outlined' size='small'>
              {t('common:btn.addNew')}
            </Button>
          </Link>
        </Box>
      }
    >
      <ConfigRoleTypeFilter
        listPermission={listPermission}
        listSystem={listSystem}
        methodForm={methodForm}
        onSubmit={onSubmit}
      />
      <CustomTable
        columns={columns}
        data={listConfig?.content}
        isLoading={loading}
        {...listConfig}
        onChangePageSize={(val) => setFilterConfig({ ...filterConfig, val })}
      />
    </PageContainer>
  )
}

export default ConfigRoleTypeList
