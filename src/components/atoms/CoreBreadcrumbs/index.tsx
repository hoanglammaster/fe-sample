import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { Breadcrumbs, Typography } from '@mui/material'
import { useRouter } from 'next/router'

interface CoreBreadcrumbsProps {
  textPrev: string
  textCurrent: string
  prevUrl?: string
  className?: string
}
export const CoreBreadcrumbs = (props: CoreBreadcrumbsProps) => {
  const router = useRouter()
  const { textPrev, textCurrent, prevUrl, className } = props
  const breadcrumbsData = [
    <Typography
      key='prev'
      variant='h4'
      color='primary'
      className='font-normal cursor-pointer'
      onClick={() => (prevUrl ? router.push(prevUrl) : router.back())}
    >
      {textPrev}
    </Typography>,

    <Typography
      key='current'
      variant='h4'
      color='text.primary'
      className='font-normal'
    >
      {textCurrent}
    </Typography>,
  ]
  return (
    <Breadcrumbs
      className={className}
      separator={<NavigateNextIcon color='primary' />}
      sx={{
        '& .MuiBreadcrumbs-separator': {
          marginX: '3px',
        },
      }}
    >
      {breadcrumbsData}
    </Breadcrumbs>
  )
}
