import { useRef, useState } from "react";
import Modal from "./Modal";

export default function NewTask({ onAdd }) {
  const [enteredTask, setEnteredTask] = useState(""); // namesto useRef, bidejki otkoga ke vneseme ime i ke pretisneme addTask sakame input field da bide prazen
  const modal = useRef();

  function handleChange(event) {
    setEnteredTask(event.target.value);
  }

  function handleClick() {
    //forward the input value to the app component
    //reset back to an empty string
    if (enteredTask.trim() === "") {
      modal.current.open();
    } else {
      onAdd(enteredTask);
      setEnteredTask(""); //da bide pak prazno input poleto
    }
  }
  return (
    <div className="flex  items-center gap-4">
      <Modal ref={modal} buttonCaption="Okay">
        <p className="text-stone-600">You can't add empty tasks! </p>
      </Modal>
      <input
        type="text"
        className="w-64 px-2 py-1 rounded-sm bg-stone-200 "
        onChange={handleChange}
        value={enteredTask}
      />
      <button
        className="text-stone-700 hover:text-stone-950"
        onClick={handleClick}
      >
        Add Task
      </button>
    </div>
  );
}
