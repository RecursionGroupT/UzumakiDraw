import "./App.css";
import React from "react";
import ToolBox from "./components/ToolBox/ToolBox";
import KonvaCanvas from "./components/KonvaCanvas";

const App: React.FC = () => (
  <>
    <ToolBox />
    <KonvaCanvas />
  </>
);

export default App;
