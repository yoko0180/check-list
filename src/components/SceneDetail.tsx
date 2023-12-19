import React, { useState } from "react";
import { Scene } from "../types";
import { useAtom } from "jotai"
import { scenesState, selectedSceneEditState, selectedSceneOneByOneState, selectedSceneState } from "./Main"
import SceneDetailMenu from "./SceneDetailMenu";

interface SceneDetailProps {
  scene: Scene;
}

const SceneDetail: React.FC<SceneDetailProps> = ({ scene }) => {
  const [scenes, setScenes] = useAtom(scenesState)
  const [selectedScene, setSelectedScene] = useAtom(selectedSceneState);
  const [selectedSceneOneByOne, setSelectedSceneOneByOne] = useAtom(selectedSceneOneByOneState);
  const [selectedSceneEdit, setSelectedSceneEdit] = useAtom(selectedSceneEditState);

  return (
    <div className="border rounded my-2 py-2">
      <div className="p-2 flex justify-between">
        <span>シーン詳細</span>
      </div>

      <SceneDetailMenu scene={scene}>
        <button
          className="bg-sky-600 p-1 m-1 rounded"
          onClick={() => {
            setSelectedSceneEdit(null)
            setSelectedScene(null)
            setSelectedSceneOneByOne(scene.id)
          }}
        >
          one
        </button>
      </SceneDetailMenu>

      
      <h1 className="p-2 flex justify-center text-2xl">{scene.text}</h1>
      <div className="p-2">
        {scene.items.map((item) => {
          return (
            <div key={item.id} className="m-2 border rounded flex items-center ">
              <button className={`text-2xl p-2 m-1 rounded w-full ${item.done ? "bg-green-500" : "bg-red-900"}`} onClick={() => {
                const newItems = scene.items.map(i => i.id === item.id ? { ...i, done: !item.done } : i);
                const newScene = { ...scene, items: newItems };
                setScenes((scenes) => scenes.map((s) => (s.id === scene.id ? newScene : s)));
              }}>
                {item.text}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default SceneDetail;
