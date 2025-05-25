import { WHITE } from '@/components/layouts/WrapLayout/Theme/colors'
import styled from '@emotion/styled'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import {
  Box,
  CircularProgress,
  MenuItem,
  Pagination,
  PaginationItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import _, { map } from 'lodash'
import { useTranslation } from 'next-i18next'
import { ReactElement, ReactNode } from 'react'

export interface ColumnProps {
  header: string | ReactElement
  fieldName?: string
  render?: (val: any, index: number) => ReactElement
  styleCell?: TableCellProps
}

type PaginationTableProps = {
  page?: number
  size?: number
}

type Props = {
  className?: string
  data: Record<string, any>[]
  columns: ColumnProps[]
  page?: number
  size?: number
  totalPages?: number
  onChangePageSize?: (val: PaginationTableProps) => void
  paginationHidden?: boolean
  isLoading?: boolean
  isShowColumnStt?: boolean
  maxHeight?: number
  onRowClick?: (val: Record<string, any>) => void
  checkSelected?: (val: Record<string, any>) => boolean
}

export const TableHeadCommon = styled(TableHead)(() => ({
  background: '#F6F7FB',
  // border: '1px solid #DFE0EB',
}))

export const TableCellCommon = styled(TableCell)(() => ({
  border: 'none',
  '&:first-of-type': {
    // borderLeft: '1px solid #DFE0EB',
  },
  '&:last-of-type': {
    // borderRight: '1px solid #DFE0EB',
  },
}))

export const TableContainerCommon = styled(TableContainer)(() => ({
  boxShadow: 'none!important',
  borderRadius: '4px 4px 0px 0px',
  border: '1px solid #DFE0EB',
}))

export const TableMappingCustom = ({
  className,
  data,
  columns,
  page = 0,
  size = 20,
  totalPages,
  paginationHidden,
  onChangePageSize,
  isLoading,
  isShowColumnStt = false,
  maxHeight,
  onRowClick,
  checkSelected,
}: Props) => {
  const { t } = useTranslation('common')
  if (isShowColumnStt) {
    columns = [
      {
        header: 'No',
        fieldName: 'index',
        styleCell: { style: { width: 100 } },
      },
      ...columns,
    ]
    data = data.map((item: any, index: number) => {
      const noNumber = page * size + index + 1
      return {
        ...item,
        index: noNumber > 9 ? noNumber : `${noNumber}`,
      }
    })
  }

  const pageSizeOptions = [10, 20, 50, 100]

  return (
    <Box className={className}>
      <TableContainerCommon
        style={{
          maxHeight: `${maxHeight}px`,
        }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHeadCommon>
            <TableRow>
              {_.map(columns, (column, index) => (
                <TableCell
                  variant='head'
                  key={index}
                  {...(column?.styleCell ?? {})}
                  className='font-semibold first-letter:uppercase'
                >
                  {column?.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHeadCommon>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCellCommon colSpan={columns.length} variant='body'>
                  <div className='flex justify-center min-h-[30px]'>
                    <CircularProgress />
                  </div>
                </TableCellCommon>
              </TableRow>
            ) : data?.length === 0 ? (
              <TableRow>
                <TableCellCommon
                  colSpan={columns.length}
                  variant='body'
                  align='center'
                  className='py-8'
                >
                  <Typography variant='body1' className='italic'>
                    {t('table.no_data')}
                  </Typography>
                </TableCellCommon>
              </TableRow>
            ) : (
              _.map(data, (row: any, index) => (
                <>
                  <TableRow
                    key={row?.key || row?.id || index}
                    onClick={() => (onRowClick ? onRowClick(row) : {})}
                    sx={{
                      backgroundColor:
                        checkSelected && checkSelected(row) ? '#F6F7FB' : WHITE,
                      ':hover': {
                        backgroundColor: onRowClick ? '#F6F7FB' : WHITE,
                        cursor: onRowClick ? 'pointer' : undefined,
                      },
                    }}
                  >
                    {_.map(columns, (column, indexColumn) => {
                      return (
                        <TableCellCommon
                          key={indexColumn}
                          {...column.styleCell}
                          style={{
                            borderBottom:
                              index !== data.length - 1
                                ? '1px solid rgba(224, 224, 224, 1)'
                                : '',
                          }}
                        >
                          {column?.fieldName && !column?.render && (
                            <>{_.get(row, column.fieldName)}</>
                          )}
                          {column?.render && column.render(row, index)}
                        </TableCellCommon>
                      )
                    })}
                  </TableRow>
                </>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainerCommon>
      {!paginationHidden && (
        <div className='py-5 flex flex-3 items-center w-full justify-space-between'>
          <div className='w-full' />
          <Pagination
            color='primary'
            className='w-full'
            variant='outlined'
            onChange={(e, value) => {
              onChangePageSize &&
                onChangePageSize({ page: value - 1, size: size })
            }}
            siblingCount={1}
            page={page + 1 ?? 1}
            count={totalPages}
            renderItem={(item) => {
              return (
                <PaginationItem
                  slots={{
                    last: KeyboardDoubleArrowRightIcon,
                    first: KeyboardDoubleArrowLeftIcon,
                  }}
                  {...item}
                />
              )
            }}
          />
          <div className='flex items-center w-full items-end justify-end'>
            <Typography variant='body2'>{t('table.rowPerPage')}</Typography>
            <Select
              sx={{
                minHeight: 0,
                paddingTop: '1px',
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
              }}
              value={size}
              onChange={(e: any) =>
                onChangePageSize &&
                onChangePageSize({ page: 0, size: e.target.value })
              }
            >
              {map(pageSizeOptions, (option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>
      )}
    </Box>
  )
}
