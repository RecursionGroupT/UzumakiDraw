import React from "react";
import { motion } from "framer-motion";
import { FaPencilAlt, FaPaintBrush, FaEraser } from "react-icons/fa";
import { AiOutlineLine, AiOutlineDash } from "react-icons/ai";
import { PenNames } from "../../context/KonvaContext";

type Props = {
  value: PenNames | "dashed" | "default";
  currentPen: PenNames | "dashed" | "default";
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const PenStylePickerButton: React.FC<Props> = ({ value, handleClick, currentPen }) => {
  const getIcon = () => {
    if (value === "pencil") {
      return <FaPencilAlt size={30} />;
    }
    if (value === "brush") {
      return <FaPaintBrush size={30} />;
    }
    if (value === "default") {
      return <AiOutlineLine size={30} />;
    }
    if (value === "dashed") {
      return <AiOutlineDash size={30} />;
    }
    return <FaEraser size={30} />;
  };

  return (
    <motion.button
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.1 },
      }}
      whileTap={{ scale: 0.9 }}
      type="button"
      className={`flex items-center justify-center rounded-lg border border-gray-200 ${
        currentPen === value ? "bg-orange-400" : "bg-orange-200"
      } p-5 shadow-md`}
      value={value}
      onClick={handleClick}
    >
      {getIcon()}
    </motion.button>
  );
};

export default PenStylePickerButton;
