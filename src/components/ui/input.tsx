import * as React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, Props>(function Input(
  { className = "", ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={
        "w-full rounded-md border border-slate-300 px-3 py-2 text-sm " +
        "focus:outline-none focus:ring-2 focus:ring-slate-300 " +
        className
      }
      {...props}
    />
  );
});
