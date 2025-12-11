import {
  forwardRef,
  type HTMLAttributes,
  type LiHTMLAttributes,
  type ReactNode,
} from "react";
import clsx from "clsx";

import "./Dropdown.scss";

type DropdownProps = HTMLAttributes<HTMLDivElement> & {
  isOpen: boolean;
  children: ReactNode;
  className?: string;
};

type DropdownItemProps = LiHTMLAttributes<HTMLLIElement> & {
  children: ReactNode;
  className?: string;
};

type DropdownEmptyProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  className?: string;
};

type DropdownLoadingProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  className?: string;
};

const DropdownRoot = forwardRef<HTMLDivElement, DropdownProps>(
  ({ isOpen, children, className, style, ...props }, ref) => {
    if (!isOpen) return null;

    return (
      <div
        ref={ref}
        className={clsx("dropdown", className)}
        style={style}
        {...props}
      >
        {children}
      </div>
    );
  },
);

DropdownRoot.displayName = "Dropdown";

const DropdownList = forwardRef<
  HTMLUListElement,
  HTMLAttributes<HTMLUListElement>
>(({ children, className, ...props }, ref) => {
  return (
    <ul ref={ref} className={clsx("dropdown__list", className)} {...props}>
      {children}
    </ul>
  );
});

DropdownList.displayName = "Dropdown.List";

const DropdownItem = forwardRef<HTMLLIElement, DropdownItemProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <li ref={ref} className={clsx("dropdown__item", className)} {...props}>
        {children}
      </li>
    );
  },
);

DropdownItem.displayName = "Dropdown.Item";

const DropdownEmpty = ({
  children,
  className,
  ...props
}: DropdownEmptyProps) => {
  return (
    <div className={clsx("dropdown__empty", className)} {...props}>
      {children}
    </div>
  );
};

const DropdownLoading = ({
  children = "Завантаження..",
  className,
  ...props
}: DropdownLoadingProps) => {
  return (
    <div className={clsx("dropdown__loading", className)} {...props}>
      {children}
    </div>
  );
};

const Dropdown = Object.assign(DropdownRoot, {
  List: DropdownList,
  Item: DropdownItem,
  Empty: DropdownEmpty,
  Loading: DropdownLoading,
});

export default Dropdown;
