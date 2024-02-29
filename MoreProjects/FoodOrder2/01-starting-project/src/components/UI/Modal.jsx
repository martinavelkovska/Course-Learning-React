import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, open, onClose, className = "" }) {
  // default for classname is empry string  so to not be set from outside
  //open should control whether the dialogue is open or not

  const dialog = useRef(); // i wanna open dialog programmatically

  useEffect(() => {
    const modal = dialog.current; // it's recommended that you store the value of this ref in some temporary constant

    if (open) {
      modal.showModal(); // to open the dialog object
    }

    //clean-up function will be executed whenever this effect function is about to run again , whenevr the open prop changes

    return () => modal.close();
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
