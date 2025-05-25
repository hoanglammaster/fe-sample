import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import UserManagement from '@/components/templates/UAA/UserManagement'
import { handleReturnServerSideProps } from '@/helper/utils'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <UserManagement />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({ title: 'User Management' }))

export const getServerSideProps = async (context) => {
  return handleReturnServerSideProps(context, [
    'common',
    'product/productCommon',
  ])
}

export default Page
