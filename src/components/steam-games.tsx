import { useEffect, useState } from 'react'
import { useSteam, useGames } from '../steam/hooks'
import { GameInfo } from '../steam/games'
import TablerBrandSteam from '~icons/tabler/brand-steam'
import TablerFolderCheck from '~icons/tabler/folder-check'
import TablerFolderSearch from '~icons/tabler/folder-search'

export default function SteamGames({ onGameSelected }: { onGameSelected?: (game: GameInfo | null) => void }) {
  let steam = useSteam()
  let games = useGames()
  const [selectedGame, setSelectedGame] = useState<GameInfo | null>(null)

  useEffect(() => {
    selectGame(null)
  }, [steam.dir])

  function selectGame(game: GameInfo | null) {
    setSelectedGame(game)
    onGameSelected?.(game)
  }

  return (
    <ul className="menu bg-base-200">
      <li className="menu-title">Games</li>
      {games.map((game, i) => {
        const { name, img, installed } = game
        return (
          <li key={i} className={`${!installed ? 'disabled' : ''}`}>
            <button disabled={!installed} className={`min-w-[120px] items-center ${game == selectedGame ? 'active' : ''}`} onClick={() => selectGame(game)}>
              <div className="tooltip tooltip-right" data-tip={installed ? 'Game found' : 'Game not found'}>
                <SteamIndicator valid={installed} warn />
              </div>

              <div className="flex justify-center">
                <img src={img} alt={name} className={`max-w-full max-h-full h-8 ${!installed ? 'opacity-30' : ''}`} />
              </div>
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export function SteamSelector() {
  let steam = useSteam()
  return (
    <button onClick={steam.select}>
      <span className="text-xl">
        <SteamIndicator valid={steam.valid} />
      </span>
      {steam.valid ? (
        <>
          Steam
          <TablerFolderCheck />
        </>
      ) : (
        <>
          Select Steam Folder
          <TablerFolderSearch />
        </>
      )}
    </button>
  )
}

export function SteamIndicator({ valid, warn }: { valid: boolean; warn?: boolean }) {
  return (
    <div className={`border rounded-full ${valid ? 'text-success border-success' : warn ? 'text-warning border-warning' : 'text-error border-error'}`}>
      <TablerBrandSteam />
    </div>
  )
}
