import wgLogo from '../assets/wargroove-logo-vector.png'
import wg2Logo from '../assets/wargroove-2-logo-vector.png'
import { atom } from 'nanostores'
import { $steam } from '../steam/stores'
import { exists } from '@tauri-apps/api/fs'
import { homeDir as getHomeDir } from '@tauri-apps/api/path'

export type GameInfo = ReturnType<typeof getGamesFromDefs>[number]

const homeDir = await getHomeDir()

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
    const assetBackupPath = `${assetsPath}/${game.assetBackupDir}`
    return {
      ...game,
      gamePath,
      assetsPath,
      assetBackupPath,
      workingPath: `${homeDir}Wargroove ModKit/${game.gameDir}`,
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
