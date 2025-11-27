import { core } from '@tauri-apps/api'
import { mkdir } from '@tauri-apps/plugin-fs'
import { GameInfo } from '../game/stores'
import TOML from '@iarna/toml'
import { openPath } from '@tauri-apps/plugin-opener';
import * as fs from "@tauri-apps/plugin-fs"

export function backupGameAssets(game: GameInfo) {
  return core.invoke('copy_assets', {
    src: game.assetsPath,
    dst: game.assetBackupPath,
    force: false,
  })
}

export async function restoreGameAssets(game: GameInfo) {
  await core.invoke('copy_assets', {
    src: game.assetBackupPath,
    dst: game.assetsPath,
    force: true,
  })
  await fs.remove(game.repackFilePath)
}

export function unpackGameAssets(game: GameInfo) {
  return core.invoke('unpack', {
    src: game.assetBackupPath,
    dst: game.workingPathData,
    packVersion: game.hpackVersion,
    secret: 'K09oemVwNHowNk51S2d1Tg==',
  })
}

export function readGameAssets(game: GameInfo) {
  return core.invoke('unpack', {
    src: game.assetsPath,
    dst: game.workingPath + '/tmp/',
    packVersion: game.hpackVersion,
    secret: 'K09oemVwNHowNk51S2d1Tg==',
  })
}

export async function repackGameAssets(game: GameInfo) {
  await core.invoke('pack', {
    src: game.workingPathData,
    dst: game.assetsPath,
    packVersion: game.hpackVersion,
    secret: undefined,
  })
  await fs.writeTextFile(
    game.repackFilePath,
    TOML.stringify({
      packVersion: game.hpackVersion,
      packedAt: new Date().toISOString(),
    })
  )
}

export async function openWorkingDir(game: GameInfo) {
  await mkdir(game.workingPath, { recursive: true })
  return openPath(game.workingPath)
}
