import { TextFieldProps, Typography } from '@mui/material'
import { forwardRef } from 'react'
import { Control, Controller } from 'react-hook-form'

export const ChooseColor = forwardRef<
  HTMLDivElement,
  TextFieldProps & { name: string; control: Control<any>; trigger?: any }
>(function TextboxBase(
  { disabled, control, name, trigger, onChange, ...props },
  ref
) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <label
          htmlFor={name}
          className='w-64 h-19 flex rounded-[4px] bg-white cursor-pointer'
          style={{ border: '1px solid #DFE0EB', opacity: disabled ? 0.5 : 1 }}
        >
          <div
            ref={ref}
            style={{
              width: '38px',
              borderRadius: '3px 0px 0px 3px',
            }}
          >
            <input
              name={name}
              type='color'
              className='choose_color'
              value={field.value}
              id={name}
              disabled={disabled}
              onChange={(e) => {
                field.onChange(e.target.value)
                onChange && onChange(e)
                trigger && trigger(name)
              }}
            />
          </div>
          <div className='flex justify-center items-center pl-3'>
            <Typography variant='body1'>Chọn màu</Typography>
          </div>
        </label>
      )}
    />
  )
})

export default ChooseColor
