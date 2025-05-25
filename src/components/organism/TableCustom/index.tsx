import styled from '@emotion/styled'
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import React, { ReactElement, isValidElement } from 'react'
import PaginationCustom from '../PaginationCustom'
import { WHITE } from '@/components/layouts/WrapLayout/Theme/colors'
import { truncateText } from '@/components/atoms/TooltipCustom'

export const containsTags = (
  element: ReactElement | string | null | undefined,
  isSecond?: boolean,
  isChecked?: boolean
): boolean => {
  if (isChecked) {
    console.log('elementtt', element)
  }
  if (typeof element === 'string') {
    return element.trim().length > 0
  }

  if (!element) {
    return isSecond ? false : true
  }

  if (!element?.props?.children) {
    return isSecond ? false : true
  }

  const children = element.props.children
  if (Array.isArray(children)) {
    return children.some((child) => containsTags(child, true))
  } else {
    return containsTags(children, true)
  }
}

export interface ColumnProps {
  header: string | ReactElement
  fieldName?: string
  render?: (val: any, index: number) => ReactElement
  styleCell?: TableCellProps
  neverHidden?: boolean
}

type PaginationTableProps = {
  page: number
  size: number
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

export const CustomTable = ({
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
}: Props) => {
  const { t } = useTranslation('common')
  if (isShowColumnStt) {
    columns = [
      {
        header: 'No',
        fieldName: 'index',
        styleCell: { style: { width: 50 } },
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

  const listLongTextName = [
    'name',
    'description',
    'createdBy',
    'reason',
    'code',
  ]

  return (
    <Box className={className}>
      <TableContainerCommon
        style={{
          maxHeight: `${maxHeight}px`,
        }}
      >
        <Table sx={{ minWidth: 650 }} stickyHeader>
          <TableHeadCommon>
            <TableRow>
              {_.map(columns, (column, index) => (
                <TableCell
                  variant='head'
                  key={index}
                  {...(column?.styleCell ?? {})}
                  className='font-semibold first-letter:uppercase bg-[#F6F7FB]'
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
                <TableRow
                  key={row?.key || row?.id || index}
                  onDoubleClick={() => {
                    onRowClick ? onRowClick(row) : {}
                  }}
                  sx={{
                    ':hover': {
                      backgroundColor: onRowClick ? '#F6F7FB' : WHITE,
                      cursor: onRowClick ? 'pointer' : undefined,
                    },
                  }}
                >
                  {_.map(columns, (column, indexColumn) => {
                    const isTruncate = listLongTextName.some((item) =>
                      column.fieldName?.toLocaleLowerCase()?.includes(item)
                    )

                    return (
                      <TableCellCommon
                        key={indexColumn}
                        {...column.styleCell}
                        style={{
                          borderBottom:
                            index !== data.length - 1
                              ? '1px solid rgba(224, 224, 224, 1)'
                              : '',
                          lineHeight: '120%',
                        }}
                      >
                        <Box
                          style={{ maxWidth: isTruncate ? '200px' : undefined }}
                        >
                          {column?.fieldName && !column?.render && (
                            <>
                              {isTruncate
                                ? truncateText(
                                    !!column?.neverHidden ||
                                      containsTags(_.get(row, column.fieldName))
                                      ? _.get(row, column.fieldName)
                                      : '-',
                                    18
                                  )
                                : !!column?.neverHidden ||
                                  containsTags(_.get(row, column.fieldName))
                                ? _.get(row, column.fieldName)
                                : '-'}
                            </>
                          )}
                          {isTruncate
                            ? truncateText(
                                column?.render &&
                                  (!!column?.neverHidden ||
                                  containsTags(column.render(row, index))
                                    ? column.render(row, index)
                                    : '-')
                              )
                            : column?.render &&
                              (!!column?.neverHidden ||
                              containsTags(column.render(row, index))
                                ? column.render(row, index)
                                : '-')}
                        </Box>
                      </TableCellCommon>
                    )
                  })}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainerCommon>
      {!paginationHidden && (
        <>
          {!isLoading && !!data?.length && (
            <div className='py-5'>
              <PaginationCustom
                size={size ?? 1}
                page={page ?? 1}
                totalPages={totalPages ?? 1}
                onChangePagination={(val: any) =>
                  onChangePageSize && onChangePageSize(val)
                }
              />
            </div>
          )}
        </>
      )}
    </Box>
  )
}
