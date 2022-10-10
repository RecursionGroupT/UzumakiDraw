import React, { useContext } from "react";
import { SketchPicker } from "react-color";
import { KonvaContext } from "../../context/KonvaContext";

const PenColorPicker = () => {
  const { penColor, setPenColor } = useContext(KonvaContext);

  const handleChange = (color: { hex: string }): void => {
    setPenColor(color.hex);
  };

  return <SketchPicker color={penColor} onChange={handleChange} />;
};

export default PenColorPicker;
