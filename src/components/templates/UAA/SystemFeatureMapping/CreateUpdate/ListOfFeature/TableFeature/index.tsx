import { CustomTable } from '@/components/organism/TableCustom'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import {
  MenuItem,
  Pagination,
  PaginationItem,
  Select,
  Typography,
} from '@mui/material'
import { map } from 'lodash'

interface Props {
  data: any
  columns: any
  isLoading?: boolean
  page?: number
  size?: number
  totalPages?: number
  onChangePageSize: (val: PaginationTableProps) => void
}

type PaginationTableProps = {
  page?: number
  size?: number
}

const pageSizeOptions = [10, 20, 50, 100]
const TableFeature = ({
  data,
  columns,
  isLoading,
  page,
  size,
  totalPages,
  onChangePageSize,
}: Props) => {
  return (
    <div>
      <CustomTable
        data={data ?? []}
        columns={columns}
        {...data}
        isLoading={isLoading}
        isShowColumnStt
        paginationHidden
        page={page}
        size={size}
      />
      <div className='py-5 flex flex-3 items-center w-full justify-space-between'>
        <div className='w-full' style={{ maxWidth: '30%' }} />
        <div className='w-full'>
          <Pagination
            color='primary'
            className='w-full'
            variant='outlined'
            onChange={(e, value) => {
              onChangePageSize &&
                onChangePageSize({ page: value - 1, size: size })
            }}
            siblingCount={1}
            page={!!page ? page + 1 : 1}
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
        </div>
        <div
          className='flex items-center w-full items-end justify-end'
          style={{ maxWidth: '30%' }}
        >
          <Typography variant='body2'>Rows per page</Typography>
          <Select
            sx={{
              minHeight: 0,
              paddingTop: '2px',
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
    </div>
  )
}

export default TableFeature
