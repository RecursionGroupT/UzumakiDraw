import React from "react";
import PenColorPicker from "./PenColorPicker";
import PenWidthPicker from "./PenWidthPicker";
import PenStylePicker from "./PenStylePicker";

const ToolBox = () => (
  <div className="flex max-w-sm flex-col space-y-4 rounded-lg border border-gray-200 bg-gray-100 p-6 shadow-md">
    <PenStylePicker />
    <PenWidthPicker />
    <PenColorPicker />
  </div>
);

export default ToolBox;
