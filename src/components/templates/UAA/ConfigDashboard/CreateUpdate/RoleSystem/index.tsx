import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreInput from '@/components/atoms/CoreInput'
import { Box } from '@mui/system'
import React from 'react'
import DynamicAction from '../../../UserManagement/AddNewUserManagement/components/DynamicAction'

interface Props {
  append: (val: any) => void
  remove: (val: any) => void
  total: number
  index: number
  control: any
  listMenu: any[]
  name: string
}

const RoleSystem = (props: Props) => {
  const { append, remove, total, index, control, listMenu, name } = props

  return (
    <Box className='flex justify-center'>
      <Box className='flex w-4/5 gap-18'>
        <CoreAutocomplete
          control={control}
          name={`${name}.menu`}
          label='Menu'
          className='w-4/5'
          required
          valuePath='id'
          labelPath='name'
          returnValueType='enum'
          options={listMenu}
        />
        <CoreInput
          control={control}
          name={`${name}.no`}
          label='Thứ tự'
          className='w-146'
          required
        />
        <Box>
          <DynamicAction
            totalItem={total}
            handleAddItem={() => append({ menu: '', no: '' })}
            handleRemoveItem={() => remove(index)}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default RoleSystem
