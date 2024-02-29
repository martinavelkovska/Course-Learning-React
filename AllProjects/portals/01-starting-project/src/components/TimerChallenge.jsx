import { useRef, useState } from "react";
import ResultModal from "./ResultModal";
// let timer; timer will be overritten ako pocneme dve od ednas
export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef(); // every component istance of this component will get its own timer ref totally independent from other refs

  const dialog = useRef(); // to show the dialog and to dim this page
  // const [timerStarted, setTimerStarted] = useState(false);
  // const [timerExpired, setTimerExpired] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000); //initually is the target time

  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;
  // let timer; is re-created
  // function handleStart() {
  //   setTimerStarted(true);
  //   timer.current = setTimeout(() => {
  //     setTimerExpired(true); // player lost, the timer expired before it was stopped by player
  //     dialog.current.open(); //to show it the dialog
  //   }, targetTime * 1000);
  // } // this allows us to set a timer of target time * 1000 to get ms

  if (timeRemaining <= 0) {
    //IF the timer expired, we LOST
    clearInterval(timer.current);
    dialog.current.open();
  }

  function handleReset() {
    setTimeRemaining(targetTime * 1000); // reset the timer
  }
  function handleStart() {
    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);
  } // how much time is left when the timer is being stoppe, updates on every 10 ms
  function handleStop() {
    // if the stop button was pressed
    // clearTimeout(timer.current); //funkcija da se zapre tajmero ama potrebno e pointer kako input odnosno ID od tajmer
    //WE WON
    dialog.current.open();
    clearInterval(timer.current);
  }
  return (
    <>
      {
        <ResultModal
          ref={dialog}
          targetTime={targetTime}
          remainingTime={timeRemaining}
          onReset={handleReset}
        />
      }
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {" "}
            {timerIsActive ? "Stop" : "Start"}
          </button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>
          {" "}
          {timerIsActive ? "Time is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
