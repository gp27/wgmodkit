import { useState } from 'react'
import SteamGames, { SteamSelector } from './components/steam-games'
import { GameInfo } from './steam/games'
import { GameModding } from './components/game-modding'
import TablerFolderCog from '~icons/tabler/folder-cog'

function App() {
  const [selectedGame, setSelectedGame] = useState<GameInfo | null>(null)

  return (
    <div className="drawer drawer-open">
      <input id="drawer-main" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side min-h-full bg-base-200 ">
        <label htmlFor="drawer-main" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="menu">
          <li>
            <SteamSelector />
          </li>
          <li>
            <button>
              <TablerFolderCog className="text-xl" /> Working Directory
            </button>
          </li>
        </div>
        <SteamGames onGameSelected={setSelectedGame} />
      </div>

      <div className="drawer-content flex flex-col items-center justify-center">
        {/* <label htmlFor="drawer-main" className="btn btn-primary drawer-button">
          Open drawer
        </label> */}
        <div className="flex flex-col gap-4 p-4">{selectedGame && <GameModding game={selectedGame} />}</div>
      </div>
    </div>
  )
}

export default App
