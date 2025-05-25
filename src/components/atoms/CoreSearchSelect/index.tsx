import { Controller } from 'react-hook-form'
import SearchSelect, { SearchSelectProps } from '../SearchSelect'

interface Props extends Omit<SearchSelectProps, 'value' | 'onChange'> {
  name: string
  control: any
  rules?: any
}

const CoreSearchSelect = (props: Props) => {
  const { control, rules, name, ...rest } = props

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <SearchSelect
            {...rest}
            {...field}
            onBlur={field.onBlur}
            value={field.value ?? []}
            error={!!error}
            errorMessage={error?.message}
          />
        )
      }}
      rules={rules}
    />
  )
}

export default CoreSearchSelect
