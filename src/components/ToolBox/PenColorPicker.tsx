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
    <>
      <div>
        <div>
          <button type="button" onClick={handleOpen}>
            <div>カラーを選択する</div>
          </button>
        </div>
      </div>
      {isOpen && (
        <div>
          <button type="button" onClick={handleClose}>
            <div>閉じる</div>
          </button>
          <SketchPicker color={penColor} onChange={handleChange} />
        </div>
      )}
    </>
  );
};

export default PenColorPicker;
