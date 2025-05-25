import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import { Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import ChooseColor from '../ChooseColor'
import MyRow from '../MyRow'
import { useButtonConfig } from './useButtonConfig'

const ButtonConfig = ({ refetch }: { refetch: any }) => {
  const [values, handles] = useButtonConfig(refetch)
  const {
    register,
    watch,
    setError,
    control,
    formState,
    trigger,
    reset,
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
        <Typography variant='subtitle1'>Button Styles</Typography>
      </div>

      <Grid container spacing={{ xs: 1, sm: 2, md: 3 }} className='py-15 px-25'>
        <MyRow
          title={<Typography variant='body1'>Button Submit</Typography>}
          subTitle={
            <Typography variant='caption'>
              Define styles for Button Submit
            </Typography>
          }
          content={
            <div className='w-full'>
              <div className='grid grid-cols-4 gap-10'>
                <div className='flex flex-col gap-2'>
                  <Typography variant='body2'>Text Color</Typography>
                  <ChooseColor
                    name='submitButton.textColor'
                    control={control}
                  />
                </div>
                <div className='flex flex-col gap-2'>
                  <Typography variant='body2'>Hover Text Color</Typography>
                  <ChooseColor
                    name='submitButton.hoverTextColor'
                    control={control}
                  />
                </div>
                <div className='flex flex-col gap-2'>
                  <Typography variant='body2'>Background Color</Typography>
                  <ChooseColor
                    name='submitButton.backgroundColor'
                    control={control}
                  />
                </div>
                <div className='flex flex-col gap-2'>
                  <Typography variant='body2'>
                    Background Hover Color
                  </Typography>
                  <ChooseColor
                    name='submitButton.backgroundHoverColor'
                    control={control}
                  />
                </div>

                <div className='flex flex-col gap-2'>
                  <Typography variant='body2'>Border Color</Typography>
                  <ChooseColor
                    name='submitButton.borderColor'
                    control={control}
                  />
                </div>

                <div className='flex flex-col gap-2'>
                  <Typography variant='body2'>Border Hover Color</Typography>
                  <ChooseColor
                    name='submitButton.borderHoverColor'
                    control={control}
                  />
                </div>
              </div>
            </div>
          }
        />

        <MyRow
          title={<Typography variant='body1'>Button Draft</Typography>}
          subTitle={
            <Typography variant='caption'>
              Define styles for Button Draft
            </Typography>
          }
          content={
            <div className='w-full'>
              <div className='grid grid-cols-4 gap-10'>
                <div className='flex flex-col gap-2'>
                  <Typography variant='body2'>Text Color</Typography>
                  <ChooseColor name='draftButton.textColor' control={control} />
                </div>
                <div className='flex flex-col gap-2'>
                  <Typography variant='body2'>Hover Text Color</Typography>
                  <ChooseColor
                    name='draftButton.hoverTextColor'
                    control={control}
                  />
                </div>
                <div className='flex flex-col gap-2'>
                  <Typography variant='body2'>Background Color</Typography>
                  <ChooseColor
                    name='draftButton.backgroundColor'
                    control={control}
                  />
                </div>
                <div className='flex flex-col gap-2'>
                  <Typography variant='body2'>
                    Background Hover Color
                  </Typography>
                  <ChooseColor
                    name='draftButton.backgroundHoverColor'
                    control={control}
                  />
                </div>

                <div className='flex flex-col gap-2'>
                  <Typography variant='body2'>Border Color</Typography>
                  <ChooseColor
                    name='draftButton.borderColor'
                    control={control}
                  />
                </div>

                <div className='flex flex-col gap-2'>
                  <Typography variant='body2'>Border Hover Color</Typography>
                  <ChooseColor
                    name='draftButton.borderHoverColor'
                    control={control}
                  />
                </div>
              </div>
            </div>
          }
        />

        <MyRow
          title={<Typography variant='body1'>Button Reject</Typography>}
          subTitle={
            <Typography variant='caption'>
              Define styles for Button Reject
            </Typography>
          }
          content={
            <div className='w-full'>
              <div className='grid grid-cols-4 gap-10'>
                <div className='flex flex-col gap-2'>
                  <Typography variant='body2'>Text Color</Typography>
                  <ChooseColor
                    name='rejectButton.textColor'
                    control={control}
                  />
                </div>
                <div className='flex flex-col gap-2'>
                  <Typography variant='body2'>Hover Text Color</Typography>
                  <ChooseColor
                    name='rejectButton.hoverTextColor'
                    control={control}
                  />
                </div>
                <div className='flex flex-col gap-2'>
                  <Typography variant='body2'>Background Color</Typography>
                  <ChooseColor
                    name='rejectButton.backgroundColor'
                    control={control}
                  />
                </div>
                <div className='flex flex-col gap-2'>
                  <Typography variant='body2'>
                    Background Hover Color
                  </Typography>
                  <ChooseColor
                    name='rejectButton.backgroundHoverColor'
                    control={control}
                  />
                </div>

                <div className='flex flex-col gap-2'>
                  <Typography variant='body2'>Border Color</Typography>
                  <ChooseColor
                    name='rejectButton.borderColor'
                    control={control}
                  />
                </div>

                <div className='flex flex-col gap-2'>
                  <Typography variant='body2'>Border Hover Color</Typography>
                  <ChooseColor
                    name='rejectButton.borderHoverColor'
                    control={control}
                  />
                </div>
              </div>
            </div>
          }
        />

        <MyRow
          title={<Typography variant='body1'>Button Reset</Typography>}
          subTitle={
            <Typography variant='caption'>
              Define styles for Button Reset
            </Typography>
          }
          content={
            <div className='w-full'>
              <div className='grid grid-cols-4 gap-10'>
                <div className='flex flex-col gap-2'>
                  <Typography variant='body2'>Text Color</Typography>
                  <ChooseColor name='resetButton.textColor' control={control} />
                </div>
                <div className='flex flex-col gap-2'>
                  <Typography variant='body2'>Hover Text Color</Typography>
                  <ChooseColor
                    name='resetButton.hoverTextColor'
                    control={control}
                  />
                </div>
                <div className='flex flex-col gap-2'>
                  <Typography variant='body2'>Background Color</Typography>
                  <ChooseColor
                    name='resetButton.backgroundColor'
                    control={control}
                  />
                </div>
                <div className='flex flex-col gap-2'>
                  <Typography variant='body2'>
                    Background Hover Color
                  </Typography>
                  <ChooseColor
                    name='resetButton.backgroundHoverColor'
                    control={control}
                  />
                </div>

                <div className='flex flex-col gap-2'>
                  <Typography variant='body2'>Border Color</Typography>
                  <ChooseColor
                    name='resetButton.borderColor'
                    control={control}
                  />
                </div>

                <div className='flex flex-col gap-2'>
                  <Typography variant='body2'>Border Hover Color</Typography>
                  <ChooseColor
                    name='resetButton.borderHoverColor'
                    control={control}
                  />
                </div>
              </div>
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

export default ButtonConfig
