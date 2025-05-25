import { useEffect, useRef, useState } from 'react'

const useDebounce = (value: any, delay: number) => {
  const [newValue, setNewValue] = useState(value)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = window.setTimeout(() => {
      setNewValue(value)
    }, delay)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [value, delay])

  return newValue
}

export default useDebounce
