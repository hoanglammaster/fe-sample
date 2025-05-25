import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import CreateUpdateClientScopeMapping from '@/components/templates/UAA/ClientScopeMapping/CreateUpdate'
import { handleReturnServerSideProps } from '@/helper/utils'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE_UAA } from '@/routes'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <CreateUpdateClientScopeMapping />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({ title: 'View Client - Scope Mapping' }))

export const getServerSideProps = async (context) => {
  return handleReturnServerSideProps(context, [
    'common',
    TRANSLATE_UAA.CLIENT_SCOPE_MAPPING,
  ])
}
export default Page
