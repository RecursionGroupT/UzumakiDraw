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
      <CirclePicker
        colors={[
          "#f44336",
          "#e91e63",
          "#9c27b0",
          "#673ab7",
          "#3f51b5",
          "#2196f3",
          "#03a9f4",
          "#009688",
          "#4caf50",
          "#8bc34a",
          "#cddc39",
          "#ffeb3b",
          "#ffc107",
          "#ff9800",
          "#ff5722",
          "#795548",
          "#607d8b",
          "#000",
        ]}
        color={penColor}
        onChange={handleChange}
      />
    </div>
  );
};

export default PenColorPicker;
