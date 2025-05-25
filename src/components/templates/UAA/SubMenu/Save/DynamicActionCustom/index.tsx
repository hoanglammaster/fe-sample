import MinusIcon from '@/assets/svg/minus.svg'
import PlusIcon from '@/assets/svg/plusCircle.svg'
import { IconButton } from '@mui/material'
import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

interface Props {
  totalItem: number
  index: number
  handleRemoveItem: () => void
  handleAddItem: () => void
  disabledDeleteButton?: boolean
  className?: string
  disabledAddButton?: boolean
}

const DynamicActionCustom = (props: Props) => {
  const {
    totalItem,
    index,
    handleRemoveItem,
    handleAddItem,
    disabledDeleteButton,
    className,
    disabledAddButton,
  } = props

  const showAddBtn = totalItem === index + 1

  return (
    <div className={clsx('flex items-center mx-4 w-24', className)}>
      {disabledDeleteButton || (index === 0 && totalItem === 1) ? null : (
        <IconButton
          color='secondary'
          onClick={handleRemoveItem}
          disabled={disabledDeleteButton}
        >
          <Image width={20} height={20} src={MinusIcon} alt='' />
        </IconButton>
      )}
      {!disabledAddButton && showAddBtn && (
        <IconButton
          color='primary'
          size='small'
          onClick={handleAddItem}
          disabled={disabledAddButton}
        >
          <Image width={20} height={20} src={PlusIcon} alt='' />
        </IconButton>
      )}
    </div>
  )
}

export default React.memo(DynamicActionCustom)
