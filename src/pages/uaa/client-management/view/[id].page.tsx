import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import { AddNewAPIManagement } from '@/components/templates/UAA/APIManangement/AddNewAPIManagement'
import { SaveClient } from '@/components/templates/UAA/ClientManagement/Save'
import { handleReturnServerSideProps } from '@/helper/utils'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE_UAA } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <SaveClient />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({ title: 'View Client' }))

export const getServerSideProps = async (context) => {
  return handleReturnServerSideProps(context, ['common', TRANSLATE_UAA.CLIENT])
}

export default Page
