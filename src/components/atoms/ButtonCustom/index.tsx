import { useAppSelector } from '@/redux/hook'
import { LoadingButton, LoadingButtonProps } from '@mui/lab'
import _ from 'lodash'
import { forwardRef } from 'react'

type Props = {
  fontSize?: number
  fontWeight?: number
  textTransform?: string
  height?: number
  width?: number
  theme: 'submit' | 'cancel' | 'reset' | 'draft'
  radius?: number
} & LoadingButtonProps

export const ButtonCustom = forwardRef<HTMLButtonElement, Props>(
  function CheckboxCustomBase(
    {
      height = 48,
      width = 150,
      fontSize = 18,
      fontWeight = 500,
      textTransform = 'none',
      theme,
      sx,
      variant,
      radius = 24,
      ...props
    },
    ref
  ) {
    const buttonConfig = useAppSelector((state) => state.buttonData)

    const { submitButton, rejectButton, resetButton, draftButton } =
      buttonConfig

    const color = () => {
      if (theme === 'submit') return submitButton.textColor
      else if (theme === 'draft') return draftButton.textColor
      else if (theme === 'cancel') return rejectButton.textColor
      else if (theme === 'reset') return resetButton.textColor
    }

    const hoverColor = () => {
      if (theme === 'submit') return submitButton.hoverTextColor
      else if (theme === 'draft') return draftButton.hoverTextColor
      else if (theme === 'cancel') return rejectButton.hoverTextColor
      else if (theme === 'reset') return resetButton.hoverTextColor
    }

    const backgroundColor = () => {
      if (theme === 'submit') return submitButton.backgroundColor
      else if (theme === 'draft') return draftButton.backgroundColor
      else if (theme === 'cancel') return rejectButton.backgroundColor
      else if (theme === 'reset') return resetButton.backgroundColor
    }

    const backgroundHoverColor = () => {
      if (theme === 'submit') return submitButton.backgroundHoverColor
      else if (theme === 'draft') return draftButton.backgroundHoverColor
      else if (theme === 'cancel') return rejectButton.backgroundHoverColor
      else if (theme === 'reset') return resetButton.backgroundHoverColor
    }

    const borderColor = () => {
      if (theme === 'submit') return submitButton.borderColor
      else if (theme === 'draft') return draftButton.borderColor
      else if (theme === 'cancel') return rejectButton.borderColor
      else if (theme === 'reset') return resetButton.borderColor
    }

    const borderHoverColor = () => {
      if (theme === 'submit') return submitButton.borderHoverColor
      else if (theme === 'draft') return draftButton.borderHoverColor
      else if (theme === 'cancel') return rejectButton.borderHoverColor
      else if (theme === 'reset') return resetButton.borderHoverColor
    }

    return (
      <LoadingButton
        ref={ref}
        variant={
          variant ? variant : theme === 'submit' ? 'contained' : 'outlined'
        }
        sx={_.merge(
          {
            ...{
              transition: 'all 0.2s linear',
              lineHeight: '24px',
              padding: '12px 10px',
              backgroundColor: backgroundColor(),
              color: color(),
              border: `1px solid ${borderColor()}`,
              '&:hover': {
                color: hoverColor(),
                backgroundColor: backgroundHoverColor(),
                border: `1px solid ${borderHoverColor()}`,
              },
              fontWeight,
              fontSize,
              height,
              width,
              textTransform,
              borderRadius: radius,
            },
          },
          sx
        )}
        {...props}
      />
    )
  }
)
