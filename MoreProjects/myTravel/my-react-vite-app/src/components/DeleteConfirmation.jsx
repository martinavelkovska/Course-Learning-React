import { useEffect } from "react";
import ProgressBar from "./ProgressBar";

const TIMER = 3000;

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  //we had a problem kt ke klinkam na cancel unasa ga kako timer set
  //problem was not setting the timer but cleaning it, gettin rid of it
  // and that's why we use useEffect - we can do cleanup function
  useEffect(() => {
    const timer = setTimeout(() => {
      //expires after a given time period
      onConfirm();
    }, TIMER);

    return () => {
      //stop the timer whenever this component is removed from the DOM
      clearTimeout(timer); // we need reference of the timer that should be stopped
    }; // cleanup function where we can stop the timer
  }, [onConfirm]);

  // And you define such a cleanup function by returning it  from inside the effect function.
  //So, this effect function can return another function which will then be executed by React right before
  //this effect function runs again or, and that's the important part here,
  //right before this component dismounts. So, before it's removed from the DOM.

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      <ProgressBar timer={TIMER} />
    </div>
  );
}
