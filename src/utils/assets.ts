import { invoke, shell } from '@tauri-apps/api'
import { createDir } from '@tauri-apps/api/fs'
import { GameInfo } from '../game/stores'

export function backupGameAssets(game: GameInfo) {
  return invoke('copy_assets', {
    src: game.assetsPath,
    dst: game.assetBackupPath,
    force: false,
  })
}

export function restoreGameAssets(game: GameInfo) {
  return invoke('copy_assets', {
    src: game.assetBackupPath,
    dst: game.assetsPath,
    force: true,
  })
}

export function unpackGameAssets(game: GameInfo) {
  return invoke('unpack', {
    src: game.assetBackupPath,
    dst: `${game.workingPath}/data/`,
    packVersion: game.hpackVersion,
    secret: 'K09oemVwNHowNk51S2d1Tg==',
  })
}

export async function openWorkingDir(game: GameInfo) {
  await createDir(game.workingPath, { recursive: true })
  return shell.open(`file://${game.workingPath}/`)
}
