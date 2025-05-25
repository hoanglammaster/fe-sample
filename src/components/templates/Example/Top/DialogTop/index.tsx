import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import { RadioGroupCustom } from '@/components/atoms/RadioGroupButton'

import { DialogCustom } from '@/components/organism/DialogCustom'
import { Controller } from 'react-hook-form'
import { useDialogTop } from './useDialogTop'
import { useState } from 'react'
import { useDialog } from '@/components/hooks/dialog/useDialog'

export const DialogTop = () => {
  const { hideDialog } = useDialog()

  const [values, handles] = useDialogTop()

  const { register, watch, setError, control, formState } = values

  const { onSubmit } = handles

  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <DialogCustom
      title='Màu sắc iPhone 11'
      formProps={{ onSubmit, 'aria-label': 'dialog top' }}
      className='p-20'
      onClose={hideDialog}
    >
      <div className='h-[500px] p-15'>
        <div className='flex justify-center'>
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
                  { value: 'radio1', label: 'Normal' },
                  { value: 'radio2', label: 'Màu sắc' },
                ]}
                type='secondary'
                defaultValue={value}
              />
            )}
          />
        </div>
        {watch('radio1') === 'radio1' && (
          <div className='w-full p-10'>
            {/* <TextFieldCustom
              label='Name'
              id='1'
              placeholder='test'
              error={!!formState.errors.name}
              helperText={formState.errors.name?.message}
              {...register('name')}
            /> */}
          </div>
        )}

        <div className='flex justify-center p-10'>
          <ButtonCustom
            theme='submit'
            onClick={() => {
              setIsOpen(true)
            }}
          >
            Open dialog
          </ButtonCustom>
        </div>

        <DialogCustom
          title='aaaa'
          open={isOpen}
          onClose={() => setIsOpen(false)}
          position='middle'
        >
          Nested Dialog
        </DialogCustom>
      </div>

      <div className='flex justify-center p-15'>
        <ButtonCustom type='submit' theme='submit'>
          Submit
        </ButtonCustom>
      </div>
    </DialogCustom>
  )
}
