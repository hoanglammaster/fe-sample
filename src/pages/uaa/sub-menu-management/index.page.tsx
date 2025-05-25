import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import { ListSubMenu } from '@/components/templates/UAA/SubMenu'
import { handleReturnServerSideProps } from '@/helper/utils'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE_UAA } from '@/routes'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <ListSubMenu />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({
  title: 'Sub Menu Management',
}))

export const getServerSideProps = async (context) => {
  return handleReturnServerSideProps(context, ['common', TRANSLATE_UAA.SUB_MENU_MANAGEMENT])
}

export default Page
