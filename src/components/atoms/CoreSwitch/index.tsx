import { StyledComponent } from '@emotion/styled/types/base'
import {
  Box,
  FormControl,
  FormControlLabel,
  styled,
  Switch,
  Typography,
  SwitchProps,
} from '@mui/material'
import PropTypes from 'prop-types'
import React, { ReactElement } from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { SwitchCustom } from '../SwitchCustom'

// import PropTypes from 'prop-types'

interface Props extends SwitchProps {
  control: any
  className?: string
  name: string
  label?: string | ReactElement
  helpText?: string
}
const CoreSwitchStatus = (props: Props) => {
  const { className, control, helpText, name, label, ...restProps } = props
  const { t } = useTranslation('common')
  return (
    <div className={className}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => {
          return (
            <FormControl component='fieldset'>
              <Box>
                <Box className='flex items-center'>
                  <SwitchCustom
                    checked={value}
                    onChange={onChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                    {...restProps}
                  />
                  <Typography>{label ?? t('status')}</Typography>
                </Box>
                {helpText && (
                  <Typography className='italic text-[#747475] text-[12px] ml-28'>
                    {helpText}
                  </Typography>
                )}
              </Box>
            </FormControl>
          )
        }}
      />
    </div>
  )
}

export default React.memo(CoreSwitchStatus)
