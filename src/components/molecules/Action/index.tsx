import ActionProvider from '@/components/atoms/ActionProvider'
import { IconButton } from '@mui/material'
import Image from 'next/image'

type Action =
  | 'delete'
  | 'watch'
  | 'edit'
  | 'add'
  | 'download'
  | 'lock'
  | 'unlock'
  | 'sync'
  | 'reset'
  | 'send'
  | 'cancel'

interface ActionProps {
  editAction?: string
  watchAction?: string
  deleteAction?: string
  addAction?: string
  downloadAction?: string
  lockAction?: string
  unlockAction?: string
  syncAction?: string
  resetAction?: string
  sendAction?: string
  cancelAction?: string
}

interface Props extends ActionProps {
  actionList: Action[]
  onWatchAction?: () => void
  onDeleteAction?: () => void
  onEditAction?: () => void
  onAddAction?: () => void
  onDownloadAction?: () => void
  onLockAction?: () => void
  onUnlockAction?: () => void
  onSyncAction?: () => void
  onResetAction?: () => void
  onSendAction?: () => void
  onCancelAction?: () => void
}

export const Action = ({
  actionList,
  onWatchAction,
  onDeleteAction,
  onEditAction,
  onAddAction,
  onDownloadAction,
  onLockAction,
  onUnlockAction,
  onSyncAction,
  onResetAction,
  onSendAction,
  onCancelAction,
  addAction,
  cancelAction,
  deleteAction,
  downloadAction,
  editAction,
  lockAction,
  resetAction,
  sendAction,
  syncAction,
  unlockAction,
  watchAction,
}: Props) => {
  const renderActionAndIcon = (actionType: Action) => {
    switch (actionType) {
      case 'add':
        return {
          action: onAddAction,
          actionType: addAction,
          iconSrc: require('@/assets/svg/plusCircle.svg'),
        }
      case 'delete':
        return {
          action: onDeleteAction,
          actionType: deleteAction,
          iconSrc: require('@/assets/svg/delete.svg'),
        }
      case 'cancel':
        return {
          action: onCancelAction,
          actionType: cancelAction,
          iconSrc: require('@/assets/svg/cancel_action.svg'),
        }
      case 'edit':
        return {
          action: onEditAction,
          actionType: editAction,
          iconSrc: require('@/assets/svg/edit.svg'),
        }
      case 'lock':
        return {
          action: onLockAction,
          actionType: lockAction,
          iconSrc: require('@/assets/svg/lock_action.svg'),
        }
      case 'unlock':
        return {
          action: onUnlockAction,
          actionType: unlockAction,
          iconSrc: require('@/assets/svg/unlock_action.svg'),
        }
      case 'watch':
        return {
          action: onWatchAction,
          actionType: watchAction,
          iconSrc: require('@/assets/svg/iconEye.svg'),
        }
      case 'download':
        return {
          action: onDownloadAction,
          actionType: downloadAction,
          iconSrc: require('@/assets/svg/download.svg'),
        }
      case 'reset':
        return {
          action: onResetAction,
          actionType: resetAction,
          iconSrc: require('@/assets/svg/iconReset.svg'),
        }
      case 'send':
        return {
          action: onSendAction,
          iconSrc: require('@/assets/svg/vector.svg'),
        }
      case 'sync':
        return {
          action: onSyncAction,
          actionType: syncAction,
          iconSrc: require('@/assets/svg/sync.svg'),
        }
    }
  }
  return (
    <div className='flex items-center'>
      {actionList.map((item, index) => {
        const action = renderActionAndIcon(item)

        if (!!action.actionType) {
          return (
            <ActionProvider key={index + item} action={action.actionType}>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation()
                  action?.action && action.action()
                }}
              >
                <Image src={action?.iconSrc} alt='eye' width={16} height={16} />
              </IconButton>
            </ActionProvider>
          )
        }
        return (
          <IconButton
            key={index + item}
            onClick={(e) => {
              e.stopPropagation()
              action?.action && action.action()
            }}
          >
            <Image src={action?.iconSrc} alt='eye' width={16} height={16} />
          </IconButton>
        )
      })}
    </div>
  )
}
