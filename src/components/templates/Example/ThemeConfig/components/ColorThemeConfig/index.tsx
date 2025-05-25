import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { RadioGroupCustom } from '@/components/atoms/RadioGroupButton'
import { Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import { Controller } from 'react-hook-form'
import ChooseColor from '../ChooseColor'
import MyRow from '../MyRow'
import { useColorThemeConfig } from './useColorThemeConfig'

const ColorThemeConfig = ({ refetch }: { refetch: any }) => {
  const [values, handles] = useColorThemeConfig(refetch)
  const {
    register,
    watch,
    setError,
    control,
    formState,
    trigger,
    reset,
    isLoadingSubmit,
    defaultValues,
    layoutSelect,
    themeSelect,
  } = values
  const { onSubmit } = handles

  return (
    <form
      className='flex flex-col bg-white rounded-[4px]'
      style={{
        border: '1px solid #DFE0EB',
      }}
    >
      <div
        className='bg-[#F6F7FB] h-23 rounded-[4px] flex flex-col justify-center px-10'
        style={{
          borderBottom: '1px solid #DFE0EB',
        }}
      >
        <Typography variant='subtitle1'>Color Theme</Typography>
      </div>
      <Grid container spacing={{ xs: 1, sm: 2, md: 3 }} className='py-15 px-25'>
        <MyRow
          title={<Typography variant='body1'>Layout Style</Typography>}
          content={
            <div className='w-205'>
              <CoreAutocomplete
                name='layout'
                control={control}
                placeholder='Chọn layout'
                options={layoutSelect}
                required
              />
            </div>
          }
        />
        <MyRow
          title={<Typography variant='body1'>Theme</Typography>}
          content={
            <Controller
              name='theme'
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <RadioGroupCustom
                  value={value}
                  onBlur={onBlur}
                  onChange={(e) => {
                    onChange(e)
                  }}
                  options={themeSelect}
                  type='secondary'
                  defaultValue={value}
                />
              )}
            />
          }
        />
        <MyRow
          title={<Typography variant='body1'>First Main Color</Typography>}
          subTitle={
            <Typography variant='caption'>
              Choose the most dominant theme color
            </Typography>
          }
          content={
            <ChooseColor
              name='firstMainColor'
              control={control}
              disabled={watch('theme') != 'CUSTOM'}
            />
          }
        />
        <MyRow
          title={<Typography variant='body1'>Second Main Color</Typography>}
          subTitle={
            <Typography variant='caption'>
              Choose the second most dominant theme color
            </Typography>
          }
          content={
            <ChooseColor
              name='secondMainColor'
              control={control}
              disabled={watch('theme') != 'CUSTOM'}
            />
          }
        />
        <MyRow
          title={<Typography variant='body1'>Third Main Color</Typography>}
          subTitle={
            <Typography variant='caption'>
              Choose the third most dominant theme color
            </Typography>
          }
          content={
            <ChooseColor
              name='thirdMainColor'
              control={control}
              disabled={watch('theme') != 'CUSTOM'}
            />
          }
        />
        <MyRow
          title={<Typography variant='body1'>Fourth Main Color</Typography>}
          subTitle={
            <Typography variant='caption'>
              Choose the fourth most dominant theme color
            </Typography>
          }
          content={
            <ChooseColor
              name='fourthMainColor'
              control={control}
              disabled={watch('theme') != 'CUSTOM'}
            />
          }
        />
        <MyRow
          title={<Typography variant='body1'>Success</Typography>}
          subTitle={
            <Typography variant='caption'>Mã thông báo thành công</Typography>
          }
          content={
            <ChooseColor
              name='successColor'
              control={control}
              disabled={watch('theme') != 'CUSTOM'}
            />
          }
        />
        <MyRow
          title={<Typography variant='body1'>Error</Typography>}
          subTitle={<Typography variant='caption'>Mã thông báo lỗi</Typography>}
          content={
            <ChooseColor
              name='errorColor'
              control={control}
              disabled={watch('theme') != 'CUSTOM'}
            />
          }
        />
        <MyRow
          title={<Typography variant='body1'>Warning</Typography>}
          subTitle={<Typography variant='caption'>Mã cảnh báo</Typography>}
          content={
            <ChooseColor
              name='warningColor'
              control={control}
              disabled={watch('theme') != 'CUSTOM'}
            />
          }
        />
      </Grid>

      <div className='flex justify-center items-center w-full my-13'>
        <div className='flex gap-10'>
          <ButtonCustom
            theme='cancel'
            type='button'
            onClick={() => {
              reset(defaultValues)
            }}
          >
            HỦY
          </ButtonCustom>
          <ButtonCustom
            theme='submit'
            type='button'
            disabled={isLoadingSubmit}
            onClick={onSubmit}
          >
            LƯU THAY ĐỔI
          </ButtonCustom>
        </div>
      </div>
    </form>
  )
}

export default ColorThemeConfig
