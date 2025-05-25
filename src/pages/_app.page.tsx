import { getCmsToken, removeCmsToken } from '@/config/token'
import { useErrorBoundary, useErrorDialog } from '@/config/zustand'
import { AppPropsWithLayout } from '@/lib/next/types'
import { store } from '@/redux/store'
import { Dialog, StyledEngineProvider } from '@mui/material'
import { appWithTranslation } from 'next-i18next'
import { createWrapper } from 'next-redux-wrapper'
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { compose } from 'redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import '../../public/styles/globals.css'
import { DialogCustom } from '@/components/organism/DialogCustom'
import { ErrorDialog } from '@/components/atoms/ErrorDialog'
import ErrorBoundary from '@/components/templates/ErrorBoundary'
import { JSONBigParser } from '@/helper/json'

const {
  publicRuntimeConfig: { LOGIN_PATH, API_UAA_SCHEMA },
} = getConfig()

let persistor = persistStore(store)

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter()
  const access_token: any = JSONBigParser.parse(getCmsToken() ?? '{}')

  const { errorMsg, setErrorMsg } = useErrorDialog()

  const { setIsError } = useErrorBoundary()

  const openDialog = !!errorMsg

  useEffect(() => {
    if (
      !access_token?.accessToken &&
      !router.pathname.includes('/login') &&
      !window.location.href.includes('localhost')
    ) {
      router.push('/login')
    }
  }, [access_token, router, router.pathname])

  useEffect(() => {
    setIsError(false)
    setErrorMsg(undefined)
    if (router.pathname.includes('/login')) {
      removeCmsToken()
    }
  }, [router.pathname, setErrorMsg, setIsError])

  if (pageProps.err) return <>Error Page</>

  const getLayout = Component.getLayout ?? ((page) => page)
  const getMeta = Component.getMeta ?? ((page) => page)
  return getLayout(
    getMeta(
      <PersistGate loading={null} persistor={persistor}>
        <ToastContainer
          containerId='a-toast'
          position='top-center'
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover
          limit={3}
        />
        <StyledEngineProvider injectFirst>
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>
          <ErrorDialog
            open={openDialog}
            title={'Error'}
            position='top'
            onClose={() => setErrorMsg(undefined)}
            message={errorMsg ?? ''}
          />
        </StyledEngineProvider>
      </PersistGate>,
      pageProps
    )
  )
}
const wrapper = createWrapper(() => store)
const enhance = compose(wrapper.withRedux, appWithTranslation)
export default enhance(MyApp)
