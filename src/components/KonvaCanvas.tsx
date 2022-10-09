import Konva from "konva";
import React, { useState, useRef, useContext } from "react";
import { Layer, Stage, Text, Line } from "react-konva";
import { KonvaContext, PenType } from "../context/KonvaContext";

interface ILine {
  penType: PenType;
  points: number[];
  // color
  // width
  // strokeStyle
}

type Lines = ILine[] | [];

const KonvaCanvas = () => {
  const { penType, penColor } = useContext(KonvaContext);

  const [lines, setLines] = useState<Lines>([]);
  const isDrawing = useRef<boolean>(false);

  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>): void => {
    isDrawing.current = true;
    const stage = e.target.getStage();
    if (stage != null) {
      const pos = stage.getPointerPosition();
      if (pos != null) {
        setLines((prevLines) => [...prevLines, { penType, points: [pos.x, pos.y] }]);
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
        <Text text="Just start drawing" x={5} y={30} />
        {lines.map((line) => (
          <Line
            points={line.points}
            stroke={penColor}
            strokeWidth={3}
            tension={15}
            dash={[30, 20]}
            lineCap="round"
            lineJoin="round"
            globalCompositeOperation={line.penType === "eraser" ? "destination-out" : "source-over"}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default KonvaCanvas;
