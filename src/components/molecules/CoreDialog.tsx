import { IconButton } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import React, { memo } from 'react'
import CloseIcon from '@mui/icons-material/Close'

const Transition = React.forwardRef<HTMLDivElement, any>(function Transition(
  props,
  ref
) {
  return <Slide direction='up' ref={ref} {...props} />
})

const CoreDialog = (props: any) => {
  const {
    open,
    dialogAction,
    dialogStyle,
    maxWidth,
    PaperPropsStyle,
    dialogTitle,
    dialogTitleClassName,
    dialogCloseButtonClassName,
    dialogContent,
    dialogContentStyle,
    DialogProps,
    DialogTitleProps,
    handleClose,
    DialogContentProps,
    dialogActionClassName,
    fullWidth,
  } = props

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      PaperProps={{
        style: {
          // minWidth: 400,
          borderRadius: '12px',
          ...PaperPropsStyle,
        },
      }}
      style={dialogStyle}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      {...DialogProps}
    >
      {dialogTitle && (
        <DialogTitle
          className={clsx('text-center uppercase', dialogTitleClassName)}
          {...DialogTitleProps}
        >
          {dialogTitle}
        </DialogTitle>
      )}
      <DialogContent
        className='custom-dialog-content'
        {...DialogContentProps}
        style={dialogContentStyle}
      >
        {dialogContent}
      </DialogContent>
      {dialogAction && (
        <DialogActions className={clsx('shadow', dialogActionClassName)}>
          {dialogAction}
        </DialogActions>
      )}
      {handleClose && (
        <IconButton
          className={clsx('absolute right-5 top-5', dialogCloseButtonClassName)}
          style={{ position: 'absolute', width: 20 }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      )}
    </Dialog>
  )
}
CoreDialog.defaultProps = {
  handleClose: undefined,
  open: false,
  dialogTitle: null,
  dialogTitleClassName: null,
  dialogCloseButtonClassName: null,
  dialogContent: 'Content',
  dialogContentStyle: {},
  dialogStyle: {},
  PaperPropsStyle: {},
  DialogProps: {},
  DialogTitleProps: {},
  maxWidth: 'xs',
  fullWidth: false,
}
CoreDialog.propTypes = {
  open: PropTypes.bool,
  dialogTitle: PropTypes.any,
  dialogContent: PropTypes.any,
  dialogAction: PropTypes.node,
  handleClose: PropTypes.func,
  dialogTitleClassName: PropTypes.string,
  dialogCloseButtonClassName: PropTypes.string,
  dialogContentStyle: PropTypes.object,
  dialogStyle: PropTypes.object,
  PaperPropsStyle: PropTypes.object,
  DialogProps: PropTypes.object,
  DialogTitleProps: PropTypes.object,
  maxWidth: PropTypes.string,
  fullWidth: PropTypes.bool,
  DialogContentProps: PropTypes.object,
  dialogActionClassName: PropTypes.string,
}
export default memo(CoreDialog)
