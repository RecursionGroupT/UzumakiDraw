import React, { useState, useContext, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import useSound from "use-sound";
import SoundNext from "../sounds/playNext.mp3";
import ToolBox from "../components/ToolBox/ToolBox";
import KonvaCanvas from "../components/KonvaCanvas";
import SubjectDisplay from "../components/DrawPage/SubjectDisplay";
import Timer from "../components/DrawPage/Timer";
import { Drawing, KonvaContext } from "../context/KonvaContext";
import type { Subject } from "../util/Subjects";
import { subjects } from "../util/Subjects";

const DrawPage = () => {
  const [drawing, setDrawing] = useState<Drawing>({ lines: [], category: null });
  const [subjectArray, setSubjectArray] = useState<Subject[]>(subjects);
  const [subject, setSubject] = useState<Subject>(subjects[0]);
  const [subjectTitle, setSubjectTitle] = useState<string>(subjects[0].title);
  const [timerKey, setTimerKey] = useState(0);
  const [playNext] = useSound<string>(SoundNext as string);

  const { setDrawings, isTimerExpired, setIsTimerExpired } = useContext(KonvaContext);

  const subjectChange = useCallback(() => {
    if (subjectArray.length > 1) {
      setSubjectArray((prevSubjectArray) => {
        const newSubjectArray = [...prevSubjectArray];
        newSubjectArray.splice(subjectArray.indexOf(subject), 1);

        const randomNum: number = Math.floor(Math.random() * newSubjectArray.length);
        setSubject(newSubjectArray[randomNum]);
        setSubjectTitle(newSubjectArray[randomNum].title);

        return newSubjectArray;
      });
    }
  }, [subject, subjectArray]);

  const handleNext = useCallback(() => {
    playNext();
    subjectChange(); // change subject title
    setTimerKey((prevTimerKey) => prevTimerKey + 1); // reload timer
    setDrawings((prevDrawings) => [...prevDrawings, { ...drawing, category: subject.category }]); // save current canvas
    setDrawing({ lines: [], category: null }); // clear current canvas
  }, [drawing, setDrawings, subjectChange, playNext, subject.category]);

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
      <div className="flex h-full space-x-8 p-4">
        <div className="grid basis-1/6 content-center">
          <ToolBox />
        </div>
        <div className="mt-8 basis-4/6">
          <SubjectDisplay subject={subjectTitle} />
          <KonvaCanvas drawing={drawing} setDrawing={setDrawing} />
        </div>
        <div className="basis-1/6" />
      </div>
      <button className="rounded bg-blue-800 px-4 py-2 text-white hover:bg-blue-600" type="button" onClick={handleNext}>
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
  );
};

export default DrawPage;
