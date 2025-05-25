import { useDialog } from '@/components/hooks/dialog/useDialog'
import { DialogImportCustom } from '@/components/organism/DialogImportCustom'
import { DialogImportResult } from '@/components/organism/DialogImportResult'
import { errorMsg } from '@/helper/message'
import React, { useState } from 'react'
import { exportTemplateApi, importApi } from '../../service'

const DialogImport = (props: { refetch: any }) => {
  const { refetch } = props
  const { showDialog, hideDialog } = useDialog()
  const [loadingImport, setLoadingImport] = useState(false)

  const handleDownloadTemplate = async () => {
    try {
      const res = await exportTemplateApi()
      if (res) {
        const url = window.URL.createObjectURL(res?.data)
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'TemplateImportApi.xlsx')
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
    if (file) {
      formData.append('file', file)
    }
    try {
      const res = await importApi(formData)
      if (res) {
        showDialog(
          <DialogImportResult
            noSuccess={res?.data?.params?.noSuccess}
            noTotal={res?.data?.params?.noTotal}
            downloadUrl={res?.data?.data?.fileResult}
            refetch={refetch}
            title={'Import Api'}
            fileName='TemplateImportApi_errors.xlsx'
          />
        )
      }
    } catch (error) {}
    setLoadingImport(false)
  }

  return (
    <DialogImportCustom
      onClose={hideDialog}
      onCancel={hideDialog}
      position='middle'
      width={640}
      formProps={{ 'aria-label': 'dialog import api' }}
      textBtnImport='Import'
      title='Import API'
      handleDownloadTemplate={handleDownloadTemplate}
      onImport={onImport}
      loadingImport={loadingImport}
    />
  )
}

export default DialogImport
