import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import { Typography, styled } from '@mui/material'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import MuiDrawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import Toolbar from '@mui/material/Toolbar'
import Image from 'next/image'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { isOpenSidebar } from '../../recoil'
import Menu from '../Menu'

const drawerWidth: number = 300

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
  const isOpen = useRecoilValue(isOpenSidebar)
  const setOpenMenu = useSetRecoilState(isOpenSidebar)

  const toggleDrawer = () => {
    setOpenMenu(!isOpen)
  }
  return (
    <div>
      <Box
        style={{
          boxShadow: '5px 0px 8px rgba(0, 0, 0, 0.08)',
          transform: 'scale(1)',
          height: '100vh',
          overflow: 'auto',
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
                  px: [1],
                  height: 80,
                }}
              >
                <Box
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8,
                    cursor: 'pointer',
                    padding: '25px 18px',
                  }}
                  onClick={() => {}}
                >
                  <Image
                    alt=''
                    src={require('@/assets/svg/administrator.svg')}
                    height={24}
                    width={24}
                  />
                  <Typography variant='body1'>My Admin</Typography>
                  <Image
                    alt=''
                    src={require('@/assets/svg/caretDown.svg')}
                    height={16}
                    width={16}
                  />
                </Box>
                <IconButton onClick={toggleDrawer}>
                  <MenuOpenIcon />
                </IconButton>
              </Toolbar>
            ) : (
              <div className='min-h-[60px] flex justify-center items-center pl-5'>
                <IconButton
                  edge='start'
                  aria-label='open drawer'
                  onClick={toggleDrawer}
                >
                  <MenuOpenIcon />
                </IconButton>
              </div>
            )}

            <Divider style={{ margin: isOpen ? '0 20px' : '0' }} />
            <List component='nav'>
              <Menu />
            </List>
          </Drawer>
        </Box>
      </Box>
    </div>
  )
}
