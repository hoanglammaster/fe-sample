import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import CreateUpdateFeature from '@/components/templates/UAA/Feature/CreateUpdate'
import { handleReturnServerSideProps } from '@/helper/utils'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE_UAA } from '@/routes'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <CreateUpdateFeature />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({ title: 'Edit Feature' }))

export const getServerSideProps = async (context) => {
  return handleReturnServerSideProps(context, [
    'common',
    TRANSLATE_UAA.FEATURE,
    TRANSLATE_UAA.SUB_MENU_MANAGEMENT,
  ])
}

export default Page
