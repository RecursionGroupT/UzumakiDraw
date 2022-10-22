import React, { useState, useContext } from "react";
import { useTimer } from "react-timer-hook";
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

  const { setDrawings, setIsTimerExpired } = useContext(KonvaContext);

  const handleNext = () => {
    subjectChange(); // change subject title
    restart(time); // reload timer
    setDrawings((prevDrawings) => [...prevDrawings, drawing]); // save current canvas
    setDrawing([]); // clear current canvas
  };

  const time = new Date();
  time.setSeconds(time.getSeconds() + 60); // set time
  const expiryTimestamp: Date = time;

  const { seconds, minutes, restart } = useTimer({
    expiryTimestamp,
    onExpire: () => setIsTimerExpired(true),
  });

  const subjectChange = () => {
    if (subjectArray.length > 1) {
      setSubjectArray((prevSubjectArray) => {
        const newSubjectArray = [...prevSubjectArray];
        newSubjectArray.splice(subjectArray.indexOf(subject), 1);

        const randomNum: number = Math.floor(Math.random() * newSubjectArray.length);
        setSubject(newSubjectArray[randomNum]);

        return newSubjectArray;
      });
    }
  };

  return (
    <>
      <SubjectDisplay subject={subject} />
      <Timer minutes={minutes} seconds={seconds} />
      <ToolBox />
      <KonvaCanvas drawing={drawing} setDrawing={setDrawing} />
      <button className="rounded bg-blue-800 px-4 py-2 text-white hover:bg-blue-600" type="button" onClick={handleNext}>
        NEXT
      </button>
    </>
  );
};

export default DrawPage;
