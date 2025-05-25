import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import CreateUpdateSystemFeatureMapping from '@/components/templates/UAA/SystemFeatureMapping/CreateUpdate'
import { handleReturnServerSideProps } from '@/helper/utils'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE_UAA } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => (
  <CreateUpdateSystemFeatureMapping />
)

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({
  title: 'View System Feature Mapping',
}))

export const getServerSideProps = async (context) => {
  return handleReturnServerSideProps(context, ['common', TRANSLATE_UAA.FEATURE])
}

export default Page
