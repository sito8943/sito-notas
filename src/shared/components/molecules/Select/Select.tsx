import { useId } from "react";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faChevronDown } from "@fortawesome/free-solid-svg-icons";

// hooks
import { FLUID_HIGHLIGHT_CLASS, fluidItem } from "@/shared/hooks/useFluidHover";
import { useSelect } from "@/shared/hooks/useSelect";

import { SelectPlacement } from "./constants";
import type { SelectProps } from "./types";
import "./styles.css";

/**
 * Button + listbox select (as in Sito Presentation Deck): keyboard and
 * typeahead like a native select, list styled like @sito/ui menus with a
 * highlight that glides between options.
 */
function Select<T extends string>(props: SelectProps<T>) {
  const {
    value,
    options,
    onChange,
    label,
    icon,
    placement = SelectPlacement.BottomStart,
    disabled = false,
    className = "",
  } = props;

  const id = useId();
  const selectedIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  );
  const select = useSelect({
    labels: options.map((option) => option.label),
    selectedIndex,
    onSelect: (index) => {
      const option = options[index];
      if (option && option.value !== value) onChange(option.value);
    },
  });

  return (
    <div ref={select.rootRef} className={`select ${className}`}>
      <span id={`${id}-label`} className="sr-only">
        {label}
      </span>
      <button
        ref={select.triggerRef}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={select.open}
        aria-controls={`${id}-listbox`}
        aria-labelledby={`${id}-label ${id}-value`}
        onClick={select.toggle}
        onKeyDown={select.onTriggerKeyDown}
        className="select-trigger sito-ui-pressable"
      >
        {icon ? <span className="select-icon">{icon}</span> : null}
        <span id={`${id}-value`} className="select-value">
          {options[selectedIndex]?.label}
        </span>
        <FontAwesomeIcon icon={faChevronDown} className="select-chevron" />
      </button>
      {select.open ? (
        <ul
          ref={select.listboxRef}
          id={`${id}-listbox`}
          role="listbox"
          tabIndex={-1}
          aria-labelledby={`${id}-label`}
          aria-activedescendant={`${id}-option-${select.activeIndex}`}
          onKeyDown={select.onListboxKeyDown}
          data-placement={placement}
          className="select-list"
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              id={`${id}-option-${index}`}
              role="option"
              aria-selected={index === selectedIndex}
              {...fluidItem("options")}
              onPointerMove={() => select.setActiveIndex(index)}
              onClick={() => select.choose(index)}
              className="select-option"
            >
              <FontAwesomeIcon
                icon={faCheck}
                fixedWidth
                className="select-check"
              />
              {option.label}
            </li>
          ))}
          <li
            ref={select.highlightRef}
            role="presentation"
            aria-hidden
            className={FLUID_HIGHLIGHT_CLASS}
          />
        </ul>
      ) : null}
    </div>
  );
}

export default Select;
