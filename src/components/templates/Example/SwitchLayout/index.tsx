import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import PageContainer from '@/components/layouts/MultipleLayouts/Layout1/components/PageContainer'
import { layoutType } from '@/components/layouts/MultipleLayouts/recoil'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { IconButton, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'

export const SwitchLayout = () => {
  const router = useRouter()

  const [_, setLayout] = useRecoilState(layoutType)

  const changeLayout1 = () => {
    setLayout('Layout1')
  }

  const changeLayout2 = () => {
    setLayout('Layout2')
  }

  const changeLayout3 = () => {
    setLayout('Layout3')
  }

  return (
    <PageContainer
      title='Quản lý kho'
      pageTitle={
        <>
          <Typography
            gutterBottom
            noWrap
            variant='h6'
            component='div'
            className='flex items-center gap-4'
            style={{ margin: 0, marginTop: '2px' }}
          >
            <IconButton onClick={() => router.back()}>
              <ArrowBackIcon />
            </IconButton>
            <span>Quản lý sản phẩm</span>
          </Typography>
        </>
      }
      toolbarAction={
        <div className='flex '>
          <ButtonCustom
            height={36}
            variant='contained'
            color='primary'
            className='px-8 py-6'
            theme='submit'
          >
            Thêm mới
          </ButtonCustom>
        </div>
      }
    >
      <form className='block'>
        <div className='flex flex-col items-center gap-15 p-25'>
          <ButtonCustom theme='submit' onClick={changeLayout1}>
            Layout 1
          </ButtonCustom>

          <ButtonCustom theme='submit' onClick={changeLayout2}>
            Layout 2
          </ButtonCustom>

          <ButtonCustom theme='submit' onClick={changeLayout3}>
            Layout 3
          </ButtonCustom>
        </div>
      </form>
    </PageContainer>
  )
}
