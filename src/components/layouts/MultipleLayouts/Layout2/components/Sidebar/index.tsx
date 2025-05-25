import { ListItemButton, Typography, styled } from '@mui/material'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import MuiDrawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import Toolbar from '@mui/material/Toolbar'
import Image from 'next/image'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { isOpenLeftMenu } from '../../recoil'
import Menu from '../Menu'

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

export const Sidebar = () => {
  const isOpen = useRecoilValue(isOpenLeftMenu)
  const setOpenMenu = useSetRecoilState(isOpenLeftMenu)

  const toggleDrawer = () => {
    setOpenMenu(!isOpen)
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
                  <Image src={require('@/assets/svg/menuOpen.svg')} alt='' />
                </IconButton>
              </Toolbar>
            ) : (
              <div className='min-h-[80px] flex flex-col justify-center items-center'>
                <IconButton
                  edge='start'
                  aria-label='open drawer'
                  onClick={toggleDrawer}
                >
                  <Image src={require('@/assets/svg/menuOpen.svg')} alt='' />
                </IconButton>
              </div>
            )}

            <Divider />
            {isOpen ? (
              <ListItemButton className='px-10 py-7 flex justify-between'>
                <div>
                  <Typography variant='h4' className='text-base font-bold'>
                    Merchant
                  </Typography>
                </div>
                <Image
                  src={require('@/assets/svg/arrowsClockwise.svg')}
                  alt=''
                />
              </ListItemButton>
            ) : (
              <ListItemButton className='px-10 py-7 flex justify-center'>
                <Image
                  src={require('@/assets/svg/arrowsClockwise.svg')}
                  alt=''
                />
              </ListItemButton>
            )}
            <Divider />
            <List component='nav' className='py-10'>
              <Menu isOpen={isOpen} />
            </List>
          </Drawer>
        </Box>
      </Box>
    </div>
  )
}
