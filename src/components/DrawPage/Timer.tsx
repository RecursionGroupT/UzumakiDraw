import React from "react";

type Props = {
  seconds: number;
  initialTime: number;
};

const Timer: React.FC<Props> = ({ seconds, initialTime }) => {
  const secondsToPercentage = () => (seconds / initialTime) * 100;

  return (
    <div className="h-2.5 w-full border-x-4 border-black bg-gray-600">
      <div
        className={`h-2.5 rounded-r-md ${secondsToPercentage() > 25 ? "bg-green-400" : "bg-red-400"}`}
        style={{ width: `${secondsToPercentage()}%`, transition: "width linear" }}
      />
    </div>
  );
};

export default Timer;
