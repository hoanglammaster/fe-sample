import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreInput from '@/components/atoms/CoreInput'
import { REGEX } from '@/helper/regex'
import { TRANSLATE_UAA } from '@/routes'
import { LoadingButton } from '@mui/lab'
import { Box, IconButton } from '@mui/material'
import Image from 'next/image'
import { FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import AvatarUpload from './AvatarUpload'

const UserInfoForm = (props: any) => {
  const {
    formContextUser,
    handleSubmitUserInfo,
    isEdit,
    setIsEdit,
    getUserDataInfo,
  } = props
  const { control, formState, watch } = formContextUser
  const { t } = useTranslation(TRANSLATE_UAA.USER)

  const roleTypeCode = watch('roleTypeCode')

  const editAble = roleTypeCode?.startsWith('9')

  return (
    <Box display='flex' justifyContent='center'>
      <Box
        display='flex'
        justifyContent='center'
        style={{ width: '100%', maxWidth: 930 }}
      >
        <FormProvider {...formContextUser}>
          <form className='w-full h-full mb-20' onSubmit={handleSubmitUserInfo}>
            <Box className='w-full flex justify-center flex-col items-center mb-15'>
              <AvatarUpload
                control={control}
                name='imageUrl'
                watch={watch}
                style={{ width: 180, height: 180 }}
                getUserDataInfo={getUserDataInfo}
              />
            </Box>
            <Box className='flex'>
              <Box className=' w-full grid grid-cols-2 gap-10'>
                <CoreInput
                  control={control}
                  name='firstName'
                  label={t('label.firstName')}
                  className='w-full'
                  readOnly={!isEdit}
                  transform={{
                    input: (e) => e,
                    output: (e) => e.target.value.toUpperCase(),
                  }}
                  required
                  inputProps={{ maxLength: 50 }}
                  rules={{
                    validate: (v: string) =>
                      v.trim().length > 0 ||
                      t('common:validation.enter', {
                        msg: t('label.firstName'),
                      }),
                  }}
                />
                <CoreInput
                  name='lastName'
                  label={t('label.name')}
                  className='w-full'
                  control={control}
                  transform={{
                    input: (e) => e,
                    output: (e) => e.target.value.toUpperCase(),
                  }}
                  readOnly={!isEdit}
                  inputProps={{ maxLength: 50 }}
                  rules={{
                    validate: (v: string) =>
                      v.trim().length > 0 ||
                      t('common:validation.enter', { msg: t('label.name') }),
                  }}
                  required
                />
                <CoreInput
                  name='roleTypeName'
                  label={t('label.roleType')}
                  readOnly
                  control={control}
                />
                <CoreInput
                  name='tierName'
                  label={t('label.tier')}
                  readOnly
                  control={control}
                />

                <CoreInput
                  name='username'
                  label={'Username'}
                  placeholder={'Username'}
                  readOnly
                  control={control}
                />
                <CoreAutocomplete
                  name='sex'
                  label={t('label.gender')}
                  options={[
                    { value: 'MALE', label: t('common:male') },
                    { value: 'FEMALE', label: t('common:female') },
                  ]}
                  control={control}
                  returnValueType='enum'
                  className='w-full'
                  readOnly={!isEdit}
                  required
                />
                <CoreInput
                  control={control}
                  name='phoneNumberOTP'
                  label={t('label.phoneNumberSms')}
                  className='w-full'
                  readOnly={!isEdit}
                  required
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
                        REGEX.PHONE.test(v) || t('validation.phone'),
                    },
                  }}
                />
              </Box>
              <Box className='w-10'>
                {editAble && !isEdit && (
                  <IconButton onClick={() => setIsEdit(!isEdit)}>
                    <Image
                      alt=''
                      src={require('@/assets/svg/edit.svg')}
                      width={16}
                      height={16}
                    />
                  </IconButton>
                )}
              </Box>
            </Box>
            {isEdit && (
              <Box className='flex justify-center w-full'>
                <LoadingButton
                  className='mt-20'
                  size='large'
                  style={{ marginTop: 40 }}
                  disableElevation
                  type='submit'
                  variant='contained'
                  loading={formState.isSubmitting}
                >
                  {t('common:btn.save')}
                </LoadingButton>
              </Box>
            )}
          </form>
        </FormProvider>
      </Box>
    </Box>
  )
}

export default UserInfoForm
