import { useState } from "react";

import { AddTodoLevel0 } from "../levels/level-0-uncontrolled/AddTodoLevel0";
import { AddTodoLevel1 } from "../levels/level-1-basic/AddTodoLevel1";
import { AddTodoLevel2 } from "../levels/level-2-hook/AddTodoLevel2";
import { AddTodoLevel2_5 } from "../levels/level-2.5-reducer/AddTodoLevel2_5";
import { AddTodoLevel3 } from "../levels/level-3-dynamic/AddTodoLevel3";
import { AddTodoLevel4 } from "../levels/level-4-register/AddTodoLevel4";
import { AddTodoLevel5 } from "../levels/level-5-enterprise/AddTodoLevel5";
import { AddTodoLevel5_5 } from "../levels/level-5.5-schema/AddTodoLevel5_5";
import { AddTodoLevel6 } from "../levels/level-6-external-store/AddTodoLevel6";
import { AddTodoLevel7 } from "../levels/level-7-server-driven/AddTodoLevel7";
import { AddTodoLevel6_5 } from "../levels/level-6.5-faang/AddTodoLevel6_5";

export default function App() {
  const [level, setLevel] = useState("1");

  const map = {
    "0": <AddTodoLevel0 />,
    "1": <AddTodoLevel1 />,
    "2": <AddTodoLevel2 />,
    "2.5": <AddTodoLevel2_5 />,
    "3": <AddTodoLevel3 />,
    "4": <AddTodoLevel4 />,
    "5": <AddTodoLevel5 />,
    "5.5": <AddTodoLevel5_5 />,
    "6": <AddTodoLevel6 />,
    "6.5": <AddTodoLevel6_5 />,
    "7": <AddTodoLevel7 />,
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow space-y-6">
        <h1 className="text-xl font-bold text-center">
          Form Architecture Deep Dive
        </h1>

        <div className="flex flex-wrap gap-2 justify-center">
          {Object.keys(map).map((k) => (
            <button
              key={k}
              onClick={() => setLevel(k)}
              className={`px-3 py-1 rounded border ${
                level === k ? "bg-blue-500 text-white" : ""
              }`}
            >
              Level {k}
            </button>
          ))}
        </div>

        {map[level as keyof typeof map]}
      </div>
    </div>
  );
}