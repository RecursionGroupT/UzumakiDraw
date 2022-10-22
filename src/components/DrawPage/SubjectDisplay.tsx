import React from "react";

type Props = {
  subject: string;
};

const SubjectDisplay: React.FC<Props> = ({ subject }) => (
  <div>
    <div>{subject}</div>
  </div>
);

export default SubjectDisplay;
