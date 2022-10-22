import React, { useContext } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { KonvaContext } from "../../context/KonvaContext";

type Props = {
  timerKey: number;
};

const Timer: React.FC<Props> = ({ timerKey }) => {
  const { isTimerExpired, setIsTimerExpired } = useContext(KonvaContext);

  const renderTime = ({ remainingTime }: { remainingTime: number }) => {
    if (remainingTime === 0) {
      setIsTimerExpired(true);
      return <div>{isTimerExpired && <span>タイムアウト</span>}</div>;
    }

    return (
      <div>
        <div>Remaining</div>
        <div>{remainingTime}</div>
        <div>seconds</div>
      </div>
    );
  };

  return (
    <div className="App">
      <div>
        <CountdownCircleTimer
          key={timerKey}
          isPlaying
          duration={30}
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

export default Timer;
