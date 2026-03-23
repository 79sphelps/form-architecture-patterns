import { useRef } from "react";

export const RenderCounter = () => {
  const renders = useRef(0);
  renders.current++;

  return (
    <div className="text-xs text-gray-500">
      Renders: {renders.current}
    </div>
  );
};