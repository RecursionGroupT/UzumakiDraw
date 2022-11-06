/* eslint-disable react/jsx-no-bind */
import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import React, { useEffect, useRef } from "react";
import { Group, Line, Transformer, Rect } from "react-konva";
import { Drawing } from "../context/KonvaContext";

interface Props {
  drawing: Drawing;
  x: number;
  y: number;
  width: number;
  height: number;
  scaleX: number;
  scaleY: number;
  isSelected: boolean;
  onSelect: () => void;
  rotationDeg: number;
  // onChange: () => void;
}

const GroupDraw: React.FC<Props> = ({
  drawing,
  x,
  y,
  width,
  height,
  scaleX,
  scaleY,
  isSelected,
  onSelect,
  rotationDeg,
}) => {
  const trRef = useRef<Konva.Transformer>(null);
  const grpRef = useRef<Konva.Group>(null);

  // To copy the transform matrix from the rectangle to the group
  function handleTransform(e: KonvaEventObject<Event>) {
    const shape1 = e.target;
    const transform = shape1.getTransform().copy();
    const attrs = transform.decompose();
    grpRef.current?.setAttrs(attrs);
  }

  useEffect(() => {
    if (grpRef.current && isSelected) {
      const transformNode = trRef.current;
      transformNode?.enabledAnchors(["top-left", "top-right", "bottom-left", "bottom-right"]);
      transformNode?.nodes([grpRef.current]);
    }
  }, [trRef, isSelected]);

  return (
    <>
      <Group
        onClick={() => onSelect()}
        rotation={rotationDeg}
        ref={grpRef}
        x={x}
        y={y}
        scaleX={scaleX}
        scaleY={scaleY}
        draggable
      >
        <Rect width={width} height={height} id="invisible-rect" />
        {drawing.lines.map((line) => (
          <Line
            points={line.points}
            stroke={line.color}
            strokeWidth={line.width}
            tension={0.4}
            dash={[10, 20]}
            dashEnabled={line.penType.dashEnabled}
            lineCap={line.penType.lineCap}
            lineJoin={line.penType.lineJoin}
            globalCompositeOperation={line.penType.globalCompositeOperation}
          />
        ))}
      </Group>
      {isSelected && <Transformer onTransform={handleTransform} rotateEnabled ref={trRef} />}
    </>
  );
};

export default GroupDraw;
