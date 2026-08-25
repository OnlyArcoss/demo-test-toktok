import { useCallback } from 'react'
import { useLocalStorageState } from './useLocalStorageState'
import type { PointOfInterest } from '../types/point'

const STORAGE_KEY = 'toktok.points'

export function usePoints() {
  const [points, setPoints] = useLocalStorageState<PointOfInterest[]>(STORAGE_KEY, [])

  const addPoint = useCallback(
    (point: Omit<PointOfInterest, 'id' | 'createdAt'>) => {
      const newPoint: PointOfInterest = {
        ...point,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      }
      setPoints((prev) => [...prev, newPoint])
      return newPoint
    },
    [setPoints],
  )

  const removePoint = useCallback(
    (id: string) => {
      setPoints((prev) => prev.filter((p) => p.id !== id))
    },
    [setPoints],
  )

  return { points, addPoint, removePoint }
}
