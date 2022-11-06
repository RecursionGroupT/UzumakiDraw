import React, { useContext, useEffect, useRef, useState } from "react";
import Konva from "konva";
import { Layer, Rect, Stage } from "react-konva";
import { TiDelete } from "react-icons/ti";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ToolBox from "../components/ToolBox/ToolBox";
import GroupDraw from "../components/GroupeDraw";
import { Drawing, KonvaContext } from "../context/KonvaContext";
import { Category } from "../util/Subjects";
import CategoryText from "../components/ResultPage/CategoryText";
import { Modal } from "../components/Modal";
import useAddUserDoc from "../hooks/useAddUserDoc";

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

const list = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      when: "afterChildren",
    },
  },
};

const item = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: 300 },
};

const ResultPage = () => {
  const { drawings, setDrawings } = useContext(KonvaContext);
  const [selectedId, selectShape] = useState<string | null>(null);
  const stageRef = useRef<Konva.Stage>(null);
  const [showModal, setShowModal] = useState(false);
  const [imageDataURL, setImageDataURL] = useState<string | null>(null);
  const [hashTags, setHashTags] = useState<string[]>([]);
  const [currHashTag, setCurrHashTag] = useState("#recursion");
  const { addUserDoc, isLoading } = useAddUserDoc();
  const navigate = useNavigate();

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
    const clickedOnEmpty = e.target.name() === "background";
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  const getImage = () => {
    if (stageRef.current) {
      const data = stageRef.current.toDataURL();
      setImageDataURL(data);
    }
  };

  const shareUserImage = () => {
    if (imageDataURL) {
      addUserDoc(imageDataURL, hashTags)
        .then(() => {
          setShowModal(false);
          navigate("/home");
        })
        .catch((err) => console.log((err as Error).message));
    }
  };

  return (
    <>
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
                <Rect name="background" height={800} width={900} fill="white" />
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
            <motion.button
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.1 },
              }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                getImage();
                setShowModal(true);
              }}
              type="button"
              className="flex items-center justify-center rounded-lg border border-gray-200 bg-orange-400 p-5 shadow-md"
            >
              SHARE
            </motion.button>
          </div>
        </div>
      </div>
      <Modal isOpen={showModal} handleClose={() => setShowModal(false)}>
        <div className="w-96">
          {imageDataURL && (
            <img className="mx-auto p-4" width={500} height={500} alt="imageDataURL" src={imageDataURL} />
          )}
          <motion.div initial="hidden" animate="visible" variants={list} className="mx-2 flex flex-wrap">
            {hashTags.map((hashTag, idx) => (
              <motion.span
                variants={item}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}
                className="my-1 mr-2 flex items-center rounded bg-blue-100 py-0.5 pr-1.5 pl-2.5 text-xs font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800"
              >
                {hashTag}
                <TiDelete
                  className="cursor-pointer"
                  size={20}
                  onClick={() => {
                    setHashTags((prevState) => prevState.filter((_, i) => i !== idx));
                  }}
                />
              </motion.span>
            ))}
          </motion.div>
          <div>
            <input
              onKeyDown={(e) => {
                if (e.nativeEvent.isComposing || e.key !== "Enter" || currHashTag === "") return;
                setHashTags((prevState) => [...prevState, currHashTag]);
                setCurrHashTag("");
              }}
              onChange={(e) => {
                setCurrHashTag(e.target.value.replace(/\s/g, ""));
              }}
              type="text"
              id="first_name"
              className="mx-2 my-4 w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              value={currHashTag}
              placeholder="Add a Hashtag"
            />
          </div>
          <div className="flex w-full justify-between">
            <motion.button
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.1 },
              }}
              whileTap={{ scale: 0.9 }}
              onClick={() => shareUserImage()}
              type="button"
              disabled={isLoading}
              className="mx-2 flex w-full items-center justify-center rounded-lg border border-gray-200 bg-orange-400 py-2 px-4 font-bold shadow-md disabled:opacity-25"
            >
              Share 😊
            </motion.button>
            <motion.button
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.1 },
              }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowModal(false)}
              type="button"
              className="mx-2 flex w-full items-center justify-center rounded-lg border border-gray-200 bg-gray-700 py-2 px-4 text-white shadow-md"
            >
              Cancel
            </motion.button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ResultPage;
