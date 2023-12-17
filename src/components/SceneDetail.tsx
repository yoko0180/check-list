// src/components/SceneDetail.tsx
import React from "react";
import { Scene } from "../types";

interface SceneDetailProps {
  scene: Scene;
}

const SceneDetail: React.FC<SceneDetailProps> = ({ scene }) => {
  return (
    <div className="border rounded my-2 py-2">
      <div className="p-2 flex justify-between text-2xl">
        <span>シーン詳細：{scene.text}</span>
      </div>
      

      {/* ここに他の詳細を表示する */}
    </div>
  );
};

export default SceneDetail;
