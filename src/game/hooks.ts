import { useEffect, useMemo, useState } from 'react'
import { $games, GameInfo } from './stores'
import { backupGameAssets, openWorkingDir, readGameAssets, repackGameAssets, restoreGameAssets, unpackGameAssets } from '../utils/assets'
import { useStore } from '@nanostores/react'
import { exists } from '@tauri-apps/api/fs'
import { confirm, message } from '@tauri-apps/api/dialog'

export function useGames() {
  return useStore($games)
}

export function useGameMods(game: GameInfo) {
  let [unpacking, setUnpacking] = useState(false)
  let [repacking, setRepacking] = useState(false)
  let [isUnpacked, setIsUnpacked] = useState(false)
  let [isRepacked, setIsRepacked] = useState(false)

  useEffect(() => {
    exists(game.repackFilePath).then(setIsRepacked)
    exists(game.workingPathData).then(setIsUnpacked)
  }, [game])

  const gameModActions = useMemo(() => {
    return {
      openWorkingDir: () => openWorkingDir(game),

      restoreData: async () => {
        await restoreGameAssets(game)
        setIsRepacked(false)
      },

      readAssets: () => {
        return readGameAssets(game).catch((err) => {
          console.error(err)
          return message('Failed to read assets')
        })
      },

      unpackAssets: async () => {
        if (isUnpacked) {
          const confirmed = await confirm(`The assets for '${game.name}' have already been unpacked. Unpacking again will overwrite any changes you have made. Are you sure you want to continue?`, {
            type: 'warning',
          })
          if (!confirmed) {
            return
          }
        }
        setUnpacking(true)

        await backupGameAssets(game)
        await unpackGameAssets(game)
        setUnpacking(false)
        setIsUnpacked(true)
      },

      repackAssets: async () => {
        setRepacking(true)
        await backupGameAssets(game)
        await repackGameAssets(game)
        setRepacking(false)
        setIsRepacked(true)
      },
    }
  }, [game, isUnpacked])

  return {
    ...gameModActions,
    unpacking,
    repacking,
    isBusy: unpacking || repacking,
    isUnpacked,
    isRepacked,
  }
}
