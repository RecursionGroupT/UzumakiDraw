import Konva from "konva";
import React, { useState, useRef, useContext } from "react";
import { Layer, Stage, Line } from "react-konva";
import { KonvaContext, IPenType } from "../context/KonvaContext";

interface ILine {
  penType: IPenType;
  points: number[];
  // color
  // width
  // strokeStyle
}

type Lines = ILine[] | [];

const KonvaCanvas = () => {
  const { penType, penColor, isPenDash } = useContext(KonvaContext);

  const [lines, setLines] = useState<Lines>([]);
  const isDrawing = useRef<boolean>(false);

  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>): void => {
    isDrawing.current = true;
    const stage = e.target.getStage();
    if (stage != null) {
      const pos = stage.getPointerPosition();
      if (pos != null) {
        const currPenType: IPenType = { ...penType, dashEnabled: isPenDash };
        setLines((prevLines) => [...prevLines, { penType: currPenType, points: [pos.x, pos.y] }]);
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

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={handleMouseDown}
      onMousemove={handleMouseMove}
      onMouseup={handleMouseUp}
    >
      <Layer>
        {lines.map((line) => (
          <Line
            points={line.points}
            stroke={penColor}
            strokeWidth={10}
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
