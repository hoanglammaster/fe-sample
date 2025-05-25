import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import ListSystemFeatureMapping from '@/components/templates/UAA/SystemFeatureMapping/List'
import { handleReturnServerSideProps } from '@/helper/utils'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE_UAA } from '@/routes'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <ListSystemFeatureMapping />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({
  title: 'System Feature Mapping',
}))

export const getServerSideProps = async (context) => {
  return handleReturnServerSideProps(context, ['common', TRANSLATE_UAA.FEATURE])
}

export default Page
