import { useDialog } from '@/components/hooks/dialog/useDialog'
import { DialogImportResultCustom } from '@/components/organism/DialogImportResultCustom'
import { authUAAAPI } from '@/config/axiosConfig'

export const DialogImportResult = (props: any) => {
  const { hideDialog } = useDialog()
  const { noSuccess, noTotal, downloadUrl, refetch, title, fileName } = props
  const handleDownloadResult = async () => {
    if (!!downloadUrl) {
      try {
        console.log('downloadUrl', downloadUrl)
        const res = await authUAAAPI({
          url: downloadUrl,
          method: 'get',
          responseType: 'blob',
        })
        if (res?.data) {
          const url = window.URL.createObjectURL(res?.data)
          const link = document.createElement('a')
          link.href = url
          link.setAttribute(
            'download',
            fileName ?? 'TemplateImportEmailTranslation_errors.xlsx'
          )
          document.body.appendChild(link)
          link.click()
          link.parentNode?.removeChild(link)
        }
      } catch (error) {
        console.log('Errrr', error)
      }
    }
  }
  return (
    <DialogImportResultCustom
      onClose={() => {
        hideDialog()
        refetch && refetch()
      }}
      position='middle'
      width={640}
      formProps={{ 'aria-label': 'dialog upload file result success' }}
      title={title}
      noSuccess={noSuccess}
      noTotal={noTotal}
      handleDownloadResult={handleDownloadResult}
    />
  )
}
