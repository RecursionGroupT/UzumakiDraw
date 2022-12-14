import React, { useState, useContext, useCallback } from "react";
import useSound from "use-sound";
import { useTimer } from "use-timer";
import { nanoid } from "nanoid";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SoundNext from "../sounds/playNext.mp3";
import ToolBox from "../components/ToolBox/ToolBox";
import KonvaCanvas from "../components/KonvaCanvas";
import SubjectDisplay from "../components/DrawPage/SubjectDisplay";
import { Drawing, KonvaContext } from "../context/KonvaContext";
import Timer from "../components/DrawPage/Timer";
import { subjects, Subject } from "../util/subject";

const DrawPage = () => {
  const [drawing, setDrawing] = useState<Drawing>({
    lines: [],
    category: null,
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    id: nanoid(),
    rotationDeg: { drawing: 0, category: 0 },
  });
  const [subjectArray, setSubjectArray] = useState<Subject[]>(subjects);
  const [subject, setSubject] = useState<Subject>(subjects[0]);
  const [subjectIdx, setSubjectIdx] = useState(0);
  const [playNext] = useSound(SoundNext as string, { volume: 0.3 });
  const { setDrawings, drawPageStageDimensions } = useContext(KonvaContext);
  const navigate = useNavigate();

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
    setSubjectIdx((prevState) => prevState + 1);
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
          id: nanoid(),
        },
      ]); // save current canvas
    }
    setDrawing({
      lines: [],
      category: null,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      id: nanoid(),
      rotationDeg: { drawing: 0, category: 0 },
    }); // clear current canvas

    if (subjectIdx >= subjects.length - 1) {
      navigate("/result");
    }
  }, [
    playNext,
    subjectIdx,
    subjectChange,
    reset,
    start,
    drawing,
    navigate,
    setDrawings,
    subject.category,
    drawPageStageDimensions.width,
    drawPageStageDimensions.height,
  ]);

  return (
    <div className="m-12 flex items-center space-x-8 rounded-2xl border-4 border-double border-orange-300 px-4 py-12">
      <div className="grid basis-1/4">
        <ToolBox />
      </div>
      <div className="shadow-xl">
        <SubjectDisplay subject={subject.title} />
        <Timer seconds={time} initialTime={initialTime} />
        <KonvaCanvas drawing={drawing} setDrawing={setDrawing} />
      </div>
      <div className="grid basis-1/4 justify-items-center">
        <div>
          <motion.button
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.9 }}
            type="button"
            className={`rounded-lg py-6 px-12 text-2xl shadow-md shadow-gray-400 ${
              subjectIdx < subjects.length - 1 ? "bg-orange-400" : "bg-blue-400"
            }`}
            onClick={handleNext}
          >
            {subjectIdx < subjects.length - 1 ? <FaArrowRight /> : <span className="font-bold">?????????</span>}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default DrawPage;
