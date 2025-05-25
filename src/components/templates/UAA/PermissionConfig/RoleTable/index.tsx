import {
  BACK_GROUND,
  GRAY_SCALE,
} from '@/components/layouts/WrapLayout/Theme/colors'
import { filterOptionsByName } from '@/helper/utils'
import { Box, Checkbox, Typography } from '@mui/material'
import React from 'react'

// import PropTypes from 'prop-types'

interface Props {
  listFeature: any[]
  listCheckedId: any[]
  setListCheckedId: (val: any[]) => void
  readOnly?: boolean
}

const RoleTable = (props: Props) => {
  const { listFeature, listCheckedId, setListCheckedId, readOnly } = props

  console.log('listCheckedId1', listCheckedId)

  const handleCheckedItem = (
    actionId: number,
    featureId: number,
    checked: boolean
  ) => {
    if (checked) {
      if (
        listCheckedId.some(
          (v) => v.actionId === null && v.featureId === featureId
        )
      ) {
        console.log('runThis1')
        setListCheckedId([...listCheckedId, { actionId, featureId }])
      } else {
        console.log('runThis2')
        setListCheckedId([
          ...listCheckedId,
          { actionId, featureId },
          { featureId, actionId: null },
        ])
      }
    } else {
      setListCheckedId(
        listCheckedId.filter(
          (v: any) => !(v.actionId === actionId && v.featureId === featureId)
        )
      )
    }
  }

  const handleCheckedAll = (item: any, checked: boolean) => {
    if (checked) {
      setListCheckedId([
        ...listCheckedId,
        { featureId: item.id, actionId: null },
      ])
    } else {
      setListCheckedId(listCheckedId.filter((v) => v.featureId !== item.id))
    }
  }

  const newListFeature = readOnly
    ? listFeature
        .filter((v) => {
          return listCheckedId?.some((v3) => v3.featureId === v.id)
        })
        .map((v) => {
          return {
            ...v,
            actions: v?.actions?.filter((v2) =>
              listCheckedId?.some(
                (v3) => v3.actionId === v2.id && v3.featureId === v.id
              )
            ),
          }
        })
    : listFeature

  const renderTable = () => {
    return filterOptionsByName(newListFeature ?? [], 'name')?.map(
      (item: any, index: number) => {
        const isChecked = listCheckedId.some(
          (v) => v.featureId === item.id && v.actionId === null
        )

        return (
          <Box key={index}>
            <Box
              className='flex w-full h-24 px-10 py-5 items-center gap-17 justify-between'
              sx={{
                backgroundColor: BACK_GROUND,
                border: `1px solid ${GRAY_SCALE}`,
              }}
            >
              <Typography
                sx={{ fontSize: '15px', fontWeight: '550' }}
                className='line-clamp-1'
                title={item?.name}
              >
                {item?.name}
              </Typography>
              {!readOnly && (
                <Checkbox
                  size='small'
                  checked={isChecked}
                  onChange={(e, checked) => handleCheckedAll(item, checked)}
                />
              )}
            </Box>
            <Box
              style={{ borderLeft: `1px solid ${GRAY_SCALE}` }}
              className='flex w-full flex-wrap'
            >
              {filterOptionsByName(item?.actions ?? [], 'name')?.map(
                (item2: any, index2: number) => {
                  const checkedApi = listCheckedId.some(
                    (v2) => v2.featureId === item.id && v2.actionId === item2.id
                  )
                  return (
                    <Box
                      className='flex w-full h-24 px-10 pl-20 items-center justify-between'
                      key={index2}
                      style={{
                        borderRight: `1px solid ${GRAY_SCALE}`,
                        borderBottom: `1px solid ${GRAY_SCALE}`,
                      }}
                    >
                      <Typography
                        variant='body2'
                        className='line-clamp-1'
                        title={item2?.name}
                      >
                        <span className='mr-10'>{index2 + 1}</span>
                        {item2?.name}
                      </Typography>
                      {!readOnly && (
                        <Checkbox
                          size='small'
                          readOnly={readOnly}
                          checked={checkedApi}
                          onChange={(e, checked) =>
                            handleCheckedItem(item2.id, item.id, checked)
                          }
                        />
                      )}
                    </Box>
                  )
                }
              )}
            </Box>
          </Box>
        )
      }
    )
  }
  return (
    <Box
      className='mt-20'
      sx={{
        maxHeight: '480px',
        overflow: 'auto',
        borderBottom: '0.5px #dfe0eb solid',
      }}
    >
      {renderTable()}
    </Box>
  )
}

//RoleTable.defaultProps = {}

//RoleTable.propTypes = {}

export default React.memo(RoleTable)
