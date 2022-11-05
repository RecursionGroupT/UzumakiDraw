import React, { useState, useContext, useCallback, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import useSound from "use-sound";
import { useTimer } from "use-timer";
import Konva from "konva";
import { Line } from "react-konva";
import SoundNext from "../sounds/playNext.mp3";
import ToolBox from "../components/ToolBox/ToolBox";
import SubjectDisplay from "../components/DrawPage/SubjectDisplay";
import { Drawing, IPenType, KonvaContext } from "../context/KonvaContext";
import Timer from "../components/DrawPage/Timer";
import type { Subject } from "../util/Subjects";
import { subjects } from "../util/Subjects";
import Canvas from "../components/Canvas";

const DrawPage = () => {
  const stageRef = useRef<Konva.Stage>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [drawing, setDrawing] = useState<Drawing>({ lines: [], category: null, width: 0, height: 0, x: 0, y: 0 });
  const [subjectArray, setSubjectArray] = useState<Subject[]>(subjects);
  const [subject, setSubject] = useState<Subject>(subjects[0]);
  const [playNext] = useSound<string>(SoundNext as string);
  const {
    setDrawings,
    drawPageStageDimensions,
    penType,
    penColor,
    penWidth,
    isPenDash,
    eraserWidth,
    penOpacity,
    setDrawPageStageDimensions,
  } = useContext(KonvaContext);

  const isDrawing = useRef<boolean>(false);

  const initialTime = 3000;
  const { start, time, reset } = useTimer({
    autostart: true,
    initialTime,
    endTime: 0,
    interval: 10,
    timerType: "DECREMENTAL",
    onTimeOver: () => {
      handleNext();
    },
  });

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

  const handleMouseUp = (): void => {
    isDrawing.current = false;
  };

  const subjectChange = useCallback(() => {
    if (subjectArray.length > 1) {
      setSubjectArray((prevSubjectArray) => {
        const newSubjectArray = [...prevSubjectArray];
        newSubjectArray.splice(subjectArray.indexOf(subject), 1);

        const randomNum: number = Math.floor(Math.random() * newSubjectArray.length);
        setSubject(newSubjectArray[randomNum]);

        return newSubjectArray;
      });
    }
  }, [subject, subjectArray]);

  const handleNext = useCallback(() => {
    playNext();
    subjectChange(); // change subject title
    reset(); // reset timer
    start(); // start timer
    if (drawing.lines.length > 0) {
      setDrawings((prevDrawings) => [
        ...prevDrawings,
        {
          ...drawing,
          category: subject.category,
          width: drawPageStageDimensions.width,
          height: drawPageStageDimensions.height,
        },
      ]); // save current canvas
    }
    setDrawing({ lines: [], category: null, width: 0, height: 0, x: 0, y: 0 }); // clear current canvas
  }, [
    playNext,
    subjectChange,
    reset,
    start,
    drawing,
    setDrawings,
    subject.category,
    drawPageStageDimensions.width,
    drawPageStageDimensions.height,
  ]);

  const handleResize = useCallback(() => {
    setWidth(window.innerWidth * 0.5);
    setHeight(window.innerHeight * 0.5);
    setDrawPageStageDimensions({
      width: window.innerWidth * 0.5,
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
    <div className="relative mx-5 flex h-5/6 min-w-[1100px] flex-col space-y-4">
      <div className="flex h-full space-x-8 p-4">
        <div className="basis-1/6 content-center">
          <ToolBox />
        </div>
        <div className="mt-1 basis-4/6">
          <SubjectDisplay subject={subject.title} />
          <Timer seconds={time} initialTime={initialTime} />
          <Canvas
            ref={stageRef}
            drawing={drawing}
            setDrawing={setDrawing}
            className="rounded-b-lg border-4 border-black bg-white"
            width={width}
            height={height}
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
          </Canvas>
        </div>
        <div className="basis-1/6">
          <button
            className="rounded border-2 border-gray-900 bg-orange-400 px-4 py-2 font-semibold tracking-tighter transition duration-300 hover:bg-gray-900 hover:text-white md:mb-0 "
            type="button"
            onClick={handleNext}
          >
            NEXT
          </button>
          <Link to="/result">
            <button
              className="rounded bg-blue-800 px-4 py-2 text-white hover:bg-blue-600"
              type="button"
              onClick={handleNext}
            >
              RESULT
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DrawPage;
