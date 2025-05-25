import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import UserPage from '@/components/templates/UserInfo'
import { handleReturnServerSideProps } from '@/helper/utils'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE_UAA } from '@/routes'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = (props) => <UserPage {...props} />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({ title: 'User Info' }))

export const getServerSideProps = async (context) => {
  return handleReturnServerSideProps(context, ['common', TRANSLATE_UAA.USER])
}

export default Page
