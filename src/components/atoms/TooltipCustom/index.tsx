import {
  ThemeProvider,
  Tooltip,
  TooltipProps,
  Typography,
  createTheme,
} from '@mui/material'
import { ReactNode } from 'react'
import _ from 'lodash'
import { BLACK, WHITE } from '@/components/layouts/WrapLayout/Theme/colors'

export const truncateText = (
  text: string | ReactNode,
  maxLength: number = 20
) => {
  if (typeof text !== 'string') {
    return text !== null ? text : '-'
  }
  return (
    <>
      {text?.length > maxLength ? (
        <TooltipCustom title={text} arrow>
          <Typography sx={{ fontSize: '14px' }} className='cursor-pointer'>
            {text?.slice(0, maxLength) + '...'}
          </Typography>
        </TooltipCustom>
      ) : (
        <Typography sx={{ fontSize: '14px' }}>
          {!text || text?.length === 0 ? '-' : text}
        </Typography>
      )}
    </>
  )
}

type Props = Omit<TooltipProps, 'children'> & {
  maxLength?: number
  children: ReactNode
  minWidth?: number
}

export const TooltipCustom = ({
  maxLength,
  children,
  minWidth,
  ...props
}: Props) => {
  const theme = createTheme({
    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: WHITE,
            color: BLACK,
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
            minWidth: `${minWidth}px`,
          },
        },
      },
    },
  })

  let childValue: any
  if (_.isString(children) && maxLength && children.length > maxLength) {
    childValue = children.slice(0, maxLength)
  } else childValue = children

  return (
    <ThemeProvider theme={theme}>
      <Tooltip {...props} placement='bottom-start'>
        <div>{childValue}</div>
      </Tooltip>
    </ThemeProvider>
  )
}
