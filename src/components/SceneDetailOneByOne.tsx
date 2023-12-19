import React, { useState } from "react";
import { Scene } from "../types";
import { useAtom } from "jotai"
import { scenesState, selectedSceneEditState, selectedSceneOneByOneState, selectedSceneState } from "./Main"

interface SceneDetailProps {
  scene: Scene;
}

const SceneDetailOneByOne: React.FC<SceneDetailProps> = ({ scene }) => {
  const [scenes, setScenes] = useAtom(scenesState)
  const [selectedScene, setSelectedScene] = useAtom(selectedSceneState);
  const [selectedSceneEdit, setSelectedSceneEdit] = useAtom(selectedSceneEditState);
  const [selectedSceneOneByOne, setSelectedSceneOneByOne] = useAtom(selectedSceneOneByOneState);
  const item = scene.items.find(item => !item.done);

  return (
    <div className="border rounded my-2 py-2">
      <div className="p-2 flex justify-between">
        <span>シーン詳細 one</span>
      </div>

      <div className="flex justify-between">
        
        <div className="left">
          <button className="bg-sky-600 p-1 m-1 rounded" onClick={() => {
              setSelectedSceneEdit(scene.id)
              setSelectedScene(null)
              setSelectedSceneOneByOne(null)
              }}>編集</button>
          <button className="bg-sky-600 p-1 m-1 rounded" onClick={() => {
              setSelectedSceneEdit(null)
              setSelectedScene(null)
              setSelectedSceneOneByOne(null)
              }}>閉じる</button>
        </div>
        <div className="right">
          <button className="bg-sky-600 p-1 m-1 rounded" onClick={() => {
              const newItems = scene.items.map(i => ({ ...i, done: false }));
              const newScene = { ...scene, items: newItems };
              setScenes((scenes) => scenes.map((s) => (s.id === scene.id ? newScene : s)));
            }}>リセット</button>

          
          <button className="bg-sky-600 p-1 m-1 rounded" onClick={() => {
              setSelectedSceneEdit(null)
              setSelectedScene(scene.id)
              setSelectedSceneOneByOne(null)
            }}>list</button>

        </div>
      </div>


      <h1 className="p-2 flex justify-center text-2xl">{scene.text}</h1>
      {/* <h2 className="index">{index+1} / {scene.items.length}</h2> */}

      <div className="p-2 flex justify-center text-xl items-end">
        <span className="text-sm">完了数:</span>{" "}
        <span className="font-bold text-2xl mx-2">
          {scene.items.filter((item) => item.done).length}
        </span>{" "}
        <span className="text-sm">/ 全数:</span>{" "}
        <span className="font-bold text-2xl mx-2">{scene.items.length}</span>
      </div>

      <div className="p-2">
        {item ? (
          <button
            className={`text-2xl p-2 rounded w-full bg-red-900 h-40`}
            onClick={() => {
              const newItems = scene.items.map((i) =>
                i.id === item.id ? { ...i, done: !item.done } : i
              )
              const newScene = { ...scene, items: newItems }
              setScenes((scenes) =>
                scenes.map((s) => (s.id === scene.id ? newScene : s))
              )
            }}
          >
            {item.text}
          </button>
        ) : (
          <div className="text-2xl bg-green-600">チェック完了👍</div>
        )}
      </div>

      {/* <div className="p-2">
        <div className="item-card text-2xl bg-red-900 p-2 h-40 flex items-center justify-center">
          <h2 className="item-name">{scene.items[index].text}</h2>

        </div>
      </div> */}
    </div>
  )
};

export default SceneDetailOneByOne;
