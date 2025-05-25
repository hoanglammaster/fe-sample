import { WHITE } from '@/components/layouts/WrapLayout/Theme/colors'
import { useAppSelector } from '@/redux/hook'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from '@mui/material'
import { Children, ReactNode } from 'react'

const PageContainer = ({
  title,
  titleAction,
  children,
  pageTitle,
  toolbarAction,
}: {
  title: string | ReactNode
  titleAction?: ReactNode
  toolbarAction?: ReactNode
  pageTitle?: ReactNode
  children: ReactNode
}) => {
  const renderChild = () => {
    if (Children.count(children)) {
      return (
        <>
          {Children.map(children, (child, index) => {
            return (
              <Box
                className={`p-15 pb-5 w-full mb-10`}
                sx={{
                  backgroundColor: WHITE,
                  borderRadius: '12px',
                }}
              >
                {child}
              </Box>
            )
          })}
        </>
      )
    } else {
      return (
        <Box
          className={`p-15 pb-5 w-full mb-10`}
          sx={{
            backgroundColor: WHITE,
            borderRadius: '12px',
          }}
        >
          {children}
        </Box>
      )
    }
  }
  return (
    <Box className='w-full h-full' sx={{}}>
      <Box className='box-border w-full p-15 text-lg'>
        <Box className='flex items-center justify-between'>
          <div className='flex items-center'>
            {typeof title === 'string' ? (
              <Typography variant='h3' className='first-letter:uppercase'>
                {title}
              </Typography>
            ) : (
              title
            )}
          </div>
        </Box>
      </Box>
      <Box className='mx-15 pb-30'>{renderChild()}</Box>
    </Box>
  )
}

export default PageContainer
