import React, { useContext, useEffect, useState } from "react";
import { Group, Layer, Line, Rect, Stage, Text } from "react-konva";
import { KonvaContext } from "../context/KonvaContext";

const ResultPage = () => {
  const { drawings } = useContext(KonvaContext);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

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
        {drawings.map((drawing) => (
          <Group
            x={Math.random() * 500}
            y={Math.random() * 500}
            width={200}
            height={200}
            onMouseOver={() => console.log("mouse over")}
            onClick={() => console.log("clicked")}
            draggable
            scaleX={0.4}
            scaleY={0.4}
          >
            {drawing.map((line) => (
              <Line
                points={line.points}
                stroke={line.color}
                strokeWidth={line.width}
                shadowBlur={line.penType.shadowBlur}
                tension={0.4}
                dash={[10, 20]}
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
  );
};

export default ResultPage;
