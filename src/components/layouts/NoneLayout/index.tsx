import { DialogProvider } from '@/components/hooks/dialog/useDialog'
import { useAppSelector } from '@/redux/hook'
import { ThemeOptions, createTheme } from '@mui/material'
import NextNProgress from 'nextjs-progressbar'
import { ReactElement } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'
import ModeTheme from '../WrapLayout/ModeTheme'
import { GRAY_SCALE, RED } from '../WrapLayout/Theme/colors'
import useModeTheme from '../WrapLayout/useModeTheme'

const queryClient = new QueryClient()

export const NoneLayout = (page: ReactElement) => {
  const { themeWrap, mainTheme } = useModeTheme()

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ModeTheme theme={themeWrap}>
          <>
            <NextNProgress color={mainTheme.firstMainColor} height={4} />
            <DialogProvider>{page}</DialogProvider>
          </>
        </ModeTheme>
      </RecoilRoot>
    </QueryClientProvider>
  )
}
