import React, { useContext, useEffect, useState } from "react";
import { Group, Layer, Line, Rect, Stage, Text } from "react-konva";
import ToolBox from "../components/ToolBox/ToolBox";
import { KonvaContext } from "../context/KonvaContext";

const ResultPage = () => {
  const { drawings } = useContext(KonvaContext);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const handleResize = () => {
    setWidth(window.innerWidth * 0.6);
    setHeight(window.innerHeight * 0.7);
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
    <div className="relative mx-10 flex h-5/6 min-w-[1100px] flex-col space-y-4 p-2">
      <div className="flex h-full space-x-8 p-4">
        <div className="grid basis-1/6 content-center">
          <ToolBox />
        </div>
        <div className="mt-1 basis-4/6">
          <Stage className="rounded-md border-4 border-black bg-white" height={height} width={width}>
            <Layer>
              {drawings.map((drawing) => (
                <Group x={Math.random() * 500} y={Math.random() * 500} draggable scaleX={0.4} scaleY={0.4}>
                  {drawing.map((line) => (
                    <Line
                      points={line.points}
                      stroke={line.color}
                      strokeWidth={line.width}
                      opacity={line.opacity}
                      tension={0.4}
                      dash={[line.width, line.width * 2]}
                      dashEnabled={line.penType.dashEnabled}
                      lineCap={line.penType.lineCap}
                      lineJoin={line.penType.lineJoin}
                      globalCompositeOperation={line.penType.globalCompositeOperation}
                    />
                  ))}
                  <Rect fill="red" x={200} width={30} height={30} />
                  <Text />
                </Group>
              ))}
            </Layer>
          </Stage>
        </div>
        <div className="basis-1/6" />
      </div>
    </div>
  );
};

export default ResultPage;
