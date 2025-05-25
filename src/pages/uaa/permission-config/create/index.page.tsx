import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import CreateUpdatePermissionConfig from '@/components/templates/UAA/PermissionConfig/CreateUpdate'
import { handleReturnServerSideProps } from '@/helper/utils'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE_UAA } from '@/routes'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <CreateUpdatePermissionConfig />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({
  title: 'Add new Permission Group',
}))

export const getServerSideProps = async (context) => {
  return handleReturnServerSideProps(context, [
    'common',
    TRANSLATE_UAA.PERMISSION_CONFIG,
  ])
}

export default Page
