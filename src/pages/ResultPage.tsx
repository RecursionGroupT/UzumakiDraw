import Konva from "konva";
import React, { useContext, useRef } from "react";
import { Group, Layer, Line, Rect, Stage, Text } from "react-konva";
import { KonvaContext } from "../context/KonvaContext";
import type { Category } from "../util/Subjects";

const ResultPage = () => {
  const { drawings } = useContext(KonvaContext);
  const stageRef = useRef<Konva.Stage>(null);

  const downloadURI = (uri: string, name: string) => {
    const link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
    <>
      <Stage ref={stageRef} className="m-auto w-[1088px] rounded-md border-4 bg-white" height={1080} width={1080}>
        <Layer>
          {drawings.map((drawing) => (
            <Group
              x={position(drawing.category, "x")}
              y={position(drawing.category, "y")}
              width={200}
              height={200}
              onMouseOver={() => console.log("mouse over")}
              onClick={() => console.log("clicked")}
              draggable
              scaleX={0.3}
              scaleY={0.3}
            >
              <Text />
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
              <Rect fill="red" x={200} width={30} height={30} />
              <Text />
            </Group>
          ))}
        </Layer>
      </Stage>
      <button
        type="button"
        onClick={() => {
          if (stageRef.current) {
            const dataURL = stageRef.current.toDataURL({ pixelRatio: 3 });
            downloadURI(dataURL, "stage.png");
          }
        }}
      >
        save as image
      </button>
    </>
  );
};

export default ResultPage;
