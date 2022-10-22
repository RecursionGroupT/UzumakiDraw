import React, { useContext, useState } from "react";
import { SketchPicker } from "react-color";
import { KonvaContext } from "../../context/KonvaContext";

const PenColorPicker = () => {
  const { penColor, setPenColor } = useContext(KonvaContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleChange = (color: { hex: string }): void => {
    setPenColor(color.hex);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="bg-blue-300">
      <button type="button" onClick={handleOpen}>
        カラーを選択する
      </button>
      {isOpen && (
        <div className="absolute">
          <SketchPicker color={penColor} onChange={handleChange} />
          <button type="button" onClick={handleClose}>
            閉じる
          </button>
        </div>
      )}
    </div>
  );
};

export default PenColorPicker;
