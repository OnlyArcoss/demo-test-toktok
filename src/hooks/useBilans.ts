import { useCallback } from 'react'
import { useLocalStorageState } from './useLocalStorageState'
import type { Bilan, BilanRole } from '../types/point'

const STORAGE_KEY = 'toktok.bilans'

export function useBilans() {
  const [bilans, setBilans] = useLocalStorageState<Bilan[]>(STORAGE_KEY, [])

  const addBilan = useCallback(
    (role: BilanRole) => {
      const newBilan: Bilan = {
        id: crypto.randomUUID(),
        role,
        createdAt: new Date().toISOString(),
      }
      setBilans((prev) => [...prev, newBilan])
      return newBilan
    },
    [setBilans],
  )

  return { bilans, addBilan }
}
