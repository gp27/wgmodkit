import { useStore } from '@nanostores/react'
import { $steam } from '../steam/stores'

export function useSteam() {
  return useStore($steam)
}
