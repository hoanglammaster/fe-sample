import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const usePreviousUrl = () => {
  const [previousUrl, setPreviousUrl] = useState('')
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = () => {
      if (
        document.referrer &&
        new URL(document.referrer).origin === window.location.origin
      ) {
        setPreviousUrl(document.referrer)
      } else {
        setPreviousUrl('')
      }
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return previousUrl
}

export default usePreviousUrl
