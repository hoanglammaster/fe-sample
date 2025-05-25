import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import { Grid, Typography } from '@mui/material'
import { useConfig } from './useConfig'
import { useRouter } from 'next/router'
import { CustomTable } from '@/components/organism/TableCustom'
import CoreInput from '@/components/atoms/CoreInput'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'

export const Config = () => {
  const router = useRouter()
  const [values, handles] = useConfig()
  const {
    control,
    rowConfig,
    columns,
    data,
    t,
    isLoading,
    listConfigGroup,
    isLoadingConfigGroup,
    queryPage,
    setQueryPage,
  } = values

  const { onChangePageSize, onSubmit } = handles
  return (
    <div className='bg-[#f4f4f4] w-full flex flex-col p-15'>
      <div className='flex gap-10'>
        <Typography variant='h1'>{t('title')}</Typography>
        {/* <ButtonCustom
          theme='reset'
          height={32}
          width={104}
          fontSize={14}
          onClick={() => router.push(`${PATH_MENU_NOTIFY.EMAIL.FEATURE}/register`)}
        >
          {t('common:btn.register')}
        </ButtonCustom> */}
      </div>
      <form onSubmit={onSubmit}>
        <div className='bg-[#ffffff] mt-15 rounded-xl p-15'>
          <Typography variant='h3'>{t('common:searchByFilter')}</Typography>

          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }} className='pt-10'>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <CoreAutocomplete
                control={control}
                name='groupId'
                label={t('text.configGroup')}
                className='mb-12'
                valuePath='groupId'
                labelPath='groupName'
                options={[
                  { groupId: null, groupName: 'All' },
                  ...listConfigGroup,
                ]}
                disableClearable
                loading={isLoadingConfigGroup}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <CoreInput
                control={control}
                name='search'
                label={t('search')}
                placeholder={t('placeholder.search')}
                inputProps={{ maxLength: 255 }}
              />
            </Grid>
          </Grid>
          <div className='text-center'>
            <ButtonCustom
              type='submit'
              theme='submit'
              fontSize={14}
              width={120}
              height={42}
            >
              {t('common:btn.search')}
            </ButtonCustom>
          </div>
        </div>
      </form>
      <div className='bg-[#ffffff] mt-15 rounded-xl p-15'>
        <CustomTable
          columns={columns}
          isShowColumnStt
          {...data}
          {...queryPage}
          data={rowConfig}
          onChangePageSize={onChangePageSize}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}
