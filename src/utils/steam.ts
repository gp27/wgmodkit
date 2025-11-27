import { type } from '@tauri-apps/plugin-os'
import { homeDir } from '@tauri-apps/api/path'
import { exists } from '@tauri-apps/plugin-fs'
import { open } from '@tauri-apps/plugin-dialog'

export const defaultSteamPath = await getDefaultSteamPath()

export async function selectSteamDirDialog() {
  let dir = await open({
    defaultPath: defaultSteamPath,
    multiple: false,
    directory: true,
    recursive: true,
  })
  return dir
}

export function isValidSteamDir(dir: string) {
  dir += '/steamapps/common'
  return exists(dir)
}

async function getDefaultSteamPath() {
  const osType = type();
  let dir = ''
  let home = await homeDir()

  if (osType == 'windows') {
    dir = '/ProgramFiles(x86)/Steam'
  } else if (osType == 'macos') {
    dir = home + '/Library/Application Support/Steam'
  } else if (osType == 'linux') {
    dir = home + '/.local/share/Steam'
  }

  console.log(dir)

  return dir
}