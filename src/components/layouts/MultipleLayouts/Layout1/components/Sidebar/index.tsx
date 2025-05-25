import {
  Box,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  Typography,
  useMediaQuery,
} from '@mui/material'
import Image from 'next/image'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { isOpenMenu } from '../../recoil'
import Menu from '../Menu'

const drawerWidth: number = 300

const Sidebar = () => {
  const matches = useMediaQuery('(min-width:640px)')
  const isOpen = useRecoilValue(isOpenMenu)
  const setOpenMenu = useSetRecoilState(isOpenMenu)

  const renderLeftMenu = () => {
    return (
      <Box
        className='flex flex-col overflow-auto relative bg-[#F6F7FB]'
        style={{
          width: drawerWidth,
          zIndex: 101,
          height: '100vh',
          overflow: 'auto',
          boxShadow: '5px 0px 8px rgba(0, 0, 0, 0.08)',
          transform: 'scale(1)',
        }}
      >
        <Box position='sticky' top='0px' zIndex={1}>
          <Box
            style={{
              height: 62,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingLeft: '20px',
            }}
          >
            <Box
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                cursor: 'pointer',
              }}
              onClick={() => {}}
            >
              {/* <Image
                alt='Apodio_logo'
                width={42}
                height={30}
                src={require('@/assets/svg/logo.svg')}
              /> */}
              {/* <Typography variant='body1'>Apodio</Typography> */}
              <Typography variant='body1'>Logo</Typography>
            </Box>
          </Box>
          <Divider className='w-full' />
          <Box
            style={{
              height: 62,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0px 20px',
            }}
          >
            <Box
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <Typography variant='body1'>Merchant</Typography>
            </Box>
            <IconButton onClick={() => {}}>
              <Image
                alt='Apodio_logo'
                width={16}
                height={16}
                src={require('@/assets/svg/arrowsClockwise.svg')}
              />
            </IconButton>
          </Box>
        </Box>
        <Divider className='w-full' />
        <Menu />
      </Box>
    )
  }

  return (
    <div>
      {matches ? (
        <div>
          <Collapse in={isOpen} orientation='horizontal'>
            {renderLeftMenu()}
          </Collapse>
        </div>
      ) : (
        <Drawer
          anchor='left'
          open={isOpen}
          onClose={() => setOpenMenu(false)}
          PaperProps={{
            style: { width: drawerWidth, backgroundColor: '#F6F7FB' },
          }}
        >
          {renderLeftMenu()}
        </Drawer>
      )}
    </div>
  )
}

export default Sidebar
