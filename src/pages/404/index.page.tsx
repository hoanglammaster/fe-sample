import { NoneLayout } from '@/components/layouts/NoneLayout'
import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import Page404 from '@/components/templates/404'
import { handleReturnServerSideProps } from '@/helper/utils'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE_UAA } from '@/routes'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <Page404 />

Page.getLayout = NoneLayout
Page.getMeta = Meta(() => ({ title: '404 Not Found' }))

export default Page
