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
  listCheckedId: number[]
  setListCheckedId: (val: number[]) => void
  readOnly?: boolean
}

const RoleTable = (props: any) => {
  const { listFeature, listCheckedId, setListCheckedId, readOnly } = props

  const handleCheckedItem = (id: number, checked: boolean) => {
    checked
      ? setListCheckedId(listCheckedId.concat(id))
      : setListCheckedId(listCheckedId.filter((v: number) => v !== id))
  }

  const handleCheckedAll = (item: any, checked: boolean) => {
    checked
      ? setListCheckedId(
          listCheckedId?.concat(
            item.apis
              ?.filter((v: any) => !listCheckedId?.includes(v.id))
              ?.map((v: any) => v.id)
          )
        )
      : setListCheckedId(
          listCheckedId?.filter(
            (v: any) => !item.apis?.some((v2: any) => v2.id === v)
          )
        )
  }
  console.log(listFeature, 'watchFeature')
  const newListFeature = readOnly
    ? listFeature
        .filter((v) => {
          return v.apis.some((v2) => listCheckedId?.includes(v2.id))
        })
        .map((v) => {
          return {
            ...v,
            apis: v.apis.filter((v2) => listCheckedId?.includes(v2.id)),
          }
        })
    : listFeature

  const renderTable = () => {
    return filterOptionsByName(
      newListFeature.map((v) => {
        return { ...v, subName: v?.code + ' - ' + v?.name }
      }),
      'subName'
    )?.map((item: any, index: number) => {
      const isChecked =
        item.apis?.filter((v: any) => listCheckedId?.includes(v.id))?.length ===
        item.apis?.length
      return (
        <Box key={index}>
          <Box
            className='flex w-full h-30 px-10 py-5 items-center gap-17 justify-between'
            sx={{
              backgroundColor: BACK_GROUND,
              border: `1px solid ${GRAY_SCALE}`,
            }}
          >
            <Typography sx={{ fontSize: '15px', fontWeight: '550' }}>
              {item?.code + ' - ' + item?.name}
            </Typography>
            {item?.apis?.length > 0 && !readOnly && (
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
            {filterOptionsByName(
              item?.apis?.map((v) => {
                return { ...v, subName: v?.code + ' - ' + v?.name }
              }) ?? [],
              'subName'
            )?.map((item2: any, index2: number) => {
              const checkedApi = listCheckedId.includes(item2.id)
              const optionName = item2?.code + ' - ' + item2?.name
              return (
                <Box
                  className='flex w-full h-24 px-10 pl-20 items-center justify-between'
                  key={index2}
                  style={{
                    borderRight: `1px solid ${GRAY_SCALE}`,
                    borderBottom: `1px solid ${GRAY_SCALE}`,
                  }}
                >
                  <Box className='flex '>
                    <Typography variant='body2' className='mr-10'>
                      {index2 + 1}
                    </Typography>
                    <Typography variant='body2' className='line-clamp-1'>
                      {optionName}
                    </Typography>
                  </Box>
                  {!readOnly && (
                    <Checkbox
                      size='small'
                      readOnly={readOnly}
                      checked={checkedApi}
                      onChange={(e, checked) =>
                        handleCheckedItem(item2.id, checked)
                      }
                    />
                  )}
                </Box>
              )
            })}
          </Box>
        </Box>
      )
    })
  }
  return (
    <Box className='mt-5' sx={{ maxHeight: '550px', overflow: 'auto' }}>
      {renderTable()}
    </Box>
  )
}

//RoleTable.defaultProps = {}

//RoleTable.propTypes = {}

export default React.memo(RoleTable)
