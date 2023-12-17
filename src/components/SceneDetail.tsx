// src/components/SceneDetail.tsx
import React, { useState } from "react";
import { Scene } from "../types";
import { useAtom } from "jotai"
import { scenesState, selectedSceneState } from "./Main"

interface SceneDetailProps {
  scene: Scene;
}

const SceneDetail: React.FC<SceneDetailProps> = ({ scene }) => {
  const [item, setItem] = useState("");
  const [scenes, setScenes] = useAtom(scenesState)
  const [selectedScene, setSelectedScene] = useAtom(selectedSceneState);
//   const scene = scenes.find(s => s.id === selectedScene)
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItem(event.target.value);
  };

  const handleAddClick = () => {
    // ここでシーンにアイテムを追加します
    // scene.items.push(item);
    // setItem("");

    if (!scene) return
    const newScene = { ...scene, items: [...scene.items, { id: Date.now() + "", text: item }] };
    setScenes((scenes) => scenes.map((s) => (s.id === scene.id ? newScene : s)));
  };

  return (
    <div className="border rounded my-2 py-2">
      <div className="p-2 flex justify-between text-2xl">
        <span>シーン詳細：{scene.text}</span>
      </div>
      
      <div className="p-2">
        <input type="text" className="border rounded p-1" placeholder="アイテムを追加" value={item} onChange={handleInputChange} />
        <button className="bg-blue-500 text-white p-1 rounded ml-2" onClick={handleAddClick}>追加</button>
      </div>

      {/* ここに他の詳細を表示する */}
      <div className="p-2">
        <ul>
          {scene.items.map((item) => (
            <li key={item.id}>{item.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SceneDetail;
