import { Switch, SwitchProps } from '@mui/material'
import { forwardRef } from 'react'

export const SwitchCustom = forwardRef<HTMLButtonElement, SwitchProps>(
  function SwitchBase({  ...props }, ref) {
    return <Switch ref={ref} {...props}  />
  }
)
