import { useState, useEffect } from 'react'

export default function useDebounce<T>(value: T): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value)
    }, 300)

    return () => clearTimeout(timeout)
  }, [value])

  return debouncedValue
}
