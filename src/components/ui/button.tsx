import * as React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className = "", ...props }: ButtonProps) {
  return (
    <button
      className={
        "inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium " +
        "border border-slate-300 bg-white hover:bg-slate-50 active:bg-slate-100 " +
        "disabled:opacity-50 disabled:pointer-events-none transition " +
        className
      }
      {...props}
    />
  );
}
