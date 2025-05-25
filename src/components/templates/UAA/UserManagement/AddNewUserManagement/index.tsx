import BreadcrumbUaa from '@/components/atoms/BreadcumbUaa'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreInput from '@/components/atoms/CoreInput'
import PageContainer from '@/components/layouts/MultipleLayouts/Layout1/components/PageContainer'
import { RED, YELLOW } from '@/components/layouts/WrapLayout/Theme/colors'
import { REGEX } from '@/helper/regex'
import { LoadingButton } from '@mui/lab'
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  IconButton,
  Typography,
} from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { Controller, useFieldArray } from 'react-hook-form'
import RoleProductSelecter from './components/RoleProductSelecter'
import { useUserForm } from './useUserForm'

export const AddNewUserManagement = () => {
  const [values, handle] = useUserForm()
  const {
    control,
    watch,
    formState: { isSubmitting },
    t,
    loading,
    listRoleType,
    listTier,
    setValue,
    listLanguages,
    dataRegex,
  } = values

  const { onSubmit, getTier, getRoleType } = handle

  const [seePassword, setSeePassword] = useState(true)
  const [seeRePassword, setSeeRePassword] = useState(true)

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'products',
  })

  const router = useRouter()
  const isView = router.asPath.includes('/view')

  const { slug } = router.query
  const isEdit = !!slug && !isView

  const status = watch('status')

  const renderStatus = () => {
    if (status === 'ACTIVE') {
      return 'Active'
    }
    if (status === 'LOCKED') {
      return 'Locked'
    }
    if (status === 'TERMINATED') {
      return 'Terminated'
    }
    return ''
  }

  const renderListProduct = () => {
    return fields?.map((item, index) => {
      const propsField = {
        append,
        remove,
        total: fields.length,
        name: `products[${index}]`,
        index,
        control,
        watch,
        t,
      }
      return <RoleProductSelecter {...propsField} key={item.id} />
    })
  }

  const roleTypeId = watch('roleTypeId')

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
    roleTypeId && getTier(roleTypeId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleTypeId])

  useEffect(() => {
    getRoleType()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const oldPassword = watch('password')
  return (
    <PageContainer
      title={
        <Box>
          <BreadcrumbUaa />
          <Typography variant='h1' className='mt-10'>
            {isEdit
              ? t('title.editAccount')
              : isView
              ? t('title.viewAccount')
              : t('title.addAccount')}
          </Typography>
        </Box>
      }
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <form onSubmit={onSubmit} className='mb-20'>
          <Box className='grid grid-cols-2 gap-10'>
            {(isView || isEdit) && (
              <>
                <CoreInput
                  control={control}
                  name='userId'
                  label={t('label.userId')}
                  readOnly
                />
                <div />
              </>
            )}
            <CoreAutocomplete
              name='roleTypeId'
              control={control}
              options={(listRoleType ?? []).map((v) => ({
                ...v,
                roleTypeName: `${v?.roleTypeCode} - ${v?.roleTypeName}`,
              }))}
              readOnly={isView || isEdit}
              returnValueType='enum'
              label={t('label.roleType')}
              valuePath='id'
              labelPath='roleTypeName'
              required={!isView}
              rules={{ required: t('common:validation.required') }}
              onChangeValue={(v) => {
                setValue('tierId', undefined)
              }}
            />
            <CoreAutocomplete
              name='tierId'
              control={control}
              options={(listTier ?? []).map((v) => ({
                ...v,
                tierName: `${v?.tierCode} - ${v?.tierName}`,
              }))}
              returnValueType='enum'
              label={t('label.tier')}
              valuePath='id'
              labelPath='tierName'
              required={!isView}
              disabled={!roleTypeId}
              readOnly={isView || isEdit}
              rules={{ required: t('common:validation.required') }}
            />
            <CoreInput
              control={control}
              name={'firstName'}
              label={t('label.firstName')}
              rules={{
                required: t('common:validation.required'),
                validate: (v: string) =>
                  v.trim().length > 0 ||
                  t('common:validation.enter', { msg: t('label.firstName') }),
              }}
              transform={{
                input: (e) => e,
                output: (e) => e.target.value.toUpperCase(),
              }}
              inputProps={{ maxLength: 50 }}
              required={!isView}
              readOnly={isView}
            />
            <CoreInput
              control={control}
              name={'lastName'}
              label={t('label.name')}
              inputProps={{ maxLength: 50 }}
              transform={{
                input: (e) => e,
                output: (e) => e.target.value.toUpperCase(),
              }}
              rules={{
                required: t('common:validation.required'),
                validate: (v: string) =>
                  v.trim().length > 0 ||
                  t('common:validation.enter', { msg: t('label.name') }),
              }}
              required={!isView}
              readOnly={isView}
            />
            <CoreAutocomplete
              control={control}
              name='sex'
              label={t('label.gender')}
              options={[
                {
                  label: 'Male',
                  value: 'MALE',
                },
                {
                  label: 'Female',
                  value: 'FEMALE',
                },
              ]}
              returnValueType='enum'
              required={!isView}
              readOnly={isView}
            />
            <CoreAutocomplete
              name='lang'
              control={control}
              options={listLanguages}
              returnValueType='enum'
              label={t('label.language')}
              valuePath='id'
              labelPath='name'
              required={!isView}
              readOnly={isView}
              rules={{ required: t('common:validation.required') }}
            />

            <CoreInput
              control={control}
              name={'phoneNumberOTP'}
              label={t('label.phoneNumberSms')}
              transform={{
                output: (val: any) => {
                  const stringVal = val.target.value
                  return stringVal ? stringVal?.replace(/\D/g, '') : val
                },
              }}
              inputProps={{ maxLength: 12 }}
              rules={{
                required: t('common:validation.required'),
                validate: {
                  isNumber: (v: string) =>
                    REGEX.PHONE.test(v) ||
                    t('common:validation.isInvalid', {
                      label: t('label.phoneNumberSms'),
                    }),
                },
              }}
              required={!isView}
              readOnly={isView || isEdit}
            />
            <CoreInput
              control={control}
              name={'username'}
              label={t('label.username')}
              readOnly={isEdit || isView}
              inputProps={{ maxLength: 50 }}
              rules={
                !isEdit
                  ? {
                      required: t('common:validation.required'),
                      validate: (v) =>
                        REGEX.USERNAME_V2.test(v) || t('validation.username'),
                      // validate: {
                      //   trimRequired: (v: string) =>
                      //     v.trim().length > 0 ||
                      //     t('common:validation.required'),
                      //   isUserFormat: (v: string) =>
                      //     /\w{5,255}/.test(v) || t('validation.username'),
                      // },
                    }
                  : undefined
              }
              required={!isView}
            />

            {!isEdit && !isView && (
              <>
                <Controller
                  control={control}
                  name='isGeneratePassword'
                  render={({ field }) => {
                    return (
                      <>
                        <FormControlLabel
                          className='col-span-1'
                          control={
                            <Checkbox
                              checked={field.value ?? false}
                              {...field}
                              onChange={(e) => {
                                if (!isView) {
                                  field.onChange(e)
                                }
                              }}
                            />
                          }
                          label={
                            <>
                              <Typography>{t('label.autoPassword')}</Typography>
                            </>
                          }
                        />
                        <div className='col-span-1'></div>
                      </>
                    )
                  }}
                />
                {!watch('isGeneratePassword') && !isView && (
                  <>
                    <CoreInput
                      control={control}
                      name={'password'}
                      type={seePassword ? 'password' : 'standard'}
                      label={t('label.password')}
                      rules={{
                        required: t('common:validation.required'),
                        validate: {
                          regex: (v: string) =>
                            handleTestPassword(v) || t('validation.password'),
                        },
                      }}
                      inputProps={{ maxLength: 15 }}
                      required
                      InputProps={{
                        endAdornment:
                          (watch('password') ?? '').length > 0 ? (
                            <IconButton
                              onClick={() => setSeePassword((prev) => !prev)}
                            >
                              {seePassword ? (
                                <Image
                                  alt=''
                                  src={require('@/assets/svg/EyeInPassword.svg')}
                                />
                              ) : (
                                <Image
                                  alt=''
                                  src={require('@/assets/svg/EyeSlash.svg')}
                                />
                              )}
                            </IconButton>
                          ) : (
                            <></>
                          ),
                      }}
                    />
                    <CoreInput
                      control={control}
                      name={'rePassword'}
                      type={seeRePassword ? 'password' : 'standard'}
                      label={t('label.re_password')}
                      inputProps={{ maxLength: 15 }}
                      rules={{
                        required: t('common:validation.required'),
                        validate: {
                          isSame: (v: string) =>
                            v === oldPassword || t('validation.rePassword'),
                          regex: (v: string) =>
                            handleTestPassword(v) || t('validation.rePassword'),
                        },
                      }}
                      required
                      InputProps={{
                        endAdornment:
                          (watch('rePassword') ?? '').length > 0 ? (
                            <IconButton
                              onClick={() => setSeeRePassword((prev) => !prev)}
                            >
                              {seeRePassword ? (
                                <Image
                                  alt=''
                                  src={require('@/assets/svg/EyeInPassword.svg')}
                                />
                              ) : (
                                <Image
                                  alt=''
                                  src={require('@/assets/svg/EyeSlash.svg')}
                                />
                              )}
                            </IconButton>
                          ) : (
                            <></>
                          ),
                      }}
                    />
                  </>
                )}
              </>
            )}
            <Box className='flex'>
              <Typography sx={{ fontSize: '16px', marginRight: '10px' }}>
                {t('common:status')}:
              </Typography>
              <Typography
                sx={{
                  fontSize: '16px',
                  color:
                    status === 'ACTIVE'
                      ? '#4DBC6C'
                      : status === 'LOCKED'
                      ? YELLOW
                      : RED,
                }}
              >
                {renderStatus()}
              </Typography>
            </Box>
          </Box>

          {/* {renderListProduct()} */}
          {!isView && (
            <Box className='my-10'>
              <Box className='flex justify-center gap-10 mt-20'>
                <Button
                  variant='text'
                  onClick={() => router.push('/uaa/user-management')}
                >
                  {t('button.cancel')}
                </Button>
                <LoadingButton
                  color='primary'
                  variant='contained'
                  type='submit'
                  onClick={onSubmit}
                  loading={isSubmitting}
                >
                  {t('button.save')}
                </LoadingButton>
              </Box>
            </Box>
          )}
        </form>
      )}
    </PageContainer>
  )
}
