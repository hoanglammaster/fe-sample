import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import CoreInput from '@/components/atoms/CoreInput'
import { CustomTable } from '@/components/organism/TableCustom'
import { Grid, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useConfig } from './useConfig'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { UAA_CHILDREN_PATH } from '@/routes'

const Config = () => {
  const { t } = useTranslation('uaa/config')
  const router = useRouter()
  const [values, handles] = useConfig()
  const { control, content, columns, isLoading, data } = values
  const { onSubmit, onChangePageSize } = handles

  return (
    <div className='bg-[#f4f4f4] w-full flex flex-col p-15'>
      <div className='flex gap-10'>
        <Typography variant='h1'>{t('title')}</Typography>
      </div>
      <form onSubmit={onSubmit}>
        <div className='bg-[#ffffff] mt-15 rounded-xl p-15'>
          <Typography variant='h3'>{t('common:searchByFilter')}</Typography>

          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }} className='pt-10'>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <CoreAutocomplete
                control={control}
                name='configGroupId'
                label={t('configGroupName')}
                options={[]}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <CoreInput
                control={control}
                name='search'
                label='Search'
                placeholder={t('placeholder.search')}
                inputProps={{ maxLength: 255 }}
              />
            </Grid>
          </Grid>
          <div className='mt-12 text-center'>
            <ButtonCustom
              type='submit'
              theme='submit'
              fontSize={14}
              width={120}
              height={42}
            >
              {t('common:search')}
            </ButtonCustom>
          </div>
        </div>
      </form>
      <div className='bg-[#ffffff] mt-15 rounded-xl p-15'>
        <CustomTable
          columns={columns}
          isShowColumnStt
          data={content}
          onChangePageSize={onChangePageSize}
          isLoading={isLoading}
          onRowClick={(val) => {
            router.push({
              pathname: `${UAA_CHILDREN_PATH.CONFIG}/view/[id]`,
              query: {
                id: val.id,
              },
            })
          }}
          {...data}
        />
      </div>
    </div>
  )
}

export default Config
