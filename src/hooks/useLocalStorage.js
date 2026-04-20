import { useState, useEffect } from 'react'

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = window.localStorage.getItem(key)
      if (saved !== null) {
        return JSON.parse(saved)
      }
      return initialValue
    } catch (err) {
      console.error('Error reading localStorage key:', key, err)
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (err) {
      console.error('Error writing localStorage key:', key, err)
    }
  }, [key, value])

  return [value, setValue]
}
