import React from "react";
import ToolBox from "../components/ToolBox/ToolBox";
import KonvaCanvas from "../components/KonvaCanvas";
import SubjectDisplay from "../components/DrawPage/SubjectDisplay";

const DrawPage = () => (
  <>
    <SubjectDisplay />
    <ToolBox />
    <KonvaCanvas />
  </>
);

export default DrawPage;
