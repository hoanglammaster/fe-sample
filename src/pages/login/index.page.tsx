import { NoneLayout } from '@/components/layouts/NoneLayout'
import { Meta } from '@/components/meta'
import { Login } from '@/components/templates/UAA/Login'
import {
  LIST_LANGUAGE_CODE,
  getListLanguages,
  getListLanguagesServerSide,
} from '@/components/templates/UAA/Login/components/service'
import { customOptionCookies } from '@/helper/utils'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serialize } from 'cookie'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <Login />

Page.getLayout = NoneLayout
Page.getMeta = Meta(() => ({ title: 'Login' }))

export const getServerSideProps = async ({
  locale,
  req,
  locales,
  res,
  ...rest
}) => {
  let localeDefault: string | undefined = locale === 'default' ? 'en' : locale
  res.setHeader(
    'Set-Cookie',
    serialize('ACCESS_TOKEN', '', {
      ...customOptionCookies,
      path: '/',
      maxAge: -1,
    })
  )
  res.setHeader(
    'Set-Cookie',
    serialize('DEFAULT_LANGUAGE', '', {
      ...customOptionCookies,
      path: '/',
      maxAge: -1,
    })
  )
  if (locale === 'default') {
    const languageList = await getListLanguagesServerSide()
    const defaultLanguage = languageList?.data?.find((v) => !!v.isDefault)

    if (!!defaultLanguage) {
      localeDefault =
        LIST_LANGUAGE_CODE.find(
          (v2) =>
            v2.name.toLocaleLowerCase() ===
            defaultLanguage.name.toLocaleLowerCase()
        )?.code ?? 'en'
    }
  }

  return {
    props: {
      ...(await serverSideTranslations(localeDefault ?? 'en')),
    },
  }
}

export default Page
