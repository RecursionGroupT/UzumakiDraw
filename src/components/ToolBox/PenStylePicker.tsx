import React, { useContext } from "react";
import { KonvaContext, PenNames, IPenType } from "../../context/KonvaContext";
import PenStylePickerButton from "./PenStylePickerButton";

const PenStylePicker = () => {
  const { penType, setPenType, isPenDash, setIsPenDash } = useContext(KonvaContext);

  const getPenStyle = (name: PenNames): IPenType => {
    switch (name) {
      case "brush":
        return {
          name: "brush",
          lineCap: "round",
          lineJoin: "round",
          globalCompositeOperation: "source-over",
          dashEnabled: false,
        };
      case "pencil":
        return {
          name: "pencil",
          lineCap: "butt",
          lineJoin: "miter",
          globalCompositeOperation: "source-over",
          dashEnabled: false,
        };
      case "eraser":
        return {
          name: "eraser",
          lineCap: "round",
          lineJoin: "round",
          globalCompositeOperation: "destination-out",
          dashEnabled: false,
        };
      default:
        return {
          name: "pencil",
          lineCap: "butt",
          lineJoin: "miter",
          globalCompositeOperation: "source-over",
          dashEnabled: false,
        };
    }
  };

  const handlePenTypeChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    const penName = e.currentTarget.value as PenNames;
    setPenType(getPenStyle(penName));
  };

  const handlePenDashChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    const penDash = e.currentTarget.value;
    setIsPenDash(penDash === "dashed");
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-1 md:grid-cols-2">
        <PenStylePickerButton value="brush" currentPen={penType.name} handleClick={handlePenTypeChange} />
        <PenStylePickerButton value="eraser" currentPen={penType.name} handleClick={handlePenTypeChange} />
      </div>
      <div className="grid grid-cols-1 gap-1 md:grid-cols-2">
        <PenStylePickerButton
          value="default"
          currentPen={isPenDash ? "dashed" : "default"}
          handleClick={handlePenDashChange}
        />
        <PenStylePickerButton
          value="dashed"
          currentPen={isPenDash ? "dashed" : "default"}
          handleClick={handlePenDashChange}
        />
      </div>
    </>
  );
};

export default PenStylePicker;
