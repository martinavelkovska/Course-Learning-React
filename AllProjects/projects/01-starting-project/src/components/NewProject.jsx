import { useRef } from "react";
import Input from "./Input";
import Modal from "./Modal";

export default function NewProject({ onAdd, onCancel }) {
  const modal = useRef();
  const title = useRef();
  const description = useRef();
  const dueDate = useRef();

  function handleSave() {
    //kopceto save, gi zima value od App prreku ref
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDaueDate = dueDate.current.value;

    //validation...
    if (
      enteredTitle.trim() === "" ||
      enteredDescription.trim() === "" ||
      enteredDaueDate.trim() === ""
    ) {
      // if it's inavlid because its an empty value
      modal.current.open();
      return; //the code will not be execude if we have invalid input
    }

    onAdd({
      //da se dodade
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDaueDate,
    });
  }
  return (
    <>
      <Modal ref={modal} buttonCaption="Okay">
        <h2 className="text-stone-700 font-bold text-xl md:text-3xl my-4">
          Invalid input
        </h2>
        <p className="text-stone-600">
          Oops... looks like you forgot to enter a value.
        </p>
        <p className="text-stone-600">
          Please make sure you provide a valid value for every input field!
        </p>
      </Modal>
      <div className="w-[35rem] mt-16">
        <menu className="flex gap-4 items-center justify-end my-4">
          <li>
            {/*treba da ja prikaze noProjectSelected  */}
            <button
              className="rounded-md bg-slate-50 text-stone-800 hover:text-stone-950 md:text-base px-6 py-2 "
              onClick={onCancel}
            >
              Cancel
            </button>
          </li>
          <li>
            <button
              className="rounded-md bg-stone-800 hover:bg-stone-950 md:text-base text-stone-50  px-6 py-2"
              onClick={handleSave}
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          <Input ref={title} label="Title" type="text" />
          <Input ref={description} label="Description" textarea />
          <Input ref={dueDate} label="Due date" type="date" />
        </div>
      </div>
    </>
  );
}
