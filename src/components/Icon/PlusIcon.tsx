import { ExtendButtonBase, IconButton, IconButtonTypeMap } from '@mui/material'
import React from 'react'

const PlusIcon = (props: ExtendButtonBase<IconButtonTypeMap<{}, 'button'>>) => {
  return (
    <IconButton {...props}>
      <svg
        width='20'
        height='20'
        viewBox='0 0 20 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z'
          stroke='#2585C2'
          strokeWidth='1.2'
          strokeMiterlimit='10'
        />
        <path
          d='M6.875 10H13.125'
          stroke='#2585C2'
          strokeWidth='1.2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M10 6.875V13.125'
          stroke='#2585C2'
          strokeWidth='1.2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </IconButton>
  )
}

//PlusIcon.defaultProps = {}

//PlusIcon.propTypes = {}

export default React.memo(PlusIcon)
