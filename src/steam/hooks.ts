import { useStore } from '@nanostores/react'
import { $steam } from '../steam/stores'
import { $games, GameInfo } from './games'
import { useEffect, useState } from 'react'
import { backupGameAssets } from '../utils/assets'

export function useSteam() {
  return useStore($steam)
}

export function useGames() {
  return useStore($games)
}

export function useGameBackedUp(game: GameInfo) {
  const [backedUp, setBackedUp] = useState(false)
  useEffect(() => {
    backupGameAssets(game)
      .then(() => setBackedUp(true))
      .catch(() => setBackedUp(false))
  }, [game])
  return backedUp
}
