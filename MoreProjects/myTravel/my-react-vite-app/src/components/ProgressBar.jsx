import { useEffect, useState } from "react";

export default function ProgressBar({ timer }) {
  const [remainingTime, setRemainingTime] = useState(timer); // ZA DA SE POKAZE progress bar

  //must update the state multiple times per sec to smoothly move the progress bar

  useEffect(() => {
    const interval = setInterval(() => {
      // ako ne koristeme use effect ima infinite loop odma tajmero ne se ni pojavuva
      setRemainingTime((prevTime) => prevTime - 10);
    }, 10); //, every 10 milliseconds, so that we execute it 100 times per second.

    //da se zapre intervalo ako ne ke si tece celo vreme

    return () => {
      clearInterval(interval);
    };
  }, [remainingTime]);

  return <progress value={remainingTime} max={timer} />;
}
