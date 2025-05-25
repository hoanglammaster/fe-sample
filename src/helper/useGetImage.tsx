import { useState } from 'react'
import { getCmsToken } from '@/config/token'
import { authAPI } from '@/config/axiosConfig'
import { JSONBigParser } from '@/helper/json'

const useGetImage = () => {
  const [urlImage, setUrlImage] = useState<any>(null)
  const [loadingImage, setLoadingImage] = useState<boolean>(false)
  const tokenAccess: any = JSONBigParser.parse(getCmsToken() ?? '{}')

  const handleGetUrlImage = async (url: string) => {
    try {
      setLoadingImage(true)
      const res = await authAPI({
        method: 'get',
        url,
        headers: { Authorization: `Bearer ${tokenAccess?.accessToken}` },
        responseType: 'blob',
      })
      setUrlImage(URL.createObjectURL(res?.data) ?? '')
      setLoadingImage(false)
    } catch (err) {
      setLoadingImage(false)
    }
  }
  return { urlImage, handleGetUrlImage, loadingImage }
}

export default useGetImage
