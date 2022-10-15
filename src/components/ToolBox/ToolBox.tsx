import React from "react";
import PenColorPicker from "./PenColorPicker";
import PenWidthPicker from "./PenWidthPicker";
import PenStylePicker from "./PenStylePicker";

const ToolBox = () => (
  <>
    <PenStylePicker />
    <PenColorPicker />
    <PenWidthPicker />
  </>
);

export default ToolBox;
