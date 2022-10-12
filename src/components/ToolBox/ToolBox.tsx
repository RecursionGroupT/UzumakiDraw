import React, { useContext } from "react";
import { KonvaContext, PenType } from "../../context/KonvaContext";
import PenWidthPicker from "./PenWidthPicker";

const ToolBox = () => {
  const { penType, setPenType, penColor, setPenColor } = useContext(KonvaContext);

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
      <select
        value={penColor}
        onChange={(e) => {
          setPenColor(e.target.value as PenType);
        }}
      >
        <option value="black">Black</option>
        <option value="red">Red</option>
      </select>
      <PenWidthPicker />
    </>
  );
};

export default ToolBox;
