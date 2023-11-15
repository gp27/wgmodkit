//import { SettingsManager } from 'tauri-settings'
import { Store } from 'tauri-plugin-store-api'
import { appConfigDir } from '@tauri-apps/api/path'

type Schema = {
  steam_dir: string
}

let settings: Store<Schema> | undefined

export async function getSettings() {
  if (!settings) {
    settings = new Store<Schema>(`${await appConfigDir()}settings.json`)
  }
  return settings
}

// export const settingsManager = new SettingsManager<Schema>(
//   {
//     steam_dir: '',
//   }
// )

// export const initSettingManagerPromise = settingsManager.initialize().then(() => {
//   settingsManager.setCache('steam_dir', '')
// })
