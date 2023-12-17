import React, { useState } from "react";
import { Scene } from "../types";
import { useAtom } from "jotai"
import { scenesState, selectedSceneEditState, selectedSceneState } from "./Main"

interface SceneDetailProps {
  scene: Scene;
}

const SceneDetailEdit: React.FC<SceneDetailProps> = ({ scene }) => {
  const [item, setItem] = useState("");
  const [scenes, setScenes] = useAtom(scenesState)
  const [selectedScene, setSelectedScene] = useAtom(selectedSceneState);
  const [selectedSceneEdit, setSelectedSceneEdit] = useAtom(selectedSceneEditState);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItem(event.target.value);
  };

  const handleAddClick = () => {
    if (!scene) return
    const newScene = { ...scene, items: [...scene.items, { id: Date.now() + "", text: item, done: false }] };
    setScenes((scenes) => scenes.map((s) => (s.id === scene.id ? newScene : s)));
  };

  return (
    <div className="border rounded my-2 py-2">
      <div className="p-2 flex justify-between text-2xl">
        <span>シーン編集</span>
        <button onClick={() => {
          setSelectedSceneEdit(null) 
          setSelectedScene(scene.id)
          }}>完了</button>

      </div>
      
      <div className="p-2">
        <div>シーン名</div>
        <input type="text" className="border rounded p-1" value={scene.text} onChange={(e) => {
          const newScene = { ...scene, text: e.target.value };
          setScenes((scenes) => scenes.map((s) => (s.id === scene.id ? newScene : s)));
        }} />

      </div>

      <div className="p-2">
        <div>アイテム追加</div>
        <input type="text" className="border rounded p-1" placeholder="アイテムを追加" value={item} onChange={handleInputChange} />
        <button className="bg-blue-500 text-white p-1 rounded ml-2" onClick={handleAddClick}>追加</button>
      </div>

      <div className="p-2">
        {scene.items.map((item) => {
          const disabledUp = scene.items.findIndex(i => i.id === item.id) === 0
          const disabledDown = scene.items.findIndex(i => i.id === item.id) === scene.items.length - 1
          return (
            <div key={item.id} className="m-2 p-2 border rounded flex items-center ">
              <input className="border rounded p-1" type="text" value={item.text} onChange={(e) => {
                const newItems = scene.items.map(i => i.id === item.id ? { ...i, text: e.target.value } : i);
                const newScene = { ...scene, items: newItems };
                setScenes((scenes) => scenes.map((s) => (s.id === scene.id ? newScene : s)));
              }} />
              <button className="mx-1 bg-red-900 p-2 rounded" onClick={() => {
                const newItems = scene.items.filter(i => i.id !== item.id);
                const newScene = { ...scene, items: newItems };
                setScenes((scenes) => scenes.map((s) => (s.id === scene.id ? newScene : s)));
              }}>削</button>
              <button disabled={disabledUp} className={`mx-1 bg-blue-500 p-2 rounded ${disabledUp ? 'disabled:opacity-50' : ''}`} onClick={() => {
                const index = scene.items.findIndex(i => i.id === item.id);
                if (index > 0) {
                  const newItems = [...scene.items];
                  [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
                  const newScene = { ...scene, items: newItems };
                  setScenes((scenes) => scenes.map((s) => (s.id === scene.id ? newScene : s)));
                }
              }}>上</button>
              <button disabled={disabledDown} className={`mx-1 bg-blue-500 p-2 rounded ${disabledDown ? 'disabled:opacity-50' : ''}`} onClick={() => {
                const index = scene.items.findIndex(i => i.id === item.id);
                if (index < scene.items.length - 1) {
                  const newItems = [...scene.items];
                  [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
                  const newScene = { ...scene, items: newItems };
                  setScenes((scenes) => scenes.map((s) => (s.id === scene.id ? newScene : s)));
                }
              }}>下</button>
            </div>
          )
        })}
      </div>

      <div className="p-2">
        <button className="bg-red-900 text-white p-1 rounded" onClick={() => {
          const newScenes = scenes.filter(s => s.id !== scene.id);
          setScenes(newScenes);
        }}>シーン削除</button>
      </div>
    </div>
  );
};

export default SceneDetailEdit;
