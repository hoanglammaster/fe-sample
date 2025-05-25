import { FormControlAutoCompleteProps } from '@/components/atoms/CoreAutocomplete'
import { CoreCheckboxProps } from '@/components/atomsUpdate/CoreCheckbox'
import { CoreDatePickerCustomProps } from '@/components/atomsUpdate/CoreDatePickerCustom'
import { CoreDateRangePickerCustomProps } from '@/components/atomsUpdate/CoreDateRangePickerCustom'
import { CoreInputProps } from '@/components/atomsUpdate/CoreInput'
import { FieldValues, RegisterOptions, UseFormReturn } from 'react-hook-form'

export interface InputFieldProps
  extends Omit<
    CoreInputProps,
    'name' | 'control' | 'rules' | 'required' | 'label' | 'onChangeValue'
  > {}

export interface SelectFieldProps<
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
> extends Omit<
    FormControlAutoCompleteProps<T, Multiple, DisableClearable, FreeSolo>,
    | 'name'
    | 'control'
    | 'rules'
    | 'required'
    | 'label'
    | 'onChangeValue'
    | 'options'
  > {}

export interface DateFieldProps
  extends Omit<
    CoreDatePickerCustomProps,
    'name' | 'control' | 'rules' | 'required' | 'label'
  > {}

export interface DateRangeFieldProps
  extends Omit<
    CoreDateRangePickerCustomProps,
    | 'startName'
    | 'endName'
    | 'control'
    | 'endRules'
    | 'startRules'
    | 'required'
    | 'label'
  > {}

export interface CheckboxFieldProps
  extends Omit<
    CoreCheckboxProps,
    'name' | 'control' | 'onChangeValue' | 'label'
  > {}

export interface InputClusterProps {
  className?: string
  label?: string
  name: string
  rules?: RegisterOptions<FieldValues, any>
  required?: boolean
  fieldType: 'input'
  fieldProps?: InputFieldProps
  colSpan?: number
  onChangeValue?: (val: any) => void
}

export interface SelectClusterProps<
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
> {
  className?: string
  label?: string
  name: string
  rules?: RegisterOptions<FieldValues, any>
  required?: boolean
  fieldType: 'select'
  fieldProps?: SelectFieldProps<T, Multiple, DisableClearable, FreeSolo>
  colSpan?: number
  options: any[]
  onChangeValue?: (val: any) => void
}

export interface DateClusterProps {
  className?: string
  label?: string
  name: string
  rules?: RegisterOptions<FieldValues, any>
  required?: boolean
  fieldType: 'date'
  fieldProps?: DateFieldProps
  colSpan?: number
}

export interface DateRangeClusterProps {
  className?: string
  label?: string
  startName: string
  endName: string
  startRules?: RegisterOptions<FieldValues, any>
  endRules?: RegisterOptions<FieldValues, any>
  required?: boolean
  fieldType: 'dateRange'
  fieldProps?: DateFieldProps
  colSpan?: number
}

export interface CheckboxClusterProps {
  name: string
  label?: string
  onChangeValue?: (val: boolean) => void
  fieldProps?: CheckboxFieldProps
  fieldType: 'checkbox'
  colSpan?: number
}

export type FieldClusterItem<T = any> =
  | InputClusterProps
  | SelectClusterProps<T>
  | DateClusterProps
  | DateRangeClusterProps
  | CheckboxClusterProps

export interface FormClusterProps {
  arrayFieldItem: FieldClusterItem[]
  methodForm: UseFormReturn<any, object>
  colSpan?: number
  className?: string
}
