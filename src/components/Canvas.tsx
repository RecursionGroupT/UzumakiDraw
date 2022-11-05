import Konva from "konva";
import React, { useState, useContext } from "react";
import { Circle, Layer, Stage } from "react-konva";
import { Drawing, KonvaContext } from "../context/KonvaContext";

interface CursorPos {
  x: number;
  y: number;
}

type Props = {
  drawing: Drawing;
  setDrawing: React.Dispatch<React.SetStateAction<Drawing>>;
  className: string;
  width: number;
  height: number;
  isDrawing: React.MutableRefObject<boolean>;
  handleMouseUp: () => void; // マウスクリック後のロジック
  handleMouseDown: (e: Konva.KonvaEventObject<MouseEvent>) => void; // マウスクリックのロジック
  children: React.ReactNode;
};

const Canvas = React.forwardRef<Konva.Stage, Props>(
  ({ drawing, setDrawing, className, width, height, isDrawing, handleMouseDown, handleMouseUp, children }, ref) => {
    const { penType, penColor, penWidth, eraserWidth } = useContext(KonvaContext);
    const [cursorPos, setCursorPos] = useState<CursorPos | null>(null);

    const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>): void => {
      const stage = e.target.getStage();
      if (stage != null) {
        const pos = stage.getRelativePointerPosition();
        setCursorPos(pos);
      }

      // no drawing - skipping
      if (!isDrawing.current) {
        return;
      }

      if (stage != null) {
        const point = stage.getPointerPosition();
        const lastLine = drawing.lines[drawing.lines.length - 1];
        // add point
        if (point != null) {
          lastLine.points = lastLine.points.concat([point.x, point.y]);

          // replace last
          drawing.lines.splice(drawing.lines.length - 1, 1, lastLine);
          setDrawing((prevDrawing) => {
            const newDrawing = { ...prevDrawing };
            newDrawing.lines = drawing.lines.concat();
            return newDrawing;
          });
        }
      }
    };

    const handleMouseEnter = (e: Konva.KonvaEventObject<MouseEvent>): void => {
      const stage = e.target.getStage();
      if (stage !== null) {
        const container = stage.container();
        container.style.cursor = "none";
      }
    };

    const handleMouseLeave = (e: Konva.KonvaEventObject<MouseEvent>): void => {
      const stage = e.target.getStage();
      if (stage !== null) {
        const container = stage.container();
        container.style.cursor = "pointer";
        setCursorPos(null);
      }
    };

    return (
      <Stage
        ref={ref}
        className={className}
        width={width}
        height={height}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Layer>
          {cursorPos && (
            <Circle
              name="cursor"
              fill={penType.name === "eraser" ? "rgb(212 212 212)" : penColor}
              opacity={0.3}
              width={penType.name === "eraser" ? eraserWidth : penWidth}
              x={cursorPos.x}
              y={cursorPos.y}
            />
          )}
          {children}
        </Layer>
      </Stage>
    );
  }
);

export default Canvas;
