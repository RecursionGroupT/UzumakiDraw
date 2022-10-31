import React, { useState, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import useSound from "use-sound";
// import { useTimer } from "react-timer-hook";
import { useTimer } from "use-timer";
import SoundNext from "../sounds/playNext.mp3";
import ToolBox from "../components/ToolBox/ToolBox";
import KonvaCanvas from "../components/KonvaCanvas";
import SubjectDisplay from "../components/DrawPage/SubjectDisplay";
import { Drawing, KonvaContext } from "../context/KonvaContext";
import Timer from "../components/DrawPage/Timer";

const subjects: string[] = ["自己紹介を書いてください", "主題１", "主題２", "主題３", "主題４", "主題５"];

const DrawPage = () => {
  const [drawing, setDrawing] = useState<Drawing>([]);
  const [subject, setSubject] = useState<string>(subjects[0]);
  const [subjectArray, setSubjectArray] = useState<string[]>(subjects);
  const [playNext] = useSound<string>(SoundNext as string);
  const { setDrawings } = useContext(KonvaContext);

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
    if (drawing.length > 0) {
      setDrawings((prevDrawings) => [...prevDrawings, drawing]); // save current canvas
    }
    setDrawing([]); // clear current canvas
  }, [drawing, setDrawings, subjectChange, playNext, reset, start]);

  return (
    <div className="relative mx-5 flex h-5/6 min-w-[1100px] flex-col space-y-4">
      <div className="absolute top-0 right-0">{/* <Timer timerKey={timerKey} /> */}</div>
      <div className="flex h-full space-x-8 p-4">
        <div className="grid basis-1/6 content-center">
          <ToolBox />
        </div>
        <div className="mt-1 basis-4/6">
          <SubjectDisplay subject={subject} />
          <Timer seconds={time} initialTime={initialTime} />
          <KonvaCanvas drawing={drawing} setDrawing={setDrawing} />
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
