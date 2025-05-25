import { useState, useEffect } from 'react'
// import CircularProgress from "@mui/material/CircularProgress";
import { useTranslation } from 'next-i18next'
import CoreDialog from '@/components/molecules/CoreDialog'
import ListUserDialog from './ListUserDialog'
import { getListUsersByRole } from './service'
import { errorMsg } from '@/helper/message'
import { TRANSLATE_UAA } from '@/routes'

export const useListUserDialog = () => {
  const { t } = useTranslation(TRANSLATE_UAA.SCOPE)
  // const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false)
  const [listUsers, setListUsers] = useState([])
  const [id, setId] = useState(null)

  const handleOpenListUseDialog = (id: any) => {
    setId(id)
    setOpen(true)
  }

  const handleCloseListUserDialog = () => {
    setOpen(false)
  }

  const renderListUserDialog = () => {
    return (
      <CoreDialog
        open={open}
        maxWidth='lg'
        dialogTitle={`${t('title.list-user-dialog')}`}
        handleClose={handleCloseListUserDialog}
        dialogContent={<ListUserDialog listUsers={listUsers} t={t} />}
      />
    )
  }

  const fetchData = async (id: number) => {
    try {
      await getListUsersByRole(id).then((res: any) =>
        setListUsers(res?.data?.data)
      )
    } catch (error) {}
  }

  useEffect(() => {
    if (id) {
      fetchData(id)
    }
    // eslint-disable-next-line
  }, [id])

  return {
    handleOpenListUseDialog,
    handleCloseListUserDialog,
    renderListUserDialog,
  }
}
