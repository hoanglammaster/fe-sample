import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import { AddNewSystemManagement } from '@/components/templates/UAA/SystemManagement/AddNewSystemManagement'
import { handleReturnServerSideProps } from '@/helper/utils'

import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE_UAA } from '@/routes'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <AddNewSystemManagement />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({ title: 'Add New System' }))

export const getServerSideProps = async (context) => {
  return handleReturnServerSideProps(context, [
    'common',
    TRANSLATE_UAA.SYSTEM_MANAGEMENT,
  ])
}

export default Page
