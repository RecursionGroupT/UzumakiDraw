import React, { useContext } from "react";
import { KonvaContext } from "../../context/KonvaContext";
import PenStylePicker from "./PenStylePicker";

const ToolBox = () => {
  const { penColor, setPenColor } = useContext(KonvaContext);

  return (
    <>
      <PenStylePicker />
      <select
        value={penColor}
        onChange={(e) => {
          setPenColor(e.target.value);
        }}
      >
        <option value="black">Black</option>
        <option value="red">Red</option>
      </select>
    </>
  );
};

export default ToolBox;
