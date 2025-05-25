import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import APIManagement from '@/components/templates/UAA/APIManangement'
import { handleReturnServerSideProps } from '@/helper/utils'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE_UAA } from '@/routes'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <APIManagement />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({ title: 'API Management ' }))

export const getServerSideProps = async (context) => {
  return handleReturnServerSideProps(context, [
    'common',
    TRANSLATE_UAA.API_MANAGEMENT,
  ])
}

export default Page
