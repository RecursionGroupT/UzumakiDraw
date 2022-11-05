import Konva from "konva";
import React, { useEffect, useRef } from "react";
import { Text, Transformer } from "react-konva";
import { Category } from "../../util/Subjects";

type Props = {
  pos: { x: number; y: number };
  category: Category;
  isSelected: boolean;
  rotationDeg: number;
  scale: number;
  onSelect: () => void;
};

const CategoryText: React.FC<Props> = ({ pos, category, isSelected, onSelect, rotationDeg, scale }) => {
  const trRef = useRef<Konva.Transformer>(null);
  const textRef = useRef<Konva.Text>(null);

  useEffect(() => {
    if (textRef.current && isSelected) {
      const transformNode = trRef.current;
      transformNode?.enabledAnchors(["top-left", "top-right", "bottom-left", "bottom-right"]);
      transformNode?.nodes([textRef.current]);
    }
  }, [trRef, isSelected]);

  return (
    <>
      <Text
        scaleX={scale}
        scaleY={scale}
        rotationDeg={rotationDeg}
        ref={textRef}
        x={pos.x}
        y={pos.y}
        text={category as string}
        onClick={onSelect}
        fontFamily="'Kalam', cursive"
        fontStyle="bold"
        fontSize={30}
        draggable
      />
      {isSelected && <Transformer rotateEnabled ref={trRef} />}
    </>
  );
};

export default CategoryText;
