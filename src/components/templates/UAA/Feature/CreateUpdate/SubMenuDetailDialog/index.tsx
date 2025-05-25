import { DialogCustom } from '@/components/organism/DialogCustom'
import React from 'react'
import { SaveSubMenu } from '../../../SubMenu/Save'

interface Props {
  id: number
  open: boolean
  onClose: () => void
}

const SubMenuDetailDialog = (props: Props) => {
  const { id, onClose, open } = props
  return (
    <DialogCustom title='View Action' open={open} onClose={onClose}>
      <SaveSubMenu viewId={id} />
    </DialogCustom>
  )
}

export default SubMenuDetailDialog
