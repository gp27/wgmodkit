import { invoke, shell, fs } from '@tauri-apps/api'
import { createDir } from '@tauri-apps/api/fs'
import { GameInfo } from '../game/stores'
import TOML from '@iarna/toml'

export function backupGameAssets(game: GameInfo) {
  return invoke('copy_assets', {
    src: game.assetsPath,
    dst: game.assetBackupPath,
    force: false,
  })
}

export async function restoreGameAssets(game: GameInfo) {
  await invoke('copy_assets', {
    src: game.assetBackupPath,
    dst: game.assetsPath,
    force: true,
  })
  await fs.removeFile(game.repackFilePath)
}

export function unpackGameAssets(game: GameInfo) {
  return invoke('unpack', {
    src: game.assetBackupPath,
    dst: game.workingPathData,
    packVersion: game.hpackVersion,
    secret: 'K09oemVwNHowNk51S2d1Tg==',
  })
}

export function readGameAssets(game: GameInfo) {
  return invoke('unpack', {
    src: game.assetsPath,
    dst: game.workingPath + '/tmp/',
    packVersion: game.hpackVersion,
    secret: 'K09oemVwNHowNk51S2d1Tg==',
  })
}

export async function repackGameAssets(game: GameInfo) {
  await invoke('pack', {
    src: game.workingPathData,
    dst: game.assetsPath,
    packVersion: game.hpackVersion,
    secret: undefined,
  })
  await fs.writeFile(
    game.repackFilePath,
    TOML.stringify({
      packVersion: game.hpackVersion,
      packedAt: new Date().toISOString(),
    })
  )
}

export async function openWorkingDir(game: GameInfo) {
  await createDir(game.workingPath, { recursive: true })
  return shell.open(`file://${game.workingPath}/`)
}
