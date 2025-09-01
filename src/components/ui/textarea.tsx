import * as React from "react";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, Props>(function Textarea(
  { className = "", ...props },
  ref
) {
  return (
    <textarea
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
