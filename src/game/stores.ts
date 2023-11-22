import wgLogo from '../assets/wargroove-logo-vector.png'
import wg2Logo from '../assets/wargroove-2-logo-vector.png'
import { atom } from 'nanostores'
import { $steam } from '../steam/stores'
import { exists } from '@tauri-apps/api/fs'
import { homeDir as getHomeDir } from '@tauri-apps/api/path'

export type GameInfo = ReturnType<typeof getGamesFromDefs>[number]

const homeDir = await getHomeDir()
const workingDirBase = `${homeDir}Wargroove ModKit`
const repackFileName = '_modkit_.toml'

const gameDefs: {
  name: string
  steamId: string
  gameDir: string
  assetsDir: string
  assetBackupDir: string
  hpackVersion: string
  img?: string
}[] = [
  {
    name: 'Wargroove',
    steamId: '607050',
    gameDir: 'Wargroove',
    assetsDir: 'assets',
    assetBackupDir: 'mod_bckp',
    hpackVersion: 'V2020',
    img: wgLogo,
  },
  {
    name: 'Wargroove 2',
    steamId: '1346020',
    gameDir: 'Wargroove 2',
    assetsDir: 'assets',
    assetBackupDir: 'mod_bckp',
    hpackVersion: 'V2023',
    img: wg2Logo,
  },
]

function getGamesFromDefs(steamDir: string, loading: boolean) {
  return gameDefs.map((game) => {
    const gamePath = `${steamDir}/steamapps/common/${game.gameDir}`
    const assetsPath = `${gamePath}/${game.assetsDir}`
    const workingPath = `${workingDirBase}/${game.gameDir}`
    return {
      ...game,
      get gamePath() {
        return gamePath
      },
      get assetsPath() {
        return assetsPath
      },
      get assetBackupPath() {
        return `${assetsPath}/${game.assetBackupDir}`
      },
      get workingPath() {
        return workingPath
      },
      get workingPathData() {
        return `${workingPath}/data`
      },
      get repackFilePath() {
        return `${assetsPath}/${repackFileName}`
      },
      installed: false,
      loading,
    }
  })
}

export const $games = atom(getGamesFromDefs('', false))

$steam.listen(async ({ dir }) => {
  let games = getGamesFromDefs(dir, true)
  $games.set(games)

  let gamesPromises = games.map(async (game) => {
    const gameInstalled = await exists(game.gamePath)
    return {
      ...game,
      installed: gameInstalled,
      loading: false,
    }
  })

  games = await Promise.all(gamesPromises)
  $games.set(games)
})
