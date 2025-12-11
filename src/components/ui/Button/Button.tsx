import clsx from "clsx";
import "./Button.scss";
import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "small" | "medium" | "large";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

const Button = ({
  variant = "primary",
  size = "medium",
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        "button",
        `button--${variant}`,
        `button--${size}`,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
