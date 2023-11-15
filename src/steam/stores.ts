import { getSettings } from '../settings'

import { atom, computed, action, onMount, task } from 'nanostores'
import { defaultSteamDirPromise, isValidSteamDir, selectSteamDirDialog } from './utils'

const $steamDir = atom('')
const $steamDirValid = atom(false)
const $steamDirStatusLoading = atom(false)

onMount($steamDir, () => {
  task(async () => {
    const settings = await getSettings()
    const defaultSteamDir = await defaultSteamDirPromise
    const savedSteamDir = (await settings.get('steam_dir')) || ''
    console.log('savedSteamDir', savedSteamDir)
    $steamDir.set(!savedSteamDir && defaultSteamDir ? defaultSteamDir : savedSteamDir)
  })
})

$steamDir.listen(async (dir) => {
  $steamDirStatusLoading.set(true)
  let valid = await isValidSteamDir(dir)
  $steamDirValid.set(valid)
  $steamDirStatusLoading.set(false)
  const settings = await getSettings()
  await settings.set('steam_dir', dir)
  await settings.save()
})

export const selectSteamDir = action($steamDir, 'select', async ($steamDir) =>
  selectSteamDirDialog().then((dir) => {
    if (dir !== null) {
      $steamDir.set(dir)
    }
  })
)

export const $steam = computed([$steamDir, $steamDirValid, $steamDirStatusLoading], (dir, valid, loading) => {
  return {
    dir,
    valid,
    loading,
    select: selectSteamDir,
  }
})
