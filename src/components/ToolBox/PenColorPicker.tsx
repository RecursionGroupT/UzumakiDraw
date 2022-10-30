import React, { useContext } from "react";
import { CirclePicker } from "react-color";
import { KonvaContext } from "../../context/KonvaContext";

const PenColorPicker = () => {
  const { setPenColor } = useContext(KonvaContext);

  const handleChange = (color: { hex: string }): void => {
    setPenColor(color.hex);
  };

  return (
    <div className="grid grid-cols-2 gap-1 md:grid-cols-4">
      <CirclePicker onChange={handleChange} />
    </div>
  );
};

export default PenColorPicker;
