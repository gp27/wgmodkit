import { shell } from '@tauri-apps/api'
import { GameInfo } from '../game/stores'
import TablerFolderOpen from '~icons/tabler/folder-open'
import TablerBrandSteam from '~icons/tabler/brand-steam'
import TablerFolderCog from '~icons/tabler/folder-cog'
import { useGameMods } from '../game/hooks'

export function GameModding({ game }: { game: GameInfo }) {
  return (
    <div className="m-auto gap-4 flex flex-wrap items-stretch justify-center">
      <GameCard game={game} />

      <ModTools game={game} />
      {/* <ModList /> */}
    </div>
  )
}

export function GameCard({ game }: { game: GameInfo }) {
  return (
    <div className="card card-compact  bg-neutral shadow-xl">
      {game.img && (
        <figure>
          <img src={game.img} alt={game.name} className="p-2 max-w-[250px]" />
        </figure>
      )}
      <div className="card-body">
        {/* <h2 className="card-title">{game.name}</h2> */}
        {/* <p>If a dog chews shoes whose shoes does he choose?</p> */}
        <div className="card-actions justify-end">
          <button onClick={() => shell.open(`file://${game.gamePath}/`)} className="btn btn-xs">
            <TablerFolderOpen />
            Open Folder
          </button>
          <button onClick={() => shell.open(`steam://rungameid/${game.steamId}`)} className="btn btn-xs">
            <TablerBrandSteam />
            Start Game
          </button>
        </div>
      </div>
    </div>
  )
}

export function ModTools({ game }: { game: GameInfo }) {
  const gameMods = useGameMods(game)

  return (
    <div className="card card-compact bg-neutral shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Mod Tools</h2>
        <button className="btn btn-sm" onClick={gameMods.openWorkingDir}>
          <TablerFolderCog className="text-xl" />
          Open Working Directory
        </button>
        <button className="btn" disabled={gameMods.unpacking} onClick={gameMods.unpackAssets}>
          Unpack Game Assets
          {gameMods.unpacking && <span className="loading loading-spinner loading-xs"></span>}
        </button>

        <button className="btn" disabled={true || gameMods.unpacking}>
          Repack Game Assets
        </button>
      </div>
    </div>
  )
}

export function ModList() {
  return (
    <div className="card card-compact bg-neutral shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Mod List</h2>
        <div className="">
          <table className="table table-xs">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Active</th>
                <th>Version</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <th>1</th>
                <td>Extended Map Editor</td>
                <td>Yes</td>
                <td>1.0</td>
              </tr>
              {/* row 2 */}
              <tr>
                <th>2</th>
                <td>Ducks faction</td>
                <td>No</td>
                <td>1.0</td>
              </tr>
              {/* row 3 */}
              <tr>
                <th>3</th>
                <td>Golf game</td>
                <td>No</td>
                <td>1.1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
