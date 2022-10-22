import React from "react";

type Props = {
  subject: string;
};

const SubjectDisplay: React.FC<Props> = ({ subject }) => (
  <div className="rounded-t-md border-4 border-black bg-gray-900 p-6 text-center text-xl font-bold text-white">
    <div>{subject}</div>
  </div>
);

export default SubjectDisplay;
