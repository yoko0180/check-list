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

export const MenuButton: React.FC<{ onClick: () => void, children: React.ReactNode }> = ({ onClick, children }) => {
  return (
    <button className="bg-sky-600 p-2 m-1 rounded" onClick={onClick}>
      {children}
    </button>
  )
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
      <div className="left"></div>
      <div className="right">
        <MenuButton onClick={() => {
            setSelectedSceneEdit(scene.id)
            setSelectedScene(null)
            setSelectedSceneOneByOne(null)
          }}
        >
          編集
        </MenuButton>
        <MenuButton onClick={() => {
            setSelectedSceneEdit(null)
            setSelectedScene(null)
            setSelectedSceneOneByOne(null)
          }}
        >
          閉じる
        </MenuButton>

        {children}
        <MenuButton onClick={() => {
            const newItems = scene.items.map((i) => ({ ...i, done: false }))
            const newScene = { ...scene, items: newItems }
            setScenes((scenes) =>
              scenes.map((s) => (s.id === scene.id ? newScene : s))
            )
          }}
        >
          リセット
        </MenuButton>
      </div>
    </div>
  )
}

export default SceneDetailMenu
