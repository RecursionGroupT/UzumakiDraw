import React, { useContext, useEffect, useState } from "react";
import { Layer, Stage } from "react-konva";
import GroupDraw from "../components/GroupeDraw";
import { KonvaContext } from "../context/KonvaContext";

const ResultPage = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const { drawings } = useContext(KonvaContext);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedId, selectShape] = React.useState<string>("");

  const handleResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight * 0.8);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", () => {
      handleResize();
    });
    return () => {
      window.removeEventListener("resize", () => {
        handleResize();
      });
    };
  }, []);

  return (
    <Stage className="rounded-b-md border-4 border-black bg-white" height={height} width={width}>
      <Layer>
        {drawings.map((drawing, idx) => (
          <GroupDraw
            drawing={drawing}
            x={500}
            y={500}
            scaleX={0.4}
            scaleY={0.4}
            isSelected={idx.toString() === selectedId}
            onSelect={() => {
              console.log("selected ", idx.toString());
              selectShape(idx.toString());
            }}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default ResultPage;
