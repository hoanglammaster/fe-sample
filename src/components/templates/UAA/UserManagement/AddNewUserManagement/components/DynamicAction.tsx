// import CopyIcon from '@/components/Icon/CopyIcon'
import MinusIcon from '@/components/Icon/MinusIcon'
import { IconButton } from '@mui/material'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'
import PlusIcon from './PlusIcon'

const DynamicAction = (props: any) => {
  const {
    totalItem,
    index,
    handleRemoveItem,
    handleAddItem,
    // handleCopyItem,
    // isShowBtnCopy,
    disabledDeleteButton,
    className,
    disabledAddButton,
  } = props

  return (
    <div className={clsx('flex items-center mx-4', className)}>
      {disabledDeleteButton || (totalItem === 1 && index === 0) ? null : (
        <IconButton
          color='secondary'
          onClick={handleRemoveItem}
          disabled={disabledDeleteButton || (totalItem === 1 && index === 0)}
        >
          <MinusIcon />
        </IconButton>
      )}
      {/* {isShowBtnCopy && (
        <IconButton size='small' onClick={handleCopyItem} title='sao chép'>
          <CopyIcon />
        </IconButton>
      )} */}
      {!disabledAddButton && (
        <IconButton
          color='primary'
          size='small'
          onClick={handleAddItem}
          disabled={disabledAddButton}
        >
          <PlusIcon />
        </IconButton>
      )}
    </div>
  )
}

DynamicAction.defaultProps = {
  handleCopyItem: () => {},
  handleAddItem: () => {},
  handleRemoveItem: () => {},
  disabledDeleteButton: false,
  isShowBtnCopy: false,
  totalItem: 0,
  index: 0,
  disabledAddButton: false,
}
DynamicAction.propTypes = {
  handleCopyItem: PropTypes.func,
  handleAddItem: PropTypes.func,
  handleRemoveItem: PropTypes.func,
  disabledDeleteButton: PropTypes.bool,
  isShowBtnCopy: PropTypes.bool,
  totalItem: PropTypes.number,
  index: PropTypes.number,
  className: PropTypes.string,
  disabledAddButton: PropTypes.bool,
}
export default React.memo(DynamicAction)
