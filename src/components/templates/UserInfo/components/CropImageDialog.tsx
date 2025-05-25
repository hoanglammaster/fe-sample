import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  useCallback,
} from 'react'
import { Dialog, Slider } from '@mui/material'
import { DialogConfirmCustom } from '@/components/organism/DialogConfirmCustom'
import { useTranslation } from 'react-i18next'

interface Props {
  imageSrc: string | null
  open: boolean
  onClose: () => void
  onSaveImage: (val: any) => void
  loading: boolean
}

const CropImageDialog: React.FC<Props> = ({
  imageSrc,
  onClose,
  open,
  onSaveImage,
  loading,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const [croppedImageBlob, setCroppedImageBlob] = useState<any | null>(null)
  const [sliderSize, setSliderSize] = useState(0)
  const { t } = useTranslation('common')

  useEffect(() => {
    if (open && imageSrc) {
      setSliderSize(0)
      setCroppedImageBlob(null)
      const timer = setTimeout(() => {
        drawImage(imageSrc)
      }, 100) // Delay to ensure canvas is available
      return () => clearTimeout(timer)
    }
  }, [open, imageSrc])

  const drawImage = (url: string) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    const image = new Image()
    image.src = url as string
    image.onload = () => {
      let newHeight = 200
      let newWidth = 200 * (image.width / image.height)
      if (image.width < image.height) {
        newWidth = 200
        newHeight = 200 * (image.height / image.width)
      }
      if (canvas && ctx) {
        canvas.width = newWidth
        canvas.height = newHeight
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
        cropCircleImage(200)
      }
    }
  }

  const cropCircleImage = useCallback((size: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const diameter = size ?? 200
    const radius = diameter / 2
    const x = canvas.width / 2 - radius
    const y = canvas.height / 2 - radius

    const croppedCanvas = document.createElement('canvas')
    const croppedCtx = croppedCanvas.getContext('2d')
    croppedCanvas.width = diameter
    croppedCanvas.height = diameter
    if (croppedCtx) {
      croppedCtx.beginPath()
      croppedCtx.arc(radius, radius, radius, 0, Math.PI * 2)
      croppedCtx.closePath()
      croppedCtx.clip()
      croppedCtx.drawImage(
        canvas,
        x,
        y,
        diameter,
        diameter,
        0,
        0,
        diameter,
        diameter
      )
      const imageData = croppedCtx.getImageData(0, 0, diameter, diameter)
      const previewCanvas = previewCanvasRef.current
      if (previewCanvas) {
        const previewCtx = previewCanvas.getContext('2d')
        if (previewCtx) {
          previewCanvas.width = diameter
          previewCanvas.height = diameter
          previewCtx.putImageData(imageData, 0, 0)
          croppedCanvas.toBlob((blob) => {
            if (!!blob) {
              const file = new File([blob], 'cropped-image.png', {
                type: 'image/png',
              })
              setCroppedImageBlob(file)
              // const url = window.URL.createObjectURL(blob)
              // const link = document.createElement('a')
              // link.href = url
              // link.setAttribute('download', 'download.png')
              // document.body.appendChild(link)
              // link.click()
              // link.parentNode?.removeChild(link)
            }
          }, 'image/png')
        }
      }
    }
  }, [])

  const handleChangeSlider = (event: Event, newValue: number | number[]) => {
    const value = newValue as number
    setSliderSize(value)
    const newSize = 200 - (200 / 4) * (value / 100)
    cropCircleImage(newSize)
  }

  const handleSubmitImage = () => {
    if (!!croppedImageBlob) {
      onSaveImage(croppedImageBlob)
    }
  }
  return (
    <DialogConfirmCustom
      open={open}
      onClose={onClose}
      position='middle'
      onCancel={() => {
        onClose()
      }}
      onAgree={() => handleSubmitImage()}
      textBtnAgree={t('btn.save')}
      textBtnCancel={t('close')}
      title={t('cropImage')}
      loadingBtnAgree={loading}
    >
      <div className='px-10 py-5'>
        <div className='flex flex-col items-center'>
          <div style={{ position: 'relative' }}>
            <canvas ref={canvasRef} style={{ opacity: 0.3 }} />
            <canvas
              ref={previewCanvasRef}
              className='preview-canvas'
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          </div>
          <Slider
            sx={{
              width: '200px',
              '& .MuiSlider-thumb': {
                height: 10,
                width: 10,
                backgroundColor: '#E9E9E9',
                boxShadow: '0 0 2px 0px rgba(0, 0, 0, 0.1)',
                '&:focus, &:hover, &.Mui-active': {
                  boxShadow: '0px 0px 3px 1px rgba(0, 0, 0, 0.1)',
                  width: 13,
                  height: 13,
                },
                '&:before': {
                  boxShadow:
                    '0px 0px 1px 0px rgba(0,0,0,0.2), 0px 0px 0px 0px rgba(0,0,0,0.14), 0px 0px 1px 0px rgba(0,0,0,0.12)',
                },
              },
              '& .MuiSlider-track': {
                border: 'none',
                height: 5,
                backgroundColor: '#D9D9D9',
              },
              '& .MuiSlider-rail': {
                opacity: 0.5,
                boxShadow: 'inset 0px 0px 4px -2px #000',
                backgroundColor: '#D9D9D9',
              },
            }}
            aria-label='Volume'
            value={sliderSize}
            onChange={handleChangeSlider}
          />
        </div>
      </div>
    </DialogConfirmCustom>
  )
}

export default CropImageDialog
