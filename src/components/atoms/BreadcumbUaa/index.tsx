import { RED } from '@/components/layouts/WrapLayout/Theme/colors'
import { listMenuRoutes } from '@/routes'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { Box, ButtonBase, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

const BreadcrumbUaa = () => {
  const router = useRouter()
  const currentPath = router.asPath
  const { t } = useTranslation('common')

  const mainPath = () => {
    let path = ''
    let childName = ''
    if (currentPath.includes('/create')) {
      childName = t('btn.addNew')
      path = currentPath.split('/').slice(0, -1).join('/')
    } else {
      childName = currentPath.includes('/update')
        ? t('btn.edit')
        : t('btn.viewDetail')
      path = currentPath.split('/').slice(0, -2).join('/')
    }
    const name = listMenuRoutes.find((v) => v.path === path)?.name
    return {
      path,
      name,
      childName,
    }
  }

  return (
    <Box className='flex items-center'>
      <ButtonBase onClick={() => router.push(mainPath().path)}>
        <Typography variant='body1' color='primary'>
          {mainPath()?.name}
        </Typography>
        <KeyboardArrowRightIcon style={{ color: RED, height: 20, width: 20 }} />
      </ButtonBase>
      <Typography variant='body1'>{mainPath()?.childName}</Typography>
    </Box>
  )
}

export default BreadcrumbUaa
