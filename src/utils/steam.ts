import { type } from '@tauri-apps/api/os'
import { homeDir } from '@tauri-apps/api/path'
import { exists } from '@tauri-apps/api/fs'
import { open } from '@tauri-apps/api/dialog'

export const defaultSteamPath = await type().then(async (osType) => {
  let dir = ''
  let home = await homeDir()

  if (osType == 'Windows_NT') {
    dir = '/ProgramFiles(x86)/Steam'
  } else if (osType == 'Darwin') {
    dir = home + 'Library/Application Support/Steam'
  } else if (osType == 'Linux') {
    dir = home + '.local/share/Steam'
  }

  return dir
})

export async function selectSteamDirDialog() {
  let dir = await open({
    defaultPath: defaultSteamPath,
    multiple: false,
    directory: true,
    recursive: true,
  })

  if (dir instanceof Array) {
    return dir[0]
  }

  return dir
}

export function isValidSteamDir(dir: string) {
  dir += '/steamapps/common'
  return exists(dir)
}
