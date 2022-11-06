import { useContext } from "react";
import { FaPen, FaEraser } from "react-icons/fa";
import { KonvaContext } from "../../context/KonvaContext";

const PenWidthPicker = () => {
  const { penWidth, setPenWidth, eraserWidth, setEraserWidth, penOpacity, setPenOpacity } = useContext(KonvaContext);

  return (
    <>
      <label htmlFor="default-range" className="mb-2 block text-sm font-medium text-gray-900">
        <div className="flex items-center">
          <FaPen />
          <span className="pl-2">Pen Width: {penWidth}</span>
        </div>
        <input
          id="default-range"
          type="range"
          value={penWidth}
          min={10}
          max={100}
          onChange={(e) => {
            const value = Number(e.target.value);
            setPenWidth(value);
          }}
          step={5}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-700"
        />
      </label>
      <label htmlFor="default-range" className="mb-2 block text-sm font-medium text-gray-900">
        <div className="flex items-center">
          <FaEraser />
          <span className="pl-2">Eraser Width: {eraserWidth}</span>
        </div>
        <input
          id="default-range"
          type="range"
          value={eraserWidth}
          min={20}
          max={100}
          onChange={(e) => {
            const value = Number(e.target.value);
            setEraserWidth(value);
          }}
          step={5}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-700"
        />
      </label>
      <label htmlFor="default-range" className="mb-2 block text-sm font-medium text-gray-900">
        <div className="flex items-center">
          <FaPen />
          <span className="pl-2">Pen Opacity: {penOpacity}</span>
        </div>
        <input
          id="default-range"
          type="range"
          value={penOpacity}
          min={0.1}
          max={1}
          onChange={(e) => {
            const value = Number(e.target.value);
            setPenOpacity(value);
          }}
          step={0.1}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-700"
        />
      </label>
    </>
  );
};

export default PenWidthPicker;
