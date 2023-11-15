import { Store } from 'tauri-plugin-store-api'
import { appConfigDir as getAppConfigDir } from '@tauri-apps/api/path'

const appConfigDir = await getAppConfigDir()

type Schema = {
  steam_dir: string
}

export const settings = new Store<Schema>(`${appConfigDir}settings.json`)
