import React from "react";
import ToolBox from "../components/ToolBox/ToolBox";
import KonvaCanvas from "../components/KonvaCanvas";
import MyTimer from "../components/DrawPage/Timer";

const DrawPage = () => (
  <>
    <MyTimer />
    <ToolBox />
    <KonvaCanvas />
  </>
);

export default DrawPage;
