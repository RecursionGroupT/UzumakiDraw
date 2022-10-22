import React, { useContext } from "react";
import { KonvaContext } from "../../context/KonvaContext";

type Props = {
  minutes: number;
  seconds: number;
};

const Timer: React.FC<Props> = ({ minutes, seconds }) => {
  const { isTimerExpired } = useContext(KonvaContext);

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "100px" }}>
        <span>{minutes}</span>:<span>{seconds}</span>
        {isTimerExpired && <div>タイムアウト</div>}
      </div>
    </div>
  );
};

export default Timer;
