import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import ConfigMenu from '@/components/templates/UAA/ConfigMenu/List'
import { handleReturnServerSideProps } from '@/helper/utils'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE_UAA } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <ConfigMenu />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({ title: 'Config Menu' }))

export const getServerSideProps = async (context) => {
  return handleReturnServerSideProps(context, [
    'common',
    TRANSLATE_UAA.CONFIGURATION_MENU,
  ])
}

export default Page
