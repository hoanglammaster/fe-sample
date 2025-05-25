import CoreInput from '@/components/atoms/CoreInput'
import PageContainer from '@/components/layouts/MultipleLayouts/Layout1/components/PageContainer'
import { errorMsg, successMsg } from '@/helper/message'
import { REGEX } from '@/helper/regex'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE_UAA } from '@/routes'
import { LoadingButton } from '@mui/lab'
import { Box, Grid, IconButton, Typography } from '@mui/material'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { putChangePasswordUser } from './service/service'
import { Output } from '@mui/icons-material'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { getRegexChangePassword } from './util'
import { getConfigKey } from '../UAA/ClientManagement/List/service/service'

const defaultValues = {
  oldPassword: '',
  newPassword: '',
  grantType: 'PASSWORD',
}

const listConfigKey = [
  'NUMBER_ENTER_CHAR_UPPER_CASE',
  'NUMBER_ENTER_CHAR_LOWER_CASE',
  'NUMBER_ENTER_CHAR_NUMERIC_CASE',
  'NUMBER_ENTER_CHAR_SPECIAL',
  'LIST_SPECIAL_CHAR',
]

const ChangePasswordUser = () => {
  const { t } = useTranslation(TRANSLATE_UAA.USER)

  const methodForm = useForm({ mode: 'onSubmit', defaultValues })

  const { control, handleSubmit, watch } = methodForm

  const [configObject, setConfigObject] = useState<any>({})

  const [viewOldPass, setViewOldPass] = useState(false)
  const [viewNewPass, setViewNewPass] = useState(false)
  const [viewRepass, setViewRepass] = useState(false)
  const [dataRegex, setDataRegex] = useState<any[]>([])

  const router = useRouter()

  const putPassword = async (data: any) => {
    try {
      const res = await putChangePasswordUser(data)
      setTimeout(() => {
        router.push('/login')
      }, 500)
    } catch (e) {}
  }

  const onSubmit = handleSubmit((data) => {
    putPassword(data)
  })

  const getConfigList = async () => {
    try {
      const listData = await Promise.all(
        listConfigKey.map((configKey) => {
          return getConfigKey({ configKey })
        })
      )
      const result = listData.reduce((acc: any, item: any) => {
        acc[item?.data?.configKey] = item?.data?.configValue
        return acc
      }, {} as Record<string, number>)
      setConfigObject(result)
    } catch (e) {}
  }

  console.log('configObject', configObject)

  const getRegex = async () => {
    try {
      const res = await getRegexChangePassword()
      setDataRegex(res?.data?.regex ?? [])
    } catch (e) {}
  }

  const newPassword = watch('newPassword')

  const handleTestPassword = useCallback(
    (val: string) => {
      if (!!dataRegex.length) {
        let isValid = true
        dataRegex.forEach((item) => {
          const currentRegex = new RegExp(item.first)
          const checkValid = item.second
            ? currentRegex.test(val)
            : !currentRegex.test(val)
          if (checkValid === false) {
            isValid = false
          }
        })
        return isValid
      }
      return true
    },
    [dataRegex]
  )

  useEffect(() => {
    getRegex()
    getConfigList()
  }, [])

  return (
    <PageContainer
      title={<Typography variant='h1'>{t('common:changePassword')}</Typography>}
    >
      <form onSubmit={onSubmit} autoComplete='off' autoCorrect='off'>
        <Typography variant='h3'>{t('common:changePassword')}</Typography>
        <Grid
          container
          spacing={{ xs: 1, sm: 2, md: 3 }}
          className='p-30 pt-10'
        >
          <Grid item xs={12}>
            <CoreInput
              control={control}
              name='oldPassword'
              type={viewOldPass ? 'text' : 'password'}
              label={t('label.oldPass')}
              inputProps={{
                maxLength: 15,
              }}
              autoComplete='off'
              transform={{
                input: (e) => e,
                output: (e) => e.target.value.replace(/\s/g, ''),
              }}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setViewOldPass((prev) => !prev)}>
                    <Image
                      src={
                        viewOldPass
                          ? require('@/assets/svg/EyeSlash.svg')
                          : require('@/assets/svg/EyeInPassword.svg')
                      }
                      alt=''
                      width={16}
                    />
                  </IconButton>
                ),
              }}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <CoreInput
              control={control}
              name='newPassword'
              label={t('label.newPass')}
              type={viewNewPass ? 'text' : 'password'}
              errorTooltip={t('common:newPasswordMessage', configObject)}
              inputProps={{
                maxLength: 15,
              }}
              autoComplete='off'
              rules={{
                validate: (v: any) =>
                  handleTestPassword(v) ||
                  t('common:validation.password_false'),
              }}
              transform={{
                input: (e) => e,
                output: (e) => e.target.value.replace(/\s/g, ''),
              }}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setViewNewPass((prev) => !prev)}>
                    <Image
                      src={
                        viewNewPass
                          ? require('@/assets/svg/EyeSlash.svg')
                          : require('@/assets/svg/EyeInPassword.svg')
                      }
                      alt=''
                      width={16}
                    />
                  </IconButton>
                ),
              }}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <CoreInput
              control={control}
              name='reEnterPass'
              label={t('label.reEnter')}
              type={viewRepass ? 'text' : 'password'}
              autoComplete='off'
              inputProps={{
                maxLength: 15,
              }}
              transform={{
                input: (e) => e,
                output: (e) => e.target.value.replace(/\s/g, ''),
              }}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setViewRepass((prev) => !prev)}>
                    <Image
                      src={
                        viewNewPass
                          ? require('@/assets/svg/EyeSlash.svg')
                          : require('@/assets/svg/EyeInPassword.svg')
                      }
                      alt=''
                      width={16}
                    />
                  </IconButton>
                ),
              }}
              required
              rules={{
                validate: (v: any) =>
                  v === newPassword || t('common:validation.re_enter_password'),
              }}
            />
          </Grid>
        </Grid>
        <Box className='flex justify-center mb-20'>
          <LoadingButton variant='contained' type='submit'>
            {t('common:btn.save')}
          </LoadingButton>
        </Box>
      </form>
    </PageContainer>
  )
}

export default ChangePasswordUser
