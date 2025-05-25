import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import ListFeature from '@/components/templates/UAA/Feature/List'
import { handleReturnServerSideProps } from '@/helper/utils'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE_UAA } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <ListFeature />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({ title: 'Feature Management' }))

export const getServerSideProps = async (context) => {
  return handleReturnServerSideProps(context, ['common', TRANSLATE_UAA.FEATURE])
}

export default Page
