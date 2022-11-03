import React, { useContext, useEffect, useMemo, useRef } from "react";
import Konva from "konva";
import { Layer, Stage, Text } from "react-konva";
import ToolBox from "../components/ToolBox/ToolBox";
import GroupDraw from "../components/GroupeDraw";
import { Drawing, KonvaContext } from "../context/KonvaContext";

const ResultPage = () => {
  const { drawings, setDrawings } = useContext(KonvaContext);
  const [selectedId, selectShape] = React.useState<string>("");
  const stageRef = useRef<Konva.Stage>(null);

  const categories: string[] = useMemo(() => ["FOOD", "HOBBY", "SPORT", "GAME"], []);

  const shuffleArray = (inputArray: string[]) => {
    inputArray.sort(() => Math.random() - 0.5);
  };
  shuffleArray(categories);

  const newCategories = useMemo(() => ["INTRO", ...categories], [categories]);
  console.log(newCategories);

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
        if (drawing.category === "INTRO") {
          newDrawings.push({
            ...drawing,
            x: position(newCategories.indexOf("INTRO"), "x"),
            y: position(newCategories.indexOf("INTRO"), "y"),
          });
        }
        if (drawing.category === "FOOD") {
          newDrawings.push({
            ...drawing,
            x: position(newCategories.indexOf("FOOD"), "x"),
            y: position(newCategories.indexOf("FOOD"), "y"),
          });
        }
        if (drawing.category === "SPORT") {
          newDrawings.push({
            ...drawing,
            x: position(newCategories.indexOf("SPORT"), "x"),
            y: position(newCategories.indexOf("SPORT"), "y"),
          });
        }
        if (drawing.category === "HOBBY") {
          newDrawings.push({
            ...drawing,
            x: position(newCategories.indexOf("HOBBY"), "x"),
            y: position(newCategories.indexOf("HOBBY"), "y"),
          });
        }
        if (drawing.category === "GAME") {
          newDrawings.push({
            ...drawing,
            x: position(newCategories.indexOf("GAME"), "x"),
            y: position(newCategories.indexOf("GAME"), "y"),
          });
        }
      });
      return newDrawings;
    });
  }, [categories, newCategories, setDrawings]);

  const position = (index: number, Coordinate: "x" | "y"): number => {
    if (Coordinate === "x") {
      if (index === 0) {
        return 250;
      }
      if (index === 1 || index === 3) {
        return Math.random() * 150;
      }
      if (index === 2 || index === 4) {
        return Math.random() * 250 + 500;
      }
    }
    if (Coordinate === "y") {
      if (index === 0) {
        return 300;
      }
      if (index === 1 || index === 2) {
        return Math.random() * 150;
      }
      if (index === 3 || index === 4) {
        return Math.random() * 250 + 450;
      }
    }
    return 0;
  };

  const subjectPosition = (index: number, Coordinate: "x" | "y"): number => {
    if (Coordinate === "x") {
      if (index === 0) {
        return 420;
      }
      if (index === 1 || index === 3) {
        return 200;
      }
      if (index === 2 || index === 4) {
        return 650;
      }
    }
    if (Coordinate === "y") {
      if (index === 0) {
        return 250;
      }
      if (index === 1 || index === 2) {
        return 10;
      }
      if (index === 3 || index === 4) {
        return 500;
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
              {newCategories.map((category) => (
                <div>
                  <Text
                    x={subjectPosition(newCategories.indexOf(category), "x")}
                    y={subjectPosition(newCategories.indexOf(category), "y")}
                    text={category}
                  />

                  {drawings.map((drawing, idx) => (
                    <div>
                      {drawing.category === category ? (
                        <GroupDraw
                          drawing={drawing}
                          width={drawing.width}
                          height={drawing.height}
                          x={drawing.x}
                          y={drawing.y}
                          scaleX={0.25}
                          scaleY={0.25}
                          isSelected={idx.toString() === selectedId}
                          onSelect={() => {
                            console.log("selected ", idx.toString());
                            selectShape(idx.toString());
                          }}
                        />
                      ) : null}
                    </div>
                  ))}
                </div>
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
