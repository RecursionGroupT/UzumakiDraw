import React, { useContext, useEffect, useRef, useState } from "react";
import Konva from "konva";
import { Line } from "react-konva";
import ToolBox from "../components/ToolBox/ToolBox";
import GroupDraw from "../components/GroupeDraw";
import { Drawing, IPenType, KonvaContext } from "../context/KonvaContext";
import type { Category } from "../util/Subjects";
import Canvas from "../components/Canvas";

const ResultPage = () => {
  const stageRef = useRef<Konva.Stage>(null);
  const { drawings, setDrawings, penType, penColor, penWidth, isPenDash, eraserWidth, penOpacity } =
    useContext(KonvaContext);
  const [drawing, setDrawing] = useState<Drawing>({ lines: [], category: null, width: 0, height: 0, x: 0, y: 0 });
  const [selectedId, selectShape] = React.useState<string>("");
  const isDrawing = useRef<boolean>(false);

  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>): void => {
    const clickedOnEmpty = e.target === e.target.getStage() || e.target.name() === "cursor";
    if (clickedOnEmpty) {
      selectShape("");
    }

    const stage = e.target.getStage();
    if (stage != null) {
      const pos = stage.getPointerPosition();
      if (pos != null && clickedOnEmpty) {
        isDrawing.current = true;
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

  const handleMouseUp = (): void => {
    isDrawing.current = false;
  };

  const downloadURI = (uri: string, name: string) => {
    const link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    setDrawings((prevDrawings) => {
      const newDrawings: Drawing[] = [];
      prevDrawings.forEach((currDrawing) => {
        newDrawings.push({
          ...currDrawing,
          x: position(currDrawing.category, "x"),
          y: position(currDrawing.category, "y"),
        });
      });
      return newDrawings;
    });
  }, [setDrawings]);

  const position = (category: Category, Coordinate: "x" | "y"): number => {
    if (Coordinate === "x") {
      if (category === "INTRO") {
        return 400;
      }
      if (category === "FOOD") {
        return Math.random() * 250;
      }
      if (category === "SPORT") {
        return Math.random() * 250 + 500;
      }
      if (category === "HOBBY") {
        return Math.random() * 250;
      }
      if (category === "GAME") {
        return Math.random() * 250 + 500;
      }
    }
    if (Coordinate === "y") {
      if (category === "INTRO") {
        return 450;
      }
      if (category === "FOOD") {
        return Math.random() * 300;
      }
      if (category === "SPORT") {
        return Math.random() * 300;
      }
      if (category === "HOBBY") {
        return Math.random() * 300 + 580;
      }
      if (category === "GAME") {
        return Math.random() * 300 + 580;
      }
    }
    return 0;
  };

  return (
    <div className="relative mx-10 flex h-5/6 min-w-[1100px] flex-col space-y-4 p-2">
      <div className="flex h-full space-x-8 p-4">
        <div className="grid basis-1/6 content-center">
          <ToolBox />
        </div>
        <div className="mt-1 basis-4/6">
          <Canvas
            ref={stageRef}
            drawing={drawing}
            setDrawing={setDrawing}
            className="m-auto w-[908px] rounded-md border-4 bg-white"
            height={800}
            width={900}
            isDrawing={isDrawing}
            handleMouseUp={handleMouseUp}
            handleMouseDown={handleMouseDown}
          >
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
            {drawings.map((prevDrawing, idx) => (
              <GroupDraw
                drawing={prevDrawing}
                width={prevDrawing.width}
                height={prevDrawing.height}
                x={prevDrawing.x}
                y={prevDrawing.y}
                scaleX={0.3}
                scaleY={0.3}
                isSelected={idx.toString() === selectedId}
                onSelect={() => {
                  selectShape(idx.toString());
                }}
              />
            ))}
          </Canvas>
        </div>
        <div className="basis-1/6">
          <button
            type="button"
            onClick={() => {
              console.log(stageRef.current);
              if (stageRef.current) {
                console.log("download");
                const dataURL = stageRef.current.toDataURL({ pixelRatio: 3 });
                downloadURI(dataURL, "stage.png");
              }
            }}
          >
            save as image
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
