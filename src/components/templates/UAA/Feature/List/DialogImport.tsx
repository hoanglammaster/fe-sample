import { useDialog } from '@/components/hooks/dialog/useDialog'
import { DialogImportCustom } from '@/components/organism/DialogImportCustom'
import { errorMsg } from '@/helper/message'
import React, { useState } from 'react'
import {
  exportTemplateFileFeatureImport,
  importTemplateFileFeatureImport,
} from './service'
import { DialogImportResult } from '@/components/organism/DialogImportResult'

const DialogImport = (props: { refetch: any }) => {
  const { refetch } = props
  const { showDialog, hideDialog } = useDialog()
  const [loadingImport, setLoadingImport] = useState(false)

  const handleDownloadTemplate = async () => {
    try {
      const res = await exportTemplateFileFeatureImport()
      if (res) {
        const url = window.URL.createObjectURL(res?.data)
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'TemplateImportFeature.xlsx')
        document.body.appendChild(link)
        link.click()
        link.parentNode?.removeChild(link)
      }
    } catch (error) {
      errorMsg(error, 'Có lỗi')
    }
  }

  const onImport = async (file: File | null) => {
    setLoadingImport(true)
    const formData = new FormData()
    console.log(file, 'fileee')
    if (file) {
      formData.append('file', file)
    }
    try {
      const res = await importTemplateFileFeatureImport(formData)
      if (res) {
        showDialog(
          <DialogImportResult
            noSuccess={res?.data?.params?.noSuccess}
            noTotal={res?.data?.params?.noTotal}
            downloadUrl={res?.data?.data}
            refetch={refetch}
            fileName='TemplateImportFeature_errors'
            title='Import Feature'
          />
        )
      }
    } catch (error) {
      hideDialog()
    }
    setLoadingImport(false)
  }

  return (
    <DialogImportCustom
      onClose={hideDialog}
      onCancel={hideDialog}
      position='middle'
      width={640}
      formProps={{ 'aria-label': 'dialog import sms translation' }}
      textBtnImport='Import'
      title='Import Feature'
      loadingImport={loadingImport}
      handleDownloadTemplate={handleDownloadTemplate}
      onImport={onImport}
    />
  )
}

export default DialogImport
