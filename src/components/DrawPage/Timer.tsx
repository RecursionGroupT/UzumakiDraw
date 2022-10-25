import React, { useContext } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import useSound from "use-sound";
import SoundWarn from "../../sounds/playWarn.mp3";
import SoundNext from "../../sounds/playNext.mp3";
import { KonvaContext } from "../../context/KonvaContext";

type Props = {
  timerKey: number;
};

const Timer: React.FC<Props> = ({ timerKey }) => {
  const { isTimerExpired, setIsTimerExpired } = useContext(KonvaContext);
  const [playWarn] = useSound(SoundWarn as string);
  const [playNext] = useSound(SoundNext as string);

  const renderTime = ({ remainingTime }: { remainingTime: number }) => {
    if (remainingTime === 10) {
      playWarn({ playbackRate: 5 });
    }

    if (remainingTime === 0) {
      setIsTimerExpired(true);
      playNext();
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
