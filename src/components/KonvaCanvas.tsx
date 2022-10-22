import Konva from "konva";
import React, { useState, useRef, useContext, useEffect } from "react";
import { Layer, Stage, Line } from "react-konva";
import { KonvaContext, IPenType } from "../context/KonvaContext";

interface ILine {
  penType: IPenType;
  points: number[];
  color: string;
  width: number;
}

type Lines = ILine[] | [];

const KonvaCanvas = () => {
  const { penType, penColor, penWidth, isPenDash } = useContext(KonvaContext);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const [lines, setLines] = useState<Lines>([]);
  const isDrawing = useRef<boolean>(false);

  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>): void => {
    isDrawing.current = true;
    const stage = e.target.getStage();
    if (stage != null) {
      const pos = stage.getPointerPosition();
      if (pos != null) {
        const currPenType: IPenType = { ...penType, dashEnabled: isPenDash };
        setLines((prevLines) => [
          ...prevLines,
          { penType: currPenType, points: [pos.x, pos.y], color: penColor, width: penWidth },
        ]);
      }
    }
  };

  const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>): void => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    if (stage != null) {
      const point = stage.getPointerPosition();
      const lastLine = lines[lines.length - 1];
      // add point
      if (point != null) {
        lastLine.points = lastLine.points.concat([point.x, point.y]);

        // replace last
        lines.splice(lines.length - 1, 1, lastLine);
        setLines(lines.concat());
      }
    }
  };

  const handleMouseUp = (): void => {
    isDrawing.current = false;
  };

  const handleResize = () => {
    setWidth(window.innerWidth * 0.75);
    setHeight(window.innerHeight * 0.5);
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
    >
      <Layer>
        {lines.map((line) => (
          <Line
            points={line.points}
            stroke={line.color}
            strokeWidth={line.width}
            shadowBlur={line.penType.shadowBlur}
            tension={0.4}
            dash={[10, 20]}
            dashEnabled={line.penType.dashEnabled}
            lineCap={line.penType.lineCap}
            lineJoin={line.penType.lineJoin}
            globalCompositeOperation={line.penType.globalCompositeOperation}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default KonvaCanvas;
