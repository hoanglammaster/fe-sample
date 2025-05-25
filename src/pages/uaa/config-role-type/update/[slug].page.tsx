import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import CreateUpdateConfigRoleType from '@/components/templates/UAA/ConfigRoleType/CreateUpdate'
import { handleReturnServerSideProps } from '@/helper/utils'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE_UAA } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <CreateUpdateConfigRoleType />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({ title: 'Update Config Role Type' }))

export const getServerSideProps = async (context) => {
  return handleReturnServerSideProps(context, [
    'common',
    TRANSLATE_UAA.CONFIG_ROLE_TYPE,
  ])
}

export default Page
