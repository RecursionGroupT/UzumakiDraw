import React from "react";
import PenColorPicker from "./PenColorPicker";
import PenWidthPicker from "./PenWidthPicker";
import PenStylePicker from "./PenStylePicker";

const ToolBox = () => (
  <div className="flex flex-col space-y-4">
    <PenStylePicker />
    <PenWidthPicker />
    <PenColorPicker />
  </div>
);

export default ToolBox;
