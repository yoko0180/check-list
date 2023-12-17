import { useAtom } from "jotai"
import { ItemView, Scene } from "../types"
import { scenesState } from "./Main"
import { useState } from "react"

export const AddScene: React.FC<{}> = ({}) => {
  const [scenes, setScenes] = useAtom(scenesState)

  const [text, setText] = useState("")
  return (
    <div id="time-list" className="border rounded my-2 py-2">
      <h1 className="p-2 justify-between text-2xl">シーン登録</h1>
      <div className="">
        <label htmlFor="">title</label>
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
      {scenes.map((item) => {
        return (
          <div key={item.id} className="m-2 border rounded flex items-center ">
            <button className="bg-red-900 p-2 m-1 rounded w-full">{item.text}</button>
          </div>
        )
      })}
    </div>
  )
}
