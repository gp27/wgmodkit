import { shell } from '@tauri-apps/api'
import { GameInfo } from '../game/stores'
import TablerFolderOpen from '~icons/tabler/folder-open'
import TablerBrandSteam from '~icons/tabler/brand-steam'
import TablerFolderCog from '~icons/tabler/folder-cog'
import TablerRestore from '~icons/tabler/restore'
import TablerFileStack from '~icons/tabler/file-stack'
import TablerPackage from '~icons/tabler/package'
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

        <div className="join join-vertical">
          <button className="btn join-item" disabled={gameMods.isBusy} onClick={gameMods.unpackAssets}>
            <TablerFileStack className="text-xl" />
            Unpack Game Assets
            {gameMods.unpacking && <span className="loading loading-spinner loading-xs"></span>}
          </button>

          <button className="btn btn-sm btn-outline join-item" onClick={gameMods.openWorkingDir} disabled={!gameMods.isUnpacked}>
            <TablerFolderCog className="text-xl" />
            Open Working Directory
          </button>
        </div>

        <div className="join join-vertical join-item">
          <button className="btn join-item" disabled={gameMods.isBusy || !gameMods.isUnpacked} onClick={gameMods.repackAssets}>
            <TablerPackage className="text-xl" />
            Repack Game Assets
            {gameMods.repacking && <span className="loading loading-spinner loading-xs"></span>}
          </button>

          {/* <button className="btn btn-sm btn-outline join-item" disabled={!gameMods.isRepacked} onClick={gameMods.readAssets}>
            <TablerRestore className="text-xl" />
            Read Game Assets
          </button> */}

          <button className="btn btn-sm btn-outline join-item" disabled={!gameMods.isRepacked} onClick={gameMods.restoreData}>
            <TablerRestore className="text-xl" />
            Restore Game Assets
          </button>
        </div>
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
