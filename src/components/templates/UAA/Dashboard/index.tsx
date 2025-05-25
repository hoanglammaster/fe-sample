import { WHITE } from '@/components/layouts/WrapLayout/Theme/colors'
import { Box, Typography } from '@mui/material'

const Dashboard = () => {
  return (
    <Box
      className='m-15 p-25 h-full text-center'
      style={{ backgroundColor: WHITE }}
    >
      <Typography variant='h6'>{`Welcome to UAA service`}</Typography>
    </Box>
  )
}

export default Dashboard
