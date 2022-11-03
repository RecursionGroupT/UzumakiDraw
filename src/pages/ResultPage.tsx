import React, { useContext, useEffect, useRef } from "react";
import Konva from "konva";
import { Layer, Rect, Stage } from "react-konva";
import ToolBox from "../components/ToolBox/ToolBox";
import GroupDraw from "../components/GroupeDraw";
import { Drawing, KonvaContext } from "../context/KonvaContext";
import type { Category } from "../util/Subjects";

const ResultPage = () => {
  const { drawings, setDrawings } = useContext(KonvaContext);
  const [selectedId, selectShape] = React.useState<string>("");

  const stageRef = useRef<Konva.Stage>(null);

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
      prevDrawings.forEach((drawing) => {
        newDrawings.push({ ...drawing, x: position(drawing.category, "x"), y: position(drawing.category, "y") });
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

  const checkDeselect = (e: Konva.KonvaEventObject<Event>) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape("");
    }
  };

  return (
    <div className="relative mx-10 flex h-5/6 min-w-[1100px] flex-col space-y-4 p-2">
      <div className="flex h-full space-x-8 p-4">
        <div className="grid basis-1/6 content-center">
          <ToolBox />
        </div>
        <div className="mt-1 basis-4/6">
          <Stage
            ref={stageRef}
            className="m-auto w-[908px] rounded-md border-4 bg-white"
            height={800}
            width={900}
            onMouseDown={checkDeselect}
            onTouchStart={checkDeselect}
          >
            <Layer>
              <Rect height={800} width={900} fill="white" />
              {drawings.map((drawing, idx) => (
                <GroupDraw
                  drawing={drawing}
                  width={drawing.width}
                  height={drawing.height}
                  x={drawing.x}
                  y={drawing.y}
                  scaleX={0.3}
                  scaleY={0.3}
                  isSelected={idx.toString() === selectedId}
                  onSelect={() => {
                    console.log("selected ", idx.toString());
                    selectShape(idx.toString());
                  }}
                />
              ))}
            </Layer>
          </Stage>
        </div>
        <div className="basis-1/6">
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
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
