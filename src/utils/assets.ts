import { invoke } from '@tauri-apps/api'
import { GameInfo } from '../steam/games'

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

export function unpackGameAssets(game: GameInfo, dst: string) {
  return invoke('unpack_assets', {
    src: game.assetBackupPath,
    dst,
    version: game.hpackVersion,
  })
}
