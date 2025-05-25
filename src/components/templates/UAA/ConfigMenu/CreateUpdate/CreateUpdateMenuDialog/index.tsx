/* eslint-disable react-hooks/exhaustive-deps */
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreInput from '@/components/atoms/CoreInput'
import { GREEN, RED } from '@/components/layouts/WrapLayout/Theme/colors'
import CoreDialog from '@/components/molecules/CoreDialog'
import { listIconMUI } from '@/helper/icon'
import { errorMsg } from '@/helper/message'
import { LoadingButton } from '@mui/lab'
import { Button, DialogContent } from '@mui/material'
import { Box } from '@mui/system'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export const listTypeMenu = [
  { id: 'item', name: 'Item' },
  { id: 'group', name: 'Group' },
  { id: 'collapse', name: 'Collapse' },
]

interface Props {
  open?: boolean
  handleClose: () => void
  data: any
  listSystem: any[]
  listPermission: any[]
  onSubmitSuccess: (val: any) => void
  listLang: any[]
  t: any
}

const CreateUpdateMenuDialog = (props: Props) => {
  const {
    open,
    handleClose,
    data,
    t,
    listSystem,
    listPermission,
    onSubmitSuccess,
    listLang,
  } = props
  const {
    reset,
    control,
    formState: { isSubmitting },
    handleSubmit,
  } = useForm({ mode: 'onTouched' })

  const [openPopper, setOpenPoper] = useState(false)

  const getIconOptions = useCallback(() => {
    return listIconMUI()
  }, [])

  const submitForm = async (val: any) => {
    try {
      onSubmitSuccess(val)
      handleClose()
    } catch (err) {}
  }

  // const optionPermissionApi = listPermission?.reduce(
  //   (accumulator: any[], currentValue: any) => {
  //     const list = accumulator?.concat(
  //       currentValue.apis
  //         ?.filter((v: any) => v.isActivated)
  //         ?.map((v: any) => {
  //           return { ...v, name: `${currentValue.name} - ${v.name}` }
  //         }) ?? []
  //     )
  //     return list?.filter(
  //       (obj, index, self) =>
  //         index ===
  //         self.findIndex(
  //           (o) => o.id === obj.id // check if the current object has a unique id and name
  //         )
  //     )
  //   },
  //   []
  // )

  useEffect(() => {
    reset(
      {
        ...data,
        systemId: data?.systemId ? Number(data?.systemId) : null,
      } ?? {}
    )
  }, [data, reset, open])

  return (
    <>
      <CoreDialog
        open={open}
        handleClose={handleClose}
        maxWidth='md'
        fullWidth
        dialogTitle={data?.id ? 'Chỉnh sửa Menu' : 'Tạo mới Menu'}
        dialogContent={
          <form onSubmit={handleSubmit(submitForm)}>
            <DialogContent>
              <Box className='grid grid-cols-2 w-full gap-15'>
                <CoreInput
                  control={control}
                  name='name'
                  label='Tên menu'
                  required
                  rules={{ required: t('common:validation.required') }}
                />

                <CoreAutocomplete
                  control={control}
                  name='type'
                  label='Loại menu'
                  required
                  options={listTypeMenu}
                  valuePath='id'
                  labelPath='name'
                  returnValueType='enum'
                  rules={{ required: t('common:validation.required') }}
                />
                <CoreInput
                  control={control}
                  name='url'
                  label='Đường dẫn url'
                  required
                  rules={{ required: t('common:validation.required') }}
                />
                <CoreAutocomplete
                  control={control}
                  name='systemId'
                  label='Hệ thống'
                  options={listSystem}
                  valuePath='id'
                  labelPath='name'
                  required
                  readOnly
                  returnValueType='enum'
                />
                <CoreAutocomplete
                  control={control}
                  name='groupPermissionId'
                  label='Quyền'
                  options={listPermission}
                  valuePath='id'
                  labelPath='name'
                  required
                  returnValueType='enum'
                />
                <CoreAutocomplete
                  className='w-full'
                  control={control}
                  name='icon'
                  label='Icon'
                  valuePath='id'
                  labelPath='id'
                  options={getIconOptions()}
                  returnValueType='enum'
                  renderOption={(props: any, option: any) => (
                    <li {...props} key={option.name}>
                      <div className='flex items-center'>
                        {option.icon}
                        <div className='mx-8'>{option.name}</div>
                      </div>
                    </li>
                  )}
                />
              </Box>
              <Box className='text-center mt-15'>
                <Button
                  onClick={handleClose}
                  variant='contained'
                  sx={{ backgroundColor: RED }}
                  className='px-6 py-8 mr-10 w-50'
                >
                  {t('common:btn.cancel')}
                </Button>
                <LoadingButton
                  type='submit'
                  variant='contained'
                  className='px-10 py-8 w-60'
                  sx={{
                    backgroundColor: GREEN,
                  }}
                  loading={isSubmitting}
                >
                  {data?.id ? t('btn.update') : t('btn.add')}
                </LoadingButton>
              </Box>
            </DialogContent>
            <CoreDialog
              open={openPopper}
              handleClose={() => setOpenPoper(false)}
              maxWidth='xs'
              fullWidth
              dialogTitle={'Đa ngôn ngữ'}
              dialogContent={
                <Box className='p-15'>
                  {listLang?.map((v: any, index: number) => {
                    return (
                      <CoreInput
                        control={control}
                        name={`multiLang.${v.code.toLowerCase()}`}
                        label={v.name}
                        placeholder={'Nhập tên Menu'}
                        key={index}
                        className='mb-10'
                      />
                    )
                  })}
                </Box>
              }
            />
          </form>
        }
      />
    </>
  )
}

export default CreateUpdateMenuDialog
