import useGetImage from '@/helper/useGetImage'
import Image from 'next/image'
import React, { useEffect } from 'react'
import LoadingPage from '../LoadingPage'

interface Props {
  url: string
  height?: number
  width?: number
  alt?: string
}

const ImageViewBlob = (props: Props) => {
  const { url, alt, height, width } = props
  const { handleGetUrlImage, loadingImage, urlImage } = useGetImage()

  useEffect(() => {
    url && handleGetUrlImage(url)
  }, [url])

  if (loadingImage) {
    return (
      <div style={{ height: height ?? 100, width: width ?? 100 }}>
        <LoadingPage />
      </div>
    )
  }

  console.log('urlImage', urlImage)

  return (
    <>
      {urlImage && (
        <Image
          src={urlImage as any}
          alt={alt ?? ''}
          unoptimized
          width={width ?? 100}
          height={height ?? 100}
        />
      )}
    </>
  )
}

export default ImageViewBlob
