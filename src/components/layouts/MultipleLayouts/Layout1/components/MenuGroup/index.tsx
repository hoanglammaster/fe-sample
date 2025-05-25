import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { Box, Button, Collapse, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import MenuItem from '../MenuItem'

interface Props {
  isChecked?: boolean
  item?: any
  indexNumber: number
  isSystemAdmin?: boolean
  listPermission?: string[]
  setSubMenu: (val: any) => void
  handleBackToMenu: () => void
}

const MenuGroup = (props: Props) => {
  const { indexNumber, isChecked, item, setSubMenu, handleBackToMenu } = props
  const { t } = useTranslation('common')
  const [open, setOpen] = useState(false)

  const router = useRouter()
  const currentPath = router.asPath

  const groupMenuChecked = (item: any) => {
    return item?.children?.some(
      (itemMenu: any) =>
        itemMenu?.path === currentPath || groupMenuChecked(itemMenu)
    )
  }

  const isGroupMenuChecked = groupMenuChecked(item)

  return (
    <Box className='px-5'>
      <Button
        color='primary'
        style={{
          color: isChecked ? 'white' : 'black',
          padding: 0,
          height: 40,
          width: '100%',
          borderRadius: '0px 20px 20px 0px',
          backgroundColor: isGroupMenuChecked ? '#e0e0e0' : undefined,
        }}
        onClick={() => setOpen(!open)}
        variant={isChecked ? 'contained' : 'text'}
        disableElevation
      >
        <Box
          height={40}
          alignItems='center'
          justifyContent='start'
          paddingRight={'12px'}
          paddingLeft={'10px'}
          style={{
            display: 'flex',
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-between',
          }}
        >
          <Box
            style={{
              display: 'flex',
              flexDirection: 'row',
              flex: 1,
              alignItems: 'center',
            }}
          >
            <Typography variant='body2' textAlign='initial'>
              {t(item?.name)}
            </Typography>
          </Box>
          <KeyboardArrowRightIcon
            fontSize='small'
            style={{ transform: open ? 'rotate(90deg)' : undefined }}
          />
        </Box>
      </Button>

      {item.children && (
        <Collapse in={open}>
          <Box style={{ paddingLeft: indexNumber >= 0 ? 10 : 0 }}>
            {item.children.map((item: any, index: number) => {
              return (
                <MenuItem
                  key={index}
                  name={item.name}
                  path={item.path}
                  isChecked={false}
                />
              )
            })}
          </Box>
        </Collapse>
      )}
    </Box>
  )
}

export default MenuGroup
