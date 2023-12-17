import { useAtom } from "jotai"
import { ItemView, Scene } from "../types"
import { scenesState } from "./Main"
import { useState } from "react"

export const AddScene: React.FC<{}> = ({}) => {
  const [scenes, setScenes] = useAtom(scenesState)

  const [text, setText] = useState("")
  return (
    <div id="time-list" className="border rounded my-2 p-2">
      <h4 className="p-2 justify-between">シーン登録</h4>
      <div className="">
        <input
          type="text"
          className="border rounded py-2 px-3 "
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="bg-red-900 p-2 m-1 rounded " onClick={() => {
          const newScene: Scene = { id: Date.now() + "", text: text, items: [] }
          setScenes([...scenes, newScene])
          setText("")
        }}>
          登録
        </button>
      </div>

    </div>
  )
}
