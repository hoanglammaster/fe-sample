import useGetImage from '@/components/hooks/image/useGetImage'
import clsx from 'clsx'
import Image from 'next/image'
import React, { memo, useEffect } from 'react'

type Props = {
  width: number
  height: number
  borderRadius?: number
  url: string
  key?: string | number
}

export const ImageView = (props: Props) => {
  const { url, borderRadius = 0, height, width, key } = props
  const { urlImage, loadingImage, handleGetUrlImage } = useGetImage()

  useEffect(() => {
    url && handleGetUrlImage(url)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url])

  return (
    <>
      {loadingImage || !urlImage ? (
        <>...Loading</>
      ) : (
        <>
          {urlImage && (
            <div
              className='p-5 border border-solid border-[#DFE0EB] flex items-center justify-center'
              style={{
                width: `${width}px`,
                height: `${height}px`,
                borderRadius: `${borderRadius}px`,
              }}
              key={key}
            >
              <Image src={urlImage} alt='' width={width} height={height} />
            </div>
          )}
        </>
      )}
    </>
  )
}

export default memo(ImageView)
