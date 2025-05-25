/* eslint-disable @next/next/no-img-element */
import BreadcrumbUaa from '@/components/atoms/BreadcumbUaa'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import useClient from '@/components/hooks/client/useClient'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import PageContainer from '@/components/layouts/MultipleLayouts/Layout1/components/PageContainer'
import { flatMenu, renderStatus, STATUS_UAA } from '@/helper/utils'
import { TRANSLATE_UAA, UAA_CHILDREN_PATH } from '@/routes'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Checkbox, TextField, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import 'react-sortable-tree/style.css'
import { PublishDialog } from '../../SystemManagement/Dialog/PublishDialog'
import { flatFormOption } from '../List/CreateMenuDialog'
import CreateUpdateMenuDialog from './CreateUpdateMenuDialog'
import useCreateUpdateMenu from './useCreateUpdateMenu'
import CoreInput from '@/components/atoms/CoreInput'

const SortableTreeCustom = dynamic(
  import('./DragAndDropComponent/SortableTreeCustom'),
  { ssr: false }
)

const LIST_MENU_TYPE = [
  { id: 'ITEM', name: 'Item' },
  { id: 'GROUP', name: 'Group' },
  { id: 'COLLAPSE', name: 'Collapse' },
]
const CreateUpdateMenuConfig = () => {
  const { t } = useTranslation(TRANSLATE_UAA.CONFIGURATION_MENU)
  const {
    handleSubmitForm,
    listPermission,
    listLang,
    listMenu,
    listSystem,
    loading,
    setListMenu,
    methodForm,
    isEdit,
  } = useCreateUpdateMenu()

  const {
    control,
    watch,
    setValue,
    formState: { isSubmitting },
  } = methodForm
  const [menuData, setMenuData] = useState<any | undefined>()
  const router = useRouter()

  const isView = router.asPath.includes('/view')

  const { isClient } = useClient()

  const optionPosition = [
    {
      id: 'LEFT',
      name: 'Column',
    },
    {
      id: 'DOWN',
      name: 'Row',
    },
  ]

  const listCurrenMenu = watch('menus')

  const checkSelect = (item: any) => {
    return (
      flatMenu(listCurrenMenu)?.some(
        (v) =>
          v.id === item.id || v.children?.some((v2: any) => v2.id === item.id)
      ) ?? false
    )
  }

  const handleAddMenu = useCallback(
    (val: any) => {
      let newId = 1
      listMenu.forEach((element) => {
        if (element.id > newId - 1) {
          newId = element.id + 1
        }
      })
      return { ...val, id: newId }
    },
    [listMenu]
  )

  const handleChildren = (item: any, children: any[]): any[] => {
    if (!children) {
      return []
    }
    return children
      .filter((v) => v.id !== item.id)
      .map((v) => {
        return {
          ...v,
          children: handleChildren(item, v.children),
        }
      })
  }

  const handleUpdateMenuItem = (item: any) => {
    const listMenu = watch('menus') ?? []
    if (listMenu.some((v) => v.id === item.id)) {
      return listMenu.map((v) => {
        if (v.id === item.id) {
          return { ...v, ...item }
        }
        return v
      })
    } else
      return listMenu.map((v) => {
        if (!!v.children && v.children?.some((v2) => v2.id === item.id)) {
          return {
            ...v,
            children: v.children.map((v2) => {
              if (v2.id === item.id) {
                return { ...v2, ...item }
              }
              return v2
            }),
          }
        }
        return v
      })
  }

  const handleChangeConfig = (item: any, checked?: boolean) => {
    const newData = checked
      ? listCurrenMenu.concat(item)
      : handleChildren(item, listCurrenMenu)
    setValue('menus', newData)
  }

  const { showDialog } = useDialog()

  const status = watch('status')

  const search = watch('search') ?? ''

  const systemName = listSystem?.find(
    (v: any) => v.id.toString() === watch('systemId')?.toString()
  )?.name

  const platformName = flatFormOption.find(
    (v) => v.id === watch('platform')
  )?.name

  const listMenuWithSearch = listMenu?.filter((item: any) =>
    item.name.toLowerCase().includes(search.trim().toLowerCase())
  )

  return (
    <>
      <PageContainer
        title={
          <Box>
            <BreadcrumbUaa />
            <Typography variant='h1' className='mt-10'>
              {isView
                ? t('title.view')
                : t(isEdit ? 'title.update' : 'title.addNew', {
                    name: systemName,
                  })}
            </Typography>
          </Box>
        }
      >
        <>
          <form className='px-12 pt-12 mb-32' onSubmit={handleSubmitForm}>
            <Box>
              <Box className='grid w-full grid-cols-2 gap-15 mb-15'>
                <Box className='flex'>
                  <Typography variant='body2'>
                    {t('text.system')}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span className='font-bold'>{systemName}</span>
                  </Typography>
                </Box>
                <Box className='flex'>
                  <Typography variant='body2'>
                    {t('text.platform')}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span className='font-bold'>{platformName}</span>
                  </Typography>
                </Box>
              </Box>
              <Box className='grid grid-cols-2 gap-15 mb-10'>
                <CoreAutocomplete
                  control={control}
                  name={'location'}
                  label={t('label.location')}
                  readOnly={isView}
                  options={[
                    {
                      label: 'Column',
                      value: 'COLUMN',
                    },
                    {
                      label: 'Row',
                      value: 'ROW',
                    },
                  ]}
                  returnValueType='enum'
                  rules={{
                    required: t('common:validation.requiredField'),
                  }}
                  required={!isView}
                />
              </Box>
            </Box>
            <Box>
              <Typography variant='subtitle2' className='mb-10'>
                List of Sub Menu
              </Typography>
              {!isView && (
                <Box className='grid grid-cols-2 gap-15 mb-10'>
                  <CoreInput
                    control={control}
                    name='search'
                    placeholder={t('label.enterKeyword')}
                    inputProps={{ maxLength: 255 }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.stopPropagation()
                        e.preventDefault()
                      }
                    }}
                  />
                </Box>
              )}
            </Box>
            <Box className={isView ? 'w-full' : 'grid grid-cols-2 gap-15'}>
              {!isView && (
                <Box
                  sx={{
                    border: '1px solid #E9E9E9',
                    maxHeight: '450px',
                    overflow: 'auto',
                  }}
                >
                  {listMenuWithSearch.length > 0 ? (
                    listMenuWithSearch.map((item: any, index: number) => {
                      const showName = `${item.name} - ${
                        LIST_MENU_TYPE.find((v2) => v2.id === item.type)?.name
                      }`
                      return (
                        <Box
                          key={index}
                          className='flex items-center w-full h-22 p-4'
                        >
                          {!isView && (
                            <Checkbox
                              className='p-0'
                              color='primary'
                              onChange={(e, checked) =>
                                handleChangeConfig(item, checked)
                              }
                              checked={checkSelect(item)}
                            />
                          )}

                          <Box className='flex'>
                            {item?.icon ? (
                              <img
                                alt=''
                                src={item?.icon}
                                style={{ width: '24px', height: '24px' }}
                              />
                            ) : (
                              <div style={{ width: '24px', height: '24px' }} />
                            )}
                            <Typography
                              variant='body2'
                              className='line-clamp-1'
                              title={showName}
                            >
                              {showName}
                            </Typography>
                          </Box>
                        </Box>
                      )
                    })
                  ) : (
                    <Box className='p-10 flex justify-center w-full'>
                      <Typography variant='body2'>
                        {t('common:table.no_data')}
                      </Typography>
                    </Box>
                  )}
                </Box>
              )}

              <Box
                sx={{
                  border: '1px solid #E9E9E9',
                  maxHeight: '450px',
                  overflow: 'auto',
                }}
              >
                <SortableTreeCustom
                  listCurrenMenu={listCurrenMenu}
                  readOnly={!!isView}
                  onChange={(val) => setValue('menus', val)}
                />
              </Box>
            </Box>
            <Box className='my-10'>
              <Typography variant='body2'>
                Status: {renderStatus(watch('status'))}
              </Typography>
            </Box>

            {isView ? (
              status === STATUS_UAA.DRAFT && (
                <Box className='w-full flex items-center justify-center mt-10'>
                  <LoadingButton
                    size='large'
                    className='h-23'
                    variant='outlined'
                    onClick={() =>
                      showDialog(
                        <PublishDialog
                          onSubmit={() => handleSubmitForm()}
                          t={t}
                        />
                      )
                    }
                    loading={isSubmitting}
                  >
                    Publish
                  </LoadingButton>
                </Box>
              )
            ) : (
              <Box className='mt-10 text-center'>
                <Button
                  variant='outlined'
                  color='inherit'
                  className='px-10 py-8 mr-10'
                  onClick={() =>
                    router.push(UAA_CHILDREN_PATH.CONFIGURATION_MENU)
                  }
                >
                  {t('common:btn.cancel')}
                </Button>
                <LoadingButton
                  type='submit'
                  variant='contained'
                  className='px-10 py-8'
                  loading={isSubmitting}
                >
                  {isEdit ? t('common:btn.save') : t('common:btn.save')}
                </LoadingButton>
              </Box>
            )}
          </form>
          {menuData && (
            <CreateUpdateMenuDialog
              open={!!menuData}
              data={menuData}
              handleClose={() => setMenuData(undefined)}
              listSystem={listSystem}
              listPermission={listPermission}
              t={t}
              listLang={listLang}
              onSubmitSuccess={(val: any) => {
                if (val.id) {
                  setListMenu(
                    listMenu.map((v) => {
                      if (v.id !== val.id) {
                        return { ...v }
                      }
                      return val
                    })
                  )
                  setValue('menus', handleUpdateMenuItem(val))
                } else setListMenu([...listMenu, handleAddMenu(val)])
              }}
            />
          )}
        </>
      </PageContainer>
    </>
  )
}

export default CreateUpdateMenuConfig
