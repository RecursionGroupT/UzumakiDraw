import React from "react";

type Props = {
  seconds: number;
  initialTime: number;
};

const Timer: React.FC<Props> = ({ seconds, initialTime }) => {
  const secondsToPercentage = () => (seconds / initialTime) * 100;

  const getColor = () => {
    const percentage = secondsToPercentage();
    if (percentage > 25) return "bg-green-400";
    if (percentage > 10) return "bg-yellow-400";
    return "bg-red-400";
  };

  return (
    <div className="h-2.5 w-full border-x-4 border-black bg-gray-600">
      <div
        className={`h-2.5 rounded-r-md ${getColor()}`}
        style={{ width: `${secondsToPercentage()}%`, transition: "width linear" }}
      />
    </div>
  );
};

export default Timer;
