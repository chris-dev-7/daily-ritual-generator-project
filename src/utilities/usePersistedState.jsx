import { setDailyRitual, getDailyRitual } from './useLocalStorage'
import { useEffect } from 'react'
import { useState } from 'react'



export const usePersistedState = (key, initialValue) => {

  const [ value, setValue ] = useState(() => {
  const item = getDailyRitual(key)
  
  return item || initialValue

  })

  useEffect(() => {
    setDailyRitual(key, value)
  },[value])

  return [value, setValue]
}