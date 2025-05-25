import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import CreateUpdateRoleTypePermissionMapping from '@/components/templates/UAA/RoleTypePermissionMapping/CreateUpdate'
import { handleReturnServerSideProps } from '@/helper/utils'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE_UAA } from '@/routes'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => (
  <CreateUpdateRoleTypePermissionMapping />
)

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({
  title: 'Edit Role Type - Permission Group Mapping',
}))

export const getServerSideProps = async (context) => {
  return handleReturnServerSideProps(context, [
    'common',
    TRANSLATE_UAA.ROLE_TYPE_PERMISSION_MAPPING,
  ])
}

export default Page
