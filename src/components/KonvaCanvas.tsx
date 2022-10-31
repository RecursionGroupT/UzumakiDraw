import Konva from "konva";
import React, { useState, useRef, useContext, useEffect, useCallback } from "react";
import { Layer, Stage, Line, TextPath } from "react-konva";
import { KonvaContext, IPenType, Drawing } from "../context/KonvaContext";

type Props = {
  drawing: Drawing;
  setDrawing: React.Dispatch<React.SetStateAction<Drawing>>;
};

const KonvaCanvas: React.FC<Props> = ({ drawing, setDrawing }) => {
  const { penType, penColor, penWidth, isPenDash, setDrawPageStageDimensions } = useContext(KonvaContext);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const isDrawing = useRef<boolean>(false);

  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>): void => {
    isDrawing.current = true;
    const stage = e.target.getStage();
    if (stage != null) {
      const pos = stage.getPointerPosition();
      if (pos != null) {
        const currPenType: IPenType = { ...penType, dashEnabled: isPenDash };
        setDrawing((prevDrawing) => {
          const newDrawing = { ...prevDrawing };
          newDrawing.lines = [
            ...prevDrawing.lines,
            { penType: currPenType, points: [pos.x, pos.y], color: penColor, width: penWidth },
          ];
          return newDrawing;
        });
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

  const handleMouseUp = (): void => {
    isDrawing.current = false;
  };

  const handleResize = useCallback(() => {
    setWidth(window.innerWidth * 0.75);
    setHeight(window.innerHeight * 0.5);
    setDrawPageStageDimensions({
      width: window.innerWidth * 0.75,
      height: window.innerHeight * 0.5,
    });
  }, [setDrawPageStageDimensions]);

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
  }, [handleResize]);

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
        {drawing.lines.map((line) => (
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
        <TextPath text="Simple Text" />
      </Layer>
    </Stage>
  );
};

export default KonvaCanvas;
