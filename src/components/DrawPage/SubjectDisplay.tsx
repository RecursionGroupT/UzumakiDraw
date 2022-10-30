import React from "react";
import { motion } from "framer-motion";

type Props = {
  subject: string;
};

const SubjectDisplay: React.FC<Props> = ({ subject }) => (
  <div className="rounded-t-md border-4 border-black bg-gray-900 p-6 text-center text-xl font-bold text-white">
    <motion.div
      key={subject}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 10, duration: 5 }}
    >
      {subject}
    </motion.div>
  </div>
);

export default SubjectDisplay;
