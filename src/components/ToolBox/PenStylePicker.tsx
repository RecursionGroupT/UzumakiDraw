import React, { useContext } from "react";
import { KonvaContext, PenNames, IPenType } from "../../context/KonvaContext";

const PenStylePicker = () => {
  const { penType, setPenType, isPenDash, setIsPenDash } = useContext(KonvaContext);

  const getPenStyle = (name: PenNames): IPenType => {
    switch (name) {
      case "felt-tip":
        return {
          name: "felt-tip",
          lineCap: "round",
          lineJoin: "round",
          shadowBlur: 1,
          globalCompositeOperation: "source-over",
          dashEnabled: false,
        };
      case "brush":
        return {
          name: "brush",
          lineCap: "round",
          lineJoin: "round",
          shadowBlur: 7,
          globalCompositeOperation: "source-over",
          dashEnabled: false,
        };
      case "pencil":
        return {
          name: "pencil",
          lineCap: "butt",
          lineJoin: "miter",
          shadowBlur: 0,
          globalCompositeOperation: "source-over",
          dashEnabled: false,
        };
      case "eraser":
        return {
          name: "eraser",
          lineCap: "round",
          lineJoin: "round",
          shadowBlur: 0,
          globalCompositeOperation: "destination-out",
          dashEnabled: false,
        };
      default:
        return {
          name: "pencil",
          lineCap: "butt",
          lineJoin: "miter",
          shadowBlur: 0,
          globalCompositeOperation: "source-over",
          dashEnabled: false,
        };
    }
  };

  const handlePenTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const penName = e.target.value as PenNames;
    setPenType(getPenStyle(penName));
  };

  const handlePenDashChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const penDash = e.target.value;
    setIsPenDash(penDash === "dashed");
  };

  return (
    <>
      <select value={penType.name} onChange={handlePenTypeChange}>
        <option value="pencil">Pencil</option>
        <option value="eraser">Eraser</option>
        <option value="felt-tip">Felt-Tip</option>
        <option value="brush">Brush</option>
      </select>
      <select value={isPenDash ? "dashed" : "default"} onChange={handlePenDashChange}>
        <option value="dashed">Dashed</option>
        <option value="default">Default</option>
      </select>
    </>
  );
};

export default PenStylePicker;
