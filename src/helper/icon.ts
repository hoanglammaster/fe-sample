import * as Icons from '@mui/icons-material'

export const listIconMUI = (props?: any) => {
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
        icon: (Icons as any)[`${v}`].type.render(props),
      }
    })
  return list
}
