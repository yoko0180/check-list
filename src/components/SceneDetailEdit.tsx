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
    setItem("");
    document.getElementById("add-item")!.focus();
  };

  const handleCompleteClick = () => {
    setSelectedSceneEdit(null);
    setSelectedScene(scene.id);
  };

  const handleSceneNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newScene = { ...scene, text: e.target.value };
    setScenes((scenes) => scenes.map((s) => (s.id === scene.id ? newScene : s)));
  };

  const handleItemDeleteClick = (itemId: string) => {
    const newItems = scene.items.filter(i => i.id !== itemId);
    const newScene = { ...scene, items: newItems };
    setScenes((scenes) => scenes.map((s) => (s.id === scene.id ? newScene : s)));
  };

  const handleItemMoveUpClick = (itemId: string) => {
    const index = scene.items.findIndex(i => i.id === itemId);
    if (index > 0) {
      const newItems = [...scene.items];
      [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
      const newScene = { ...scene, items: newItems };
      setScenes((scenes) => scenes.map((s) => (s.id === scene.id ? newScene : s)));
    }
  };

  const handleItemMoveTopClick = (itemId: string) => {
    const index = scene.items.findIndex(i => i.id === itemId);
    if (index > 0) {
      const newItems = [...scene.items];
      const item = newItems.splice(index, 1)[0];
      newItems.unshift(item);
      const newScene = { ...scene, items: newItems };
      setScenes((scenes) => scenes.map((s) => (s.id === scene.id ? newScene : s)));
    }
  };

  const handleItemMoveDownClick = (itemId: string) => {
    const index = scene.items.findIndex(i => i.id === itemId);
    if (index < scene.items.length - 1) {
      const newItems = [...scene.items];
      [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
      const newScene = { ...scene, items: newItems };
      setScenes((scenes) => scenes.map((s) => (s.id === scene.id ? newScene : s)));
    }
  };

  const handleSceneDeleteClick = () => {
    const newScenes = scenes.filter(s => s.id !== scene.id);
    setScenes(newScenes);
  };

  return (
    <div className="border rounded my-2 py-2">
      <div className="p-2 flex justify-between text-2xl">
        <span>シーン編集</span>
        <button onClick={handleCompleteClick}>完了</button>
      </div>
      
      <div className="p-2">
        <div>シーン名</div>
        <input type="text" className="border rounded p-1 w-full" value={scene.text} onChange={handleSceneNameChange} />
      </div>

      <div className="p-2">
        <div className="w-full">アイテム追加</div>
        <input id="add-item" type="text" className="border rounded p-1 w-4/5" placeholder="アイテムを追加" value={item} onChange={handleInputChange} />
        <button className="bg-blue-500 text-white p-1 ml-1 rounded w-1/6" onClick={handleAddClick}>追加</button>
      </div>

      <div className="p-2">
        {scene.items.map((item) => {
          const disabledUp = scene.items.findIndex(i => i.id === item.id) === 0
          const disabledDown = scene.items.findIndex(i => i.id === item.id) === scene.items.length - 1
          return (
            <div key={item.id} className="my-2 p-2 border rounded ">
              <input className="border rounded p-1 w-full" type="text" value={item.text} onChange={(e) => {
                const newItems = scene.items.map(i => i.id === item.id ? { ...i, text: e.target.value } : i);
                const newScene = { ...scene, items: newItems };
                setScenes((scenes) => scenes.map((s) => (s.id === scene.id ? newScene : s)));
              }} />
              <div className="item-buttons mt-1 flex justify-between">
                <button className=" bg-red-900 p-2 rounded" onClick={() => handleItemDeleteClick(item.id)}>削</button>
                <div className="up-down">
                  <button disabled={disabledUp} className={`mx-1 bg-blue-500 p-2 px-5 rounded ${disabledUp ? 'disabled:opacity-50' : ''}`} onClick={() => handleItemMoveTopClick(item.id)}>🔝</button>
                  <button disabled={disabledUp} className={`mx-1 bg-blue-500 p-2 px-5 rounded ${disabledUp ? 'disabled:opacity-50' : ''}`} onClick={() => handleItemMoveUpClick(item.id)}>上</button>
                  <button disabled={disabledDown} className={`mx-1 bg-blue-500 p-2 px-5 rounded ${disabledDown ? 'disabled:opacity-50' : ''}`} onClick={() => handleItemMoveDownClick(item.id)}>下</button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="p-2">
        <button className="bg-black text-red-600 font-bold p-2 rounded" onClick={handleSceneDeleteClick}>シーン削除</button>
      </div>
    </div>
  );
};

export default SceneDetailEdit;
