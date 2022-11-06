import Konva from "konva";
import React, { useState, useRef, useContext, useEffect, useCallback } from "react";
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
  const { penType, penColor, penWidth, isPenDash, eraserWidth, penOpacity, setDrawPageStageDimensions } =
    useContext(KonvaContext);
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
          setDrawing((prevDrawing) => {
            const newDrawing = { ...prevDrawing };
            newDrawing.lines = [
              ...prevDrawing.lines,
              { penType: currPenType, points: [pos.x, pos.y], color: penColor, width: eraserWidth, opacity: 1 },
            ];
            return newDrawing;
          });
        } else {
          setDrawing((prevDrawing) => {
            const newDrawing = { ...prevDrawing };
            newDrawing.lines = [
              ...prevDrawing.lines,
              { penType: currPenType, points: [pos.x, pos.y], color: penColor, width: penWidth, opacity: penOpacity },
            ];
            return newDrawing;
          });
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

  const handleResize = useCallback(() => {
    setWidth(window.innerWidth * 0.4);
    setHeight(window.innerHeight * 0.5);
    setDrawPageStageDimensions({
      width: window.innerWidth * 0.4,
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
    <div className="rounded-b-lg border-4 border-black shadow-[0_12px_0_0_rgba(0,0,0)]">
      <div className="rounded-b-lg shadow-[0_8px_0_0_rgba(255,255,255)]">
        <div className="rounded-b-lg shadow-[0_6px_0_0_rgba(196,196,196)]">
          <div className="rounded-b-lg shadow-[0_4px_0_0_rgba(255,255,255)]">
            <Stage
              className="rounded-b-lg border-black bg-white shadow-[0_2px_0_0_rgba(196,196,196)]"
              width={width}
              height={height}
              onMouseDown={handleMouseDown}
              onMousemove={handleMouseMove}
              onMouseup={handleMouseUp}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Layer>
                {drawing.lines.map((line) => (
                  <Line
                    points={line.points}
                    stroke={line.color}
                    strokeWidth={line.width}
                    opacity={line.opacity}
                    tension={0.4}
                    dash={[line.width, line.width * 2]}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default KonvaCanvas;
