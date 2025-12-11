import { useEffect, useRef, useState } from "react";

interface useDropdownNavigationProps<T> {
  items: T[];
  isOpen: boolean;
  onSelect: (item: T) => void;
  onClose: () => void;
}

export const useDropdownNavigation = <T>({
  items,
  isOpen,
  onSelect,
  onClose,
}: useDropdownNavigationProps<T>) => {
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    setHighlightedIndex(-1);
    itemRefs.current = [];
  }, [items]);

  useEffect(() => {
    if (highlightedIndex >= 0 && itemRefs.current[highlightedIndex]) {
      itemRefs.current[highlightedIndex]?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [highlightedIndex]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        setHighlightedIndex(0);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < items.length - 1 ? prev + 1 : prev,
        );
        break;

      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;

      case "Enter":
        if (highlightedIndex >= 0) {
          e.preventDefault();
          onSelect(items[highlightedIndex]);
        }
        break;

      case "Escape":
        e.preventDefault();
        onClose();
        setHighlightedIndex(-1);
        break;

      case "Tab":
        onClose();
        setHighlightedIndex(-1);
        break;

      default:
        break;
    }
  };

  const setItemRef = (index: number) => (el: HTMLElement | null) => {
    itemRefs.current[index] = el;
  };

  return {
    highlightedIndex,
    setHighlightedIndex,
    handleKeyDown,
    setItemRef,
  };
};
