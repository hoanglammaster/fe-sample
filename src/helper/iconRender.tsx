import { BLACK, RED, WHITE } from '@/components/layouts/WrapLayout/Theme/colors'
import * as Icons from '@mui/icons-material'
import { IconProps } from '@mui/material'

export const listIconMUIRender = (props?: any) => {
  const list = Object.keys(Icons)
    .filter(
      (item) =>
        !['Outlined', 'Rounded', 'TwoTone', 'Sharp'].some((v) =>
          item.includes(v)
        )
    )
    .filter((item, index) => index % 2 === 0)
    .map((v) => {
      return {
        id: v,
        name: v,
        icon: (checked?: boolean) => {
          const Icon = v && Icons[`${v}`]
          return (
            <Icon
              style={{ color: checked ? WHITE : BLACK }}
              {...props}
              baseClassName={v}
            >
              {v}
            </Icon>
          )
        },
      }
    })
  return list
}
