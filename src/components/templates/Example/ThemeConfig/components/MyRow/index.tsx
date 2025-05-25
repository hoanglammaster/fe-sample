import Grid from '@mui/material/Grid'
import { ReactNode } from 'react'

const MyRow = ({
  title,
  subTitle,
  content,
}: {
  title: ReactNode
  subTitle?: ReactNode
  content: ReactNode
}) => {
  return (
    <Grid item xs={12}>
      <div className='flex gap-10'>
        <div className='flex flex-col w-[450px] justify-center gap-4'>
          {title}
          {subTitle}
        </div>
        <div className='flex items-center w-full'>{content}</div>
      </div>
    </Grid>
  )
}

export default MyRow
