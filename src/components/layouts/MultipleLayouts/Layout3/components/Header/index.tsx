import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { memo, useState } from 'react'

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<any>(null)
  const openMenu = Boolean(anchorEl)
  return (
    <Paper
      className='flex flex-row h-40 w-full bg-[#F6F7FB] items-center justify-between sticky top-0 rounded-none shadow-none'
      style={{ zIndex: 100, borderRadius: 0 }}
      elevation={2}
    >
      <Box></Box>
      <Box className='flex justify-end items-center mr-13 gap-5'>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            cursor: 'pointer',
            border: '1px solid #DFE0EB',
            borderRadius: '30px',
            padding: '9px 20px',
          }}
          onClick={() => {}}
        >
          <Image
            alt=''
            src={require('@/assets/svg/ellipse.svg')}
            height={10}
            width={10}
          />
          <Typography variant='body1'>Active</Typography>
          <Image
            alt=''
            src={require('@/assets/svg/caretDown.svg')}
            height={16}
            width={16}
          />
        </Box>
        <IconButton>
          <DarkModeOutlinedIcon />
        </IconButton>
        <IconButton>
          <MailOutlineOutlinedIcon />
        </IconButton>
        <IconButton>
          <NotificationsNoneOutlinedIcon />
        </IconButton>
        <IconButton>
          <HeadsetMicOutlinedIcon />
        </IconButton>
        <IconButton>
          <HelpOutlineOutlinedIcon />
        </IconButton>
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
          <Avatar />
        </IconButton>
        <Typography variant='body1'>My space</Typography>
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
          <KeyboardArrowDownOutlinedIcon />
        </IconButton>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={() => setAnchorEl(null)}
      >
        <Link href={''}>
          <MenuItem>Thông tin cá nhân</MenuItem>
        </Link>
        <MenuItem
          onClick={() => {
            //console.log('Log')
          }}
        >
          Đăng xuất
        </MenuItem>
      </Menu>
    </Paper>
  )
}

export default memo(Header)
