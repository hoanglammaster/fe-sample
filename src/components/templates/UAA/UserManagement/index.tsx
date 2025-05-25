import IconChange from '@/assets/svg/password_key.svg'
import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import PageContainer from '@/components/layouts/MultipleLayouts/Layout1/components/PageContainer'
import { Action } from '@/components/molecules/Action'
import { ColumnProps, CustomTable } from '@/components/organism/TableCustom'
import { Box, Button, IconButton, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import UserFilter from './UserFilter'
import { useChangePasswordUser } from './components/DialogChangePassword'
import DialogAction from './components/DialogLock'
import DialogResetPassword from './components/DialogResetPassword'
import { useUserManagement } from './useUserManagement'
import { truncateText } from '@/components/atoms/TooltipCustom'

export const USER_STATUS = [
  {
    id: 'ACTIVE',
    label: 'Active',
  },
  {
    id: 'LOCKED',
    label: 'Locked',
  },
  {
    id: 'TERMINATED',
    label: 'Terminated',
  },
]

const UserManagement = () => {
  const {
    listUser,
    t,
    loading,
    handleDeleteRow,
    tranferGroupPermission,
    methodForm,
    onSubmit,
    setFilter,
    filter,
    listRoleType,
    listTier,
    prepareData,
  } = useUserManagement()
  const { renderDialog, setUserInfo } = useChangePasswordUser()
  const { showDialog } = useDialog()
  const router = useRouter()
  const uniqueProduct = (arr: any) => {
    return arr?.filter(
      (obj: any, index: number, self: any) =>
        index === self.findIndex((o: any) => o.id === obj.id)
    )
  }

  const columns = useMemo(
    () =>
      [
        {
          header: t('table.userId'),
          fieldName: 'userId',
        },
        {
          header: t('label.roleType'),
          render: (row) => {
            return (
              <Typography sx={{ fontSize: '14px' }}>
                {row?.roleTypeResponse?.roleTypeCode} -{' '}
                {row?.roleTypeResponse?.roleTypeName}
              </Typography>
            )
          },
        },
        {
          header: t('label.tier'),
          render: (row) => {
            return (
              <Typography sx={{ fontSize: '14px' }}>
                {row?.tierResponse?.tierCode} - {row?.tierResponse?.tierName}
              </Typography>
            )
          },
        },
        {
          header: t('table.staff'),
          fieldName: 'name',
          render: (v) => {
            const fullName =
              (v?.firstName ? v?.firstName + ' ' : '') +
              (v?.lastName ? v?.lastName : '')
            return truncateText(fullName)
          },
        },
        {
          header: t('table.username'),
          fieldName: 'username',
          render: (row) => row?.username,
        },
        {
          header: t('table.status'),
          render: (row) => (
            <Typography sx={{ fontSize: '14px' }}>
              {USER_STATUS.find((v) => v.id === row?.status)?.label}
            </Typography>
          ),
        },
        {
          header: t('table.action'),
          fieldName: '',
          neverHidden: true,
          render: (row) => {
            return (
              <Box className='flex items-center'>
                <Action
                  actionList={
                    row?.status === 'TERMINATED' ? ['watch'] : ['watch', 'edit']
                  }
                  onEditAction={() =>
                    router.push(
                      `/uaa/user-management/update/${row?.userRoleTypeRefId}`
                    )
                  }
                  onWatchAction={() => {
                    router.push(
                      `/uaa/user-management/view/${row?.userRoleTypeRefId}`
                    )
                  }}
                />
                {row?.status === 'ACTIVE' && (
                  <IconButton
                    onClick={() =>
                      showDialog(
                        <DialogResetPassword
                          roleTypeId={row?.roleTypeId}
                          userId={row?.userId}
                          t={t}
                          phoneNumberOtp={row?.phoneNumberOTP}
                          version={row?.version}
                        />
                      )
                    }
                  >
                    <Image src={IconChange} alt='' />
                  </IconButton>
                )}
                {row?.status === 'LOCKED' && (
                  <IconButton
                    onClick={() =>
                      showDialog(
                        <DialogAction
                          t={t}
                          id={row?.userRoleTypeRefId}
                          action='unlock'
                          refetch={() => prepareData(filter)}
                          version={row?.version}
                        />
                      )
                    }
                  >
                    <Image src={require('@/assets/svg/ic-locked.svg')} alt='' />
                  </IconButton>
                )}
                {row?.status === 'ACTIVE' && (
                  <IconButton
                    onClick={() =>
                      showDialog(
                        <DialogAction
                          t={t}
                          id={row?.userRoleTypeRefId}
                          action='lock'
                          refetch={() => prepareData(filter)}
                          version={row?.version}
                        />
                      )
                    }
                  >
                    <Image
                      src={require('@/assets/svg/ic-unlocked.svg')}
                      alt=''
                    />
                  </IconButton>
                )}
                {!(row?.status === 'TERMINATED') && (
                  <IconButton
                    onClick={() =>
                      showDialog(
                        <DialogAction
                          t={t}
                          id={row?.userRoleTypeRefId}
                          action='terminate'
                          refetch={() => prepareData(filter)}
                          version={row?.version}
                        />
                      )
                    }
                  >
                    <Image
                      src={require('@/assets/svg/ic-terminated.svg')}
                      alt=''
                    />
                  </IconButton>
                )}
              </Box>
            )
          },
        },
      ] as ColumnProps[],
    [filter, prepareData, router, showDialog, t]
  )

  return (
    <PageContainer
      title={
        <Box className='flex items-center'>
          <Typography variant='h1' className='mr-10'>
            {t('title.listAccount')}
          </Typography>
          <Button
            variant='outlined'
            size='medium'
            onClick={() => router.push('/uaa/user-management/create')}
          >
            {t('common:btn.addNew')}
          </Button>
        </Box>
      }
      pageTitle={t('title.listAccount')}
      toolbarAction={
        <ButtonCustom
          variant='contained'
          color='primary'
          theme={'submit'}
          onClick={() => router.push('/uaa/user-management/create')}
        >
          {t('button.add')}
        </ButtonCustom>
      }
    >
      <UserFilter
        methodForm={methodForm}
        onSubmit={onSubmit}
        loading={loading}
        listRoleType={listRoleType}
        listTier={listTier}
      />
      <>
        <CustomTable
          data={listUser?.content ?? []}
          {...listUser}
          {...filter}
          columns={columns}
          onChangePageSize={(val) => setFilter({ ...filter, ...val })}
          isLoading={loading}
          paginationHidden={(listUser?.content ?? []).length < 1}
          onRowClick={(row) =>
            router.push(`/uaa/user-management/view/${row?.userRoleTypeRefId}`)
          }
          isShowColumnStt
        />
        {renderDialog()}
      </>
    </PageContainer>
  )
}
export default UserManagement
