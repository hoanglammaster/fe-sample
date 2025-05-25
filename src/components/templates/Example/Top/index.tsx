import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import { CheckboxCustom } from '@/components/atoms/CheckboxCustom'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreDateRangePicker from '@/components/atoms/CoreDateRangePicker'
import CoreInput from '@/components/atoms/CoreInput'
import { DatePickerCustom } from '@/components/atoms/DatePickerCustom'
import { RadioGroupCustom } from '@/components/atoms/RadioGroupButton'
import { WarningText } from '@/components/atoms/WarningText'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { Action } from '@/components/molecules/Action'
import { FieldClusterItem } from '@/components/molecules/FormCluster/type'
import { UploadFileCustom } from '@/components/molecules/UploadFileCustom'
import { ColumnProps, CustomTable } from '@/components/organism/TableCustom'
import { Box, Switch, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { ChangeEvent, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { DialogTop } from './DialogTop'
import { useTop } from './useTop'
import FormCluster from '@/components/molecules/FormCluster'
import CoreSearchSelect from '@/components/atoms/CoreSearchSelect'

const { EditText } = {
  EditText: dynamic(
    () =>
      import('@/components/molecules/EditText').then(
        (component) => component.EditText
      ),
    { ssr: false, loading: () => <p>Loading editor.....</p> }
  ),
}

export const Top = () => {
  const { t } = useTranslation('warehouse/warehouseCommon')
  const router = useRouter()
  const { showDialog } = useDialog()

  const newForm = useForm({
    defaultValues: { systemCode: 'abcd' },
    mode: 'onTouched',
  })

  const listFormItem: FieldClusterItem[] = [
    {
      fieldType: 'input',
      name: 'systemCode',
      label: 'System Code',
      required: true,
      colSpan: 1,
      fieldProps: { isView: true },
    },
    {
      fieldType: 'select',
      name: 'systemName',
      label: 'System Name',
      required: true,
      colSpan: 1,

      options: [
        { id: 1, name: 'abc' },
        { id: 1, name: 'abc' },
        { id: 1, name: 'abc' },
      ],
      fieldProps: {
        valuePath: 'id',
        labelPath: 'name',
      },
    },
    { fieldType: 'checkbox', name: 'isChecked', label: 'Pickme' },
    {
      fieldType: 'date',
      name: 'dateName',
      label: 'System Name',
      required: true,
      colSpan: 2,
      className: 'w-1/2 pr-5',
    },
    {
      fieldType: 'dateRange',
      startName: 'startDate',
      endName: 'endDate',
      label: 'System Name',
      required: true,
      colSpan: 1,
    },
    {
      fieldType: 'input',
      name: 'description',
      label: 'Description',
      colSpan: 1,
      fieldProps: {
        inputType: 'multi',
        rows: 5,
      },
    },
  ]

  const [values, handles] = useTop()

  const { register, watch, setError, control, formState, trigger } = values

  const { onSubmit } = handles

  const [pagination, setPagination] = useState<any>({ size: 10, page: 1 })

  const columns = useMemo(
    () =>
      [
        {
          header: 'Tên cột đầu',
          fieldName: 'calories',
        },
        {
          header: <Typography variant='h5'>Đây Là cột thứ 2</Typography>,
          fieldName: 'fat',
        },
        {
          header: <Typography variant='body2'>Đây Là cột thứ 3</Typography>,
          fieldName: 'calories',
          render: (val: any) => (
            <Typography variant='body2'>{val?.protein}</Typography>
          ),
          styleCell: { align: 'center', width: '100px' },
        },
        {
          header: '',
          fieldName: 'action',
        },
      ] as ColumnProps[],
    []
  )

  const rows = [
    {
      calories: 159,
      fat: 6.0,
      carbs: 24,
      protein: 4.0,
      action: <Action actionList={['delete', 'watch', 'edit']}></Action>,
    },
    {
      calories: 237,
      fat: 9.0,
      carbs: 37,
      protein: 4.3,
    },
    { calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
    { calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
    { calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
  ]

  const [test, setTest] = useState([])

  return (
    <Box>
      <form>
        <FormCluster
          arrayFieldItem={listFormItem}
          methodForm={newForm}
          colSpan={2}
        />
      </form>
      <CoreSearchSelect
        name='test'
        control={control}
        options={[
          { id: 1, name: 'HâyHâyHâyHâyHâyHâyHâyHâyHâyHây' },
          { id: 2, name: 'Hâ1yHâ1yHâ1yHâ1yHâ1yHâ1yHâ1yHâ1yHâ1y' },
          { id: 3, name: 'Hây21Hây21Hây21Hây21Hây21Hây21Hây21Hây21' },
          { id: 4, name: 'HâyHâyHâyHâyHâyHâyHâyHâyHâyHây' },
          { id: 5, name: 'Hâ1yHâ1yHâ1yHâ1yHâ1yHâ1yHâ1yHâ1yHâ21y' },
          { id: 6, name: 'Hây21Hây21Hây21Hây21Hây21Hây21Hây21Hây21' },
          { id: 7, name: 'HâyHâyHâyHâyHâyHâyHâyHâyHâyHây' },
          { id: 8, name: 'Hâ1yHâ1yHâ1yHâ1yHâ1yHâ1yHâ1yHâ1yHâ21y' },
          { id: 9, name: 'Hây21Hây21Hây21Hây21Hây21Hây21Hây21Hây21' },
        ]}
        rules={{
          required: 'Đây là bắt buộc',
        }}
      />
      <form className='block bg-[#f4f4f4]'>
        <div className='flex flex-col items-center gap-15 p-25'>
          <WarningText>Warning Text Common</WarningText>
          <CoreDateRangePicker
            control={control}
            startName='startDate'
            endName='endDate'
            disabledPast
            required
          />
          <ButtonCustom
            theme='submit'
            width={120}
            fontSize={14}
            onClick={() => {
              showDialog(<DialogTop />)
            }}
          >
            open dialog
          </ButtonCustom>

          <ButtonCustom theme='cancel' width={120} fontSize={14}>
            cancle
          </ButtonCustom>

          <ButtonCustom theme='reset' width={120} fontSize={14}>
            reset
          </ButtonCustom>

          <ButtonCustom theme='reset' width={120} fontSize={14}>
            add new
          </ButtonCustom>

          <DatePickerCustom
            control={control}
            name='date'
            title='Date picker'
            placeholder='DD/MM/YYYY'
          />

          <div className='w-full flex gap-8'>
            <div className='w-1/2'>
              <CoreInput control={control} name='name' label='Nhập name' />
            </div>
            <div className='w-1/2'>
              <CoreAutocomplete
                control={control}
                name='option'
                label='Chọn option'
                placeholder='Chọn font'
                options={[
                  { label: 'option1', value: 'option1' },
                  { label: 'option2', value: 'option2' },
                ]}
                required
              />
            </div>
          </div>

          {/* <TextFieldUploadCustom
          control={control}
          name='imageUrl'
          label='Logo'
          placeholder='Chưa có file nào được chọn'
        /> */}

          {/* <TextFieldCustom
          label='Name'
          id='1'
          placeholder='test'
          error={!!formState.errors.name}
          helperText={formState.errors.name?.message}
          required
          {...register('name', {
            setValueAs: (val) => val.trim(),
          })}
        /> */}

          {/* <Controller
          control={control}
          name='option'
          render={({ field: { onChange, ...props } }) => (
            <SelectBoxCustom
              required
              placeholder='Option'
              options={[
                { label: 'option1', value: 'option1' },
                { label: 'option2', value: 'option2' },
              ]}
              title='SelectBox'
              error={!!formState.errors.option}
              helperText={formState.errors.option?.message}
              onChange={onChange}
              {...props}
            />
          )}
        /> */}

          <div className='m-auto'>
            <CheckboxCustom
              formProps={{ label: 'Label', name: 'name1' }}
              checkboxProps={{
                ...register('isActive'),
                checked: watch('isActive'),
              }}
            />
          </div>

          <div className='m-auto'>
            <Controller
              name='isStatus'
              control={control}
              render={({ field: { value, onChange, ...props } }) => (
                <Switch
                  checked={value}
                  onChange={(_, data) => onChange(data)}
                  color='primary'
                  {...props}
                />
              )}
            />
          </div>

          <div className='mt-10'>
            <UploadFileCustom
              handleFileUpload={function (
                event: ChangeEvent<HTMLInputElement>
              ): void {
                throw new Error('Function not implemented.')
              }}
            />
          </div>

          {/* <div className='mt-10'>
            <Controller
              name='radio1'
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <RadioGroupCustom
                  value={value}
                  onBlur={onBlur}
                  onChange={(e) => {
                    onChange(e)
                  }}
                  options={[
                    { value: 'radio1', label: 'label1' },
                    { value: 'radio2', label: 'label2' },
                    {
                      value: 'radio3',
                      label: 'label3',
                    },
                  ]}
                  type='primary'
                  defaultValue={value}
                />
              )}
            />
          </div> */}

          <Controller
            name='radio1'
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <RadioGroupCustom
                value={value}
                onBlur={onBlur}
                onChange={(e) => {
                  onChange(e)
                }}
                options={[
                  { value: true, label: 'label1' },
                  { value: false, label: 'label2' },
                ]}
                type='secondary'
                defaultValue={value}
              />
            )}
          />

          <Controller
            control={control}
            name='textEditor'
            render={({ field: { onChange, value } }) => (
              <EditText
                disabled={false}
                setEditorText={onChange}
                editorText={value}
                error={formState.errors.textEditor?.message}
              />
            )}
          />
        </div>

        <div className='p-20'>
          <CustomTable
            columns={columns}
            data={rows}
            onChangePageSize={setPagination}
            totalPages={10}
            {...pagination}
          />
        </div>

        <ButtonCustom onClick={onSubmit} theme={'submit'}>
          Submit
        </ButtonCustom>
      </form>
    </Box>
  )
}
