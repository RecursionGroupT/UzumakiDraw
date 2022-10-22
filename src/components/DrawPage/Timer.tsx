import React, { useContext } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { KonvaContext } from "../../context/KonvaContext";

const MyTimer = () => {
  const { isTimerExpired, setIsTimerExpired } = useContext(KonvaContext);

  const renderTime = ({ remainingTime }: { remainingTime: number }) => {
    if (remainingTime === 0) {
      setIsTimerExpired(true);
      return <div className="timer">{isTimerExpired && <span>タイムアウト</span>}</div>;
    }

    return (
      <div className="timer">
        <div className="text">Remaining</div>
        <div className="value">{remainingTime}</div>
        <div className="text">seconds</div>
      </div>
    );
  };

  return (
    <div className="App">
      <div className="timer-wrapper">
        <CountdownCircleTimer
          isPlaying
          duration={5}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[10, 6, 3, 0]}
          onComplete={() => ({ shouldRepeat: false })}
        >
          {renderTime}
        </CountdownCircleTimer>
      </div>
    </div>
  );
};

export default MyTimer;
