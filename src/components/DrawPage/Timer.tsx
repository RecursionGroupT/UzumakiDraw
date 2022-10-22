import React, { useContext } from "react";
import { useTimer } from "react-timer-hook";
import { KonvaContext } from "../../context/KonvaContext";

const Timer = () => {
  const { isTimerExpired, setIsTimerExpired } = useContext(KonvaContext);

  const time = new Date();
  time.setSeconds(time.getSeconds() + 3); // set time
  const expiryTimestamp: Date = time;

  const { seconds, minutes } = useTimer({
    expiryTimestamp,
    onExpire: () => setIsTimerExpired(true),
  });

  return (
    <div className="">
      <span>{minutes}</span>:<span>{seconds}</span>
      {isTimerExpired && <div>タイムアウト</div>}
    </div>
  );
};

export default Timer;
