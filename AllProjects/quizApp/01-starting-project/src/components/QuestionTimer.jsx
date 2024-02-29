import { useEffect, useState } from "react";

export default function QuestionTimer({ timeout, onTimeOut, mode }) {
  const [remainingTime, setRemainingTime] = useState(timeout); // ZA DA SE POKAZE progress bar

  useEffect(() => {
    console.log("setting timeout");
    const timer = setTimeout(onTimeOut, timeout);

    return () => {
      clearTimeout(timer);
    }; // if we  reach game over screen we wanna clear the timer
  }, [timeout, onTimeOut]);

  useEffect(() => {
    console.log("setting interval");
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 100);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <progress
      id="question-time"
      max={timeout}
      value={remainingTime}
      className={mode}
    />
  );
}
