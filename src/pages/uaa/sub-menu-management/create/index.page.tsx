import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import CreateUpdateService from '@/components/templates/UAA/Service/CreateUpdate'
import { SaveSubMenu } from '@/components/templates/UAA/SubMenu/Save'
import { handleReturnServerSideProps } from '@/helper/utils'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE_UAA } from '@/routes'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <SaveSubMenu />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({
  title: 'Create Sub Menu Management',
}))

export const getServerSideProps = async (context) => {
  return handleReturnServerSideProps(context, ['common', TRANSLATE_UAA.SUB_MENU_MANAGEMENT])
}

export default Page
