import Konva from "konva";
import React, { useState, useRef, useContext, useEffect } from "react";
import { Layer, Stage, Line, Circle } from "react-konva";
import { KonvaContext, IPenType, Drawing } from "../context/KonvaContext";

type Props = {
  drawing: Drawing;
  setDrawing: React.Dispatch<React.SetStateAction<Drawing>>;
};

interface CursorPos {
  x: number;
  y: number;
}

const KonvaCanvas: React.FC<Props> = ({ drawing, setDrawing }) => {
  const { penType, penColor, penWidth, isPenDash, eraserWidth, penOpacity } = useContext(KonvaContext);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [cursorPos, setCursorPos] = useState<CursorPos | null>(null);

  const isDrawing = useRef<boolean>(false);

  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>): void => {
    isDrawing.current = true;
    const stage = e.target.getStage();
    if (stage != null) {
      const pos = stage.getPointerPosition();
      if (pos != null) {
        const currPenType: IPenType = { ...penType, dashEnabled: isPenDash };
        if (currPenType.name === "eraser") {
          setDrawing((prevDrawing) => [
            ...prevDrawing,
            { penType: currPenType, points: [pos.x, pos.y], color: penColor, width: eraserWidth, opacity: 1 },
          ]);
        } else {
          setDrawing((prevDrawing) => [
            ...prevDrawing,
            { penType: currPenType, points: [pos.x, pos.y], color: penColor, width: penWidth, opacity: penOpacity },
          ]);
        }
      }
    }
  };

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
      const lastLine = drawing[drawing.length - 1];
      // add point
      if (point != null) {
        lastLine.points = lastLine.points.concat([point.x, point.y]);

        // replace last
        drawing.splice(drawing.length - 1, 1, lastLine);
        setDrawing(drawing.concat());
      }
    }
  };

  const handleMouseUp = (): void => {
    isDrawing.current = false;
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

  const handleResize = () => {
    setWidth(window.innerWidth * 0.6);
    setHeight(window.innerHeight * 0.6);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", () => {
      handleResize();
    });
    return () => {
      window.removeEventListener("resize", () => {
        handleResize();
      });
    };
  }, []);

  return (
    <Stage
      className="rounded-b-md border-4 border-black bg-white"
      width={width}
      height={height}
      onMouseDown={handleMouseDown}
      onMousemove={handleMouseMove}
      onMouseup={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Layer>
        {drawing.map((line) => (
          <Line
            points={line.points}
            stroke={line.color}
            strokeWidth={line.width}
            opacity={line.opacity}
            shadowBlur={line.penType.shadowBlur}
            tension={0.4}
            dash={[10, 20]}
            dashEnabled={line.penType.dashEnabled}
            lineCap={line.penType.lineCap}
            lineJoin={line.penType.lineJoin}
            globalCompositeOperation={line.penType.globalCompositeOperation}
          />
        ))}
        {cursorPos && (
          <Circle
            fill={penType.name === "eraser" ? "rgb(212 212 212)" : penColor}
            opacity={0.3}
            width={penType.name === "eraser" ? eraserWidth : penWidth}
            x={cursorPos.x}
            y={cursorPos.y}
          />
        )}
      </Layer>
    </Stage>
  );
};

export default KonvaCanvas;
