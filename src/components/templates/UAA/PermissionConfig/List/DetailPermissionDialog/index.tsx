/* eslint-disable react-hooks/exhaustive-deps */
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'

import LoadingPage from '@/components/atoms/LoadingPage'
import { errorMsg } from '@/helper/message'
import CloseIcon from '@mui/icons-material/Close'
import { getFeatureByProduct } from '../../../SystemManagement/service'
import RoleTable from '../../RoleTable'
import { getApiByProduct, getRoleDetail } from '../service'

const DetailPermissionDialog = (props: any) => {
  const { detail, onClose, t, listProduct } = props

  const [detailData, setDetailData] = useState<any>()
  const [listFeature, setListFeature] = useState<any[]>()
  const [loading, setLoading] = useState(false)

  const getAttachFeature = async (systemId: number) => {
    try {
      const res = await getFeatureByProduct({
        systemId,
        page: 0,
        pageSize: 1000,
      })
      setListFeature(res?.data?.data)
    } catch (err) {
      onClose()
    }
  }

  const getDetailRoleData = async (groupPermissionId: number) => {
    try {
      setLoading(true)
      const res = await getRoleDetail(groupPermissionId)
      const resApi = await getApiByProduct({
        groupPermissionId,
        page: 0,
        pageSize: 1000,
      })
      if (res?.data?.data?.systemId) {
        await getAttachFeature(res?.data?.data?.systemId)
      } else {
        setListFeature([])
      }
      setDetailData({
        ...res?.data?.data,
        apiIds: resApi?.data?.data?.map((v: any) => v.id),
      })
      setLoading(false)
    } catch (err) {
      onClose()
    }
  }

  useEffect(() => {
    if (detail?.id) {
      getDetailRoleData(detail?.id)
    }
  }, [detail])

  useEffect(() => {
    if (detailData?.systemId) {
      getAttachFeature(detailData?.systemId)
    }
  }, [detailData])

  return (
    <Dialog open={!!detail?.id} onClose={onClose} maxWidth='sm' fullWidth>
      <IconButton className='absolute top-4 right-4' onClick={onClose}>
        <CloseIcon fontSize='small' />
      </IconButton>
      {loading ? (
        <DialogContent>
          <Box className='w-50 h-50'>
            <LoadingPage />
          </Box>
        </DialogContent>
      ) : (
        <>
          <DialogTitle className='flex flex-col justify-center items-center'>
            <Typography variant='h3'>
              {t('title.detailRole', { name: detail?.name })}
            </Typography>
            <Typography variant='h3' color='primary'>
              {t('title.detailProduct', {
                name: listProduct.find((v: any) => v.id === detail?.systemId)
                  ?.name,
              })}
            </Typography>
          </DialogTitle>
          <DialogContent>
            {/* <RoleTable
              readOnly
              listFeature={listFeature ?? []}
              listCheckedId={detailData?.apiIds ?? []}
            /> */}
          </DialogContent>
        </>
      )}
    </Dialog>
  )
}

export default DetailPermissionDialog
