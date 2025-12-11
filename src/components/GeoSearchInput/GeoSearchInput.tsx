import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type RefObject,
} from "react";
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
} from "@floating-ui/react";
import clsx from "clsx";
import Input from "../ui/Input";
import { CityIcon, ClearIcon, HotelIcon } from "../ui/Icons";
import { useClickOutside, useGeoSearch, useDropdownNavigation } from "@/hooks";
import type { GeoEntity } from "@/types";
import Dropdown from "../ui/Dropdown";

import "./GeoSearchInput.scss";

type GeoSearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSelect: (entity: GeoEntity) => void;
  selectedEntity?: GeoEntity | null;
  placeholder?: string;
};

const GeoSearchInput = ({
  value,
  onChange,
  onSelect,
  selectedEntity,
  placeholder = "Куди хочете поїхати?",
}: GeoSearchInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isUserTypingRef = useRef(false);

  const { results, isLoading, loadCountries, search } = useGeoSearch();

  const { highlightedIndex, setHighlightedIndex, handleKeyDown, setItemRef } =
    useDropdownNavigation({
      items: results,
      isOpen,
      onSelect: (entity) => {
        onChange(entity.name);
        onSelect(entity);
        setIsOpen(false);
      },
      onClose: () => setIsOpen(false),
    });

  const { x, y, strategy, refs } = useFloating({
    placement: "bottom-start",
    middleware: [offset(8), flip(), shift()],
    whileElementsMounted: autoUpdate,
    open: isOpen,
  });

  const setRefs = (node: HTMLInputElement | null) => {
    inputRef.current = node;
    refs.setReference(node);
  };

  useClickOutside(
    wrapperRef as RefObject<HTMLElement>,
    () => setIsOpen(false),
    isOpen,
  );

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    isUserTypingRef.current = false;

    if (!selectedEntity || selectedEntity.type === "country") {
      loadCountries();
    } else {
      search(selectedEntity.name);
    }
  }, [selectedEntity, loadCountries, search]);

  useEffect(() => {
    if (!isOpen || !isUserTypingRef.current) return;

    const timeoutId = setTimeout(() => {
      if (value.trim()) {
        search(value);
      } else {
        loadCountries();
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [value, isOpen, search, loadCountries]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    isUserTypingRef.current = true;
    onChange(e.target.value);

    if (!isOpen) {
      setIsOpen(true);
    }

    if (selectedEntity && e.target.value !== selectedEntity.name) {
      onSelect(null as unknown as GeoEntity);
    }
  };

  const handleClear = useCallback(() => {
    onChange("");
    onSelect(null as unknown as GeoEntity);
    isUserTypingRef.current = false;
    loadCountries();

    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }, [onChange, onSelect, loadCountries]);

  const handleSelectEntity = useCallback(
    (entity: GeoEntity) => {
      onChange(entity.name);
      onSelect(entity);
      setIsOpen(false);
      isUserTypingRef.current = false;
    },
    [onChange, onSelect],
  );

  const renderIcon = (entity: GeoEntity) => {
    switch (entity.type) {
      case "country":
        return (
          <img src={entity.flag} alt="" className="geo-search-input__flag" />
        );
      case "city":
        return <CityIcon />;
      case "hotel":
        return <HotelIcon />;
    }
  };

  return (
    <div className="geo-search-input" ref={wrapperRef}>
      <div className="geo-search-input__input-wrapper">
        <Input
          ref={setRefs}
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleOpen}
          placeholder={placeholder}
          autoComplete="off"
          role="combobox"
          aria-expanded={isOpen}
          aria-controls="geo-dropdown-list"
          aria-activedescendant={
            highlightedIndex >= 0 ? `geo-item-${highlightedIndex}` : undefined
          }
        />
        {selectedEntity && isOpen && (
          <button
            type="button"
            className="geo-search-input__clear"
            onClick={handleClear}
            aria-label="Clear selection"
          >
            <ClearIcon width={16} height={16} />
          </button>
        )}
      </div>

      <Dropdown
        ref={refs.setFloating}
        isOpen={isOpen}
        style={{
          position: strategy,
          top: y ?? 0,
          left: x ?? 0,
          width: (refs.reference.current as HTMLElement)?.offsetWidth,

          zIndex: 1000,
        }}
      >
        {isLoading ? (
          <Dropdown.Loading />
        ) : results.length > 0 ? (
          <Dropdown.List id="geo-dropdown-list" role="listbox">
            {results.map((entity, index) => (
              <Dropdown.Item
                key={`${entity.type}-${entity.id}`}
                ref={setItemRef(index)}
                onClick={() => handleSelectEntity(entity)}
                onMouseEnter={() => setHighlightedIndex(index)}
                role="option"
                className={clsx({ highlighted: highlightedIndex === index })}
                id={`geo-item-${index}`}
                aria-selected={highlightedIndex === index}
              >
                <span className="geo-search-input__icon">
                  {renderIcon(entity)}
                </span>
                <div className="geo-search-input__info">
                  <span className="geo-search-input__name">{entity.name}</span>
                </div>
              </Dropdown.Item>
            ))}
          </Dropdown.List>
        ) : (
          <Dropdown.Empty>
            {value ? "Нічого не знайдено" : "Почніть вводити назву"}
          </Dropdown.Empty>
        )}
      </Dropdown>
    </div>
  );
};

export default GeoSearchInput;
