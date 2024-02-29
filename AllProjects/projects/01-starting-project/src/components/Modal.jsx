import { createPortal } from "react-dom";
import { forwardRef, useImperativeHandle, useRef } from "react";
import Button from "./Button";

const Modal = forwardRef(function Modal({ children, buttonCaption }, ref) {
  // for ex: error
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  }); //pasing the ref, and as a second value  is a function

  return createPortal(
    <dialog
      ref={dialog}
      className="backdrop:bg-stone-900/90 shadow-md p-4 rounded-md"
    >
      {children}
      <form method="dialog" className="mt-4 text-right">
        {/* this is using for closing the form */}
        <Button>{buttonCaption}</Button>
      </form>
    </dialog>,
    document.getElementById("modal-root")
  );
});

export default Modal;
