import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import APIManagement from '@/components/templates/UAA/APIManangement'
import { ListClient } from '@/components/templates/UAA/ClientManagement/List'
import ListClientScopeMapping from '@/components/templates/UAA/ClientScopeMapping/List'
import { handleReturnServerSideProps } from '@/helper/utils'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE_UAA } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <ListClientScopeMapping />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({ title: 'Client - Scope Mapping Management ' }))

export const getServerSideProps = async (context) => {
  return handleReturnServerSideProps(context, [
    'common',
    TRANSLATE_UAA.CLIENT_SCOPE_MAPPING,
  ])
}

export default Page
