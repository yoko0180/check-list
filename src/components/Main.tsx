import pkg from "../../package.json"
import { NowStylePattern, Time, ItemView, Scene } from "../types"
import { SceneList } from "./SceneList"
import { atomWithStorage } from "jotai/utils"
import { atom, useAtom, useSetAtom, useAtomValue } from "jotai"
import { AddScene } from "./AddScene"
import SceneDetail from './SceneDetail';
import SceneDetailEdit from "./SceneDetailEdit"

export const scenesState = atomWithStorage<Scene[]>("scenes", [])
export const nowStyleState = atomWithStorage<NowStylePattern>("nowStyle", "style1")
export const selectedSceneState = atomWithStorage<string | null>("selectedScene", null)
export const selectedSceneEditState = atomWithStorage<string | null>("selectedSceneEdit", null)

const Main: React.FC<{ lang: string }> = ({ lang }) => {
  console.log("render Main")

  const [scenes, setScenes] = useAtom(scenesState)
  const [nowStyle, setNowStyle] = useAtom(nowStyleState)
  const [selectedScene, setSelectedScene] = useAtom(selectedSceneState)
  const [selectedSceneEdit, setSelectedSceneEditState] = useAtom(selectedSceneEditState)

  const scene = scenes.find(s => s.id === selectedScene)
  const sceneEdit = scenes.find(s => s.id === selectedSceneEdit)


  return (
    <div className="App p-5">
      <div id="title" className="flex items-center text-xs">
        <h1 className="p-1 text-center" id="title">
          チェックリスト
        </h1>
        <span>ver {pkg.version}</span>
      </div>

      {!scene && !sceneEdit && <SceneList ></SceneList>}

      {/* 選択されたシーンがある場合、その詳細を表示 */}
      {scene && <SceneDetail scene={scene} />}
      {sceneEdit && <SceneDetailEdit scene={sceneEdit} />}

      <div className="three wide column text-left mt-5">© 2023</div>
    </div>
  )
}

export default Main
