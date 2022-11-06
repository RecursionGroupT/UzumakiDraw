import React, { useContext, useEffect, useRef, useState } from "react";
import Konva from "konva";
import { Layer, Rect, Stage } from "react-konva";
// import ToolBox from "../components/ToolBox/ToolBox";
import { MdOutlineSaveAlt } from "react-icons/md";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
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
        return { x: Math.random() * 150, y: Math.random() * 120 };
      case 2:
        return { x: Math.random() * 250 + 400, y: Math.random() * 150 };
      case 3:
        return { x: Math.random() * 150, y: Math.random() * 200 + 400 };
      case 4:
        return { x: Math.random() * 200 + 400, y: Math.random() * 200 + 400 };
      default:
        return { x: 0, y: 0 };
    }
  };

  const getSubjectPosition = (index: number) => {
    switch (index) {
      case 0:
        return { x: 380, y: 250 };
      case 1:
        return { x: 120, y: 20 };
      case 2:
        return { x: 600, y: 20 };
      case 3:
        return { x: 120, y: 450 };
      case 4:
        return { x: 600, y: 450 };
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
    <div className="relative flex w-full justify-center">
      {/* <div className="grid basis-1/6 content-center">
          <ToolBox />
        </div> */}

      <Stage
        ref={stageRef}
        className="w-[858px] rounded-md border-4 border-double bg-white shadow-md shadow-black"
        height={750}
        width={850}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
      >
        <Layer>
          <Rect height={750} width={850} fill="white" />
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

      <div className="absolute right-0 mx-12 rounded-2xl border-l-2 bg-white shadow-md">
        <div className="noselect rounded-t-lg  p-6 text-center text-xl font-bold">
          <p>編集して完成を保存しよう</p>
        </div>
        <button
          type="button"
          className="grid w-full justify-items-center rounded-lg p-4 text-gray-500 transition duration-300 hover:bg-gray-100 hover:text-gray-900"
          onClick={() => {
            if (stageRef.current) {
              selectShape(null);
              const dataURL = stageRef.current.toDataURL({ pixelRatio: 3 });
              downloadURI(dataURL, "stage.png");
            }
          }}
        >
          <div className="flex space-x-4 ">
            <p className="text-4xl">
              <MdOutlineSaveAlt />
            </p>
            <p className="text-center text-lg leading-10 tracking-widest">保存</p>
          </div>
        </button>
        <Link to="/home">
          <div className=" grid w-full justify-items-center rounded-lg p-4 text-gray-500 transition duration-300 hover:bg-gray-100 hover:text-gray-900">
            <div className="flex space-x-4 ">
              <p className="text-4xl">
                <AiFillHome />
              </p>
              <p className="text-center text-lg leading-10 tracking-widest ">ホーム</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ResultPage;
