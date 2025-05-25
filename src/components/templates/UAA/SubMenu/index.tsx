import { useRouter } from 'next/router'
import { useSubMenu } from './useSubMenu'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import PageContainer from '@/components/layouts/MultipleLayouts/Layout1/components/PageContainer'
import { Box, Button, Typography } from '@mui/material'
import Link from 'next/link'
import { CustomTable } from '@/components/organism/TableCustom'
import CoreInput from '@/components/atoms/CoreInput'
import { LoadingButton } from '@mui/lab'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { TRANSLATE_UAA, UAA_CHILDREN_PATH } from '@/routes'
import { useTranslation } from 'react-i18next'
import { getListSystem } from './service'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { STATUS_UAA } from '@/helper/utils'

export const ListSubMenu = () => {

    const {
        filter,
        listSubMenu,
        loadingSubMenu,
        methodForm: { control },
        onSubmit,
        setFilter,
        columns,
        t
    } = useSubMenu()

    const router = useRouter()
    const { hideDialog, showDialog } = useDialog()

    return (
        <PageContainer
            title={
                <Box className='flex items-center'>
                    <Typography className='mr-10' variant='h1'>
                        {t('title.list')}
                    </Typography>
                    <Link
                        href={`${UAA_CHILDREN_PATH.SUB_MENU_MANAGEMENT}/create`}
                        className='no-underline'
                    >
                        <Button variant='outlined' size='medium'>
                            {t('common:btn.addNew')}
                        </Button>
                    </Link>
                </Box>
            }
        >
            <form onSubmit={onSubmit}>
                <Box>
                    <Typography variant='h3' className='mb-10'>
                        {t('common:searchByFilter')}
                    </Typography>
                    <Box className='grid grid-cols-3 gap-10 w-fulL mb-10'>
                        <CoreAutoCompleteAPI
                            control={control}
                            name='systemId'
                            label={t('label.system')}
                            labelSearch='codeOrName'
                            fetchDataFn={getListSystem}
                            placeholder='Select System'
                            params={{ status: STATUS_UAA.PUBLISHED }}
                            labelPath='code'
                            labelPath2='name'
                            valuePath='id'
                            hasAllOption
                            disableClearable
                        />
                        <CoreAutocomplete
                            control={control}
                            className='w-full'
                            name='type'
                            label={t('label.subMenuType')}
                            options={[
                                { label: 'All', value: null },
                                { label: "Item", value: "ITEM" },
                                { label: "Collapse", value: "COLLAPSE" }
                            ]}
                            labelPath='label'
                            valuePath='value'
                            disableClearable
                        />
                        <CoreInput
                            control={control}
                            className='w-full'
                            name='searchByName'
                            label={t('label.subMenuName')}
                            placeholder={t('placeholder.subMenuName')}
                            inputProps={{
                                maxLength: 255
                            }}
                        />
                    </Box>
                    <Box className='flex w-full justify-center'>
                        <LoadingButton
                            variant='contained'
                            color='primary'
                            className='mb-10'
                            type='submit'
                            loading={loadingSubMenu}
                        >
                            Search
                        </LoadingButton>
                    </Box>
                </Box>
            </form>
            <CustomTable
                columns={columns}
                {...listSubMenu}
                data={listSubMenu?.content ?? []}
                {...filter}
                onChangePageSize={(val: any) => setFilter({ ...filter, page: val.page, size: val.size })}
                isShowColumnStt
                isLoading={loadingSubMenu}
                paginationHidden={listSubMenu?.content.length < 1}
                onRowClick={(row: any) => {
                    router.push(`${UAA_CHILDREN_PATH.SUB_MENU_MANAGEMENT}/view/${row?.id}`)
                }}
            />
        </PageContainer>
    )
}
