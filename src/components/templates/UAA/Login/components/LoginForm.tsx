import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreInput from '@/components/atoms/CoreInput'
import { removeCmsToken } from '@/config/token'
import { LoadingButton } from '@mui/lab'
import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  Typography,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { getListRoleTypeBySystem } from '../../ConfigRoleType/CreateUpdate/service'
import useChangePassword from '../hooks/useChangePassword'
import { useLogin } from '../hooks/useLogin'
import ChangePasswordForm from './ChangePasswordForm'
import ForgotPasswordForm from './ForgotPasswordForm'
import { getListLanguages } from './service'
import LanguageButton from '@/components/layouts/MultipleLayouts/Layout2/components/LanguageButton'
import CoreCheckbox from '@/components/atomsUpdate/CoreCheckbox'
import { CheckBox } from '@mui/icons-material'

interface LoginType {
  username: string
  password: string
  systemId?: number
  roleTypeId?: number
}

// const USER_NAME = 'username'
// const PASSWORD = 'password'

// const saveUser = (val: LoginType) => {
//   window.localStorage.setItem(USER_NAME, val.username)
//   window.localStorage.setItem(PASSWORD, val.password)
// }

// const removeUser = () => {
//   window.localStorage.removeItem(USER_NAME)
//   window.localStorage.removeItem(PASSWORD)
// }

// const getUserSaved = () => {
//   return {
//     username: window.localStorage.getItem(USER_NAME) ?? '',
//     password: window.localStorage.getItem(PASSWORD) ?? '',
//   }
// }

