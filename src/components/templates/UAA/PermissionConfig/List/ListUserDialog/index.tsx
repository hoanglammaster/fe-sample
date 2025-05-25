import React from 'react'
import {
  Box,
  Card,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Chip,
} from '@mui/material'
import { GRAY_SCALE } from '@/components/layouts/WrapLayout/Theme/colors'

const ListUserDialog = (props: any) => {
  const { t, listUsers } = props
  return (
    <Box>
      <Card>
        <Table>
          <colgroup>
            <col />
            <col />
            <col />
            <col />
          </colgroup>
          <TableHead style={{ backgroundColor: GRAY_SCALE }}>
            <TableRow className='border-t'>
              <TableCell>{t('column.name')}</TableCell>
              <TableCell>{t('column.phone_number')}</TableCell>
              <TableCell>{t('column.email')}</TableCell>
              <TableCell>{t('column.permission_group')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listUsers?.map((item: any, index: number) => {
              return (
                <TableRow key={index}>
                  <TableCell>{`${item.lastName} ${item.firstName}`}</TableCell>
                  <TableCell>{item.phoneNumber}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>
                    {item?.roles?.map((item_1: any, index_1: number) => {
                      return (
                        <div key={index_1} className='my-4'>
                          <Chip label={item_1.name} />
                        </div>
                      )
                    })}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Card>
    </Box>
  )
}

export default React.memo(ListUserDialog)
