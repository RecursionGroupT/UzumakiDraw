import React, { useContext } from "react";
import { KonvaContext, PenType } from "../../context/KonvaContext";
import PenColorPicker from "./PenColorPicker";

const ToolBox = () => {
  const { penType, setPenType } = useContext(KonvaContext);

  return (
    <>
      <select
        value={penType}
        onChange={(e) => {
          setPenType(e.target.value as PenType);
        }}
      >
        <option value="pen">Pen</option>
        <option value="eraser">Eraser</option>
      </select>
      <PenColorPicker />
    </>
  );
};

export default ToolBox;
