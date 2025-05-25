import {
  Box,
  Button,
  ButtonProps,
  Collapse,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { MenuPathProps } from '@/routes'
import { useRecoilValue } from 'recoil'
import { isOpenLeftMenu } from '../../recoil'
import { RED, WHITE } from '@/components/layouts/WrapLayout/Theme/colors'
import { useErrorBoundary } from '@/config/zustand'

interface Props {
  isChecked?: boolean
  item?: any
  indexNumber: number
  isSystemAdmin?: boolean
  listPermission?: string[]
  setSubMenu: (val: any) => void
  handleBackToMenu: () => void
}

interface ButtonMenuProps {
  isChecked?: boolean
  onClick?: () => void
  isGroupMenuChecked?: boolean
  item: MenuPathProps | any
  open?: boolean
}

export const ButtonMenu = (props: ButtonMenuProps) => {
  const { item, isChecked, onClick, isGroupMenuChecked, open } = props
  const theme = useTheme()
  const isOpenMenu = useRecoilValue(isOpenLeftMenu)
  if (!isOpenMenu) {
    return (
      <IconButton
        sx={{ backgroundColor: isGroupMenuChecked || isChecked ? RED : WHITE }}
        className='mb-10'
        onClick={onClick}
      >
        {item?.iconRender ? item?.iconRender : item?.icon}
      </IconButton>
    )
  }
  return (
    <Button
      color='primary'
      style={{
        padding: 0,
        height: 50,
        width: '100%',
        borderRadius: '16px 12px 12px 0px',
        border: 0,
        textTransform: 'none',
        backgroundColor: isChecked ? theme.palette.primary.main : undefined,
      }}
      onClick={onClick}
      variant={isGroupMenuChecked ? 'contained' : 'text'}
    >
      <Box
        height={40}
        alignItems='center'
        justifyContent='start'
        className={isOpenMenu ? 'px-6 py-7' : 'p-3'}
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
          <Box className='mr-6 flex items-center justify-center'>
            {item?.iconRender ? item?.iconRender : item?.icon}
          </Box>
          <Typography
            variant={isGroupMenuChecked || isChecked ? 'subtitle2' : 'body2'}
            textAlign='initial'
            style={{
              color: isGroupMenuChecked || isChecked ? 'white' : 'black',
            }}
          >
            {item?.name}
          </Typography>
        </Box>
        {item.type?.toUpperCase() !== 'ITEM' && (
          <KeyboardArrowRightIcon
            fontSize='small'
            style={{ transform: open ? 'rotate(90deg)' : undefined }}
          />
        )}
      </Box>
    </Button>
  )
}

const MenuGroup = (props: Props) => {
  const {
    indexNumber,
    isChecked,
    isSystemAdmin,
    item,
    listPermission,
    setSubMenu,
    handleBackToMenu,
  } = props
  const { t } = useTranslation('common')
  const [open, setOpen] = useState(false)
  const isOpenMenu = useRecoilValue(isOpenLeftMenu)

  const router = useRouter()
  const currentPath = router.asPath

  const groupMenuChecked = (item: any) => {
    return item?.children?.some(
      (itemMenu: any) =>
        currentPath.startsWith(itemMenu?.path) || groupMenuChecked(itemMenu)
    )
  }

  const { isError, setIsError } = useErrorBoundary()

  useEffect(() => {
    if (!isOpenMenu) {
      setOpen(false)
    }
  }, [isOpenMenu])

  function renderMenuItem(menu: any) {
    return (
      <>
        {menu?.map((item: any, index: number) => {
          const isChecked = router?.pathname.startsWith(item.path)
          //   const isHavePermision =
          //     listPermission?.length > 0
          //       ? listPermission.some((v) => v.id === item.apiId)
          //       : true
          // if (isHavePermision || isSystemAdmin) {
          return (
            <MenuGroup
              item={item}
              isChecked={isChecked}
              key={index}
              indexNumber={indexNumber + 1}
              isSystemAdmin={isSystemAdmin}
              listPermission={listPermission}
              setSubMenu={setSubMenu}
              handleBackToMenu={handleBackToMenu}
            />
          )
          // }
          // return null;
        })}
      </>
    )
  }
  const isGroupMenuChecked = groupMenuChecked(item)

  if (item.type?.toUpperCase() === 'ITEM') {
    return (
      <Box onClick={() => !!isError && setIsError(false)}>
        <Link
          href={item?.route ?? item?.path ?? ''}
          style={{
            textDecoration: 'none',
            width: '100%',
          }}
        >
          <ButtonMenu open={open} isChecked={isChecked} item={item} />
        </Link>
      </Box>
    )
  }
  if (item.type?.toUpperCase() === 'GROUP') {
    return (
      <ButtonMenu
        open={open}
        isChecked={isChecked}
        item={item}
        isGroupMenuChecked={isGroupMenuChecked}
        onClick={() => setSubMenu(item)}
      />
    )
  }
  return (
    <Box>
      <ButtonMenu
        open={open}
        isChecked={isChecked}
        item={item}
        isGroupMenuChecked={isGroupMenuChecked}
        onClick={() => setOpen(!open)}
      />
      {item.children && (
        <Collapse in={open}>
          <Box style={{ paddingLeft: indexNumber >= 0 ? 10 : 0 }}>
            {renderMenuItem(item.children)}
          </Box>
        </Collapse>
      )}
    </Box>
  )
}

export default MenuGroup
