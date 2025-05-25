import { AUTH_UAA_URL, authUAAAPI } from '@/config/axiosConfig'
import getConfig from 'next/config'

const {
  publicRuntimeConfig: { SERVER_UAA_URL },
} = getConfig()

export const LIST_LANGUAGE_CODE = [
  { name: 'English', code: 'en' },
  { name: 'Spanish', code: 'es' },
  { name: 'French', code: 'fr' },
  { name: 'German', code: 'de' },
  { name: 'Chinese', code: 'zh' },
  { name: 'Japanese', code: 'ja' },
  { name: 'Korean', code: 'ko' },
  { name: 'Russian', code: 'ru' },
  { name: 'Arabic', code: 'ar' },
  { name: 'Portuguese', code: 'pt' },
  { name: 'Italian', code: 'it' },
  { name: 'Dutch', code: 'nl' },
  { name: 'Greek', code: 'el' },
  { name: 'Hindi', code: 'hi' },
  { name: 'Turkish', code: 'tr' },
  { name: 'Swedish', code: 'sv' },
  { name: 'Norwegian', code: 'no' },
  { name: 'Danish', code: 'da' },
  { name: 'Finnish', code: 'fi' },
  { name: 'Polish', code: 'pl' },
  { name: 'Vietnamese', code: 'vn' },
  { name: 'Thai', code: 'th' },
  { name: 'Hebrew', code: 'he' },
  { name: 'Hungarian', code: 'hu' },
  { name: 'Czech', code: 'cs' },
  { name: 'Swahili', code: 'sw' },
]

export const getListLanguages = async () => {
  try {
    const { data } = await authUAAAPI({
      url: '/public-api/v1/languages',
      method: 'get',
    })
    return data
  } catch (e) {}
}

export const getListLanguagesServerSide = async (isLocal?: boolean) => {
  try {
    const response = await fetch(
      `${isLocal ? AUTH_UAA_URL : SERVER_UAA_URL}/public-api/v1/languages`
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data?.data
  } catch (error) {
    console.error('Error fetching data:', error)
    return null // Or handle the error as needed
  }
}
