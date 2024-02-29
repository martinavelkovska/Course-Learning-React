import { forwardRef } from "react";

const Input = forwardRef(function Input({ label, textarea, ...props }, ref) {
  // if its text area or input field

  const classes =
    "bg-stone-200 rounded-sm w-full p-1 border-b border-stone-300 text-stone-600 focus:outline-none focus:border-stone-600";

  return (
    <p className="flex flex-col gap-1 my-4">
      <label className="text-sm font-bold uppercase text-stone-500">
        {label}
      </label>
      {textarea ? (
        <textarea {...props} className={classes} ref={ref} />
      ) : (
        <input {...props} className={classes} ref={ref} />
      )}
    </p>
  );
});

export default Input;