export const LoginForm = () => {
  const { loginAccount, loading, renderDialogChoseBizzApp } = useLogin()
  const { t } = useTranslation()
  const [forgotStep, setForgotStep] = useState(0)
  const formContext = useForm<LoginType>({
    defaultValues: {},//getUserSaved(),
    mode: 'onTouched',
  })
  const { handleSubmit, control, watch } = formContext
  const [userName, setUserName] = useState<any>()
  const [isSavePassword, setIsSavePassword] = useState<boolean>(true)
  const { getOtp, otp, handleChangePassword } = useChangePassword()

  const [listRoleType, setListRoleType] = useState<any[]>([])
  const [loadingRoleType, setLoadingRoleType] = useState(false)
  const [isViewPassword, setIsViewPassword] = useState(false)

  const getRoleType = async () => {
    try {
      setLoadingRoleType(true)
      const res = await getListRoleTypeBySystem({
        page: 0,
        size: 1000,
        status: 'PUBLISHED',
        loginWeb: true,
      })
      setListRoleType(res?.data?.data?.content ?? [])
    } catch (e) {
    } finally {
      setLoadingRoleType(false)
    }
  }

  const onSubmit = handleSubmit((val) => {
    // if (isSavePassword) {
    //   saveUser(val)
    // } else {
    //   removeUser()
    // }
    loginAccount(val)
  })

  useEffect(() => {
    getRoleType()
  }, [])

  useEffect(() => {
    removeCmsToken()
  }, [])

  return (
    <Box className='relative flex items-center justify-center flex-1 bg-white pr-30 pl-30'>
      <Box className='absolute top-10 right-10'>
        {/* <LanguageButton /> */}
      </Box>
      <Box className='w-full'>
        <FormProvider {...formContext}>
          <form onSubmit={onSubmit}>
            <Typography variant='h3' style={{ marginBottom: 46 }}>
              {t('login')}
            </Typography>
            <CoreInput
              control={control}
              className='mb-15'
              name='username'
              label={t('label.username')}
              onFocus={(e) => e.target.select()}
              placeholder={t('mail.placeholder')}
              rules={{
                required: t('rules.required'),
                validate: (v: string) =>
                  v.trim().length > 0 ||
                  t('common:validation.enter', { msg: t('label.username') }),
              }}
              inputProps={{ maxLength: 50 }}
            />
            {/* <InputOTP /> */}
            <CoreInput
              control={control}
              name='password'
              label={t('password.label')}
              type={isViewPassword ? 'standard' : 'password'}
              placeholder={t('password.placeholder')}
              className='mb-15'
              rules={{
                required: t('rules.required'),
                validate: (v: string) =>
                  v.trim().length > 0 ||
                  t('common:validation.enter', {
                    msg: t('password.label'),
                  }),
              }}
              inputProps={{ maxLength: 50 }}
              onChangeValue={(e) => {
                if (e.target.value.length === 0) {
                  setIsViewPassword(false)
                }
              }}
              InputProps={{
                endAdornment: watch('password')?.length > 0 && (
                  <IconButton
                    onClick={() => setIsViewPassword((prev) => !prev)}
                  >
                    <Image
                      src={
                        isViewPassword
                          ? require('@/assets/svg/EyeSlash.svg')
                          : require('@/assets/svg/EyeInPassword.svg')
                      }
                      alt=''
                      width={16}
                      height={16}
                    />
                  </IconButton>
                ),
              }}
            />
            {/* <CoreAutocomplete
              control={control}
              name='systemId'
              returnValueType='enum'
              labelPath='name'
              valuePath='id'
              className='mb-15'
              options={listSystem?.content ?? []}
              label={t('login_page.system')}
              loading={loadingSystem}
              rules={{
                required: t('rules.required'),
              }}
              required
            /> */}
            <CoreAutocomplete
              control={control}
              name='roleTypeId'
              returnValueType='enum'
              labelPath='roleTypeName'
              valuePath='id'
              className='mb-15'
              options={(listRoleType ?? []).map((v) => ({
                ...v,
                roleTypeName: `${v?.roleTypeCode} - ${v?.roleTypeName}`,
              }))}
              label={t('login_page.roleType')}
              placeholder={t('form.input.placeholder', {
                label: t('login_page.roleType'),
              })}
              loading={loadingRoleType}
              rules={{
                required: t('common:validation.enter', {
                  msg: t('login_page.roleType'),
                }),
              }}
            />
            <Box className='flex justify-end'>
              {/* <FormControlLabel
                control={
                  <Checkbox
                    className='p-0 mr-2 ml-4'
                    size='small'
                    color='primary'
                  />
                }
                checked={isSavePassword}
                onChange={(e, checked) => setIsSavePassword(checked)}
                label={
                  <Typography variant='body2' sx={{ color: '#222222' }}>
                    {t('rememberPassword')}
                  </Typography>
                }
              /> */}
              {/* <ButtonBase onClick={() => setForgotStep(1)}> */}
              <Typography variant='body2'>{t('forgetPassword')}</Typography>
              {/* </ButtonBase> */}
            </Box>

            <Box className='flex justify-center w-full'>
              <LoadingButton
                variant='contained'
                type='submit'
                className='mt-20'
                style={{ borderRadius: 80, marginTop: 40 }}
                disableElevation
                loading={loading}
                color='primary'
                size='large'
              >
                {t('login')}
              </LoadingButton>
            </Box>
          </form>
        </FormProvider>
      </Box>
      <ForgotPasswordForm
        open={forgotStep === 1}
        handleClose={() => setForgotStep(0)}
        onSubmit={async (val: any) => {
          const res = await getOtp(val.username)
          if (res) {
            setForgotStep(2)
            setUserName(val)
          }
        }}
      />
      <ChangePasswordForm
        open={forgotStep === 2}
        handleClose={() => setForgotStep(0)}
        onSubmit={async (val: any) => {
          const res = await handleChangePassword({
            otp: val.otp,
            newPassword: val.password,
          })
          if (res) {
            setForgotStep(0)
          }
        }}
        handleResent={() => getOtp(userName.username)}
        otp={otp}
      />
      {renderDialogChoseBizzApp()}
    </Box>
  )
}

