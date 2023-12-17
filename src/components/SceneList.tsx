import { useAtom } from "jotai"
import { ItemView, Scene } from "../types"
import { scenesState, selectedSceneState } from "./Main"
import { ButtonList, ListItem } from "./ButtonList"
import { AddScene } from "./AddScene"

export const SceneList: React.FC<{}> = ({}) => {
  const [scenes, setScenes] = useAtom(scenesState)
  const [, setSelectedScene] = useAtom(selectedSceneState)

  const deleteAll = () => {
    setScenes([])
  }

  const handleSceneClick = (item: ListItem) => {
    if ("id" in item) {
      setSelectedScene(item.id)
    }
  }

  return (
    <div id="time-list" className="border rounded my-2 py-2">
      <div className="p-2 flex justify-between text-2xl">
        <span>シーン一覧({scenes.length}件)</span>
      </div>
      <button
        className="bg-red-900 p-2 m-1 rounded "
        onClick={() => deleteAll()}
      >
        全件削除
      </button>
      <div className="p-2">
        <AddScene></AddScene>
      </div>

      {scenes.map((item) => {
        return (
          <div key={item.id} className="m-2 border rounded flex items-center ">
            <button className="bg-teal-800 p-2 m-1 rounded w-full" onClick={() => handleSceneClick(item)}>
              {item.text}
            </button>
          </div>
        )
      })}
    </div>
  )
}
