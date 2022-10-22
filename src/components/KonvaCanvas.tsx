import Konva from "konva";
import React, { useRef, useContext } from "react";
import { Layer, Stage, Line } from "react-konva";
import { KonvaContext, IPenType, Drawing } from "../context/KonvaContext";

type Props = {
  drawing: Drawing;
  setDrawing: React.Dispatch<React.SetStateAction<Drawing>>;
};

const KonvaCanvas: React.FC<Props> = ({ drawing, setDrawing }) => {
  const { penType, penColor, penWidth, isPenDash } = useContext(KonvaContext);
  const isDrawing = useRef<boolean>(false);

  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>): void => {
    isDrawing.current = true;
    const stage = e.target.getStage();
    if (stage != null) {
      const pos = stage.getPointerPosition();
      if (pos != null) {
        const currPenType: IPenType = { ...penType, dashEnabled: isPenDash };
        setDrawing((prevDrawing) => [
          ...prevDrawing,
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

  return (
    <Stage
      width={window.innerWidth - 500}
      height={window.innerHeight - 500}
      onMouseDown={handleMouseDown}
      onMousemove={handleMouseMove}
      onMouseup={handleMouseUp}
    >
      <Layer>
        {drawing.map((line) => (
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
