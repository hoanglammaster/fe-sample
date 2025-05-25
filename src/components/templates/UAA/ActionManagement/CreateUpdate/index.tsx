import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import CoreInput from '@/components/atoms/CoreInput'
import PageContainer from '@/components/layouts/MultipleLayouts/Layout1/components/PageContainer'
import { UAA_CHILDREN_PATH } from '@/routes'
import { LoadingButton } from '@mui/lab'
import { Button, CircularProgress, Typography } from '@mui/material'
import useCreateUpdateAction from './useCreateUpdateAction'
import { renderStatus, STATUS_UAA } from '@/helper/utils'
import { PublishDialog } from '../../SystemManagement/Dialog/PublishDialog'
import { REGEX } from '@/helper/regex'

const CreateUpdateAction = () => {
  const [values, handles] = useCreateUpdateAction()
  const {
    methodForm,
    t,
    router,
    isLoadingSubmit,
    isView,
    isEdit,
    id,
    loading,
  } = values
  const { onSubmit, handlePublishAction, showDialog } = handles

  const { control, watch } = methodForm
  const status = watch('status')
  const version = watch('version')

  return (
    <PageContainer
      title={
        <div>
          <CoreBreadcrumbs
            textCurrent={
              isView
                ? t('common:btn.viewDetail')
                : isEdit
                ? t('common:btn.edit')
                : t('common:btn.addNew')
            }
            textPrev={t('title.title')}
            prevUrl={UAA_CHILDREN_PATH.ACTION_MANAGEMENT}
          />
          <Typography variant='h1' className='mt-10'>
            {isView
              ? t('title.view')
              : isEdit
              ? t('title.edit')
              : t('title.addNew')}
          </Typography>
        </div>
      }
    >
      <form onSubmit={onSubmit}>
        {loading ? (
          <CircularProgress />
        ) : (
          <div>
            <div className='grid grid-cols-2 gap-10 mb-10'>
              <CoreInput
                control={control}
                name='code'
                label={t('label.actionCode')}
                required={!isView}
                readOnly={isView || (isEdit && status === 'PUBLISHED')}
                inputProps={{ maxLength: 20 }}
                rules={{
                  validate: {
                    isAlias: (v: string) =>
                      REGEX.CODE_STRING_NUMBER_ONLY.test(v) ||
                      t('common:validation.isInvalid', {
                        label: t('label.actionCode'),
                      }),
                  },
                }}
              />
              <CoreInput
                control={control}
                name='name'
                label={t('label.actionName')}
                required={!isView}
                readOnly={isView}
                inputProps={{ maxLength: 255 }}
                rules={{
                  validate: (v: string) =>
                    v.trim().length > 0 ||
                    t('common:validation.enter', {
                      msg: t('label.actionName'),
                    }),
                }}
              />
              <CoreInput
                control={control}
                name='index'
                transform={{
                  output: (val: any) => {
                    const stringVal = val.target.value
                    return stringVal ? stringVal?.replace(/\D/g, '') : val
                  },
                }}
                label={t('label.sequenceNumber')}
                required={!isView}
                readOnly={isView}
                inputProps={{
                  maxLength: 3,
                  style: { textAlign: !!watch('index') ? 'right' : 'left' },
                }}
              />
            </div>
            <CoreInput
              control={control}
              name='description'
              label={t('label.description')}
              inputType='multi'
              readOnly={isView}
              inputProps={{ maxLength: 255 }}
            />
            <div className='mt-10'>
              <Typography sx={{ fontSize: '13px' }}>
                {t('common:status')}: {renderStatus(status)}
              </Typography>
            </div>
            {isView ? (
              <div className='flex justify-center gap-10 mt-10'>
                {status === STATUS_UAA.DRAFT ? (
                  <LoadingButton
                    variant='outlined'
                    type='button'
                    onClick={() =>
                      showDialog(
                        <PublishDialog
                          onSubmit={() => handlePublishAction(id, version)}
                          t={t}
                        />
                      )
                    }
                    // loading={isSubmitting}
                  >
                    Publish
                  </LoadingButton>
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <div className='flex justify-center gap-10 mt-10'>
                <Button
                  variant='text'
                  style={{ padding: '0 25px' }}
                  onClick={() =>
                    router.push(UAA_CHILDREN_PATH.ACTION_MANAGEMENT)
                  }
                >
                  {t('common:btn.cancel')}
                </Button>
                <LoadingButton
                  variant='contained'
                  type='submit'
                  loading={isLoadingSubmit}
                >
                  {t('common:btn.save')}
                </LoadingButton>
              </div>
            )}
          </div>
        )}
      </form>
    </PageContainer>
  )
}

export default CreateUpdateAction
