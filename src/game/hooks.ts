import { useMemo, useState } from 'react'
import { $games, GameInfo } from './stores'
import { backupGameAssets, openWorkingDir, unpackGameAssets } from '../utils/assets'
import { useStore } from '@nanostores/react'

export function useGames() {
  return useStore($games)
}

export function useGameMods(game: GameInfo) {
  let [unpacking, setUnpacking] = useState(false)

  const gameModActions = useMemo(() => {
    return {
      openWorkingDir: () => openWorkingDir(game),
      unpackAssets: async () => {
        setUnpacking(true)
        await backupGameAssets(game)
        await unpackGameAssets(game)
        setUnpacking(false)
      },
    }
  }, [game])

  return {
    ...gameModActions,
    unpacking,
  }
}
