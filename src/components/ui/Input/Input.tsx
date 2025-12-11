import { forwardRef, type InputHTMLAttributes } from "react";
import clsx from "clsx";
import "./Input.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className, ...props }, ref) => {
    return (
      <div className="input-wrapper">
        <input
          ref={ref}
          className={clsx("input", error && "input--error", className)}
          {...props}
        />
        {error && <span className="input__error">{error}</span>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
