import { useState } from 'react'
import SteamGames, { SteamSelector } from './components/steam-games'
import { GameInfo } from './game/stores'
import { GameModding } from './components/game-modding'
//import TablerSettings from '~icons/tabler/settings'
import TablerInfoSquareRounded from '~icons/tabler/info-square-rounded'

import Features from './features.mdx'
import { ThemeSwitch } from './components/theme-switch'

function App() {
  const [selectedGame, setSelectedGame] = useState<GameInfo | null>(null)

  return (
    <div className="drawer drawer-open">
      <input id="drawer-main" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side min-h-full bg-base-300 ">
        <label htmlFor="drawer-main" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="flex flex-col min-h-full">
          <ul className="menu">
            <li>
              <SteamSelector />
            </li>
            <li>
              <button className={`${selectedGame === null ? 'active' : ''}`} onClick={() => setSelectedGame(null)}>
                <TablerInfoSquareRounded className="text-xl" /> Info
              </button>
            </li>
            {/* <li className="disabled">
            <button disabled>
              <TablerSettings className="text-xl" /> Settings
            </button>
          </li> */}
          </ul>
          <SteamGames selectedGame={selectedGame} onGameSelected={setSelectedGame} />
          <span className="flex-grow"></span>
          <ul className="menu">
            <li>
              <ThemeSwitch />
            </li>
          </ul>
        </div>
      </div>

      <div className="drawer-content flex flex-col items-center justify-center gap-4 p-4 bg-base-200">
        {/* <label htmlFor="drawer-main" className="btn btn-primary drawer-button">
          Open drawer
        </label> */}
        {selectedGame ? <GameModding game={selectedGame} /> : <Features />}
      </div>
    </div>
  )
}

export default App
