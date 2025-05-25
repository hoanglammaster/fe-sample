import {
  Box,
  Divider,
  IconButton,
  ListItemButton,
  Paper,
  Toolbar,
  Typography,
  styled,
  useMediaQuery
} from '@mui/material'
import { useRecoilValue, useSetRecoilState } from 'recoil'
// import ApodioIcon from '../../../../../assets/svg/apodio_logo.svg'
// import ArrowIcon from '../../../../../assets/svg/arrowAround.svg'
import { useSwitchSystem } from '@/components/hooks/switchSystem/useSwitchSystem'
import { WHITE } from '@/components/layouts/WrapLayout/Theme/colors'
import MuiDrawer from '@mui/material/Drawer'
import Image from 'next/image'
import React from 'react'
import { isOpenLeftMenu } from '../../recoil'
import useMenu from './useMenu'

const drawerWidth: number = 370

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    borderRight: 'none',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}))

interface Props {}
const LeftMenu: React.FC<Props> = (props) => {
  const matches = useMediaQuery('(min-width:640px)')
  const isOpen = useRecoilValue(isOpenLeftMenu)
  const setOpenMenu = useSetRecoilState(isOpenLeftMenu)
  const { renderMenuRoutes } = useMenu()

  const { handleOpenDialog, renderDialogChoseBizzApp } = useSwitchSystem()

  const toggleDrawer = () => {
    setOpenMenu(!isOpen)
  }

  const renderLeftMenu = () => {
    return (
      <Paper
        style={{
          height: '100vh',
          boxShadow: '5px 0px 8px rgba(0, 0, 0, 0.08)',
          backgroundColor: WHITE,
          transform: 'scale(1)',
          zIndex: 100,
          width: '100%',
          overflow: 'hidden',
        }}
        elevation={4}
      >
        {isOpen ? (
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '30px 20px 20px 0',
              height: 80,
            }}
          >
            <Box
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                cursor: 'pointer',
              }}
              onClick={() => {}}
            >
              <Image src={require('@/assets/svg/logoVT.svg')} alt='' />
            </Box>
            <IconButton onClick={toggleDrawer}>
              <Image
                src={require('@/assets/svg/menuOpen.svg')}
                alt=''
                width={18}
                height={18}
              />
            </IconButton>
          </Toolbar>
        ) : (
          <div className='min-h-[80px] flex flex-col justify-center items-center'>
            <IconButton
              edge='start'
              aria-label='open drawer'
              onClick={toggleDrawer}
            >
              <Image
                src={require('@/assets/svg/menuOpen.svg')}
                alt=''
                width={18}
                height={18}
              />
            </IconButton>
          </div>
        )}

        <Divider />
        {isOpen ? (
          <ListItemButton className='px-10 py-7 flex justify-between'>
            <div>
              <Typography variant='h4' className='text-base font-bold'>
                UAA
              </Typography>
            </div>
            <IconButton onClick={handleOpenDialog}>
              <Image
                src={require('@/assets/svg/arrowsClockwise.svg')}
                alt=''
                width={18}
                height={18}
              />
            </IconButton>
          </ListItemButton>
        ) : (
          <ListItemButton className='flex justify-center'>
            <Image
              src={require('@/assets/svg/arrowsClockwise.svg')}
              alt=''
              width={18}
              height={18}
            />
          </ListItemButton>
        )}
        <Divider className='mb-8' />
        <Box
          className='w-full px-10 pb-10'
          sx={{ overflow: 'auto', maxHeight: 'calc( 100vh - 120px )' }}
        >
          {renderMenuRoutes()}
        </Box>
      </Paper>
    )
  }

  return (
    <div>
      <Box
        style={{
          boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.08)',
          transform: 'scale(1)',
          height: '100vh',
          overflow: 'auto',
          borderRadius: '0 20px 0 0',
          padding: 0,
        }}
      >
        <Box position='sticky' top='0px' zIndex={1}>
          <Drawer variant='permanent' open={isOpen}>
            {renderLeftMenu()}
          </Drawer>
        </Box>
      </Box>
      {renderDialogChoseBizzApp()}
    </div>
  )
}

export default LeftMenu
