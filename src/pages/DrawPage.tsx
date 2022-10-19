import React from "react";
import ToolBox from "../components/ToolBox/ToolBox";
import KonvaCanvas from "../components/KonvaCanvas";
import Timer from "../components/DrawPage/Timer";

const DrawPage = () => (
  <>
    <Timer />
    <ToolBox />
    <KonvaCanvas />
  </>
);

export default DrawPage;
