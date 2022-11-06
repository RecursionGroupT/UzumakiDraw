import React from "react";
import { motion } from "framer-motion";
import { UserDoc } from "../../firebase/types";

type Props = {
  userDoc: UserDoc;
  onClick: () => void;
};

const item = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -100 },
};

const UserCard: React.FC<Props> = ({ userDoc, onClick }) => (
  <motion.div
    onClick={onClick}
    variants={item}
    whileHover={{
      cursor: "pointer",
      scale: 1.02,
      transition: { duration: 0.3 },
    }}
    className="m-2 flex flex-col rounded-xl border border-gray-200 bg-slate-50 p-6 text-black shadow-md hover:bg-slate-100"
  >
    {userDoc.dataURL && <img className="m-auto py-5" width={300} height={300} src={userDoc.dataURL} alt="" />}
    <h5 className="mb-2 text-2xl font-bold tracking-tight">{userDoc.name}</h5>
    <div className="flex flex-wrap">
      {userDoc.hashtags.map((hashtag) => (
        <span className="my-1 mr-2 flex items-center rounded bg-blue-100 p-2 py-0.5 text-xs font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">
          {hashtag}
        </span>
      ))}
    </div>
    <p className="font-normal">{userDoc.createdAt.toDate().toDateString()}</p>
  </motion.div>
);

export default UserCard;
