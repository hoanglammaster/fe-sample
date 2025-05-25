import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreInput from '@/components/atoms/CoreInput'
import { Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import ChooseColor from '../ChooseColor'
import MyRow from '../MyRow'
import { useFontConfig } from './useFontConfig'

const FontConfig = ({ refetch }: { refetch: any }) => {
  const [values, handles] = useFontConfig(refetch)
  const {
    register,
    watch,
    setError,
    control,
    formState,
    trigger,
    reset,
    setValue,
    isLoadingSubmit,
    fontSelect,
    defaultValues,
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
        <Typography variant='subtitle1'>Font</Typography>
      </div>

      <Grid container spacing={{ xs: 1, sm: 2, md: 3 }} className='py-15 px-25'>
        <MyRow
          title={<Typography variant='body1'>Layout Style</Typography>}
          content={
            <div className='w-205'>
              <CoreAutocomplete
                name='typeFont'
                control={control}
                placeholder='Chọn font'
                options={fontSelect}
                required
                onChangeValue={(v) => {
                  setValue('h1Font', v)
                  setValue('h2Font', v)
                  setValue('h3Font', v)
                  setValue('h4Font', v)
                  setValue('h5Font', v)
                  setValue('h6Font', v)
                  setValue('subtitle1Font', v)
                  setValue('subtitle2Font', v)
                  setValue('body1Font', v)
                  setValue('body2Font', v)
                  setValue('captionFont', v)
                }}
              />
            </div>
          }
        />

        <MyRow
          title={<Typography variant='h1'>H1 Style</Typography>}
          subTitle={
            <Typography variant='caption'>
              Define styles for H1 heading
            </Typography>
          }
          content={
            <div className='flex gap-14'>
              <ChooseColor name='h1Color' control={control} />
              <CoreAutocomplete
                style={{
                  width: '260px',
                }}
                name='h1Font'
                control={control}
                placeholder='Chọn font'
                options={fontSelect}
                required
              />
              <CoreInput
                control={control}
                name='h1Size'
                type='number'
                label='Chọn size (rem)'
                style={{
                  width: '100px',
                }}
                placeholder='Chọn size'
              />
            </div>
          }
        />

        <MyRow
          title={<Typography variant='h2'>H2 Style</Typography>}
          subTitle={
            <Typography variant='caption'>
              Define styles for H2 heading
            </Typography>
          }
          content={
            <div className='flex gap-14'>
              <ChooseColor name='h2Color' control={control} />
              <CoreAutocomplete
                style={{
                  width: '260px',
                }}
                name='h2Font'
                control={control}
                placeholder='Chọn font'
                options={fontSelect}
                required
              />
              <CoreInput
                control={control}
                name='h2Size'
                type='number'
                label='Chọn size (rem)'
                style={{
                  width: '100px',
                }}
                placeholder='Chọn size'
              />
            </div>
          }
        />

        <MyRow
          title={<Typography variant='h3'>H3 Style</Typography>}
          subTitle={
            <Typography variant='caption'>
              Define styles for H3 heading
            </Typography>
          }
          content={
            <div className='flex gap-14'>
              <ChooseColor name='h3Color' control={control} />
              <CoreAutocomplete
                style={{
                  width: '260px',
                }}
                name='h3Font'
                control={control}
                placeholder='Chọn font'
                options={fontSelect}
                required
              />
              <CoreInput
                control={control}
                name='h3Size'
                type='number'
                label='Chọn size (rem)'
                style={{
                  width: '100px',
                }}
                placeholder='Chọn size'
              />
            </div>
          }
        />

        <MyRow
          title={<Typography variant='h4'>H4 Style</Typography>}
          subTitle={
            <Typography variant='caption'>
              Define styles for H4 heading
            </Typography>
          }
          content={
            <div className='flex gap-14'>
              <ChooseColor name='h4Color' control={control} />
              <CoreAutocomplete
                style={{
                  width: '260px',
                }}
                name='h4Font'
                control={control}
                placeholder='Chọn font'
                options={fontSelect}
                required
              />
              <CoreInput
                control={control}
                name='h4Size'
                type='number'
                label='Chọn size (rem)'
                style={{
                  width: '100px',
                }}
                placeholder='Chọn size'
              />
            </div>
          }
        />

        <MyRow
          title={<Typography variant='h5'>H5 Style</Typography>}
          subTitle={
            <Typography variant='caption'>
              Define styles for H5 heading
            </Typography>
          }
          content={
            <div className='flex gap-14'>
              <ChooseColor name='h5Color' control={control} />
              <CoreAutocomplete
                style={{
                  width: '260px',
                }}
                name='h5Font'
                control={control}
                placeholder='Chọn font'
                options={fontSelect}
                required
              />
              <CoreInput
                control={control}
                name='h5Size'
                type='number'
                label='Chọn size (rem)'
                style={{
                  width: '100px',
                }}
                placeholder='Chọn size'
              />
            </div>
          }
        />

        <MyRow
          title={<Typography variant='h6'>H6 Style</Typography>}
          subTitle={
            <Typography variant='caption'>
              Define styles for H6 heading
            </Typography>
          }
          content={
            <div className='flex gap-14'>
              <ChooseColor name='h6Color' control={control} />
              <CoreAutocomplete
                style={{
                  width: '260px',
                }}
                name='h6Font'
                control={control}
                placeholder='Chọn font'
                options={fontSelect}
                required
              />
              <CoreInput
                control={control}
                name='h6Size'
                type='number'
                label='Chọn size (rem)'
                style={{
                  width: '100px',
                }}
                placeholder='Chọn size'
              />
            </div>
          }
        />

        <MyRow
          title={<Typography variant='subtitle1'>Subtitle 1</Typography>}
          subTitle={
            <Typography variant='caption'>
              Define styles for default Subtitle 1
            </Typography>
          }
          content={
            <div className='flex gap-14'>
              <ChooseColor name='subtitle1Color' control={control} />
              <CoreAutocomplete
                style={{
                  width: '260px',
                }}
                name='subtitle1Font'
                control={control}
                placeholder='Chọn font'
                options={fontSelect}
                required
              />
              <CoreInput
                control={control}
                name='subtitle1Size'
                type='number'
                label='Chọn size (rem)'
                style={{
                  width: '100px',
                }}
                placeholder='Chọn size'
              />
            </div>
          }
        />

        <MyRow
          title={<Typography variant='subtitle2'>Subtitle 2</Typography>}
          subTitle={
            <Typography variant='caption'>
              Define styles for default Subtitle 2
            </Typography>
          }
          content={
            <div className='flex gap-14'>
              <ChooseColor name='subtitle2Color' control={control} />
              <CoreAutocomplete
                style={{
                  width: '260px',
                }}
                name='subtitle2Font'
                control={control}
                placeholder='Chọn font'
                options={fontSelect}
                required
              />
              <CoreInput
                control={control}
                name='subtitle2Size'
                type='number'
                label='Chọn size (rem)'
                style={{
                  width: '100px',
                }}
                placeholder='Chọn size'
              />
            </div>
          }
        />

        <MyRow
          title={<Typography variant='body1'>Body 1</Typography>}
          subTitle={
            <Typography variant='caption'>
              Define styles for default Body 1
            </Typography>
          }
          content={
            <div className='flex gap-14'>
              <ChooseColor name='body1Color' control={control} />
              <CoreAutocomplete
                style={{
                  width: '260px',
                }}
                name='body1Font'
                control={control}
                placeholder='Chọn font'
                options={fontSelect}
                required
              />
              <CoreInput
                control={control}
                name='body1Size'
                type='number'
                label='Chọn size (rem)'
                style={{
                  width: '100px',
                }}
                placeholder='Chọn size'
              />
            </div>
          }
        />

        <MyRow
          title={<Typography variant='body2'>Body 2</Typography>}
          subTitle={
            <Typography variant='caption'>
              Define styles for default Body 2
            </Typography>
          }
          content={
            <div className='flex gap-14'>
              <ChooseColor name='body2Color' control={control} />
              <CoreAutocomplete
                style={{
                  width: '260px',
                }}
                name='body2Font'
                control={control}
                placeholder='Chọn font'
                options={fontSelect}
                required
              />
              <CoreInput
                control={control}
                name='body2Size'
                type='number'
                label='Chọn size (rem)'
                style={{
                  width: '100px',
                }}
                placeholder='Chọn size'
              />
            </div>
          }
        />

        <MyRow
          title={<Typography variant='caption'>Caption</Typography>}
          subTitle={
            <Typography variant='caption'>
              Define styles for default Caption
            </Typography>
          }
          content={
            <div className='flex gap-14'>
              <ChooseColor name='captionColor' control={control} />
              <CoreAutocomplete
                style={{
                  width: '260px',
                }}
                name='captionFont'
                control={control}
                placeholder='Chọn font'
                options={fontSelect}
                required
              />
              <CoreInput
                control={control}
                name='captionSize'
                type='number'
                label='Chọn size (rem)'
                style={{
                  width: '100px',
                }}
                placeholder='Chọn size'
              />
            </div>
          }
        />
      </Grid>

      <div className='flex justify-center items-center w-full my-13'>
        <div className='flex gap-14'>
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

export default FontConfig
