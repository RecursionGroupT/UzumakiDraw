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
    <>
      <SubjectDisplay subject={subject} />
      <Timer timerKey={timerKey} />
      <ToolBox />
      <KonvaCanvas drawing={drawing} setDrawing={setDrawing} />
      <button className="rounded bg-blue-800 px-4 py-2 text-white hover:bg-blue-600" type="button" onClick={handleNext}>
        NEXT
      </button>
    </>
  );
};

export default DrawPage;
