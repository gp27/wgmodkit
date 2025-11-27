import { load } from '@tauri-apps/plugin-store'
import { appConfigDir as getAppConfigDir } from '@tauri-apps/api/path'

const appConfigDir = await getAppConfigDir()

export const settings = await load(`${appConfigDir}settings.json`)
