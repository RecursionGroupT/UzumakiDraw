import React, { useState, useContext, useEffect, useCallback } from "react";
import ToolBox from "../components/ToolBox/ToolBox";
import KonvaCanvas from "../components/KonvaCanvas";
import SubjectDisplay from "../components/DrawPage/SubjectDisplay";
import Timer from "../components/DrawPage/Timer";
import { Drawing, KonvaContext } from "../context/KonvaContext";

const subjects: string[] = ["自己紹介を書いてください", "主題１", "主題２", "主題３", "主題４", "主題５"];

const DrawPage = () => {
  const [drawing, setDrawing] = useState<Drawing>([]);
  const [subject, setSubject] = useState<string>(subjects[0]);
  const [subjectArray, setSubjectArray] = useState<string[]>(subjects);
  const [timerKey, setTimerKey] = useState(0);

  const { setDrawings, isTimerExpired, setIsTimerExpired } = useContext(KonvaContext);

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
    subjectChange(); // change subject title
    setTimerKey((prevTimerKey) => prevTimerKey + 1); // reload timer
    setDrawings((prevDrawings) => [...prevDrawings, drawing]); // save current canvas
    setDrawing([]); // clear current canvas
  }, [drawing, setDrawings, subjectChange]);

  useEffect(() => {
    if (isTimerExpired) {
      handleNext();
      setIsTimerExpired(false);
    }
  }, [isTimerExpired, setIsTimerExpired, handleNext]);

  return (
    <div className="relative m-8 flex h-5/6 min-w-[1100px] flex-col space-y-4 rounded-md border-2 border-double border-orange-300 p-2">
      <div className="absolute top-0 right-0">
        <Timer timerKey={timerKey} />
      </div>
      <div className="flex h-full space-x-8 p-4 ">
        <div className="grid basis-1/6 content-center">
          <ToolBox />
        </div>
        <div className="mt-8 basis-4/6">
          <SubjectDisplay subject={subject} />
          <KonvaCanvas drawing={drawing} setDrawing={setDrawing} />
        </div>
        <div className="basis-1/6" />
      </div>
      <button className="rounded bg-blue-800 px-4 py-2 text-white hover:bg-blue-600" type="button" onClick={handleNext}>
        NEXT
      </button>
    </div>
  );
};

export default DrawPage;
