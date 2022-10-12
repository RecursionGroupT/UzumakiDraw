import { useContext } from "react";
import { KonvaContext } from "../../context/KonvaContext";

const PenWidthPicker = () => {
  const { penWidth, setPenWidth } = useContext(KonvaContext);

  return (
    <select
      value={penWidth}
      onChange={(e) => {
        const value = Number(e.target.value);
        setPenWidth(value);
      }}
    >
      <option value={1}>1</option>
      <option value={5}>5</option>
      <option value={10}>10</option>
    </select>
  );
};

export default PenWidthPicker;
