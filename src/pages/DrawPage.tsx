import React from "react";
import ToolBox from "../components/ToolBox/ToolBox";
import KonvaCanvas from "../components/KonvaCanvas";
import SubjectDisplay from "../components/DrawPage/SubjectDisplay";
import Timer from "../components/DrawPage/Timer";

const DrawPage = () => (
  <>
    <SubjectDisplay />
    <Timer />
    <ToolBox />
    <KonvaCanvas />
  </>
);

export default DrawPage;
