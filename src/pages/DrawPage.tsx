import React from "react";
import ToolBox from "../components/ToolBox/ToolBox";
import KonvaCanvas from "../components/KonvaCanvas";
import SubjectDisplay from "../components/DrawPage/SubjectDisplay";
import Timer from "../components/DrawPage/Timer";

const DrawPage = () => (
  <div className="relative m-8 flex h-5/6 min-w-[1100px] flex-col space-y-4 rounded-md border-2 border-double border-orange-300 p-2">
    <div className="absolute top-0 right-0">
      <Timer />
    </div>
    <div className="flex h-full space-x-8 p-4 ">
      <div className="grid basis-1/6 content-center">
        <ToolBox />
      </div>
      <div className="mt-8 basis-4/6">
        <SubjectDisplay />
        <KonvaCanvas />
      </div>
      <div className="basis-1/6" />
    </div>
  </div>
);

export default DrawPage;
