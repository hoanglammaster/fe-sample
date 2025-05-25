import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import ListRoleTypePermissionMapping from '@/components/templates/UAA/RoleTypePermissionMapping/List'
import { handleReturnServerSideProps } from '@/helper/utils'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE_UAA } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <ListRoleTypePermissionMapping />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({
  title: 'Role Type - Permission Group Mapping Management ',
}))

export const getServerSideProps = async (context) => {
  return handleReturnServerSideProps(context, [
    'common',
    TRANSLATE_UAA.ROLE_TYPE_PERMISSION_MAPPING,
  ])
}
export default Page
