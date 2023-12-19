import React, { Children, useState } from "react"
import { Scene } from "../types"
import { useAtom } from "jotai"
import {
  scenesState,
  selectedSceneEditState,
  selectedSceneOneByOneState,
  selectedSceneState,
} from "./Main"

interface SceneDetailProps {
  scene: Scene
  children?: React.ReactNode // children property added
}

const SceneDetailMenu: React.FC<SceneDetailProps> = ({ scene, children }) => {
  const [scenes, setScenes] = useAtom(scenesState)
  const [selectedScene, setSelectedScene] = useAtom(selectedSceneState)
  const [selectedSceneEdit, setSelectedSceneEdit] = useAtom(
    selectedSceneEditState
  )
  const [selectedSceneOneByOne, setSelectedSceneOneByOne] = useAtom(
    selectedSceneOneByOneState
  )
  return (
    <div className="menu flex justify-between">
      <div className="left">
        <button
          className="bg-sky-600 p-1 m-1 rounded"
          onClick={() => {
            setSelectedSceneEdit(scene.id)
            setSelectedScene(null)
            setSelectedSceneOneByOne(null)
          }}
        >
          編集
        </button>
        <button
          className="bg-sky-600 p-1 m-1 rounded"
          onClick={() => {
            setSelectedSceneEdit(null)
            setSelectedScene(null)
            setSelectedSceneOneByOne(null)
          }}
        >
          閉じる
        </button>
      </div>
      <div className="right">
        {children}
        <button
          className="bg-sky-600 p-1 m-1 rounded"
          onClick={() => {
            const newItems = scene.items.map((i) => ({ ...i, done: false }))
            const newScene = { ...scene, items: newItems }
            setScenes((scenes) =>
              scenes.map((s) => (s.id === scene.id ? newScene : s))
            )
          }}
        >
          リセット
        </button>


      </div>
    </div>
  )
}

export default SceneDetailMenu
