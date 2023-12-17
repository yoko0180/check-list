import pkg from "../../package.json"
import { NowStylePattern, Time, ItemView, Scene } from "../types"
import { SceneList } from "./SceneList"
import { atomWithStorage } from "jotai/utils"
import { atom, useAtom, useSetAtom, useAtomValue } from "jotai"
import { Now } from "./Now"
import { AddScene } from "./AddScene"

export const scenesState = atomWithStorage<Scene[]>("scenes", [])
export const nowStyleState = atomWithStorage<NowStylePattern>("nowStyle", "style1")

const Main: React.FC<{ lang: string }> = ({ lang }) => {
  console.log("render Main")

  const [scenes, setScenes] = useAtom(scenesState)
  const [nowStyle, setNowStyle] = useAtom(nowStyleState)

  const handleRecord = () => {
    const item = {
      id: "time_" + Date.now(),
      time: new Date(),
    }
    // setTimes((times) => times.concat([item]))
  }

  const handleOnclickDel = (scene: Scene) => {
    setScenes(scenes.filter((i) => i.id !== scene.id))
  }

  const handleOnclickNow = () => {
    if (nowStyle === "style1") setNowStyle("style2")
    if (nowStyle === "style2") setNowStyle("style1")
  }

  return (
    <div className="App p-5">
      <div id="title" className="flex items-center text-xs">
        <h1 className="p-1 text-center" id="title">
          チェックリスト
        </h1>
        <span>ver {pkg.version}</span>
      </div>

      <button className="bg-red-900 p-2 m-1 rounded " onClick={() => {}}>
        シーン登録
      </button>

      <AddScene></AddScene>

      {/* シーンを一覧表示する
    　シーンを選択するとそのアイテム一覧を表示する */}

      {/* <Now stylePattern={nowStyle} onClick={handleOnclickNow}></Now> */}
      <SceneList onClickDel={handleOnclickDel}></SceneList>

      <div className="three wide column text-left mt-5">© 2023</div>
    </div>
  )
}

export default Main
