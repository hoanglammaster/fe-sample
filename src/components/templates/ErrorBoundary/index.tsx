import { useErrorBoundary, useHistoryPage } from '@/config/zustand'
import { useRouter } from 'next/router'
import { ReactNode, useEffect } from 'react'
import Page404 from '../404'

interface ErrorBoundaryProps {
  children: ReactNode
}

const ErrorBoundary = (props: ErrorBoundaryProps) => {
  const { isError } = useErrorBoundary()
  const router = useRouter()
  const { listHistory, setHistory } = useHistoryPage()
  useEffect(() => {
    if (
      !listHistory.length ||
      listHistory[listHistory.length - 1] !== router.asPath
    ) {
      const newHistory = [...listHistory]
      newHistory.push(router.asPath)
      if (newHistory.length > 5) {
        newHistory.shift()
      }
      setHistory(newHistory)
    }
  }, [router.asPath, listHistory, setHistory])

  if (!!isError) {
    return <Page404 />
  }
  return <>{props.children}</>
}
export default ErrorBoundary
