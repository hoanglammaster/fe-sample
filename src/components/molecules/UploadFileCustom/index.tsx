import LoadingPage from '@/components/atoms/LoadingPage'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import Typography from '@mui/material/Typography'
import { ChangeEvent } from 'react'

type UploadFileProps = {
  handleFileUpload: (event: ChangeEvent<HTMLInputElement>) => void
  loading?: boolean
}

export const UploadFileCustom: React.FC<UploadFileProps> = ({
  handleFileUpload,
  loading,
}) => {
  return (
    <div className='flex flex-col justify-between gap-1'>
      <p className='font-medium text-sm text-[#242424]'>
        Ảnh sản phẩm <span className='text-red-500'>*</span>
      </p>

      <label className='flex flex-wrap flex-col gap-3 items-center justify-center py-[80px]  border border-solid border-[#DFE0EB]  rounded-md cursor-pointer '>
        {loading ? (
          <LoadingPage />
        ) : (
          <div className='flex flex-col items-center justify-center'>
            <CloudUploadIcon />
            <Typography>Upload</Typography>
            <input
              className='hidden'
              type='file'
              // accept='.pdf,.png,.jpeg,.jpg'
              accept='image/png, image/jpeg, image/jpg'
              onChange={handleFileUpload}
              multiple
            />
          </div>
        )}
      </label>
    </div>
  )
}
