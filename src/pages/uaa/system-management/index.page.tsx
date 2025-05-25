import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import SystemManagement from '@/components/templates/UAA/SystemManagement'
import { handleReturnServerSideProps } from '@/helper/utils'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE_UAA } from '@/routes'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <SystemManagement />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({ title: 'System Management ' }))

export const getServerSideProps = async (context) => {
  return handleReturnServerSideProps(context, [
    'common',
    TRANSLATE_UAA.SYSTEM_MANAGEMENT,
  ])
}

export default Page
