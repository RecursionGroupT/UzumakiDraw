import React from "react";
import { motion } from "framer-motion";
import PenColorPicker from "./PenColorPicker";
import PenWidthPicker from "./PenWidthPicker";
import PenStylePicker from "./PenStylePicker";

const ToolBox = () => (
  <motion.div
    initial={{ x: -500 }}
    animate={{ x: 0 }}
    transition={{ delay: 0.2, type: "spring", damping: 15, stiffness: 100, bounce: 0.2 }}
    className="flex max-w-[18rem] flex-col space-y-4 rounded-lg border border-gray-200 bg-gray-100 p-6 shadow-md"
  >
    <PenStylePicker />
    <PenWidthPicker />
    <PenColorPicker />
  </motion.div>
);

export default ToolBox;
