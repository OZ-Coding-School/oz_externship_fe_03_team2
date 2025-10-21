import { useState, useEffect, useRef } from 'react'

export function useCountdown(initialValue: number) {
  const [time, setTime] = useState(initialValue)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }

    intervalRef.current = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          setIsRunning(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isRunning])

  const start = (customTime?: number) => {
    if (customTime !== undefined) {
      setTime(customTime)
    }
    setIsRunning(true)
  }

  const stop = () => {
    setIsRunning(false)
  }

  const reset = (newTime?: number) => {
    setTime(newTime ?? initialValue)
    setIsRunning(false)
  }

  return {
    time,
    isRunning,
    start,
    stop,
    reset,
  }
}
