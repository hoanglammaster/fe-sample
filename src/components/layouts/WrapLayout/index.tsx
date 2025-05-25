import { DialogProvider } from '@/components/hooks/dialog/useDialog'
import NextNProgress from 'nextjs-progressbar'
import { ReactElement } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'
import { Layout2 } from '../MultipleLayouts/Layout2'
import ModeTheme from './ModeTheme'
import useModeTheme from './useModeTheme'

const queryClient = new QueryClient()

export const WrapLayout = (page: ReactElement) => {
  const { themeWrap, mainTheme } = useModeTheme()

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ModeTheme theme={themeWrap}>
          <Layout2>
            <NextNProgress color={mainTheme.firstMainColor} height={4} />
            <DialogProvider>{page}</DialogProvider>
          </Layout2>
        </ModeTheme>
      </RecoilRoot>
    </QueryClientProvider>
  )
}
