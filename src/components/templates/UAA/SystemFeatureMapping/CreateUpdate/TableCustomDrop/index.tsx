import styled from '@emotion/styled'
import {
  Box,
  CircularProgress,
  Collapse,
  IconButton,
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
import { ReactElement, ReactNode, useEffect, useState } from 'react'
import { WHITE } from '@/components/layouts/WrapLayout/Theme/colors'
import PaginationCustom from '@/components/organism/PaginationCustom'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { containsTags } from '@/components/organism/TableCustom'
import { truncateText } from '@/components/atoms/TooltipCustom'

export interface ColumnProps {
  header: string | ReactElement
  fieldName?: string
  render?: (val: any, index: number) => ReactElement
  styleCell?: TableCellProps
  neverHidden?: boolean
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
  renderAdditional?: (val: Record<string, any>, index: number) => ReactNode
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

export const CustomTableDrop = ({
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
  renderAdditional,
}: Props) => {
  const { t } = useTranslation('common')
  const [showIndex, setShowIndex] = useState<number | null>(null)

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

  columns = [
    ...columns,
    {
      header: '',
      neverHidden: true,
      render: (row, index) => {
        const isChecked = index === showIndex
        return (
          <IconButton onClick={() => setShowIndex(isChecked ? null : index)}>
            {index === showIndex ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </IconButton>
        )
      },
    },
  ]
  useEffect(() => {
    console.log('runThis')
    setShowIndex(null)
  }, [page, size, isLoading])

  const listLongTextName = ['name', 'description', 'createdBy']

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
              _.map(data, (row: any, index) => {
                const isChecked = index === showIndex

                return (
                  <>
                    <TableRow
                      key={row?.key || row?.id || index}
                      onClick={() => setShowIndex(isChecked ? null : index)}
                      onDoubleClick={() => (onRowClick ? onRowClick(row) : {})}
                      sx={{
                        ':hover': {
                          backgroundColor: onRowClick ? '#F6F7FB' : WHITE,
                          cursor: onRowClick ? 'pointer' : undefined,
                        },
                      }}
                    >
                      {_.map(columns, (column, indexColumn) => {
                        const isTruncate = listLongTextName.some((item) =>
                          column.fieldName
                            ?.toLocaleLowerCase()
                            ?.includes(item.toLowerCase())
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
                            }}
                          >
                            <Box
                              className={isTruncate ? 'line-clamp-1' : ''}
                              style={{
                                width: isTruncate ? '200px' : undefined,
                              }}
                              // title={
                              //   isTruncate
                              //     ? !!column?.render
                              //       ? containsTags(column.render(row, index)) &&
                              //         column.render(row, index)
                              //       : column.fieldName &&
                              //         _.get(row, column.fieldName)
                              //     : undefined
                              // }
                            >
                              {/* {column?.fieldName && !column?.render && (
                                <>{_.get(row, column.fieldName)}</>
                              )}
                              {column?.render && column.render(row, index)} */}
                              {column?.fieldName && !column?.render && (
                                <>
                                  {isTruncate
                                    ? truncateText(
                                        !!column?.neverHidden ||
                                          containsTags(
                                            _.get(row, column.fieldName)
                                          )
                                          ? _.get(row, column.fieldName)
                                          : '-'
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
                    {renderAdditional && !!renderAdditional(row, index) && (
                      <TableRow>
                        <TableCellCommon
                          style={{ padding: 0 }}
                          colSpan={columns.length}
                        >
                          <Collapse in={index === showIndex}>
                            {renderAdditional(row, index)}
                          </Collapse>
                        </TableCellCommon>
                      </TableRow>
                    )}
                  </>
                )
              })
            )}
          </TableBody>
        </Table>
      </TableContainerCommon>
      {!paginationHidden && (
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
    </Box>
  )
}
