import { ColumnProps } from '@/components/organism/TableCustom'
import { Checkbox } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'

interface Props {
  t: any
  listFeature: any
  setValue: any
  isView: boolean
  form: any
}

const useListOfFeature = (props: Props) => {
  const { t, listFeature, setValue, isView, form } = props
  const { watch } = form
  const [listFeatureIds, setListFeatureIds] = useState<number[]>([])
  const watchFeatures = form.watch('features')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const watchFeatureIds = form.watch('featureIds') ?? []

  const isCheckAll =
    (listFeature ?? []).filter((v) => watchFeatureIds.includes(v?.id))
      .length === listFeature?.length

  useEffect(() => {
    watchFeatures?.length > 0 &&
      setListFeatureIds(watchFeatures.map((v) => v?.id))
  }, [watchFeatures])

  const columns = useMemo(
    () =>
      [
        {
          header: t('form.transType'),
          fieldName: '',
          render: (row) =>
            `${row?.transTypeCode ? row?.transTypeCode + ' - ' : ''}${
              row?.transTypeName ? row?.transTypeName : ''
            }`,
        },
        {
          header: t('form.service'),
          render: (row) =>
            `${row?.serviceCode ? row?.serviceCode + ' - ' : ''}${
              row?.serviceName ? row?.serviceName : ''
            }`,
        },
        {
          header: t('form.featureCode'),
          fieldName: 'code',
        },
        {
          header: t('form.featureName'),
          fieldName: 'name',
        },
        ...(isView
          ? []
          : [
              {
                header: (
                  <Checkbox
                    checked={isCheckAll}
                    onChange={(e, checked) => {
                      if (checked) {
                        const newVal = [
                          ...watchFeatureIds,
                          ...listFeature
                            .filter((v) => !watchFeatureIds.includes(v?.id))
                            .map((v2) => v2?.id),
                        ]
                        setValue('featureIds', newVal)
                      } else {
                        setValue(
                          'featureIds',
                          watchFeatureIds.filter(
                            (v) => !listFeature.some((v2) => v === v2?.id)
                          )
                        )
                      }
                    }}
                  />
                ),
                render: (v) => (
                  <Checkbox
                    sx={{ borderRadius: '4px' }}
                    onChange={(e, checked) => {
                      if (checked) {
                        const newValue = [...watchFeatureIds, v?.id]
                        setValue('featureIds', newValue)
                      } else {
                        setValue(
                          'featureIds',
                          watchFeatureIds.filter((v2) => v2 !== v?.id)
                        )
                      }
                    }}
                    checked={watchFeatureIds.includes(v?.id)}
                  />
                ),
                styleCell: {
                  style: { width: 10 },
                },
              },
            ]),
      ] as ColumnProps[],
    [isCheckAll, isView, listFeature, setValue, t, watchFeatureIds]
  )
  return { columns }
}

export default useListOfFeature
