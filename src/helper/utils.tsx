import { LIST_LANGUAGE_CODE } from '@/components/templates/UAA/Login/components/service'
import { AUTH_UAA_URL } from '@/config/axiosConfig'
import { parse, serialize } from 'cookie'
import { GetServerSidePropsContext, PreviewData } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import getConfig from 'next/config'
import { NextParsedUrlQuery } from 'next/dist/server/request-meta'
import { JSONBigParser } from '@/helper/json'

const {
  publicRuntimeConfig: { SERVER_UAA_URL },
} = getConfig()

export const checkChangeArray = (
  oldArr: any[] = [],
  newArr: any[] = [],
  compareName: string
) => {
  const additionalArr = oldArr
    ? newArr.filter(
        (v) =>
          !oldArr.some((v2) => v2?.[`${compareName}`] === v?.[`${compareName}`])
      )
    : newArr
  const deletedArr = newArr
    ? oldArr.filter(
        (v) =>
          !newArr.some((v2) => v2?.[`${compareName}`] === v?.[`${compareName}`])
      )
    : oldArr
  return { additionalArr, deletedArr }
}

export const handleGetAllPath = (options: any[]) => {
  let arr: any[] = []
  options.forEach((element) => {
    const listArr = element?.children
      ? element.children?.filter((v: any) => v.path)
      : []
    arr = [...arr, ...listArr]
    element?.children?.forEach((ele2: any) => {
      if (ele2.children) {
        arr = [...arr, ...handleGetAllPath([ele2])]
      }
    })
  })
  return arr
}

export const flatMenu = (route: any[]) => {
  let arr = [...route]
  route.forEach((element: any) => {
    if (element?.children?.length > 0) {
      arr = [...arr, ...flatMenu(element?.children)]
    }
  })
  return arr
}

export function trimObject(obj: {}) {
  const trim: any = {}
  Object.entries(obj).forEach((v: any[] = []) => {
    trim[`${v[0]}`] = typeof v[1] === 'string' ? v[1].trim() : v[1]
  })
  return trim
}

export const STATUS_UAA = {
  PUBLISHED: 'PUBLISHED',
  DRAFT: 'DRAFT',
  LOCKED: 'LOCKED',
  TERMINATED: 'TERMINATED',
  ACTIVE: 'ACTIVE',
}

export const renderStatus = (status?: string) => {
  const listStatus = [
    {
      status: STATUS_UAA.DRAFT,
      color: '#F57322',
      text: 'Draft',
    },
    {
      status: STATUS_UAA.PUBLISHED,
      color: '#4DBC6C',
      text: 'Published',
    },
    {
      status: STATUS_UAA.ACTIVE,
      color: '#4DBC6C',
      text: 'Active',
    },
    {
      status: STATUS_UAA.TERMINATED,
      color: '#C93A3D',
      text: 'Terminated',
    },
    {
      status: STATUS_UAA.LOCKED,
      color: '#002495',
      text: 'Locked',
    },
  ]

  const chosenStatus = listStatus.find((v) => v.status === status)

  if (!!chosenStatus) {
    return (
      <span
        style={{
          color: chosenStatus.color,
        }}
      >
        {chosenStatus.text}
      </span>
    )
  }

  return ''
}

export const filterOptionsByName = (filterOptions: any[], name: string) => {
  console.log(':adadadadadad', filterOptions)
  return filterOptions.sort((a: any, b: any) => {
    let nameA = a[`${name}`]?.toUpperCase() // Convert names to uppercase for case-insensitive comparison
    let nameB = b[`${name}`]?.toUpperCase()

    if (nameA === 'ALL') return -1 // "All" should come first
    if (nameB === 'ALL') return 1 // "All" should come first

    return nameA.localeCompare(nameB) // Alphabetical order for the rest
  })
}

// return authUAAAPI({
//   method: 'get',
//   url: `/cms/api/v1/user/current-user`,
//   headers: {
//     Authorization: `Bearer ${tokenAccess?.accessToken}`,
//   },
// })

export const fetchUserInfo = async (tokenAccess: any, isLocal?: boolean) => {
  const response = await fetch(
    `${isLocal ? AUTH_UAA_URL : SERVER_UAA_URL}/cms/api/v1/user/current-user`,
    {
      headers: {
        Authorization: `Bearer ${tokenAccess?.accessToken}`,
      },
    }
  )

  const data = await response.json()
  return data
}

export const customOptionCookies = {
  path: '/',
  httpOnly: true,
  secure: false,
}

export const handleReturnServerSideProps = async (
  props: GetServerSidePropsContext<NextParsedUrlQuery, PreviewData>,
  listLanguage: string[]
) => {
  const { locale, req, res } = props
  const cookiesUser = parse(req.headers.cookie || '')

  const host = req.headers.host

  const token = cookiesUser?.ACCESS_TOKEN

  let defaultLanguageCode =
    !locale || locale === 'default'
      ? cookiesUser.DEFAULT_LANGUAGE ?? 'en'
      : locale

  let languageBE: any = null

  let testResult = 'AUTH_UAA_URL'

  const tokenAccess =
    !!token && !['null', 'undefined', ''].includes(token)
      ? JSONBigParser.parse(token)
      : null

  if (!tokenAccess?.accessToken) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  try {
    const isValidCallApi =
      locale === 'default' && !cookiesUser.DEFAULT_LANGUAGE && !!tokenAccess

    testResult = 'chang 1'
    if (isValidCallApi) {
      const userInfo = await fetchUserInfo(
        tokenAccess,
        host?.includes('localhost')
      )
      const languageUser = userInfo?.data?.langData
      const newLanguage = LIST_LANGUAGE_CODE.find(
        (v) => v.name.toLowerCase() === languageUser?.name?.toLocaleLowerCase()
      )?.code
      languageBE = newLanguage

      testResult = 'chang 2'

      if (!!newLanguage) {
        defaultLanguageCode = newLanguage

        res.setHeader(
          'Set-Cookie',
          serialize('DEFAULT_LANGUAGE', newLanguage, {
            ...customOptionCookies,
          })
        )
      } else {
        res.setHeader(
          'Set-Cookie',
          serialize('DEFAULT_LANGUAGE', '', {
            ...customOptionCookies,
            maxAge: -1,
          })
        )
      }
      return {
        props: {
          ...(await serverSideTranslations(
            defaultLanguageCode,
            listLanguage || ['common']
          )),
          tokenAccess,
          number: 1,
          userInfo,
          testResult,
        },
      }
    }
    return {
      props: {
        ...(await serverSideTranslations(
          defaultLanguageCode,
          listLanguage || ['common']
        )),
        languageBE: defaultLanguageCode,
        isValidCallApi,
        tokenAccess,
        number: 2,
        testResult,
      },
    }
  } catch (e) {
    return {
      props: {
        ...(await serverSideTranslations('en', listLanguage || ['common'])),
        errorServer: e,
        languageBE: defaultLanguageCode,
        tokenAccess,
        number: 3,
        testResult,
      },
    }
  }
}

export const showCodeNameOption = (code: string, name: string) => {
  return `${code ?? ''}${code && name ? ' - ' : ''}${name ?? ''}`
}
