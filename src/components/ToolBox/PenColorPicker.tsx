import React, { useContext } from "react";
import { CirclePicker } from "react-color";
import { KonvaContext } from "../../context/KonvaContext";

const PenColorPicker = () => {
  const { penColor, setPenColor } = useContext(KonvaContext);

  const handleChange = (color: { hex: string }): void => {
    setPenColor(color.hex);
  };

  return (
    <div>
      <CirclePicker color={penColor} onChange={handleChange} />
    </div>
  );
};

export default PenColorPicker;
