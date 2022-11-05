import React, { useContext, useEffect, useRef, useState } from "react";
import Konva from "konva";
import { Layer, Rect, Stage } from "react-konva";
import ToolBox from "../components/ToolBox/ToolBox";
import GroupDraw from "../components/GroupeDraw";
import { Drawing, KonvaContext } from "../context/KonvaContext";
import { Category } from "../util/Subjects";
import CategoryText from "../components/ResultPage/CategoryText";

interface ICategory {
  category: Category;
  rotationDeg: number;
  scale: number;
}

let categories: ICategory[] = [
  { category: "FOOD", rotationDeg: Math.random() * 30 - 15, scale: Math.random() * 0.5 + 1 },
  { category: "HOBBY", rotationDeg: Math.random() * 30 - 15, scale: Math.random() * 0.5 + 1 },
  { category: "SPORT", rotationDeg: Math.random() * 30 - 15, scale: Math.random() * 0.5 + 1 },
  { category: "GAME", rotationDeg: Math.random() * 30 - 15, scale: Math.random() * 0.5 + 1 },
];
categories = categories.sort(() => Math.random() - 0.5);
categories.unshift({ category: "INTRO", rotationDeg: 0, scale: Math.random() * 0.5 + 1 });

const ResultPage = () => {
  const { drawings, setDrawings } = useContext(KonvaContext);
  const [selectedId, selectShape] = useState<string | null>(null);
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
        const drawingPos = getDrawingPosition(
          categories.findIndex((category) => category.category === drawing.category)
        );
        newDrawings.push({
          ...drawing,
          x: drawingPos.x,
          y: drawingPos.y,
          rotationDeg: {
            drawing: Math.random() * 30 - 15,
            category: Math.random() * 30 - 15,
          },
        });
      });
      return newDrawings;
    });
  }, [setDrawings]);

  const getDrawingPosition = (index: number) => {
    switch (index) {
      case 0:
        return { x: 250, y: 300 };
      case 1:
        return { x: Math.random() * 150, y: Math.random() * 150 };
      case 2:
        return { x: Math.random() * 250 + 500, y: Math.random() * 150 };
      case 3:
        return { x: Math.random() * 150, y: Math.random() * 250 + 450 };
      case 4:
        return { x: Math.random() * 250 + 500, y: Math.random() * 250 + 450 };
      default:
        return { x: 0, y: 0 };
    }
  };

  const getSubjectPosition = (index: number) => {
    switch (index) {
      case 0:
        return { x: 420, y: 250 };
      case 1:
        return { x: 200, y: 10 };
      case 2:
        return { x: 650, y: 10 };
      case 3:
        return { x: 200, y: 500 };
      case 4:
        return { x: 650, y: 500 };
      default:
        return { x: 0, y: 0 };
    }
  };

  const checkDeselect = (e: Konva.KonvaEventObject<Event>) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
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
              {categories.map((category, categoryIdx) => (
                <>
                  <CategoryText
                    pos={getSubjectPosition(categoryIdx)}
                    category={category.category}
                    rotationDeg={category.rotationDeg}
                    scale={category.scale}
                    isSelected={category.category === selectedId}
                    onSelect={() => {
                      selectShape(category.category);
                    }}
                  />
                  {drawings
                    .filter((drawing) => drawing.category === category.category)
                    .map((drawing) => (
                      <GroupDraw
                        drawing={drawing}
                        width={drawing.width}
                        height={drawing.height}
                        x={drawing.x}
                        y={drawing.y}
                        rotationDeg={drawing.rotationDeg.drawing}
                        scaleX={0.35}
                        scaleY={0.35}
                        isSelected={drawing.id === selectedId}
                        onSelect={() => {
                          selectShape(drawing.id);
                        }}
                      />
                    ))}
                </>
              ))}
            </Layer>
          </Stage>
        </div>
        <div className="basis-1/6">
          <button
            type="button"
            onClick={() => {
              if (stageRef.current) {
                selectShape(null);
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
