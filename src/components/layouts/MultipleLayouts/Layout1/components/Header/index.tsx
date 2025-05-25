import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import { memo, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { isOpenMenu } from '../../recoil'
import FontSizeEdit from '../FontSizeEdit'
import LanguageButton from '../LanguageButton'
import { useLogin } from '@/components/templates/UAA/Login/hooks/useLogin'

const Header = ({ open }: { open?: boolean }) => {
  const { t } = useTranslation('common')
  const isOpen = useRecoilValue(isOpenMenu)
  const setOpenMenu = useSetRecoilState(isOpenMenu)
  const [anchorEl, setAnchorEl] = useState<any>(null)
  const openMenu = Boolean(anchorEl)
  const { logoutAccount } = useLogin()

  return (
    <Paper
      className='flex flex-row h-31 w-full bg-white items-center justify-between sticky top-0 rounded-none'
      style={{ zIndex: 100, borderRadius: 0 }}
      elevation={2}
    >
      <Box>
        {!open && (
          <IconButton onClick={() => setOpenMenu(!isOpen)}>
            <MenuOpenIcon fontSize='small' />
          </IconButton>
        )}
      </Box>
      <Box className='flex justify-end items-center mr-13 gap-6'>
        <LanguageButton />

        <IconButton>
          <FontSizeEdit />
        </IconButton>

        <IconButton>
          <Image
            src={require('@/assets/svg/iconSearch.svg')}
            alt=''
            height={15}
            width={15}
          />
        </IconButton>

        <IconButton>
          <Image
            src={require('@/assets/svg/iconSetting.svg')}
            alt=''
            height={15}
            width={15}
          />
        </IconButton>

        <div className='px-6'>
          <Typography>Nguyễn Văn Toàn</Typography>
          <Typography>Trưởng phòng</Typography>
        </div>
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
          <Avatar />
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={() => setAnchorEl(null)}
      >
        <Link href={'/user'}>
          <MenuItem>{t('account_info')}</MenuItem>
        </Link>
        <MenuItem
          onClick={() => {
            logoutAccount()
          }}
        >
          {t('logout')}adad
        </MenuItem>
      </Menu>
    </Paper>
  )
}

export default memo(Header)
