import useGetImage from '@/components/hooks/image/useGetImage'
import Image from 'next/image'
import React, { memo, useEffect } from 'react'

interface Props {
  url: string
  className?: string
  removeImage: () => void
}

function moviePropsAreEqual(prev: Props, next: Props) {
  return prev.url === next.url
}

const ImageBox = (props: Props) => {
  const { url, className, removeImage } = props
  const { urlImage, loadingImage, handleGetUrlImage } = useGetImage()

  useEffect(() => {
    url && handleGetUrlImage(url)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url])

  return (
    <div className={className}>
      {loadingImage || !urlImage ? (
        <>...Loading</>
      ) : (
        <>
          <div
            className='absolute cursor-pointer top-2 right-2'
            onClick={removeImage}
          >
            <Image
              alt='remove'
              width={16}
              height={16}
              src={require('@/assets/svg/iconRemove.svg')}
            />
          </div>
          {urlImage && <Image src={urlImage} alt='' width={80} height={80} />}
        </>
      )}
    </div>
  )
}

export default memo(ImageBox, moviePropsAreEqual)
