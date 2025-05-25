import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Box, ButtonBase, Menu, MenuItem, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import ReactCountryFlag from 'react-country-flag'
import { listLanguage } from './listLanguage'
import {
  LIST_LANGUAGE_CODE,
  getListLanguages,
} from '@/components/templates/UAA/Login/components/service'
import { getListLanguage } from '@/components/templates/UAA/ConfigRoleType/CreateUpdate/service'

const LanguageButton = (props: { isLoginPage?: boolean }) => {
  const { i18n } = useTranslation()
  const router = useRouter()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const [listLanguages, setListLanguages] = useState<any[]>([])

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const getLanguages = async () => {
    const res = await getListLanguages()
    const newLanguage = res?.data?.map((v) => {
      return {
        ...v,
        code:
          LIST_LANGUAGE_CODE.find(
            (v2) => v2.name.toLocaleLowerCase() === v.name.toLocaleLowerCase()
          )?.code?.toUpperCase() ?? v.code,
      }
    })
    setListLanguages(newLanguage)
  }

  // const getLanguages = async () => {
  //   try {
  //     const res = await getListLanguage({ used: true })
  //     const newListLanguage = res?.data?.data?.content.map((v) => ({
  //       ...v,
  //       code:
  //         LIST_LANGUAGE_CODE.find(
  //           (v2) => v2.name.toLocaleLowerCase() === v.name.toLocaleLowerCase()
  //         )?.code?.toUpperCase() ?? undefined,
  //     }))
  //     setListLanguages(newListLanguage)
  //   } catch (e) {}
  // }

  const currentLangue = listLanguages?.find(
    (v) => v.code.toLowerCase() === (i18n as any).language
  )

  const changeLocale = (locale: string) => {
    ;(i18n as any).changeLanguage(locale)
    if (LIST_LANGUAGE_CODE.some((v) => v.code === locale)) {
      router.push(router.asPath, router.asPath, { locale: locale })
    } else {
      router.push({ pathname: router.pathname })
    }
    handleClose()
  }

  useEffect(() => {
    getLanguages()
  }, [])

  if (currentLangue)
    return (
      <Box>
        <ButtonBase className='p-2' onClick={handleClick}>
          <ReactCountryFlag
            countryCode={currentLangue?.flag}
            svg
            style={{ fontSize: '20px' }}
            className='w-10 h-10 mr-4'
          />

          <Typography variant='body2'>{currentLangue?.name}</Typography>

          {open ? (
            <KeyboardArrowUpIcon fontSize='small' />
          ) : (
            <KeyboardArrowDownIcon fontSize='small' />
          )}
        </ButtonBase>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {listLanguages.map((item, index) => {
            return (
              <MenuItem
                onClick={() => changeLocale(item.code.toLowerCase())}
                key={index}
              >
                <ReactCountryFlag
                  countryCode={item?.flag}
                  svg
                  style={{ fontSize: '20px' }}
                  className='w-10 h-10 mr-4'
                />
                <Typography variant='body2' className='p-2'>
                  {item?.name}
                </Typography>
              </MenuItem>
            )
          })}
        </Menu>
      </Box>
    )
  return null
}

export default LanguageButton
