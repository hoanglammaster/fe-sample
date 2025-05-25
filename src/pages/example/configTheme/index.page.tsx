import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import { ThemeConfig } from '@/components/templates/Example/ThemeConfig'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <ThemeConfig />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({ title: 'Top All Component' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'product/productCommon',
      ])),
    },
  }
}

export default Page
